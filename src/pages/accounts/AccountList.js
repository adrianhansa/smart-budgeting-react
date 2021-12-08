import React, { useEffect, useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { getAccounts } from "../../actions/accountActions";
import { useSelector, useDispatch } from "react-redux";
import AccountPreview from "./AccountPreview";
import { GrAddCircle } from "react-icons/gr";
import AddAccount from "./AddAccount";

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
          <Row>
            {loading && <p>Loading...</p>}
            {accounts && accounts.length > 0 ? (
              accounts.map((account) => {
                return (
                  <Col xs={12} sm={8} md={6} lg={4} xl={3} key={account._id}>
                    <AccountPreview account={account} />
                  </Col>
                );
              })
            ) : (
              <p>No accounts</p>
            )}
            {error && <p>{error}</p>}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default AccountList;
