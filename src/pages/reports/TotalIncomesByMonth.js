import React, { useEffect, useState } from "react";
import { Col, Row, Table, Button } from "react-bootstrap";
import { getIncomesByMonthAndYear } from "../../actions/incomeActions";
import { useSelector, useDispatch } from "react-redux";
import AddIncome from "../incomes/AddIncome";
import IncomePreview from "../incomes/IncomePreview";
import Swal from "sweetalert2";
import Loading from "../../components/Loading";

const TotalIncomesByMonth = ({ date, socket }) => {
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

  useEffect(() => {
    socket.on("income-created", (data) => {
      Swal.fire({
        position: "bottom-end",
        icon: "success",
        title: "A new income was recorded!",
        showConfirmButton: false,
        timer: 2000,
      });
      dispatch(
        getIncomesByMonthAndYear(date.split("-")[1], date.split("-")[0])
      );
    });
    socket.on("income-updated", (data) => {
      Swal.fire({
        position: "bottom-end",
        icon: "success",
        title: "Income updated!",
        showConfirmButton: false,
        timer: 2000,
      });
      dispatch(
        getIncomesByMonthAndYear(date.split("-")[1], date.split("-")[0])
      );
    });
    socket.on("income-deleted", (data) => {
      Swal.fire({
        position: "bottom-end",
        icon: "success",
        title: "Income deleted!",
        showConfirmButton: false,
        timer: 2000,
      });
      dispatch(
        getIncomesByMonthAndYear(date.split("-")[1], date.split("-")[0])
      );
    });
  }, [date, dispatch, socket]);

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
          {incomes &&
            formatter.format(
              incomes.reduce((acc, income) => acc + income.amount, 0)
            )}
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
      <AddIncome
        show={showAddIncome}
        handleClose={handleCloseIncome}
        socket={socket}
      />
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
                        socket={socket}
                      />
                    );
                  })}
              </tbody>
            </Table>
          )}
          {loading && <Loading />}
          {error && <p>{error}</p>}
        </Col>
      </Row>
    </div>
  );
};

export default TotalIncomesByMonth;
