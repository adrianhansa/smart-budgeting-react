import React, { useEffect, useState } from "react";
import { Col, Row, Container, Table } from "react-bootstrap";
import { getAccounts } from "../../actions/accountActions";
import { useSelector, useDispatch } from "react-redux";
import { GrAddCircle } from "react-icons/gr";
import AddAccount from "./AddAccount";
import AccountPreview from "./AccountPreview";
import Loading from "../../components/Loading";
import { formatter } from "../../utils/currencyFormatter";

const AccountList = () => {
  const [totalBudget, setTotalBudget] = useState(0);
  const { user } = useSelector((state) => state.auth);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const dispatch = useDispatch();
  const { accounts, loading, error } = useSelector(
    (state) => state.accountList
  );

  const accountDetails = useSelector((state) => state.accountDetails);

  useEffect(() => {
    dispatch(getAccounts());
    setTotalBudget(
      accounts && accounts.reduce((acc, account) => acc + account.budget, 0)
    );
  }, [dispatch]);
  return (
    <Container fluid>
      <Row>
        <Col>
          <h2 className="text-center">
            Account List
            {user.isAdmin && (
              <GrAddCircle
                size="32"
                type="button"
                onClick={() => setShow(true)}
              />
            )}
          </h2>
          <h5 className="text-secondary text-center">
            {formatter.format(totalBudget)}
          </h5>
          {accountDetails.error && (
            <p className="text-danger text-center">{accountDetails.error}</p>
          )}
          <AddAccount show={show} handleClose={handleClose} />

          <Row className="mt-3">
            <Col xs={12} sm={10} md={8} lg={6} xl={4} className="mx-auto">
              {loading && <Loading />}
              {error && <p>{error}</p>}
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th width="65%">Account Name</th>
                    <th width="15%">Budget</th>
                    {user.isAdmin && (
                      <>
                        <th width="10%">Edit</th>
                        <th width="10%">Delete</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {accounts &&
                    accounts.map((account) => {
                      return (
                        <tr key={account._id}>
                          <AccountPreview account={account} key={account._id} />
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

export default AccountList;
