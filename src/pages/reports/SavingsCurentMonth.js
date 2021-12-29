import React, { useEffect, useState } from "react";
import { Row, Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getSavings } from "../../actions/savingActions";
import { getUsers } from "../../actions/userActions";
import { formatter } from "../../utils/currencyFormatter";

const SavingsCurrentMonth = ({ accounts, expenses, incomes }) => {
  const dispatch = useDispatch();
  const { savings, loading, error } = useSelector((state) => state.savingList);
  const { users } = useSelector((state) => state.userList);
  useEffect(() => {
    dispatch(getSavings());
    dispatch(getUsers());
  }, [dispatch]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalIncomes, setTotalIncomes] = useState(0);
  const [totalBudget, setTotalBudget] = useState(0);
  const [savingsForMonth, setSavingsForMonth] = useState(0);
  const [totalSavings, setTotalSavings] = useState(0);
  const [amountAvailable, setAmountAvailable] = useState(0);

  const findTotal = (list, user) => {
    return list
      .filter((item) => {
        return user._id === item.user._id;
      })
      .reduce((acc, item) => acc + item.amount, 0)
      .toFixed(2);
  };

  useEffect(() => {
    accounts &&
      setTotalBudget(
        accounts.reduce((acc, account) => acc + account.budget, 0)
      );
    incomes &&
      setTotalIncomes(incomes.reduce((acc, income) => acc + income.amount, 0));
    expenses &&
      setTotalExpenses(
        expenses.reduce((acc, expense) => acc + expense.amount, 0)
      );
    setSavingsForMonth(totalIncomes - totalExpenses);
    savings &&
      setTotalSavings(savings.reduce((acc, saving) => acc + saving.amount, 0));
    setAmountAvailable(totalSavings + totalIncomes - totalExpenses);
  }, [accounts, expenses, incomes, totalIncomes, totalExpenses, savings]);
  return (
    <Row>
      <Col md={12} lg={12}>
        {loading && <p>{loading}</p>}
        {error && <p className="text-danger">{error}</p>}
        <h3>Incomes, Expenses and Savings</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Household member</th>
              <th>Total expenses</th>
              <th>Amount available</th>
              <th>Savings current month</th>
              <th>Income current momth</th>
              <th>Predicted savings</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => {
                return (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>
                      {expenses && formatter.format(findTotal(expenses, user))}
                    </td>
                    <td>
                      {savings &&
                        incomes &&
                        expenses &&
                        formatter.format(
                          Number(findTotal(savings, user)) +
                            Number(findTotal(incomes, user)) -
                            Number(findTotal(expenses, user))
                        )}
                    </td>
                    <td>
                      {savings &&
                        incomes &&
                        expenses &&
                        formatter.format(
                          Number(findTotal(incomes, user)) -
                            Number(findTotal(expenses, user))
                        )}
                    </td>
                    <td>
                      {incomes && formatter.format(findTotal(incomes, user))}
                    </td>
                    <td></td>
                  </tr>
                );
              })}
            <tr>
              <td>
                <strong>Totals:</strong>
              </td>
              <td>{formatter.format(totalExpenses)}</td>
              <td>{formatter.format(amountAvailable)}</td>
              {/* <td>{formatter.format(totalSavings)}</td> */}
              <td>
                {incomes &&
                  expenses &&
                  formatter.format(
                    // savings.reduce((acc, saving) => acc + saving.amount, 0) +
                    incomes.reduce((acc, income) => acc + income.amount, 0) -
                      expenses.reduce((acc, expense) => acc + expense.amount, 0)
                  )}
              </td>
              <td>{formatter.format(totalIncomes)}</td>
              <td>{formatter.format(totalIncomes - totalBudget)}</td>
            </tr>
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default SavingsCurrentMonth;
