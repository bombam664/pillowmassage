import React, { Component } from "react";
import Game from "./component/game";
import Menu from "./component/menuGame";
import Sound from "./component/sound";
import Guideline from "./component/guideline";
import { Route } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

class App extends Component {
  state = {
    isOpen: false,
  };

  toggle = () => {
    const { isOpen } = this.state;
    if (isOpen === false) {
      this.setState({
        isOpen: true,
      });
    } else {
      this.setState({
        isOpen: false,
      });
    }
  };

  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">หน้าหลัก</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="/menu">เกมส์</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>

        <Route exact path="/" component={Guideline}></Route>
        <Route path="/menu" component={Menu}></Route>
        <Route path="/sound" component={Sound}></Route>
        <Route path="/game" component={Game}></Route>
      </div>
    );
  }
}
export default App;
