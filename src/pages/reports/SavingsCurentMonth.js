import React, { useEffect, useState } from "react";
import { Row, Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getSavings } from "../../actions/savingActions";
import { getUsers } from "../../actions/userActions";

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
  console.log(totalBudget, totalExpenses, totalIncomes);
  return (
    <Row>
      <Col>
        {loading && <p>{loading}</p>}
        {error && <p className="text-danger">{error}</p>}
        <p>Total Savings: £ {totalSavings.toFixed(2)}</p>
        <p>Total Incomes: £ {totalIncomes.toFixed(2)}</p>
        <p>Total Budget: £ {totalBudget.toFixed(2)}</p>
        <p>Total Expenses: £ {totalExpenses.toFixed(2)}</p>
        <p>Amount available: £ {amountAvailable.toFixed(2)}</p>
        <Table>
          <thead>
            <tr>
              <th>Household member</th>
              <th>Total expenses</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => {
                return (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>
                      {expenses &&
                        expenses
                          .filter((expense) => {
                            return user._id === expense.user._id;
                          })
                          .reduce((acc, expense) => acc + expense.amount, 0)
                          .toFixed(2)}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default SavingsCurrentMonth;
