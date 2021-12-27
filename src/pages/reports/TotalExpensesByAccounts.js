import React, { useEffect, useState } from "react";
import { Container, Col, Row, Table } from "react-bootstrap";
import { getAccounts } from "../../actions/accountActions";
import { useDispatch, useSelector } from "react-redux";
import MyChart from "../charts/MyChart";
import { GoGraph } from "react-icons/go";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

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
    items.reduce((acc, item) => acc + item.amount, 0).toFixed(2);
  const totalBudgets = (items) =>
    items.reduce((acc, item) => acc + item.budget, 0).toFixed(2);

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
                  Amount Spent <br />£ {expenses && totalExpenses(expenses)}
                </th>
                <th width="20%">
                  Monthly Budget <br />£ {accounts && totalBudgets(accounts)}
                </th>
                <th width="20%">
                  Remaining Budget <br />£{" "}
                  {(accounts && totalBudgets(accounts)) -
                    (expenses && totalExpenses(expenses))}
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
                          £{" "}
                          {expenses &&
                            totalExpensesByBudget(expenses, account).toFixed(2)}
                        </td>
                        <td>£ {account.budget.toFixed(2)}</td>
                        <td>
                          £
                          {expenses &&
                            (
                              account.budget -
                              totalExpensesByBudget(expenses, account)
                            ).toFixed(2)}
                        </td>
                      </tr>
                      {toggleGraphs && (
                        <tr>
                          <td colSpan="3">
                            <MyChart
                              accountName={account.name}
                              expense={
                                expenses &&
                                totalExpensesByBudget(
                                  expenses,
                                  account
                                ).toFixed(2)
                              }
                              budget={account.budget}
                            />
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
