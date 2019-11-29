import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Button, IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { logOut } from "../../services";
import "../../assets/css/header.css";

export default class Header extends Component {
  render() {
    const { toggleNav } = this.props;
    const auth = localStorage.token || sessionStorage.token;
    return (
      <div>
        <Navbar dark fixed="top" expand="md">
          <NavbarBrand href="/">VisitNepal</NavbarBrand>
          <IconButton onClick={toggleNav} className="trigger-button">
            <MenuIcon />
          </IconButton>
          <Collapse navbar>
            <Nav className="ml-auto" navbar>
              {/* <NavItem>
                <NavLink href="/terms">
                  <Button color="inherit">Terms</Button>
                </NavLink>
              </NavItem> */}
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav className="text-capitalize">
                  <Button color="inherit">
                    <i className="fa fa-user-shield"></i> &nbsp; Admin
                  </Button>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem divider />
                  <DropdownItem href="/admin/dashboard">
                    <i className="fab fa-dashcube"></i>&nbsp; Dashboard
                  </DropdownItem>
                  <DropdownItem>
                    <i className="fa fa-user-edit"></i> Edit Profile
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem
                    onClick={() => logOut()}
                    className="danger-text"
                  >
                    <i className="fa fa-sign-out-alt"></i> &nbsp;Logout
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
