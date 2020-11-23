import React, { Component } from 'react'
import './index.css'

import { Link } from 'react-router-dom'


class EditPicker extends Component {
  
  constructor(props) {
    super(props);
    this.state = { q1:"A", q2:"B", q3:"C", q4:"D"};
  }

  componentDidMount(){
    fetch('/getChallenges').then(res => res.json()).then(json =>{
      this.setState({
        q1:json[0]["Title"],
        q2:json[1]["Title"],
        q3:json[2]["Title"],
        q4:json[3]["Title"]
      })
    })
  }

  render () {
    return (
      <div className="main_nav">
        <Link to="/">Back</Link>
          <div className="title_nav">Edit a Challenge</div>
            <div className="questions_nav" >
              <div className = "nav_question">
              <Link 
                to={{
                  pathname: "/challenges/q1",
                  state: { fromDashboard: true }
                }}
              >{this.state.q1}</Link>
              </div>
              <div className = "nav_question">
              <Link 
                to={{
                  pathname: "/challenges/q2",
                  state: { fromDashboard: true }
                }}
              >{this.state.q2}</Link>
              </div>
              <div className = "nav_question">
              <Link 
                to={{
                  pathname: "/challenges/q3",
                  state: { fromDashboard: true }
                }}
              >{this.state.q3}</Link>
              </div>
              <div className = "nav_question">
              <Link 
                to={{
                  pathname: "/challenges/q4",
                  state: { fromDashboard: true }
                }}
              >{this.state.q4}</Link>
              </div>
            </div>
        </div>
    )
  }
}

export default EditPicker
