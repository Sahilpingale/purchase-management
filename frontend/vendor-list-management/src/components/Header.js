import React from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../actions/userActions'

const Header = ({ history }) => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        {/* <Navbar bg="light" variant="light" expand="lg" collapseOnSelect> */}
        <Container>
          <Navbar.Brand href="/vendorMaster">Purchase Management</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {userInfo ? (
                <>
                  {/* Vendor Master */}
                  <NavDropdown title="Vendor Master">
                    <LinkContainer to="/vendorCreate">
                      <NavDropdown.Item>Create</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/vendorMaster">
                      <NavDropdown.Item>View</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>

                  {/* Item Master */}
                  <NavDropdown title="Item Master">
                    <LinkContainer to="/itemCreate">
                      <NavDropdown.Item>Create</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/itemMaster">
                      <NavDropdown.Item>View</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>

                  <Nav.Link onClick={logoutHandler}>Sign out</Nav.Link>
                </>
              ) : (
                <Nav.Link href="/login">Sign In</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
