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
        item6: json[5]['Bid'],
        item7: json[6]['Bid'],
        item8: json[7]['Bid'],
        item9: json[8]['Bid'],
        item10: json[9]['Bid'],
        item11: json[10]['Bid'],
        item12: json[11]['Bid'],
        item13: json[12]['Bid'],
        item14: json[13]['Bid'],
        item15: json[14]['Bid'],
        item16: json[15]['Bid'],
        name1: json[0]['Name'],
        name2: json[1]['Name'],
        name3: json[2]['Name'],
        name4: json[3]['Name'],
        name5: json[4]['Name'],
        name6: json[5]['Name'],
        name7: json[6]['Name'],
        name8: json[7]['Name'],
        name9: json[8]['Name'],
        name10: json[9]['Name'],
        name11: json[10]['Name'],
        name12: json[11]['Name'],
        name13: json[12]['Name'],
        name14: json[13]['Name'],
        name15: json[14]['Name'],        
        name16: json[15]['Name'],
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
          <h1 className="title">Silent Auction</h1>  
          <div className="popup">
            <p className="popupText" style={{marginLeft:'12px'}}>Login</p>
            <div className="enterName">
              Name: <input id="input_name" className='submitInput' style={{width:'200px', height:'13px', fontSize:'18px'}} ref={(c) => this.name = c} type="text" />
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
          <h1 className="title">Silent Auction</h1>  
          <div className="item">
              <h2>New Hampshire Vacation Home</h2>
              <span>
                <img className="inline1" width="300px" src={require("../src/newhampshirehouse.jpg")} alt="Bosom Buddies Logo"></img>
                <p className="inline2">Located in Jackson, in the Mt Washington Valley in Northern New Hampshire, about 3 hour’s drive north of Boston.
                  Offering four good sized bedrooms, gym and games room/bar for one week stay. There are five ski hills within 30 minutes of the house, if someone wants to use it for
                  skiing. It is also a lovely house in the summer and the Fall. There will be some black-out periods, but sufficient flexibility.</p>
              </span>
              <span className="bidding">
                <h1 className="biddingText" width={this.state.width}> Current Bid: ${this.state.item1}- {this.state.name1}</h1>
              </span>
              <span className="bidding">            
              <p className="biddingDollar">$</p><input id="input0" className='biddingInput' ref={(c) => this.bidValue1 = c} type="number" />
              <button className="biddingButton" onClick={()=>testBid("Item A", this.state.item1, this.bidValue1.value, this.state.house, this.state.name)}> Place Bid </button>
              </span>
            </div>
            <div className="item">
              <h2>KitchenAid Artisan Series Stand-Mixer</h2>
              <span>
                <img className="inline1" width="220px" src={require("../src/kitchenaidmixer.jpg")} alt="Bosom Buddies Logo"></img>
                <p className="inline2">Easily make your favorite cakes and multiple batches of cookie dough with the 5-quart stainless steel mixing bowl
                 with comfortable handle. With 10 speeds, the standmixer will quickly become your kitchen’s culinary center as you mix, knead and whip
                  ingredients with ease. And for even more versatility, the power hub fits optional attachments from food grinders to pasta makers and more.</p>
              </span>
              <span className="bidding">
                <h1 className="biddingText" width={this.state.width}> Current Bid: ${this.state.item2}- {this.state.name2}</h1>
              </span>
              <span className="bidding">            
              <p className="biddingDollar">$</p><input id="input0" className='biddingInput' ref={(c) => this.bidValue2 = c} type="number" />
              <button className="biddingButton" onClick={()=>testBid("Item B", this.state.item2, this.bidValue2.value, this.state.house, this.state.name)}> Place Bid </button>
              </span>
            </div>
            <div className="item">
            <h2>Rake in the $$$$$</h2>
            <span>
              <img className="inline1" width="220px" src={require("../src/rakingcash.png")} alt="Bosom Buddies Logo"></img>
              <p className="inline2">Rake in the $$$$$$ with $100 worth of different scratch cards.</p>
            </span>
            <span className="bidding">
              <h1 className="biddingText" width={this.state.width}> Current Bid: ${this.state.item3}- {this.state.name3}</h1>
            </span>
            <span className="bidding">            
            <p className="biddingDollar">$</p><input id="input0" className='biddingInput' ref={(c) => this.bidValue3 = c} type="number" />
            <button className="biddingButton" onClick={()=>testBid("Item C", this.state.item3, this.bidValue3.value, this.state.house, this.state.name)}> Place Bid </button>
            </span>
          </div>
          <div className="item">
              <h2>$700 Travel Voucher</h2>
              <span>
                <img className="inline1" width="220px" src={require("../src/travelvoucher.jpg")} alt="Bosom Buddies Logo"></img>
                <p className="inline2">Travel voucher from Watlington and Conyers Travel</p>
              </span>
              <span className="bidding">
                <h1 className="biddingText" width={this.state.width}> Current Bid: ${this.state.item4}- {this.state.name4}</h1>
              </span>
              <span className="bidding">            
              <p className="biddingDollar">$</p><input id="input0" className='biddingInput' ref={(c) => this.bidValue4 = c} type="number" />
              <button className="biddingButton" onClick={()=>testBid("Item D", this.state.item4, this.bidValue4.value, this.state.house, this.state.name)}> Place Bid </button>
              </span>
            </div>
          <div className="item">
            <h2>$250 voucher to Bonefish, Bella Vista or Cafe Amici</h2>
            <span>
              <img className="inline1" width="220px" src={require("../src/bellavista.png")} alt="Bosom Buddies Logo"></img>
              <p className="inline2">Enjoy a $250 voucher to enjoy Breakfast, Lunch and Dinner at each one of Bermuda’s finest restaurants or a special meal at just one.</p>
            </span>
            <span className="bidding">
              <h1 className="biddingText" width={this.state.width}> Current Bid: ${this.state.item5}- {this.state.name5}</h1>
            </span>
            <span className="bidding">            
            <p className="biddingDollar">$</p><input id="input0" className='biddingInput' ref={(c) => this.bidValue5 = c} type="number" />
            <button className="biddingButton" onClick={()=>testBid("Item E", this.state.item5, this.bidValue5.value, this.state.house, this.state.name)}> Place Bid </button>
            </span>
          </div>
          <div className="item">
            <h2>Bermuda Heritage Collection</h2>
            <span>
              <img className="inline1" width="240px" src={require("../src/blackrum.jpg")} alt="Bosom Buddies Logo"></img>
              <p className="inline3">MARY CELESTIA<br/>
                In 1854, the Mary Celestia, a Civil War blockade runner sailing to
                Charleston, SC, sank off the south shore of Bermuda. Two bottles of
                perfume from Piesse & Lubin, London were recovered from the
                shipwreck. Lili Bermuda re-created the timeless elegance of the
                original fragrance. Soft notes of rose and orange flower, sparkling
                grapefruit complimented by warm rosewood and amber tones.<br/>
                GOSLING’S FAMILY RESERVE OLD RUM<br/>
                Appropriately called Gosling’s Family Reserve Old Rum, it is crafted
                from the same incomparable Bermuda blend as our renowned Black
                Seal Rum. But, we age it in our dark barrels even longer, until it
                acquires an extra luscious, nuanced complexity much like a rare
                Scotch or Cognac. Consider it the ultimate sipping rum. We do.<br/>
                RESERVE PRICE $195 <br/>(The lantern is not included)</p>
            </span>
            <div marginLeft="32px" className="bidding">
              <h1 className="biddingText" width={this.state.width}> Current Bid: ${this.state.item6}- {this.state.name6}</h1>
            </div>
            <div className="bidding" marginLeft="32px">            
            <p className="biddingDollar">$</p><input id="input0" className='biddingInput' ref={(c) => this.bidValue6 = c} type="number" />
            <button className="biddingButton" onClick={()=>testBid("Item F", this.state.item6, this.bidValue6.value, this.state.house, this.state.name)}> Place Bid </button>
            </div>
          </div>
          <div className="item">
            <h2>Pamper Yourself</h2>
            <span>
              <img className="inline1" width="220px" src={require("../src/pamper.jpg")} alt="Bosom Buddies Logo"></img>
              <p className="inline2">Enjoy a 60 minute deluxe pedicure by a certified beauty therapist in the comfort of your own home... <br/>
              Doesn't get much better than that !!!</p>
            </span>
            <span className="bidding">
              <h1 className="biddingText" width={this.state.width}> Current Bid: ${this.state.item7}- {this.state.name7}</h1>
            </span>
            <span className="bidding">            
            <p className="biddingDollar">$</p><input id="input0" className='biddingInput' ref={(c) => this.bidValue7 = c} type="number" />
            <button className="biddingButton" onClick={()=>testBid("Item G", this.state.item7, this.bidValue7.value, this.state.house, this.state.name)}> Place Bid </button>
            </span>
          </div>
          <div className="item">
            <h2>Family Fun Day</h2>
            <span>
              <img className="inline1" width="220px" src={require("../src/funday.jpg")} alt="Bosom Buddies Logo"></img>
              <p className="inline2">Start the day off dockyard, Then enjoy a game of Fun Golf before heading back to Hamilton on the ferry <br/>
              Vouchers included</p>
            </span>
            <span className="bidding">
              <h1 className="biddingText" width={this.state.width}> Current Bid: ${this.state.item8}- {this.state.name8}</h1>
            </span>
            <span className="bidding">            
            <p className="biddingDollar">$</p><input id="input0" className='biddingInput' ref={(c) => this.bidValue8 = c} type="number" />
            <button className="biddingButton" onClick={()=>testBid("Item H", this.state.item8, this.bidValue8.value, this.state.house, this.state.name)}> Place Bid </button>
            </span>
          </div>
          <div className="item">
            <h2>Bonfire Evening</h2>
            <span>
              <img className="inline1" width="220px" src={require("../src/bonfire.png")} alt="Bosom Buddies Logo"></img>
              <p className="inline2">A Bonfire set up for 20 people including setup , 3 hours of firewood, 1 table, garbage container,
                fire extinguisher, plates and cooking utensils.
                Also included are Smores and 3 bottles of Prosecco!</p>
            </span>
            <span className="bidding">
              <h1 className="biddingText" width={this.state.width}> Current Bid: ${this.state.item9}- {this.state.name9}</h1>
            </span>
            <span className="bidding">            
            <p className="biddingDollar">$</p><input id="input0" className='biddingInput' ref={(c) => this.bidValue9 = c} type="number" />
            <button className="biddingButton" onClick={()=>testBid("Item I", this.state.item9, this.bidValue9.value, this.state.house, this.state.name)}> Place Bid </button>
            </span>
          </div>
          <div className="item">
            <h2>Villas Las Ventanas in Janquial, Costa Rica</h2>
            <span>
              <img className="inline1" width="220px" src={require("../src/costa.jpg")} alt="Bosom Buddies Logo"></img>
              <p className="inline2">Visit beautiful Costa Rica , spend  7 nights in a 2 bedroom villa at the 
              luxurious Villas Las Ventanas in Janquial on the West Coast.
              A wonderful place to be as busy as you want or to just relax.</p>
            </span>
            <span className="bidding">
              <h1 className="biddingText" width={this.state.width}> Current Bid: ${this.state.item10}- {this.state.name10}</h1>
            </span>
            <span className="bidding">            
            <p className="biddingDollar">$</p><input id="input0" className='biddingInput' ref={(c) => this.bidValue10 = c} type="number" />
            <button className="biddingButton" onClick={()=>testBid("Item J", this.state.item10, this.bidValue10.value, this.state.house, this.state.name)}> Place Bid </button>
            </span>
          </div>
          <div className="item">
            <h2>Four Day Stay in New York Apartment</h2>
            <span>
              <img className="inline1" width="220px" src={require("../src/nyapt.jpg")} alt="Bosom Buddies Logo"></img>
              <p className="inline2">Shop 'Til You Drop!
              4 days 3 nights stay in this
              beautiful 2 bedroom New York Apartment</p>
            </span>
            <span className="bidding">
              <h1 className="biddingText" width={this.state.width}> Current Bid: ${this.state.item11}- {this.state.name11}</h1>
            </span>
            <span className="bidding">            
            <p className="biddingDollar">$</p><input id="input0" className='biddingInput' ref={(c) => this.bidValue11 = c} type="number" />
            <button className="biddingButton" onClick={()=>testBid("Item K", this.state.item11, this.bidValue11.value, this.state.house, this.state.name)}> Place Bid </button>
            </span>
          </div>
          <div className="item">
            <h2>Bermuda Gold Championship</h2>
            <span>
              <img className="inline1" width="220px" src={require("../src/golf.jpg")} alt="Bosom Buddies Logo"></img>
              <p className="inline2">This entitles two (2) people to walk inside the ropes on Sunday November 1st with the players. <br/>
              Witness every shot from this once-in-a-lifetime perspective</p>
            </span>
            <span className="bidding">
              <h1 className="biddingText" width={this.state.width}> Current Bid: ${this.state.item12}- {this.state.name12}</h1>
            </span>
            <span className="bidding">            
            <p className="biddingDollar">$</p><input id="input0" className='biddingInput' ref={(c) => this.bidValue12 = c} type="number" />
            <button className="biddingButton" onClick={()=>testBid("Item L", this.state.item12, this.bidValue12.value, this.state.house, this.state.name)}> Place Bid </button>
            </span>
          </div>
          <div className="item">
            <h2>Electric Bike Tour</h2>
            <span>
              <img className="inline1" width="220px" src={require("../src/podego.jpg")} alt="Bosom Buddies Logo"></img>
              <p className="inline2">Pedego electric bike rental for 2 people. 
              Choose to tour harrington sound , coopers island or st. Georges.
              See bermuda like you’ve never seen it before!</p>
            </span>
            <span className="bidding">
              <h1 className="biddingText" width={this.state.width}> Current Bid: ${this.state.item13}- {this.state.name13}</h1>
            </span>
            <span className="bidding">            
            <p className="biddingDollar">$</p><input id="input0" className='biddingInput' ref={(c) => this.bidValue13 = c} type="number" />
            <button className="biddingButton" onClick={()=>testBid("Item M", this.state.item13, this.bidValue13.value, this.state.house, this.state.name)}> Place Bid </button>
            </span>
          </div>
          <div className="item">
            <h2>1609 Design</h2>
            <span>
              <img className="inline1" width="220px" src={require("../src/1609.jpg")} alt="Bosom Buddies Logo"></img>
              <p className="inline2">$150 voucher from 1609 design plus Handbag and Accessories</p>
            </span>
            <span className="bidding">
              <h1 className="biddingText" width={this.state.width}> Current Bid: ${this.state.item14}- {this.state.name14}</h1>
            </span>
            <span className="bidding">            
            <p className="biddingDollar">$</p><input id="input0" className='biddingInput' ref={(c) => this.bidValue14 = c} type="number" />
            <button className="biddingButton" onClick={()=>testBid("Item N", this.state.item14, this.bidValue14.value, this.state.house, this.state.name)}> Place Bid </button>
            </span>
          </div>
          <div className="item">
            <h2>Brunch For Two and New Handbag and Necklace</h2>
            <span>
              <img className="inline1" width="220px" src={require("../src/fourways.jpg")} alt="Bosom Buddies Logo"></img>
              <p className="inline2">Brunch for two at Fourways plus a new Handbag, Scarf and Necklace</p>
            </span>
            <span className="bidding">
              <h1 className="biddingText" width={this.state.width}> Current Bid: ${this.state.item15}- {this.state.name15}</h1>
            </span>
            <span className="bidding">            
            <p className="biddingDollar">$</p><input id="input0" className='biddingInput' ref={(c) => this.bidValue15 = c} type="number" />
            <button className="biddingButton" onClick={()=>testBid("Item O", this.state.item15, this.bidValue15.value, this.state.house, this.state.name)}> Place Bid </button>
            </span>
          </div>
          <div className="item">
            <h2>Outward Bound</h2>
            <span>
              <img className="inline1" width="220px" src={require("../src/outwardbound.jpg")} alt="Bosom Buddies Logo"></img>
              <p className="inline2">A team building day for 20 people
              includes a ropes course, swimming,
              kayaking, and other team
              building activities<br/>
              A SINGLE DAY OF OUTWARDBOUND WILL LAST A LIFETIME</p>
            </span>
            <span className="bidding">
              <h1 className="biddingText" width={this.state.width}> Current Bid: ${this.state.item16}- {this.state.name16}</h1>
            </span>
            <span className="bidding">            
            <p className="biddingDollar">$</p><input id="input0" className='biddingInput' ref={(c) => this.bidValue16 = c} type="number" />
            <button className="biddingButton" onClick={()=>testBid("Item P", this.state.item16, this.bidValue16.value, this.state.house, this.state.name)}> Place Bid </button>
            </span>
          </div>
          <div className="footer">
          <img width="220px" src={require("../src/pals.jpg")} alt="Bosom Buddies Logo"></img>
          All proceeds go towards P.A.L.S cancer care
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
