import React, { Component } from 'react'

import './info.css'
class Home extends Component {
  render () {
    return (
      <div class="info_main">
        <h2 class ="info_title">Bosom Buddies</h2> 
        <div class="text">
          <center>“Bosom Buddies”is a group of girls who got together in 2005 for a “Girls Night In” to raise funds for the Bermuda Cancer & Health Centre.
          What started 15 years ago with 12 ladies attending has now grown to 180 ladies joining together to help make a difference in supporting cancer care in Bermuda.
          Bosom Buddies are now pleased to be raising funds for P.A.L.S. which provides home care for cancer patients and their families throughout our island.
          To date Bosom Buddies have raised in excess of $800,000.</center>
          <img width="200px" src={require("../src/pals.png")} alt="Bosom Buddies Logo"></img>
          <center>To provide cancer patients with quality care primarily in the home setting in order to enhance quality of life.  To provide support and assistance to cancer patients and their families. To meet physical, emotional and social needs of patients.  To promote health, dignity and independence, regardless of ability to pay, to the extent of the resources of  P.A.L.S. To maximize the use of volunteers and voluntary funding by encouraging support for P.A.L.S. from the community at large.   </center>
          <img width="400px" className="banner" src={require("../src/banner.jpg")} alt="Bosom Buddies Logo"></img>
        </div>
      </div>
    )
  }
}

export default Home
