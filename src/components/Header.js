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
import { Button } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { IconButton } from "@material-ui/core";
import { logOut } from "../services/UserFunction";
import "../assets/css/header.css";
import Sidebar from "./Sidebar";
import "../assets/css/sidebar.css";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }
  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  UNSAFE_componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  setWrapperRef = node => {
    this.wrapperRef = node;
  };

  handleClickOutside = event => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({
        isOpen: false,
      });
    }
  };
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };
  render() {
    const { isOpen } = this.state;
    const auth = localStorage.token || sessionStorage.token;
    return (
      <div>
        <Navbar dark fixed="top" expand="md">
          <NavbarBrand href="/">VisitNepal</NavbarBrand>
          <IconButton
            onClick={this.toggle}
            className={`trigger-button ${isOpen ? "bar-active" : ""}`}
          >
            <MenuIcon />
          </IconButton>
          <Collapse navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/terms">
                  <Button color="inherit">Terms</Button>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/about">
                  <Button color="inherit">About</Button>
                </NavLink>
              </NavItem>
              {auth ? (
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav className="text-capitalize">
                    {auth && (
                      <Button color="inherit">
                        <AccountCircle /> {this.props.username}
                      </Button>
                    )}
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem divider />
                    <DropdownItem href="/dashboard">
                      <i className="fa fa-user-circle"></i>&nbsp; Dashboard
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
              ) : (
                <NavItem>
                  <NavLink href="/auth">
                    <Button color="inherit">Register / Login</Button>
                  </NavLink>
                </NavItem>
              )}
            </Nav>
          </Collapse>
        </Navbar>
        <div className="sidebar" ref={this.setWrapperRef}>
          <Sidebar
            className={`sidebar-nav ${!isOpen ? "active" : ""} `}
            toggle={this.toggle}
          />
        </div>
      </div>
    );
  }
}
