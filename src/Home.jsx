import React, { Component } from 'react'
import './home.css'
class Home extends Component {

  handleClick = event => {
    fetch('/test', {
    }).then(res => res.text()).then(json =>{
      window.alert(json)
    })
  }

  render () {
    return (
      <div class="home_main">
        <h2 style={{fontSize: '102px', marginTop:'72px', color:'white'}}>Bosom Buddies</h2>
        <h2 style={{fontSize: '34px', marginTop:'-72px', marginBottom:'72px', color:'white'}}>a group of girls who raise money for cancer care in Bermuda</h2>
        <a class="home_button" href="/about">Current Event {'>'}</a>
      </div>
    )
  }
}

export default Home
