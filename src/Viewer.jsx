import React, { Component, useContext } from 'react'
import { Link } from 'react-router-dom'
import './index.css'

class Viewer extends Component{  

  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      players: [{"ID":0, "FirstName":"loading...", "LastName":"loading...", "email":"loading..."}],
      editing: -1,
      name: "Loading",
      nameTag: null,
    }
    this.view_cancel = this.view_cancel.bind(this)
  }
  
  componentDidMount(){
    this.getData()
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getData(){
    fetch('/getAnswers'+(this.props.challenge+1)).then(res => res.json()).then(json =>{
        var answers = json;
        fetch('/getPlayers').then(res => res.json()).then(json2 =>{
            var players = json2;
            for(var i=0; i<answers.length; i++){
                for(var j=0; j<players.length; j++){
                    if(answers[i]["UserID"] == players[j]["ID"]){
                        answers[i]["FirstName"] = players[j]["FirstName"]
                        answers[i]["LastName"] = players[j]["LastName"]
                        answers[i]["Email"] = players[j]["Email"]
                    }
                }
                console.log(answers[i]["Answers"])
            }
            this.setState({
                answers: answers
            })
      })
    })
    
    fetch('/getChallenges').then(res => res.json()).then(json =>{
      this.setState({
        name: json[this.props.challenge]["Title"]
      })
    })
  }

  view_cancel(){
    this.setState({
      editing: -1
    })
  }

  render(){
    
    return (
      <div className="main_nav">
          <Link to="/answers">Back</Link>
          {this.state.editing > -1 && <div className="viewer_popup">
            {this.state.answers[this.state.editing]["FirstName"]}, {this.state.answers[this.state.editing]["LastName"]}: {this.state.answers[this.state.editing]["Email"]}
            {this.state.answers != null && this.state.answers[this.state.editing].Answers.map((p, i) => (
              <h4 >
              Question {i+1}:  {p.length>500 && <img src={"data:image/jpeg;base64, "+p}/>} {p.length<=500 && p}
            </h4>
            ), this)}

            <br/><button onClick={this.view_cancel}>Cancel</button>
            </div>}
          <div className="questions_nav">
          <h1>{this.state.name} Answers</h1>
            {this.state.answers.map((p, i) => (
              <button className="nav_question" onClick={() => this.setState({
                editing: i
              })}>
              {i+1}  {p["FirstName"]}, {p["LastName"]}:  {p["Score"]}
            </button>
            ), this)}
        </div>
      </div>
    )
  }  
}

export default Viewer;