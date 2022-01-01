import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getSavings } from "../../actions/savingActions";
import { GrAddCircle } from "react-icons/gr";
import AddSaving from "./AddSaving";
import SavingPreview from "./SavingPreview";
import Loading from "../../components/Loading";

const Savings = ({ socket }) => {
  const [show, setShow] = useState(false);
  const date = `${new Date().getFullYear()}-${(
    "0" +
    (new Date().getMonth() + 1)
  ).slice(-2)}`;
  const handleClose = () => {
    setShow(false);
    dispatch(getSavings(date.split("-")[1], date.split("-")[0]));
  };
  const dispatch = useDispatch();
  const { savings, loading, error } = useSelector((state) => state.savingList);
  useEffect(() => {
    dispatch(getSavings());
  }, [dispatch]);

  return (
    <Container fluid>
      <Row>
        <Col className="mx-auto" md={6}>
          <h2 className="text-center">
            Savings
            <GrAddCircle
              size="32"
              type="button"
              onClick={() => setShow(true)}
            />
          </h2>
          <AddSaving show={show} handleClose={handleClose} />
          {loading && <Loading />}
          {error && <p className="text-danger">{error}</p>}
          {savings && (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th width="15%">Month and Year</th>
                  <th width="15%">Member of the household</th>
                  <th width="10%">Amount saved</th>
                  <th width="10%">Edit</th>
                  <th width="10%">Delete</th>
                </tr>
              </thead>
              <tbody>
                {savings.map((saving) => {
                  return (
                    <tr key={saving._id}>
                      <SavingPreview
                        socket={socket}
                        saving={saving}
                        handleClose={handleClose}
                      />
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Savings;
