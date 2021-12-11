import React, { useEffect } from "react";
import { Container, Col, Row, Table } from "react-bootstrap";
import { getAccounts } from "../../actions/accountActions";
import { useDispatch, useSelector } from "react-redux";

const TotalExpensesByAccounts = ({ expenses }) => {
  const dispatch = useDispatch();
  const { accounts } = useSelector((state) => state.accountList);
  useEffect(() => {
    dispatch(getAccounts());
  }, [dispatch]);

  const totalExpenses = (expenseList, selectedAccount) => {
    return expenseList
      .filter((expense) => {
        return expense.account._id === selectedAccount._id;
      })
      .reduce((acc, expense) => acc + expense.amount, 0);
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
                <th width="40%">Account</th>
                <th width="20%">Amount Spent</th>
                <th width="20%">Monthly Budget</th>
                <th width="20%">Remaining Budget</th>
              </tr>
            </thead>
            <tbody>
              {accounts &&
                accounts.map((account) => {
                  return (
                    <tr key={account._id}>
                      <td>{account.name}</td>
                      <td>
                        £{" "}
                        {expenses &&
                          totalExpenses(expenses, account).toFixed(2)}
                      </td>
                      <td>£ {account.budget.toFixed(2)}</td>
                      <td>
                        £
                        {expenses &&
                          (
                            account.budget - totalExpenses(expenses, account)
                          ).toFixed(2)}
                      </td>
                    </tr>
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
