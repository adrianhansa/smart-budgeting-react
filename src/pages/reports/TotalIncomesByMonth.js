import React, { useEffect, useState } from "react";
import { Col, Row, Table, Button } from "react-bootstrap";
import { getIncomesByMonthAndYear } from "../../actions/incomeActions";
import { useSelector, useDispatch } from "react-redux";
import AddIncome from "../incomes/AddIncome";
import IncomePreview from "../incomes/IncomePreview";

const TotalIncomesByMonth = ({ date }) => {
  const [showAddIncome, setShowAddIncome] = useState(false);
  const [showIncomeTable, setShowIncomeTable] = useState(false);
  const dispatch = useDispatch();
  const { incomes, loading, error } = useSelector((state) => state.incomeList);

  const handleCloseIncome = () => {
    setShowAddIncome(false);
    dispatch(getIncomesByMonthAndYear(date.split("-")[1], date.split("-")[0]));
  };

  useEffect(() => {
    dispatch(getIncomesByMonthAndYear(date.split("-")[1], date.split("-")[0]));
  }, [dispatch, date]);

  return (
    <div>
      <h3>
        Total incomes this month
        <span
          style={{
            fontSize: 18,
            marginLeft: 10,
            color: "green",
          }}
        >
          £{" "}
          {incomes &&
            incomes.reduce((acc, income) => acc + income.amount, 0).toFixed(2)}
        </span>
      </h3>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          size="32"
          type="button"
          onClick={() => setShowAddIncome(true)}
          className="bg-success"
        >
          Add an Income
        </Button>
        <Button
          onClick={() => setShowIncomeTable(!showIncomeTable)}
          className="bg-info"
        >
          {showIncomeTable ? "Hide Income Table" : "Show Income Table"}
        </Button>
      </div>
      <AddIncome show={showAddIncome} handleClose={handleCloseIncome} />
      <Row className="mb-2 mt-3">
        <Col>
          {showIncomeTable && (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th width="15%">Date</th>
                  <th width="15%">Who earned</th>
                  <th width="10%">Amount</th>
                  <th width="25%">Description</th>
                  <th width="10%">Edit</th>
                  <th width="10%">Delete</th>
                </tr>
              </thead>
              <tbody>
                {incomes &&
                  incomes.map((income) => {
                    return (
                      <IncomePreview
                        income={income}
                        key={income._id}
                        handleClose={handleCloseIncome}
                      />
                    );
                  })}
              </tbody>
            </Table>
          )}
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
        </Col>
      </Row>
    </div>
  );
};

export default TotalIncomesByMonth;
