import React, { useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { getAccounts } from "../../actions/accountActions";
import { getBudgetLimits } from "../../actions/budgetLimitActions";
import { useSelector, useDispatch } from "react-redux";

const BudgetLimits = () => {
  const dispatch = useDispatch();
  const accountList = useSelector((state) => state.accountList);
  const loadingAccounts = accountList.loading;
  const errorAccount = accountList.error;
  const { account } = accountList;
  const { budgetLimits, loading, error } = useSelector(
    (state) => state.budgetLimits
  );

  useEffect(() => {
    dispatch(getAccounts());
    dispatch(getBudgetLimits());
  }, [dispatch]);
  return (
    <Container fluid>
      <h3 className="text-center">Budget Limits</h3>
    </Container>
  );
};

export default BudgetLimits;
