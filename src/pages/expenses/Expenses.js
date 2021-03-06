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
import Loading from "../../components/Loading";
import Pagination from "../../components/Pagination";

const Expenses = () => {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;

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
    `${new Date().getFullYear()}-${("0" + (new Date().getMonth() + 1)).slice(
      -2
    )}`
  );

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(expenses && expenses.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(expenses && expenses.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, expenses]);

  const handlePageClick = (event) => {
    const newOffset =
      expenses && (event.selected * itemsPerPage) % expenses.length;
    setItemOffset(newOffset);
  };

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
          <AddExpense show={showExpense} handleClose={handleCloseExpense} />
          <Row className="mt-3 px-5">
            <Col className="mx-auto">
              <SavingsCurentMonth
                incomes={incomes}
                expenses={expenses}
                accounts={accounts}
                month={date.split("-")[1]}
                year={date.split("-")[0]}
              />
              <Row>
                <Col sm={8}>
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
              {loading && <Loading />}
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
                  {currentItems &&
                    currentItems.map((expense) => {
                      return (
                        <tr key={expense._id}>
                          <ExpensePreview
                            expense={expense}
                            key={expense._id}
                            handleClose={handleCloseExpense}
                          />
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
              <Pagination
                pageCount={pageCount}
                handlePageClick={handlePageClick}
              />
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
