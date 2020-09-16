import React, { Component } from 'react'
import { useParams } from 'react-router-dom'
class Home extends Component {

  constructor(props){
    super(props);
    this.state = {
      items: 'ching',
      isLoaded: false,
    }
  }

  getData () {
    fetch('/test', {
    }).then(res => res.json()).then(json =>{
      this.setState({
        items: json[0].Name,
        isLoaded: true
      })    
    
    }).catch(err => {
      console.log(err)
    })
  }

  componentDidMount () {
    this.getData()  
  }
  render () {
    
    this.getData();
    var {items, isLoaded} = this.state;

    if(isLoaded){
      return (
        <div>
          {items}
        </div>
      )}else{
    return(
      <div>
        No       
      </div>
      )
    }
  }
}

export default Home
