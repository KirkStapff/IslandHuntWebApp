import React, { Component } from 'react'

import './info.css'
class Home extends Component {
  render () {
    return (
      <div class="info_main">
        <img className="inline1" width="800px" src={require("../src/childrensrun.jpg")} alt="Bosom Buddies Logo"></img>                
      </div>
    )
  }
}

export default Home
