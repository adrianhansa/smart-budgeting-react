import React, { useEffect, useState } from "react";
import { Row, Col, Table, OverlayTrigger } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getSavings } from "../../actions/savingActions";
import { getUsers } from "../../actions/userActions";
import { formatter } from "../../utils/currencyFormatter";
import Loading from "../../components/Loading";
import { BiSave } from "react-icons/bi";
import { addSaving } from "../../actions/savingActions";

const SavingsCurrentMonth = ({ accounts, expenses, incomes, month, year }) => {
  const dispatch = useDispatch();
  const { savings, loading, error } = useSelector((state) => state.savingList);
  const auth = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.userList);
  useEffect(() => {
    dispatch(getSavings());
    dispatch(getUsers());
  }, [dispatch]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalIncomes, setTotalIncomes] = useState(0);
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSavings, setTotalSavings] = useState(0);

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
    savings &&
      setTotalSavings(savings.reduce((acc, saving) => acc + saving.amount, 0));
  }, [
    accounts,
    expenses,
    incomes,
    totalIncomes,
    totalExpenses,
    savings,
    totalSavings,
  ]);
  return (
    <Row>
      <Col md={12} lg={12}>
        {loading && <Loading />}
        {error && <p className="text-danger">{error}</p>}
        <h3>Incomes, Expenses and Savings</h3>
        <p className="text-secondary">
          Predicted monthly savings:{" "}
          {formatter.format(totalIncomes - totalBudget)}
        </p>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Household member</th>
              <th>Total savings</th>
              <th>Income current month</th>
              <th>Monthly expenses</th>
              <th>Left available</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => {
                return (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>
                      {savings && formatter.format(findTotal(savings, user))}
                    </td>
                    <td>
                      {incomes && formatter.format(findTotal(incomes, user))}
                    </td>
                    <td>
                      {expenses && formatter.format(findTotal(expenses, user))}
                    </td>

                    <td>
                      {savings &&
                        incomes &&
                        expenses &&
                        formatter.format(
                          Number(findTotal(incomes, user)) -
                            Number(findTotal(expenses, user))
                        )}
                      <span className="m-2">
                        {user._id === auth.user.id && (
                          <BiSave
                            type="button"
                            title="Record as current month savings at the end of the month"
                            color="green"
                            size={18}
                            onClick={() =>
                              dispatch(
                                addSaving({
                                  amount:
                                    Number(findTotal(incomes, user)) -
                                    Number(findTotal(expenses, user)),
                                  month,
                                  year,
                                })
                              )
                            }
                          />
                        )}
                      </span>
                    </td>
                  </tr>
                );
              })}
            <tr>
              <td>
                <strong>Totals:</strong>
              </td>
              <td>{formatter.format(totalSavings)}</td>
              <td>{formatter.format(totalIncomes)}</td>
              <td>{formatter.format(totalExpenses)}</td>
              <td>
                {incomes &&
                  expenses &&
                  formatter.format(
                    incomes.reduce((acc, income) => acc + income.amount, 0) -
                      expenses.reduce((acc, expense) => acc + expense.amount, 0)
                  )}
              </td>
            </tr>
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default SavingsCurrentMonth;
