import React, { useEffect, useState } from "react";
import { Col, Row, Container, Table, Form } from "react-bootstrap";
import { getExpensesByMonthAndYear } from "../../actions/expenseActions";
import { getIncomesByMonthAndYear } from "../../actions/incomeActions";
import { getAccounts } from "../../actions/accountActions";
import { useSelector, useDispatch } from "react-redux";
import { GrAddCircle } from "react-icons/gr";
import AddExpense from "./AddExpense";
import ExpensePreview from "./ExpensePreview";
import TotalExpensesByAccounts from "../reports/TotalExpensesByAccounts";
import SavingsCurentMonth from "../reports/SavingsCurentMonth";

const Expenses = ({ socket }) => {
  const [showExpense, setShowExpense] = useState(false);

  const dispatch = useDispatch();
  const { expenses, loading, error } = useSelector(
    (state) => state.expenseList
  );
  const handleCloseExpense = () => {
    setShowExpense(false);
    dispatch(getExpensesByMonthAndYear(date.split("-")[1], date.split("-")[0]));
  };

  const [date, setDate] = useState(
    `${new Date().getFullYear()}-${new Date().getMonth() + 1}`
  );

  useEffect(() => {
    socket.on("expense-created", (data) => {
      dispatch(
        getExpensesByMonthAndYear(date.split("-")[1], date.split("-")[0])
      );
    });
    socket.on("expense-updated", (data) => {
      dispatch(
        getExpensesByMonthAndYear(date.split("-")[1], date.split("-")[0])
      );
    });
    socket.on("expense-deleted", (data) => {
      dispatch(
        getExpensesByMonthAndYear(date.split("-")[1], date.split("-")[0])
      );
    });
  }, [date, dispatch, socket]);

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
    dispatch(getAccounts());
  }, [dispatch, date]);

  const { incomes } = useSelector((state) => state.incomeList);
  const { accounts } = useSelector((state) => state.accountList);

  return (
    <Container fluid>
      <Row>
        <Col>
          <AddExpense
            show={showExpense}
            handleClose={handleCloseExpense}
            socket={socket}
          />
          <Row className="mt-3 px-5">
            <Col className="mx-auto">
              <Row>
                <Col sm={8}>
                  <SavingsCurentMonth
                    incomes={incomes}
                    expenses={expenses}
                    accounts={accounts}
                  />
                  <h3>
                    Expenses
                    <GrAddCircle
                      size="32"
                      type="button"
                      onClick={() => setShowExpense(true)}
                    />
                  </h3>
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
                          socket={socket}
                        />
                      );
                    })}
                </tbody>
              </Table>
            </Col>
            <Col>
              <TotalExpensesByAccounts expenses={expenses} socket={socket} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Expenses;
