import React, { Component } from "react";
import { withRouter } from "react-router-dom";
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
import { logOut } from "../services";
import Sidebar from "./Sidebar";
import "../assets/css/header.css";

export default withRouter(
  class Header extends Component {
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
      const path = this.props.location.pathname;
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
                    <Button
                      color={path === "/terms" ? "primary" : "inherit"}
                      variant={path === "/terms" ? "contained" : "text"}
                    >
                      Terms
                    </Button>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/about">
                    <Button
                      color={path === "/about" ? "primary" : "inherit"}
                      variant={path === "/about" ? "contained" : "text"}
                    >
                      About
                    </Button>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/cities">
                    <Button
                      color={path === "/cities" ? "primary" : "inherit"}
                      variant={path === "/cities" ? "contained" : "text"}
                    >
                      Cities
                    </Button>
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
                      <Button
                        color={path === "/auth" ? "primary" : "inherit"}
                        variant={path === "/auth" ? "contained" : "text"}
                      >
                        Register / Login
                      </Button>
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
);
