import React, { useEffect } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getSavings } from "../../actions/savingActions";

const Savings = () => {
  const dispatch = useDispatch();
  const { savings, loading, error } = useSelector((state) => state.savingList);
  useEffect(() => {
    dispatch(getSavings());
  }, [dispatch]);
  return (
    <Container fluid>
      <Row>
        <Col className="mx-auto">
          {loading && <p>Loading...</p>}
          {error && <p className="text-danger">{error}</p>}
          {savings && (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th width="15%">Month and Year</th>
                  <th width="15%">Member of the household</th>
                  <th width="10%">Amount saved</th>
                  {/* <th width="10%">Edit</th> */}
                  {/* <th width="10%">Delete</th> */}
                </tr>
                <tbody>
                  {savings.map((saving) => {
                    return (
                      <tr>
                        <td>
                          {saving.month}-{saving.year}
                        </td>
                        <td>{saving.user.name}</td>
                        <td>{saving.amount}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </thead>
            </Table>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Savings;
