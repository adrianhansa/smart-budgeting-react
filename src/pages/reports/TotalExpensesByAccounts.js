import React, { useEffect, useState } from "react";
import { Container, Col, Row, Table } from "react-bootstrap";
import { getAccounts } from "../../actions/accountActions";
import { useDispatch, useSelector } from "react-redux";
// import MyChart from "../charts/MyChart";
import { GoGraph } from "react-icons/go";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { formatter } from "../../utils/currencyFormatter";

ChartJS.register(ArcElement, Tooltip, Legend);

const TotalExpensesByAccounts = ({ expenses }) => {
  const [toggleGraphs, setToggleGraphs] = useState(false);
  const dispatch = useDispatch();
  const { accounts } = useSelector((state) => state.accountList);
  useEffect(() => {
    dispatch(getAccounts());
  }, [dispatch]);

  const totalExpensesByBudget = (expenseList, selectedAccount) => {
    return (
      expenseList &&
      expenseList
        .filter((expense) => {
          return expense.account._id === selectedAccount._id;
        })
        .reduce((acc, expense) => acc + expense.amount, 0)
    );
  };

  const totalExpenses = (items) =>
    items.reduce((acc, item) => acc + item.amount, 0);
  const totalBudgets = (items) =>
    items.reduce((acc, item) => acc + item.budget, 0);

  const dataForChart = ([totalSpent, totalBudget]) => {
    return {
      datasets: [
        {
          data: [totalSpent, totalBudget],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
          ],
          borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
          borderWidth: 1,
        },
      ],
    };
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <h3 className="text-center">
            Total Expenses By Account ({expenses && expenses.length})
          </h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th width="40%">
                  Account
                  <br />
                  <GoGraph
                    type="button"
                    color="blue"
                    title={toggleGraphs ? "Hide graphics" : "Display graphics"}
                    onClick={() => setToggleGraphs(!toggleGraphs)}
                  />
                </th>
                <th width="20%">
                  Amount Spent <br />
                  {expenses && formatter.format(totalExpenses(expenses))}
                </th>
                <th width="20%">
                  Monthly Budget <br />
                  {accounts && formatter.format(totalBudgets(accounts))}
                </th>
                <th width="20%">
                  Remaining Budget <br />
                  {formatter.format(
                    (accounts && totalBudgets(accounts)) -
                      (expenses && totalExpenses(expenses))
                  )}
                </th>
              </tr>
            </thead>
            <tbody>
              {accounts &&
                accounts.map((account) => {
                  return (
                    <>
                      <tr key={account._id}>
                        <td>{account.name}</td>
                        <td>
                          {expenses &&
                            formatter.format(
                              totalExpensesByBudget(expenses, account)
                            )}
                        </td>
                        <td>{formatter.format(account.budget)}</td>
                        <td>
                          {expenses &&
                            formatter.format(
                              account.budget -
                                totalExpensesByBudget(expenses, account)
                            )}
                        </td>
                      </tr>
                      {toggleGraphs && (
                        <tr>
                          <td colSpan="3">
                            {expenses &&
                              expenses.map((expense) => {
                                return (
                                  expense.account._id === account._id && (
                                    <li>
                                      {expense.user.name} spent on{" "}
                                      {expense.date} for {expense.description} -{" "}
                                      {formatter.format(expense.amount)}
                                    </li>
                                  )
                                );
                              })}
                            {/* <MyChart
                              accountName={account.name}
                              expense={
                                expenses &&
                                totalExpensesByBudget(expenses, account)
                              }
                              budget={account.budget}
                            /> */}
                          </td>
                          <td>
                            <div style={{ width: 80 }}>
                              <Pie
                                options={{
                                  responsive: true,
                                  maintainAspectRatio: true,
                                }}
                                data={dataForChart([
                                  expenses &&
                                    totalExpensesByBudget(expenses, account),
                                  account.budget -
                                    totalExpensesByBudget(expenses, account),
                                ])}
                              />
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default TotalExpensesByAccounts;
