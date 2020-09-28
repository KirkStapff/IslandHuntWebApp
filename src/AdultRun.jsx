import React, { Component } from 'react'

import './run.css'
class Home extends Component {
  render () {
    return (
      <div class="run_main">
        <img className="inline1" width="800px" src={require("../src/adultsrun.jpg")} alt="Bosom Buddies Logo"></img>                
      </div>
    )
  }
}

export default Home
