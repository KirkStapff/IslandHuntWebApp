import React, { Component } from 'react'
import './info.css'

class Contact extends Component {
  render () {
    return (
      <div class="info_main">
        <h2 class ="title">Bosom Buddies - Contact</h2> 
        Your Email: <input width="67%"></input>
        Message: <textarea class="info_input" cols="40" rows="8"></textarea>
        <button class="info_button">Submit</button>
      </div>
    )
  }
}

export default Contact
