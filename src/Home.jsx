import React, { Component } from 'react'
import './index.css'

import { Link } from 'react-router-dom'


class Home extends Component {
  


  render () {
    return (
      <div className="main_nav">
          <div className="title_nav">Island Hunt Editor</div>
          <div className="questions_nav" >
            <div className="nav_question">
            <Link
              to={{
                pathname: "/challenges",
                search: "",
                hash: "",
                state: { fromDashboard: true }
              }}
            >Challenges</Link>
            </div>
            <div className="nav_question">
            <Link
              to={{
                pathname: "/answers",
                search: "",
                hash: "",
                state: { fromDashboard: true }
              }}
            >Answers</Link>
            </div>
            <div className="nav_question">
            <Link
              to={{
                pathname: "/notify",
                search: "",
                hash: "",
                state: { fromDashboard: true }
              }}
            >Notify Users</Link>
            </div>
            </div>
        </div>
    )
  }
}

export default Home
