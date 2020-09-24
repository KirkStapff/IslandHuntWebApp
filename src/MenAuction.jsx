import React from 'react'

import "../src/auction.css"

function testBid(item, curbid, newbid, house, name){
  console.log("ring ting bong")
  if(newbid > curbid){
    const headers = new Headers();
      headers.append("Content-Type", "application/json")

    const data = {
      item: item,
      bid: newbid,
      house: house,
      name: name,
    }

    const options = {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    }

    const request = new Request('/bid', options);
    
    fetch(request).catch(err => {
      console.log(err)
    })
  }
}

class Home extends React.Component {

  constructor(props) {
    super(props)
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
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

  submit = event => {
    this.setState({
      name: this.name.value,
      house: this.house.value
    })
    this.forceUpdate()
  }

  getData () {
    fetch('/test').then(res => res.json()).then(json =>{
      this.setState({
        item1: json[0]['Bid'],
        item2: json[1]['Bid'],
        item3: json[2]['Bid'],
        item4: json[3]['Bid'],
        item5: json[4]['Bid'],
        name1: json[0]['Name'],
        name2: json[1]['Name'],
        name3: json[2]['Name'],
        name4: json[3]['Name'],
        name5: json[4]['Name'],
        isLoaded: true
      })    
    
    }).catch(err => {
      console.log(err)
    })
  }

  componentDidMount () {
    this.getData()  
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  
  render () {
    
    this.getData();
    var {items, isLoaded} = this.state;
    if(this.state.name==null){
      return (
        <div className="main">
          <div className="popup">
            <p className="popupText" style={{marginLeft:'12px'}}>Login</p>
            <div className="enterName">
              Name: <input id="input_name" className='submitInput' style={{width:'200px', height:'13px', fontSize:'18px'}} ref={(c) => this.name = c} type="text" />
            </div>
            <div className="enterHouse">
              House: <input id="input_house" className='submitInput' style={{width:'200px', height:'13px', fontSize:'18px'}} ref={(c) => this.house = c} type="text" />
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
        <h1 className="title">Men Auction</h1>
        <div className='row'>      
        <div className="item">
            <h2>Keerome Maybury</h2>
            <span>
              <img className="inline1" width="220px" src={require("../src/keerome.jpg")} alt="Bosom Buddies Logo"></img>
              <p className="inline2">Relax and enjoy style and comfort on board
              this classic 55ft cruiser. Keerome will welcome you on board Traveler 
              for a Cocktail Cruise for 8 People including processco and hors d’oeuvres</p>
            </span>
            <span className="bidding">
              <h1 className="biddingText" width={this.state.width}> Current Bid: ${this.state.item1}, {this.state.name1}</h1>
            </span>
            <span className="bidding">            
            <p className="biddingDollar">$</p><input id="input0" className='biddingInput' ref={(c) => this.bidValue1 = c} type="number" />
            <button className="biddingButton" onClick={()=>testBid("Item 1", this.state.item1, this.bidValue1.value, this.state.house, this.state.name)}> Place Bid </button>
            </span>
          </div>
          <div className="item">
            <h2>Captain Cook</h2>
            <span>
              <img className="inline1" width="220px" src={require("../src/dai.jpg")} alt="Bosom Buddies Logo"></img>
              <p className="inline2">Dai is offering to cook a 5 course seafood 
              and lobster dinner for up to 10 people  at your home. You suppy the 
              liquor we will suppy the food, Bartender and Waitress service and of
              course Dai himself</p>
            </span>
            <span className="bidding">
              <h1 className="biddingText" width={this.state.width}> Current Bid: ${this.state.item2}, {this.state.name2}</h1>
            </span>
            <span className="bidding">            
            <p className="biddingDollar">$</p><input id="input0" className='biddingInput' ref={(c) => this.bidValue2 = c} type="number" />
            <button className="biddingButton" onClick={()=>testBid("Item 2", this.state.item2, this.bidValue2.value, this.state.house, this.state.name)}> Place Bid </button>
            </span>
          </div>
        </div>
        <hr style={{height:'2px', color:'black',backgroundColor:'black'}}></hr>
        <div className="row">
        <div className="item">
          <h2>Paul Lambert</h2>
          <span>
            <img className="inline1" width="220px" src={require("../src/paul.jpg")} alt="Bosom Buddies Logo"></img>
            <p className="inline2">Paul lambert  - personal  trainer 
            Paul will be teaching some easy to execute 
            Defensive tactics to protect yourself and 
            Escape to a safe place! 3 sessions for  8-10 people</p>
          </span>
          <span className="bidding">
            <h1 className="biddingText" width={this.state.width}> Current Bid: ${this.state.item3}, {this.state.name3}</h1>
          </span>
          <span className="bidding">            
          <p className="biddingDollar">$</p><input id="input0" className='biddingInput' ref={(c) => this.bidValue3 = c} type="number" />
          <button className="biddingButton" onClick={()=>testBid("Item 3", this.state.item3, this.bidValue3.value, this.state.house, this.state.name)}> Place Bid </button>
          </span>
        </div>
        <div className="item">
          <h2>Stratton Hatfield</h2>
          <span>
            <img className="inline1" width="220px" src={require("../src/stratton.jpg")} alt="Bosom Buddies Logo"></img>
            <p className="inline2">Cheers! The Swizzle Washing Machine will come to your party! 
            2 Hours of the best Gosling's Rum Swizzle you've ever tasted served up by Mr. Hatfield and his Team.
            Always a huge hit at every party.</p>
          </span>
          <span className="bidding">
            <h1 className="biddingText" width={this.state.width}> Current Bid: ${this.state.item4}, {this.state.name4}</h1>
          </span>
          <span className="bidding">            
          <p className="biddingDollar">$</p><input id="input0" className='biddingInput' ref={(c) => this.bidValue4 = c} type="number" />
          <button className="biddingButton" onClick={()=>testBid("Item 4", this.state.item4, this.bidValue4.value, this.state.house, this.state.name)}> Place Bid </button>
          </span>
        </div>
      </div>
      </div>
    );
  }
  }
}

export default Home
