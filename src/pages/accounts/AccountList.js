import React, { useEffect, useState } from "react";
import { Col, Row, Container, Table } from "react-bootstrap";
import { getAccounts } from "../../actions/accountActions";
import { useSelector, useDispatch } from "react-redux";
import { GrAddCircle } from "react-icons/gr";
import AddAccount from "./AddAccount";
import AccountPreview from "./AccountPreview";

const AccountList = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const dispatch = useDispatch();
  const { accounts, loading, error } = useSelector(
    (state) => state.accountList
  );

  useEffect(() => {
    dispatch(getAccounts());
  }, [dispatch]);
  return (
    <Container fluid>
      <Row>
        <Col>
          <h2 className="text-center">
            Account List{" "}
            <GrAddCircle
              size="32"
              type="button"
              onClick={() => setShow(true)}
            />
          </h2>
          <AddAccount show={show} handleClose={handleClose} />

          <Row className="mt-3">
            <Col xs={12} sm={10} md={8} lg={6} xl={4} className="mx-auto">
              {loading && <p>Loading...</p>}
              {error && <p>{error}</p>}
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th width="70%">Account Name</th>
                    <th width="10%">Edit</th>
                    <th width="10%">Set Limits</th>
                    <th width="10%">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {accounts &&
                    accounts.map((account) => {
                      return (
                        <AccountPreview account={account} key={account._id} />
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

export default AccountList;
