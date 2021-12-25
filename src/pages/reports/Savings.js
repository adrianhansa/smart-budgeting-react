import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";

const Savings = ({ accounts, expenses, incomes }) => {
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalIncomes, setTotalIncomes] = useState(0);
  const [totalBudget, setTotalBudget] = useState(0);
  const [savings, setSavings] = useState(0);

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
    setSavings(totalIncomes - totalExpenses);
  }, [accounts, expenses, incomes, totalIncomes, totalExpenses, savings]);
  return (
    <Row>
      <Col>
        <p>Total Incomes: £ {totalIncomes.toFixed(2)}</p>
        <p>Total Budget: £ {totalBudget.toFixed(2)}</p>
        <p>Total Expenses: £ {totalExpenses.toFixed(2)}</p>
      </Col>
    </Row>
  );
};

export default Savings;
