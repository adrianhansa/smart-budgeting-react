import React, { useEffect } from "react";
import { Container, Col, Row, Table } from "react-bootstrap";
import {
  getEvents,
  deleteEvent,
  archiveEvent,
} from "../../actions/eventActions";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { RiDeleteBin5Line } from "react-icons/ri";
import { IoArchiveOutline } from "react-icons/io5";
import Loading from "../../components/Loading";

const EventLogs = () => {
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector((state) => state.eventList);
  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);
  return (
    <Container fluid>
      <Row className="mt-3 px-5">
        <Col xs={12} sm={10} md={10} lg={8} xl={8} className="mx-auto">
          <h2 className="text-center">Changes log</h2>
          {loading && <Loading />}
          {error && <p className="text-danger">{error}</p>}
          {events && (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th width="10%">Date</th>
                  <th width="15%">User</th>
                  <th width="65">Description</th>
                  <th width="5%">Archive</th>
                  <th width="5%">Delete</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => {
                  return (
                    <tr key={event._id}>
                      <td>{moment(event.date).format("DD-MM-YYYY")}</td>
                      <td>{event.user.name}</td>
                      <td>{event.description}</td>
                      <td>
                        <IoArchiveOutline
                          type="button"
                          onClick={() => dispatch(archiveEvent(event._id))}
                        />
                      </td>
                      <td>
                        <RiDeleteBin5Line
                          type="button"
                          onClick={() => dispatch(deleteEvent(event._id))}
                        />
                      </td>
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

export default EventLogs;
