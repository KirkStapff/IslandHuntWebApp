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
    console.log("breasts: "+ this.bidValue0.value)
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

  render () {
    if(this.state.name==null){
      return (
        <div className="main">
          <div className="popup">
            <p className="popupText" style={{marginLeft:'12px'}}>Login</p>
            <div className="enterName">
              Name: <input id="input_name" className='biddingInput' style={{width:'200px', height:'13px', fontSize:'18px'}} ref={(c) => this.name = c} type="text" />
            </div>
            <div className="enterHouse">
              House: <input id="input_house" className='biddingInput' style={{width:'200px', height:'13px', fontSize:'18px'}} ref={(c) => this.house = c} type="text" />
              <div className="submitButton">
              <button className = "biddingButton" onClick={this.submit}>Submit</button>
              </div>
            </div>            
          </div>
        </div>
      );
  }else{
    return (
      <div className="container">
        <h1 className="title">Silent Auction</h1>
        <div className='row'>      
        <div className="item">
            <h2>Title for Item</h2>
            <span>
              <img className="inline1" width="220px" src={require("../src/house.jpg")} alt="Bosom Buddies Logo"></img>
              <p className="inline2">Cras facilisis urna ornare ex volutpat, et
          convallis erat elementum. Ut aliquam, ipsum vitae
          gravida suscipit, metus dui bibendum est, eget rhoncus nibh
          metus nec massa. Maecenas hendrerit laoreet augue</p>
            </span>
            <span className="bidding">
              <h1 className="biddingText" width={this.state.width}> Current Bid: ${this.state.highestBids[0]}</h1>
            </span>
            <span className="bidding">            
            <p className="biddingDollar">$</p><input id="input0" className='biddingInput' ref={(c) => this.bidValue0 = c} type="number" />
            <button className="biddingButton" onClick={this.handleBid0}> Place Bid </button>
            </span>
          </div>
          <div className="item">
            <h2>Title for Item</h2>
            <span>
              <img className="inline1" width="220px" src={require("../src/house.jpg")} alt="Bosom Buddies Logo"></img>
              <p className="inline2">Cras facilisis urna ornare ex volutpat, et
          convallis erat elementum. Ut aliquam, ipsum vitae
          gravida suscipit, metus dui bibendum est, eget rhoncus nibh
          metus nec massa. Maecenas hendrerit laoreet augue</p>
            </span>
            <span className="bidding">
              <h1 className="biddingText" width={this.state.width}> Current Bid: ${this.state.highestBids[1]}</h1>
            </span>
            <span className="bidding">            
            <p className="biddingDollar">$</p><input id="input0" className='biddingInput' ref={(c) => this.bidValue1 = c} type="number" />
            <button className="biddingButton" onClick={this.handleBid1}> Place Bid </button>
            </span>
          </div>
        </div>
        <hr style={{height:'2px', color:'black',backgroundColor:'black'}}></hr>
        <div className="row">
        <div className="item">
          <h2>Title for Item</h2>
          <span>
            <img className="inline1" width="220px" src={require("../src/house.jpg")} alt="Bosom Buddies Logo"></img>
            <p className="inline2">Cras facilisis urna ornare ex volutpat, et
        convallis erat elementum. Ut aliquam, ipsum vitae
        gravida suscipit, metus dui bibendum est, eget rhoncus nibh
        metus nec massa. Maecenas hendrerit laoreet augue</p>
          </span>
          <span className="bidding">
            <h1 className="biddingText" width={this.state.width}> Current Bid: ${this.state.highestBids[2]}</h1>
          </span>
          <span className="bidding">            
          <p className="biddingDollar">$</p><input id="input0" className='biddingInput' ref={(c) => this.bidValue2 = c} type="number" />
          <button className="biddingButton" onClick={this.handleBid2}> Place Bid </button>
          </span>
        </div>
        <div className="item">
          <h2>Title for Item</h2>
          <span>
            <img className="inline1" width="220px" src={require("../src/house.jpg")} alt="Bosom Buddies Logo"></img>
            <p className="inline2">Cras facilisis urna ornare ex volutpat, et
        convallis erat elementum. Ut aliquam, ipsum vitae
        gravida suscipit, metus dui bibendum est, eget rhoncus nibh
        metus nec massa. Maecenas hendrerit laoreet augue</p>
          </span>
          <span className="bidding">
            <h1 className="biddingText" width={this.state.width}> Current Bid: ${this.state.highestBids[3]}</h1>
          </span>
          <span className="bidding">            
          <p className="biddingDollar">$</p><input id="input0" className='biddingInput' ref={(c) => this.bidValue3 = c} type="number" />
          <button className="biddingButton" onClick={this.handleBid3}> Place Bid </button>
          </span>
        </div>
      </div>
      </div>
    );
  }
  }
}

export default Home
