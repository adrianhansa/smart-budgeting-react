import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { Badge, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { getEvents } from "../actions/eventActions";

const Header = ({ socket }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    user &&
      socket.on("event-created", () => {
        dispatch(getEvents());
      });
  }, [dispatch, socket, user]);

  const { events, loading, error } = useSelector((state) => state.eventList);
  const navigate = useNavigate();

  return (
    <Navbar bg="success" variant="dark" expand="lg" className="mb-2">
      <Container fluid>
        <Navbar.Brand href="/">Smart Budgeting</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {user && (
            <Nav className="me-auto">
              <LinkContainer to="/expenses">
                <Nav.Link>Expenses</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/incomes">
                <Nav.Link>Incomes</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/accounts">
                <Nav.Link>
                  {user.isAdmin ? "Manage Accounts" : "Accounts"}
                </Nav.Link>
              </LinkContainer>
              {user.isAdmin && (
                <>
                  <LinkContainer to="/users">
                    <Nav.Link>Manage Users</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/events">
                    <Nav.Link>
                      Events{" "}
                      {loading ? (
                        "..."
                      ) : events && events.length > 0 ? (
                        <Badge bg="info">{events.length}</Badge>
                      ) : (
                        <span>{error}</span>
                      )}
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          )}
          <Nav className="mr-auto">
            {!user ? (
              <>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link>Register</Nav.Link>
                </LinkContainer>
              </>
            ) : (
              <>
                <NavDropdown title={user.name} id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    href="#"
                    onClick={() => {
                      dispatch(logout());
                      navigate("/login");
                    }}
                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
