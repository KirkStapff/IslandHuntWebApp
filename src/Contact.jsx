import React, { Component } from 'react'
import './info.css'

function testMessage(message, from){
  console.log("ring ting bong")
  const headers = new Headers();
    headers.append("Content-Type", "application/json")

  const data = {
    floop: message,
    from: from
  }

  const options = {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  }

  const request = new Request('/message', options);
  
  fetch(request).catch(err => {
    console.log(err)
  })
}

class Contact extends Component {
  render () {
    return (
      <div class="info_main">
        <h2 className ="title">Bosom Buddies - Contact</h2> 
        Your Email: <input id="from" width="67%"></input>
        Message: <textarea id="message" class="info_input" cols="60" rows="30"></textarea>
        <button onClick={()=>testMessage(document.getElementById("message").value, document.getElementById("from").value)}class="info_button">Submit</button>
      </div>
    )
  }
}

export default Contact
