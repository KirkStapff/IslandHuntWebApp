
import React, { Component } from "react";
import { Route,  BrowserRouter } from "react-router-dom";
import Home from "./Home";
import Contact from "./Contact";
import About from "./About";
import Sponsor from "./Sponsor";
import SilentAuction from "./SilentAuction";
import MenAuction from "./MenAuction";
import '../src/index.css'


class Nav extends Component {

  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }
  
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  render() {
    if(this.state.width < this.state.height){
      return(
        <div className="vertcenter">
          <img className ="center" width="280px" height="280px" src={require("../src/rotate_screen.png")} alt="Rotate Screen"/>
        </div>
      );
    }
    return (
      <BrowserRouter>
        <div>
          <div className="topnav">
          <img width="100px" height="90px" src={require("../src/logo-notext.png")} alt="Bosom Buddies Logo"/>
            <a className="navitem" href="/">Home</a>
            <a href="about">About</a>
            <a href="contact">Contact</a>
            <a href="silent_auction">Silent Auction</a>
            <a href="men_auction">Men Auction</a>
          </div>
          <hr style={{height:'2px', color:'black',backgroundColor:'black'}}></hr>
          <div className="main">
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/sponsors" component={Sponsor} />
            <Route path="/silent_auction" component={SilentAuction} />
            <Route path="/men_auction" component={MenAuction} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default Nav;
