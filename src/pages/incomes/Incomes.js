import React, { useEffect, useState } from "react";
import { Col, Row, Container, Table, Form } from "react-bootstrap";
import { getIncomesByMonthAndYear } from "../../actions/incomeActions";
import { useSelector, useDispatch } from "react-redux";
import { GrAddCircle } from "react-icons/gr";
import AddIncome from "./AddIncome";
import IncomePreview from "./IncomePreview";
import Swal from "sweetalert2";
import Loading from "../../components/Loading";

const Incomes = () => {
  const dispatch = useDispatch();
  const { incomes, loading, error } = useSelector((state) => state.incomeList);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    dispatch(getIncomesByMonthAndYear(date.split("-")[1], date.split("-")[0]));
  };

  const [date, setDate] = useState(
    `${new Date().getFullYear()}-${("0" + (new Date().getMonth() + 1)).slice(
      -2
    )}`
  );

  useEffect(() => {
    dispatch(getIncomesByMonthAndYear(date.split("-")[1], date.split("-")[0]));

    dispatch(getIncomesByMonthAndYear(date.split("-")[1], date.split("-")[0]));

    dispatch(getIncomesByMonthAndYear(date.split("-")[1], date.split("-")[0]));
  }, [date, dispatch]);

  const handleDate = (e) => {
    setDate(e.target.value);
    dispatch(
      getIncomesByMonthAndYear(
        e.target.value.split("-")[1],
        e.target.value.split("-")[0]
      )
    );
  };

  useEffect(() => {
    dispatch(getIncomesByMonthAndYear(date.split("-")[1], date.split("-")[0]));
  }, [dispatch, date]);
  return (
    <Container fluid>
      <Row>
        <Col>
          <AddIncome show={show} handleClose={handleClose} />
          <Row className="mt-3 px-5">
            <Col className="mx-auto">
              <Row>
                <Col md={6} className="mx-auto">
                  <h2 className="text-center">
                    Incomes
                    <GrAddCircle
                      size="32"
                      type="button"
                      onClick={() => setShow(true)}
                    />
                  </h2>
                </Col>
                <Col md={2} className="mr-auto">
                  <Form.Group>
                    <Form.Control
                      value={date}
                      type="month"
                      onChange={handleDate}
                    />
                  </Form.Group>
                </Col>
              </Row>
              {loading && <Loading />}
              {error && <p>{error}</p>}
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th width="15%">Date</th>
                    <th width="15%">Who's got the income</th>
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
                        <tr key={income._id}>
                          <IncomePreview
                            income={income}
                            handleClose={handleClose}
                          />
                        </tr>
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

export default Incomes;
