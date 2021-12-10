import React, { useEffect, useState } from "react";
import { Row, Col, Container, InputGroup, FormControl } from "react-bootstrap";
import { getBudgetLimits } from "../../actions/budgetLimitActions";
import { useSelector, useDispatch } from "react-redux";

const BudgetLimits = () => {
  const dispatch = useDispatch();
  const { budgetLimits, loading, error } = useSelector(
    (state) => state.budgetLimits
  );
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [date, setDate] = useState(
    `${new Date().getFullYear()}-${new Date().getMonth() + 1}`
  );

  const handleDate = (e) => {
    setDate(e.target.value);
    setYear(date.split("-")[0]);
    setMonth(date.split("-")[1]);
    console.log(month, year);
    dispatch(getBudgetLimits(month, year));
  };

  useEffect(() => {
    if (month && year) {
      dispatch(getBudgetLimits(month, year));
    }
  }, [dispatch, month, year]);
  return (
    <Container fluid>
      <Row>
        <Col>
          <h3 className="text-center">Budget Limits {date}</h3>
          <Row>
            <Col xl={2}>
              <InputGroup className="mb-3">
                <FormControl type="month" value={date} onChange={handleDate} />
              </InputGroup>
              {loading && <p>Loading</p>}
              {error && <p>{error}</p>}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default BudgetLimits;
