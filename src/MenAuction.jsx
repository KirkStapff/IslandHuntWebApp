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
  let finish = new Date("Oct 20, 2020, 00:00:00").getTime();
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
        item1: json[16]['Bid'],
        item2: json[17]['Bid'],
        item3: json[18]['Bid'],
        item4: json[19]['Bid'],        
        item5: json[20]['Bid'],        
        item6: json[21]['Bid'],       
        item7: json[22]['Bid'],        
        item8: json[23]['Bid'],        
        item9: json[24]['Bid'],       
        item10: json[25]['Bid'],    
        item11: json[26]['Bid'], 
        item12: json[27]['Bid'],
        name1: json[16]['Name'],
        name2: json[17]['Name'],
        name3: json[18]['Name'],
        name4: json[19]['Name'],
        name5: json[20]['Name'],
        name6: json[21]['Name'],        
        name7: json[22]['Name'],
        name8: json[23]['Name'],
        name9: json[24]['Name'],        
        name10: json[25]['Name'],     
        name11: json[26]['Name'],   
        name12: json[27]['Name'],
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
        <h1 className="title">Male Auction</h1>
          <div className="popup">
            <p className="popupText" style={{marginLeft:'12px'}}>Login</p>
            <div className="enterName">
              Full Name: <input id="input_name" className='submitInput' style={{width:'200px', height:'13px', fontSize:'18px'}} ref={(c) => this.name = c} type="text" />
            </div>
            <div className="enterHouse">
              Email: <input id="input_house" className='submitInput' style={{width:'200px', height:'13px', fontSize:'18px'}} ref={(c) => this.house = c} type="text" />
              <div className="submitButton">
              <button className = "biddingButton" onClick={this.submit}>Submit</button>
              </div>
            </div>            
          </div>
        </div>
      );
  }else if (getCountdown()[4] > 0){
    return (
      <div className="container">
        <div className="timer">
            <div>Auction closes in</div>
            <span id="days"></span> Days <span id="hours"></span> Hours <span id="minutes"></span> Min <span id="seconds"></span> Sec
          </div>
        <h1 className="title">Male Auction</h1>
        <div className="item">
            <h2>Keerome Maybury<br/>Cocktail cruise</h2>
            <span>
              <img className="inline1" width="220px" src={require("../src/keerome.jpg")} alt="Bosom Buddies Logo"></img>
              <p className="inline2">Relax and enjoy style and comfort on board
              this classic 55ft cruiser. Keerome will welcome you on board Traveler 
              for a Cocktail Cruise for 8 People including Prosecco and hors d’oeuvres</p>
            </span>
            <span className="bidding">
              <h1 className="biddingText" width={this.state.width}> Current Bid: ${this.state.item1}- {this.state.name1}</h1>
            </span>
            <span className="bidding">            
            <p className="biddingDollar">$</p><input id="input0" className='biddingInput' ref={(c) => this.bidValue1 = c} type="number" />
            <button className="biddingButton" onClick={()=>testBid("Man A", this.state.item1, this.bidValue1.value, this.state.house, this.state.name)}> Place Bid </button>
            </span>
          </div>
          <div className="item">
            <h2>Dai James<br/>Seafood and Lobster dinner</h2>
            <span>
              <img className="inline1" width="220px" src={require("../src/dai.jpg")} alt="Bosom Buddies Logo"></img>
              <p className="inline2">Dai is offering to cook a 5 course seafood 
              and lobster dinner for up to 10 people  at your home. You suppy the 
              liquor we will suppy the food, Bartender and Waitress service and of
              course Dai himself</p>
            </span>
            <span className="bidding">
              <h1 className="biddingText" width={this.state.width}> Current Bid: ${this.state.item2}- {this.state.name2}</h1>
            </span>
            <span className="bidding">            
            <p className="biddingDollar">$</p><input id="input0" className='biddingInput' ref={(c) => this.bidValue2 = c} type="number" />
            <button className="biddingButton" onClick={()=>testBid("Man B", this.state.item2, this.bidValue2.value, this.state.house, this.state.name)}> Place Bid </button>
            </span>
          </div>
        <div className="item">
          <h2>Paul Lambert<br/>Self-Defense</h2>
          <span>
            <img className="inline1" width="220px" src={require("../src/paul.jpg")} alt="Bosom Buddies Logo"></img>
            <p className="inline2">Paul lambert  - personal  trainer 
            Paul will be teaching some easy to execute 
            Defensive tactics to protect yourself and 
            Escape to a safe place! 3 sessions for  8-10 people</p>
          </span>
          <span className="bidding">
            <h1 className="biddingText" width={this.state.width}> Current Bid: ${this.state.item3}- {this.state.name3}</h1>
          </span>
          <span className="bidding">            
          <p className="biddingDollar">$</p><input id="input0" className='biddingInput' ref={(c) => this.bidValue3 = c} type="number" />
          <button className="biddingButton" onClick={()=>testBid("Man C", this.state.item3, this.bidValue3.value, this.state.house, this.state.name)}> Place Bid </button>
          </span>
        </div>
        <div className="item">
          <h2>Stratton Hatfield<br/>Swizzle Washing Machine</h2>
          <span>
            <img className="inline1" width="220px" src={require("../src/stratton.jpg")} alt="Bosom Buddies Logo"></img>
            <p className="inline2">Cheers! The Swizzle Washing Machine will come to your party! 
            2 Hours of the best Gosling's Rum Swizzle you've ever tasted served up by Mr. Hatfield and his Team.
            Always a huge hit at every party.</p>
          </span>
          <span className="bidding">
            <h1 className="biddingText" width={this.state.width}> Current Bid: ${this.state.item4}- {this.state.name4}</h1>
          </span>
          <span className="bidding">            
          <p className="biddingDollar">$</p><input id="input0" className='biddingInput' ref={(c) => this.bidValue4 = c} type="number" />
          <button className="biddingButton" onClick={()=>testBid("Man D", this.state.item4, this.bidValue4.value, this.state.house, this.state.name)}> Place Bid </button>
          </span>
        </div>
        <div className="item">
          <h2>Stephen Corbishley<br/>Police Day Experience</h2>
          <span>
            <img className="inline1" height="220px" src={require("../src/police.jpg")} alt="Bosom Buddies Logo"></img>
            <p className="inline3">The Commissioner of Police offers to the highest bidder a very special experience:
            A party of 4 (2 adults and 2 children (age 10 and above)will be given the opportunity            
            to join the Bermuda Police Service’s Tactical Operations Department to experience
            first –hand one of  the most specialist aspects of police work, with the opportunity
            to experience the following : To use the BPS firearms simulator,<br/>
            To see one of our K9 Units and test their dog within a variety of police related tasks,<br/>
            To try on kit used by our armed police officers,<br/>
            To be taken through a fitness test run by Police instructors,<br/>
            To be taken out on one of the Coastguard vessels.<br/>
            During the day  you will have lunch with the Commissioner, Deputy Commissioner and Head of Tactical Operations in the finest dining
            establishment in Bermuda, Roy’s’ situated in the Police Station Bar !
            </p>
          </span>
          <span className="bidding">
            <h1 className="biddingText" width={this.state.width}> Current Bid: ${this.state.item5}- {this.state.name5}</h1>
          </span>
          <span className="bidding">            
          <p className="biddingDollar">$</p><input id="input0" className='biddingInput' ref={(c) => this.bidValue5 = c} type="number" />
          <button className="biddingButton" onClick={()=>testBid("Man E", this.state.item5, this.bidValue5.value, this.state.house, this.state.name)}> Place Bid </button>
          </span>
        </div>
        <div className="item">
          <h2>Captain Peter Rans<br/>Deep Sea Fishing</h2>
          <span>
            <img className="inline1" width="220px" src={require("../src/peter.jpg")} alt="Bosom Buddies Logo"></img>
            <p className="inline2">A fantastic deep sea fishing experience! 6 people can enjoy 6 hours of  fishing on
            OVERPROOF, a majestic 58ft Sportsman Custom Carolina convertible sportfishing boat.
            </p>
          </span>
          <span className="bidding">
            <h1 className="biddingText" width={this.state.width}> Current Bid: ${this.state.item6}- {this.state.name6}</h1>
          </span>
          <span className="bidding">            
          <p className="biddingDollar">$</p><input id="input0" className='biddingInput' ref={(c) => this.bidValue6 = c} type="number" />
          <button className="biddingButton" onClick={()=>testBid("Man F", this.state.item6, this.bidValue6.value, this.state.house, this.state.name)}> Place Bid </button>
          </span>
        </div>
      <div className="item">
          <h2>Nadanja Bailey<br/>Pub Crawl</h2>
          <span>
            <img className="inline1" width="220px" src={require("../src/nadanja.jpg")} alt="Bosom Buddies Logo"></img>
            <p className="inline2">Hosted by well-known comedian and DJ Nadanja Bailey. 3 hours of entertainment while visiting some of the islands bests pubs
            </p>
          </span>
          <span className="bidding">
            <h1 className="biddingText" width={this.state.width}> Current Bid: ${this.state.item7}- {this.state.name7}</h1>
          </span>
          <span className="bidding">            
          <p className="biddingDollar">$</p><input id="input0" className='biddingInput' ref={(c) => this.bidValue7 = c} type="number" />
          <button className="biddingButton" onClick={()=>testBid("Man G", this.state.item7, this.bidValue7.value, this.state.house, this.state.name)}> Place Bid </button>
          </span>
        </div>
        <div className="item">
          <h2>Victor Raposo<br/>Yard Clean-Up</h2>
          <span>
            <img className="inline1" width="220px" src={require("../src/victor.jpg")} alt="Bosom Buddies Logo"></img>
            <p className="inline2">3 men will come to your house to do 3 hours of yard clean up, they will also take away any trees or branches by truck
            </p>
          </span>
          <span className="bidding">
            <h1 className="biddingText" width={this.state.width}> Current Bid: ${this.state.item8}- {this.state.name8}</h1>
          </span>
          <span className="bidding">            
          <p className="biddingDollar">$</p><input id="input0" className='biddingInput' ref={(c) => this.bidValue8 = c} type="number" />
          <button className="biddingButton" onClick={()=>testBid("Man H", this.state.item8, this.bidValue8.value, this.state.house, this.state.name)}> Place Bid </button>
          </span>
        </div>
      <div className="item">
          <h2>Ian Bridges<br/>Surfing or Paddleboarding</h2>
          <span>
            <img className="inline1" width="220px" src={require("../src/ian.jpg")} alt="Bosom Buddies Logo"></img>
            <p className="inline2">Meet Ian Bridges,  one of Bermuda's most prominent surfers. 
            Surf in Bermuda's warm waters, the offshore barrier reef on the 
            southern shoreline make for the perfect conditions for beginners
            to learn, and advanced surfers to hone their skills.
            or Explore the shady and serene channels of the Hungry Bay
            mangroves on a private paddleboard tour with a local outdoor enthusiast.
            This offer is for 4 people for 4 hours.
            </p>
          </span>
          <span className="bidding">
            <h1 className="biddingText" width={this.state.width}> Current Bid: ${this.state.item9}- {this.state.name9}</h1>
          </span>
          <span className="bidding">            
          <p className="biddingDollar">$</p><input id="input0" className='biddingInput' ref={(c) => this.bidValue9 = c} type="number" />
          <button className="biddingButton" onClick={()=>testBid("Man I", this.state.item9, this.bidValue9.value, this.state.house, this.state.name)}> Place Bid </button>
          </span>
        </div>
        <div className="item">
          <h2>Gentlemen in Waiting<br/>Dinner for 10</h2>
          <span>
            <img className="inline1" width="220px" src={require("../src/gentlemen.jpg")} alt="Bosom Buddies Logo"></img>
            <p className="inline2">This group of Gentlemen will come to your house to 
            wine and dine you and your friends for the entire evening. 
            Dinner and drinks for up to 10 people. Food and wine will be provided by<br/>
            “The Gentlemen - In – Waiting”
            </p>
          </span>
          <span className="bidding">
            <h1 className="biddingText" width={this.state.width}> Current Bid: ${this.state.item10}- {this.state.name10}</h1>
          </span>
          <span className="bidding">            
          <p className="biddingDollar">$</p><input id="input0" className='biddingInput' ref={(c) => this.bidValue10 = c} type="number" />
          <button className="biddingButton" onClick={()=>testBid("Man J", this.state.item10, this.bidValue10.value, this.state.house, this.state.name)}> Place Bid </button>
          </span>
        </div>
        <div className="item">
          <h2>Alex Rollin<br/>BBQ for 6</h2>
          <span>
            <img className="inline1" width="220px" src={require("../src/alex.jpg")} alt="Bosom Buddies Logo"></img>
            <p className="inline2">BBQ FOR 6 <br/>
            Alex’s  will come to your house and
            prepare a delicious meal for 6 people on your BBQ!<br/>
            Complimented by 3 bottles of Prosecco. 
            </p>
          </span>
          <span className="bidding">
            <h1 className="biddingText" width={this.state.width}> Current Bid: ${this.state.item11}- {this.state.name11}</h1>
          </span>
          <span className="bidding">            
          <p className="biddingDollar">$</p><input id="input0" className='biddingInput' ref={(c) => this.bidValue11 = c} type="number" />
          <button className="biddingButton" onClick={()=>testBid("Man K", this.state.item11, this.bidValue11.value, this.state.house, this.state.name)}> Place Bid </button>
          </span>
        </div>
        <div className="item">
          <h2>Chef Angelo<br/>Cooking Demonstration</h2>
          <span>
            <img className="inline1" width="350px" src={require("../src/angelo.jpg")} alt="Bosom Buddies Logo"></img>
            <p className="inline2">Join chef angelo for a 2 hour cooking demonstration  at your house and 
            The best part is you get to eat his amazing cooking as he prepares it !!<br/>
            Menu : <br/>
            Bruschetta or crostini with tomatoes and fresh mozzarella<br/>
            Beets and avocado starter<br/>
            Sweet potato gnocchi  with either lobster or shrimps<br/>
            As well as 2 bottles of prosecco and dessert
            </p>
          </span>
          <span className="bidding">
            <h1 className="biddingText" width={this.state.width}> Current Bid: ${this.state.item12}- {this.state.name12}</h1>
          </span>
          <span className="bidding">            
          <p className="biddingDollar">$</p><input id="input0" className='biddingInput' ref={(c) => this.bidValue12 = c} type="number" />
          <button className="biddingButton" onClick={()=>testBid("Man L", this.state.item12, this.bidValue12.value, this.state.house, this.state.name)}> Place Bid </button>
          </span>
        </div>
      <div className="footer">
          <img className="inline1" width="220px" src={require("../src/pals.png")} alt="Bosom Buddies Logo"></img>
          <p>   All proceeds go towards P.A.L.S cancer care</p>
          </div>
      </div>
      );
    }else{
      return(
        <div className="auction-over">
        <div>Auction Closed</div>        
        </div>
      )
    }
  }
}

export default Home
