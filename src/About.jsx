import React, { Component } from 'react'

import './info.css'
class Home extends Component {
  render () {
    return (
      <div class="info_main">
        <h2 class ="info_title">Night In {'&'} Charity Auctions</h2> 
        <div class="text">
          <center>Cras facilisis urna ornare ex volutpat, et
          convallis erat elementum. Ut aliquam, ipsum vitae
          gravida suscipit, metus dui bibendum est, eget rhoncus nibh
          metus nec massa. Maecenas hendrerit laoreet augue
          nec molestie. Cum sociis natoque penatibus et magnis
          dis parturient montes, nascetur ridiculus mus.</center>
          <center>Duis a turpis sed lacus dapibus elementum sed eu lectus.</center>
        </div>
      </div>
    )
  }
}

export default Home
