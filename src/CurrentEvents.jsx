import React, { Component } from 'react'

import './current.css'
class Home extends Component {
  render () {
    return (
      <div class="current_main">
        <h2 class ="info_title">Current Events</h2>         
        <h1 class ="info_title">Night In {'&'} Charity Auctions</h1> 
        <div class="text">
          <center>Host your own “Night- In” or “Get together” to raise funds for P.A.L.S</center>
            <center>Prize will be given for the event raising the most .</center>
            <center>Silent Auction - lots of fantastic prizes to bid on.</center>
            <center>Male Auction - An amazing bunch of guys who have kindly donated their expertise and time for our event ... Just close your eyes and picture them strutting around the pool with Andrea and Holly encouraging you “To dig deep, remember everyone this is for a charity “</center>
            <center>Adults Charity Fun Run- Dress up for  A 5k Fun Run, possible win a prize then enjoy a BBQ ... Please email Hayley</center>
            <center>Children’s Charity Fun Run or Roll - Costumes encouraged plus giveaways ... Please email Hayley</center>
            <div className="line"></div>
            <div className="horz"><img width="220px" src={require("../src/sponsor2.jpg")} alt="Bosom Buddies Logo"></img>
            <p>With our sincere thanks and gratitude to Lombard Odier for supporting this event</p>
          </div>
            
         </div>
      </div>
    )
  }
}

export default Home
