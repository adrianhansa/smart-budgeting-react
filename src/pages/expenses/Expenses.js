import React, { useEffect, useState } from "react";
import { Col, Row, Container, Table, Form } from "react-bootstrap";
import { getExpensesByMonthAndYear } from "../../actions/expenseActions";
import { getIncomesByMonthAndYear } from "../../actions/incomeActions";
import { useSelector, useDispatch } from "react-redux";
import { GrAddCircle } from "react-icons/gr";
import AddExpense from "./AddExpense";
import AddIncome from "../incomes/AddIncome";
import ExpensePreview from "./ExpensePreview";
// import IncomePreview from "../incomes/IncomePreview";
import TotalExpensesByAccounts from "../reports/TotalExpensesByAccounts";

const Expenses = () => {
  const [showExpense, setShowExpense] = useState(false);
  const [showIncome, setShowIncome] = useState(false);

  const dispatch = useDispatch();
  const { expenses, loading, error } = useSelector(
    (state) => state.expenseList
  );
  const incomeList = useSelector((state) => state.incomeList);

  useEffect(() => {
    const incomeExpenses = [];
    //merge incomes and expenses into a single array
    expenses && incomeExpenses.push(expenses);
    incomeList.incomes && incomeExpenses.push(incomeList.incomes);
    console.log(incomeExpenses);
  }, [incomeList, expenses]);

  const handleCloseExpense = () => {
    setShowExpense(false);
    dispatch(getExpensesByMonthAndYear(date.split("-")[1], date.split("-")[0]));
  };

  const handleCloseIncome = () => {
    setShowIncome(false);
    dispatch(getIncomesByMonthAndYear(date.split("-")[1], date.split("-")[0]));
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

  const expenseDetails = useSelector((state) => state.expenseDetails);

  useEffect(() => {
    dispatch(getExpensesByMonthAndYear(date.split("-")[1], date.split("-")[0]));
    dispatch(getIncomesByMonthAndYear(date.split("-")[1], date.split("-")[0]));
  }, [dispatch, date]);
  return (
    <Container fluid>
      <Row>
        <Col>
          <AddExpense show={showExpense} handleClose={handleCloseExpense} />
          <AddIncome show={showIncome} handleClose={handleCloseIncome} />
          <Row className="mt-3 px-5">
            <Col className="mx-auto">
              <Row>
                <Col sm={8}>
                  <h2 className="text-center">Expenses</h2>
                  <GrAddCircle
                    size="32"
                    type="button"
                    onClick={() => setShowExpense(true)}
                  />
                  <GrAddCircle
                    size="32"
                    type="button"
                    onClick={() => setShowIncome(true)}
                  />
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
                    <th width="15%">Date</th>
                    <th width="15%">Who spent</th>
                    <th width="10%">Amount</th>
                    <th width="25%">Description</th>
                    <th width="15%">Account</th>
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
                          handleClose={handleCloseExpense}
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
