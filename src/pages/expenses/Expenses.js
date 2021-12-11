import React, { useEffect, useState } from "react";
import { Col, Row, Container, Table, Form } from "react-bootstrap";
import { getExpensesByMonthAndYear } from "../../actions/expenseActions";
import { useSelector, useDispatch } from "react-redux";
import { GrAddCircle } from "react-icons/gr";
import AddExpense from "./AddExpense";
import ExpensePreview from "./ExpensePreview";
import TotalExpensesByAccounts from "../reports/TotalExpensesByAccounts";

const Expenses = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    dispatch(getExpensesByMonthAndYear(date.split("-")[1], date.split("-")[0]));
  };

  const [date, setDate] = useState(
    `${new Date().getFullYear()}-${new Date().getMonth() + 1}`
  );

  const handleDate = (e) => {
    setDate(e.target.value);
    dispatch(
      getExpensesByMonthAndYear(
        e.target.value.split("-")[1],
        e.target.value.split("-")[0]
      )
    );
  };

  const dispatch = useDispatch();
  const { expenses, loading, error } = useSelector(
    (state) => state.expenseList
  );

  const expenseDetails = useSelector((state) => state.accountDetails);

  useEffect(() => {
    dispatch(getExpensesByMonthAndYear(date.split("-")[1], date.split("-")[0]));
  }, [dispatch, date]);
  return (
    <Container fluid>
      <Row>
        <Col>
          <AddExpense show={show} handleClose={handleClose} />

          <Row className="mt-3 px-5">
            <Col className="mx-auto">
              <Row>
                <Col sm={8}>
                  <h2 className="text-center">
                    Expenses
                    <GrAddCircle
                      size="32"
                      type="button"
                      onClick={() => setShow(true)}
                    />
                  </h2>
                </Col>
                <Col sm={4}>
                  <Form.Group>
                    <Form.Control
                      value={date}
                      type="month"
                      onChange={handleDate}
                    />
                  </Form.Group>
                </Col>
              </Row>
              {expenseDetails.error && (
                <p className="text-danger text-center">
                  {expenseDetails.error}
                </p>
              )}
              {loading && <p>Loading...</p>}
              {error && <p>{error}</p>}
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th width="20%">Date</th>
                    <th width="10%">Amount</th>
                    <th width="30%">Description</th>
                    <th width="20%">Account</th>
                    <th width="10%">Edit</th>
                    <th width="10%">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses &&
                    expenses.map((expense) => {
                      return (
                        <ExpensePreview
                          expense={expense}
                          key={expense._id}
                          handleClose={handleClose}
                        />
                      );
                    })}
                </tbody>
              </Table>
            </Col>
            <Col>
              <TotalExpensesByAccounts expenses={expenses} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Expenses;
