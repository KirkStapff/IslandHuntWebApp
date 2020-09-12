import React from 'react'

import "../src/auction.css"

class Home extends React.Component {

  constructor(props) {
    super(props)
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }
  
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  state = {
    intervalId : 0,
    tiddies: 0,
    highestBids: [1200, 1800, 650, 1540],
    width: 0,
    height: 0,
    name: null,
    house: null,
  }

  handleBid0 = event => {
    if(this.bidValue0.value > this.state.highestBids[0]){
      let newHigh = this.state.highestBids;
      newHigh[0] = this.bidValue0.value
      this.setState({
        highestBids: newHigh,
        resetInputs: ''
      })
    }
  }

  handleBid1 = event => {
    if(this.bidValue1.value > this.state.highestBids[1]){
      let newHigh = this.state.highestBids;
      newHigh[1] = this.bidValue1.value
      this.setState({
        highestBids: newHigh,
        resetInputs: ''
      })
    }
  }

  handleBid2 = event => {
    if(this.bidValue2.value > this.state.highestBids[2]){
      let newHigh = this.state.highestBids;
      newHigh[2] = this.bidValue2.value
      this.setState({
        highestBids: newHigh,
      })
    }
  }

  handleBid3 = event => {
    if(this.bidValue3.value > this.state.highestBids[3]){
      let newHigh = this.state.highestBids;
      newHigh[3] = this.bidValue3.value
      this.setState({
        highestBids: newHigh,
      })
    }
  }

  submit = event => {
    this.setState({
      name: this.name,
      house: this.house
    })
    this.forceUpdate()
  }
  componentWillLeave () {
    console.log('Component will leave')
  }

  render () {
    return (
      <div className="container">
        <h1 class="title">Men Auction</h1>
        <div class='row'>      
        <div class="item">
            <h2>Title for Item</h2>
            <span>
              <img className="inline1" width="220px" src={require("../src/house.jpg")} alt="Bosom Buddies Logo"></img>
              <p className="inline2">Cras facilisis urna ornare ex volutpat, et
          convallis erat elementum. Ut aliquam, ipsum vitae
          gravida suscipit, metus dui bibendum est, eget rhoncus nibh
          metus nec massa. Maecenas hendrerit laoreet augue</p>
            </span>
            <span class="bidding">
              <h1 class="biddingText" width={this.state.width}> Current Bid: ${this.state.highestBids[0]}</h1>
            </span>
            <span class="bidding">            
            <p class="biddingDollar">$</p><input id="input0" class='biddingInput' ref={(c) => this.bidValue0 = c} type="number" />
            <button class="biddingButton" onClick={this.handleBid0}> Place Bid </button>
            </span>
          </div>
          <div class="item">
            <h2>Title for Item</h2>
            <span>
              <img className="inline1" width="220px" src={require("../src/house.jpg")} alt="Bosom Buddies Logo"></img>
              <p className="inline2">Cras facilisis urna ornare ex volutpat, et
          convallis erat elementum. Ut aliquam, ipsum vitae
          gravida suscipit, metus dui bibendum est, eget rhoncus nibh
          metus nec massa. Maecenas hendrerit laoreet augue</p>
            </span>
            <span class="bidding">
              <h1 class="biddingText" width={this.state.width}> Current Bid: ${this.state.highestBids[1]}</h1>
            </span>
            <span class="bidding">            
            <p class="biddingDollar">$</p><input id="input0" class='biddingInput' ref={(c) => this.bidValue1 = c} type="number" />
            <button class="biddingButton" onClick={this.handleBid1}> Place Bid </button>
            </span>
          </div>
        </div>
        <hr style={{height:'2px', color:'black',backgroundColor:'black'}}></hr>
        <div class="row">
        <div class="item">
          <h2>Title for Item</h2>
          <span>
            <img className="inline1" width="220px" src={require("../src/house.jpg")} alt="Bosom Buddies Logo"></img>
            <p className="inline2">Cras facilisis urna ornare ex volutpat, et
        convallis erat elementum. Ut aliquam, ipsum vitae
        gravida suscipit, metus dui bibendum est, eget rhoncus nibh
        metus nec massa. Maecenas hendrerit laoreet augue</p>
          </span>
          <span class="bidding">
            <h1 class="biddingText" width={this.state.width}> Current Bid: ${this.state.highestBids[2]}</h1>
          </span>
          <span class="bidding">            
          <p class="biddingDollar">$</p><input id="input0" class='biddingInput' ref={(c) => this.bidValue2 = c} type="number" />
          <button class="biddingButton" onClick={this.handleBid2}> Place Bid </button>
          </span>
        </div>
        <div class="item">
          <h2>Title for Item</h2>
          <span>
            <img className="inline1" width="220px" src={require("../src/house.jpg")} alt="Bosom Buddies Logo"></img>
            <p className="inline2">Cras facilisis urna ornare ex volutpat, et
        convallis erat elementum. Ut aliquam, ipsum vitae
        gravida suscipit, metus dui bibendum est, eget rhoncus nibh
        metus nec massa. Maecenas hendrerit laoreet augue</p>
          </span>
          <span class="bidding">
            <h1 class="biddingText" width={this.state.width}> Current Bid: ${this.state.highestBids[3]}</h1>
          </span>
          <span class="bidding">            
          <p class="biddingDollar">$</p><input id="input0" class='biddingInput' ref={(c) => this.bidValue3 = c} type="number" />
          <button class="biddingButton" onClick={this.handleBid3}> Place Bid </button>
          </span>
        </div>
      </div>
      </div>
    )
  }
}

export default Home
