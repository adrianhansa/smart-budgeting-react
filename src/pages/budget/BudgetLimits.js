import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Container,
  InputGroup,
  FormControl,
  Table,
} from "react-bootstrap";
import { getBudgetLimits } from "../../actions/budgetLimitActions";
import { useSelector, useDispatch } from "react-redux";

const BudgetLimits = () => {
  const dispatch = useDispatch();
  const { budgetLimits, loading, error } = useSelector(
    (state) => state.budgetLimits
  );
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const [date, setDate] = useState(
    `${new Date().getFullYear()}-${new Date().getMonth() + 1}`
  );

  const handleDate = (e) => {
    setDate(e.target.value);
    setYear(date.split("-")[0]);
    setMonth(date.split("-")[1]);
    if (month && year) dispatch(getBudgetLimits(month, year));
  };

  // useEffect(() => {
  //   if (month && year) dispatch(getBudgetLimits(month, year));
  // }, [dispatch, month, year]);
  return (
    <Container fluid>
      <Row>
        <Col>
          <h3 className="text-center">Budget Limits {date}</h3>
          <Row>
            <Col xl={2} className="mx-auto">
              <InputGroup className="mb-3">
                <FormControl type="month" value={date} onChange={handleDate} />
              </InputGroup>
              {loading && <p>Loading</p>}
              {error && <p>{error}</p>}
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={12} md={10} lg={8} xl={8} className="mx-auto">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                  </tr>
                </thead>
                <tbody>
                  {budgetLimits &&
                    budgetLimits.map((limit) => {
                      console.log(limit);
                      return (
                        <tr key={limit._id}>
                          <td>1</td>
                          <td>Mark</td>
                          <td>Otto</td>
                          <td>@mdo</td>
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

export default BudgetLimits;
