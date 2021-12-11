import React, { useEffect, useState } from "react";
import { Col, Row, Container, Table } from "react-bootstrap";
import { getExpenses } from "../../actions/expenseActions";
import { useSelector, useDispatch } from "react-redux";
import { GrAddCircle } from "react-icons/gr";
import AddExpense from "./AddExpense";
import ExpensePreview from "./ExpensePreview";

const Expenses = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const dispatch = useDispatch();
  const { expenses, loading, error } = useSelector(
    (state) => state.expenseList
  );

  const expenseDetails = useSelector((state) => state.accountDetails);

  useEffect(() => {
    dispatch(getExpenses());
  }, [dispatch]);
  return (
    <Container fluid>
      <Row>
        <Col>
          <h2 className="text-center">
            Expenses
            <GrAddCircle
              size="32"
              type="button"
              onClick={() => setShow(true)}
            />
          </h2>
          {expenseDetails.error && (
            <p className="text-danger text-center">{expenseDetails.error}</p>
          )}
          <AddExpense show={show} handleClose={handleClose} />

          <Row className="mt-3">
            <Col xs={12} sm={10} md={8} lg={6} xl={6} className="mx-auto">
              {loading && <p>Loading...</p>}
              {error && <p>{error}</p>}
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th width="10%">Date</th>
                    <th width="10%">Amount</th>
                    <th width="40%">Description</th>
                    <th width="20%">Account</th>
                    <th width="10%">Edit</th>
                    <th width="10%">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses &&
                    expenses.map((expense) => {
                      return (
                        <ExpensePreview expense={expense} key={expense._id} />
                      );
                    })}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Expenses;
