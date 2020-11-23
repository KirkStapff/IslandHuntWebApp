
import React, { Component, useContext, useState } from "react";
import {} from "react-router";
import { Route,  BrowserRouter,} from "react-router-dom";
import Logger, {LoggerContext} from "./Logger"
import Home from "./Home";
import Editor from "./Editor";
import EditPicker from "./EditPicker"
import ChallengePicker from "./ChallengePicker"
import Viewer from "./Viewer"
import Notify from "./Notify"
import '../src/index.css';

const Nav = () => { 

  this.state = {
    username: "",
    password: ""
  }
  
  const login = (username, password) => {
    const headers = new Headers();
      headers.append("Content-Type", "application/json")
    
    const options = {
      method: 'PUT',
      headers,
      body: '{ "user": "'+username+'", "pass": "'+password+'"}'
    }

    const request = new Request('/login', options);

    fetch(request).then(res => res.json()).then(json => {
      if(json["result"] == 1){
          setUser(true)
        }
      })
  }

  const  [user, setUser] = useState(false);
  
    return (
      <LoggerContext.Provider value={[user, setUser]}><div><BrowserRouter >
      
      {user &&
      <div className="main_nav">
        <Route exact path="/" component={Home} />
        <Route exact path="/challenges" component={EditPicker} />
        <Route exact path="/challenges/q1" component={()=><Editor challenge={0}/>} />
        <Route exact path="/challenges/q2" component={()=><Editor challenge={1}/>} />
        <Route exact path="/challenges/q3" component={()=><Editor challenge={2}/>} />
        <Route exact path="/challenges/q4" component={()=><Editor challenge={3}/>} />
        <Route exact path="/answers" component={ChallengePicker} />
        <Route exact path="/answers/q1" component={()=><Viewer challenge={0}/>} />
        <Route exact path="/answers/q2" component={()=><Viewer challenge={1}/>} />
        <Route exact path="/answers/q3" component={()=><Viewer challenge={2}/>} />
        <Route exact path="/answers/q4" component={()=><Viewer challenge={3}/>} />
        <Route exact path="/notify" component={Notify} />
      </div> }</BrowserRouter>
      {!user && <div className ="login_screen"><div className ="login">
    Login
    <input id="input_name" className='input' style={{width:'200px', height:'13px', fontSize:'18px'}} ref={(c) => this.state.username = c} type="text" />
    <input id="input_name" className='input' style={{width:'200px', height:'13px', fontSize:'18px'}} ref={(c) => this.state.password = c} type="text" />
    <button className="submit" onClick={()=>login(this.state.username.value, this.state.password.value)}>Submit</button>
    </div></div>} </div>
      </LoggerContext.Provider>        
    );

}

export default Nav;
