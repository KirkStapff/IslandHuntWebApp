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

function getCountdown(){
  let finish = new Date("Oct 19, 2020, 00:00:00").getTime();
  let now = new Date().getTime();

  let diff = finish - now;
  let days = Math.floor(diff / (1000*60*60*24))
  let hours = Math.floor((diff % (1000*60*60*24))/(1000*60*60))
  let minutes = Math.floor((diff % (1000*60*60))/(1000*60))
  let seconds = Math.floor((diff % (1000*60))/(1000))
  return [days, hours, minutes, seconds, diff]
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
    var x = setInterval(function(){
      var t = getCountdown();
      if(t[4] > 0){
        document.getElementById("days").innerHTML = t[0]
        document.getElementById("hours").innerHTML = t[1]
        document.getElementById("minutes").innerHTML = t[2]
        document.getElementById("seconds").innerHTML = t[3]
      }else{
        document.getElementById("days").innerHTML = "0"
        document.getElementById("hours").innerHTML = "0"
        document.getElementById("minutes").innerHTML = "0"
        document.getElementById("seconds").innerHTML = "0"
      }
    }, 1000);
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
        <div className="timer">
          <div>Auction closes in</div>
          <span id="days"></span> Days <span id="hours"></span> Hours <span id="minutes"></span> Min <span id="seconds"></span> Sec
        </div>
        <h1 className="title">Silent Auction</h1>
        <div className='row'>      
        <div className="item">
            <h2>One Week Stay at New Hampshire Vacation Home</h2>
            <span>
              <img className="inline1" width="220px" height="200px" src={require("../src/newhampshirehouse.jpg")} alt="Bosom Buddies Logo"></img>
              <p className="inline2">Located in Jackson, in the Mt Washington Valley in Northern New Hampshire, about 3 hour’s drive north of Boston.
Offering four good sized bedrooms, gym and games room/bar. There are five ski hills within 30 minutes of the house, if someone wants to use it for
skiing. It is also a lovely house in the summer and the Fall. There will be some black-out periods, but sufficient flexibility.</p>
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
            <h2>KitchenAid Artisan Series Stand-Mixer</h2>
            <span>
              <img className="inline1" width="220px" height="200px" src={require("../src/kitchenaidmixer.jpg")} alt="Bosom Buddies Logo"></img>
              <p className="inline2">Cras facilisis urna ornare ex volutpat, et
          convallis erat elementum. Ut aliquam, ipsum vitae
          gravida suscipit, metus dui bibendum est, eget rhoncus nibh
          metus nec massa. Maecenas hendrerit laoreet augue</p>
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
          <h2>Rake in the $$$$$</h2>
          <span>
            <img className="inline1" width="220px" src={require("../src/rakingcash.png")} alt="Bosom Buddies Logo"></img>
            <p className="inline2">Rake in the $$$$$$ with $100 worth of different scratch cards.</p>
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
