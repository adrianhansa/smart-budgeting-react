import React, { useEffect } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { getAccounts } from "../../actions/accountActions";
import { useSelector, useDispatch } from "react-redux";
import AccountPreview from "./AccountPreview";

const AccountList = () => {
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
          <h2 className="text-center">Account List</h2>
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
