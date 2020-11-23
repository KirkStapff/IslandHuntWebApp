import React, { Component, useContext } from 'react'
import { Link } from 'react-router-dom'
import './index.css'

class Editor extends Component{  

  constructor(props) {
    super(props);
    this.state = {
      questions: [{"Question":"Loading...", "TextAnswer":0, "Order": 0}],
      editing: -1,
      questionText: "",
      textAnswerBool: false,
      numQuestions: 0,
      name: "Loading",
      nameTag: null,
      rewards:"",
      rewardsTag:null,
      price:"",
      priceTag:null,
      image: "Loading",
      imageTag: null
    }
    this.edit_cancel = this.edit_cancel.bind(this)
    this.edit_save = this.edit_save.bind(this)
    this.edit_delete = this.edit_delete.bind(this)
    this.edit_add = this.edit_add.bind(this)
    this.edit_switch = this.edit_switch.bind(this)
    this.name_save = this.name_save.bind(this)
  }
  
  componentDidMount(){
    this.getData()
    this.interval = setInterval(() => this.getData(), 250)
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getData(){
    fetch('/getQuestions'+(this.props.challenge+1)).then(res => res.json()).then(json =>{
      this.setState({
        questions: json,
        numQuestions: json.length
      })
    })
    fetch('/getChallenges').then(res => res.json()).then(json =>{
      this.setState({
        name: json[this.props.challenge]["Title"],
        rewards: json[this.props.challenge]["Rewards"],
        price: json[this.props.challenge]["Price"],
        image: json[this.props.challenge]["ImageLink"]
      })
    })
  }

  edit_cancel(){
    this.setState({
      editing: -1
    })
  }

  edit_save(){
    console.log('{ "ch": '+this.props.challenge+', "id": '+this.state.questions[this.state.editing]["Order"]+', "ques": "'+this.state.questionText.value+'", "tans":"'+this.state.textAnswerBool+'"}')
    const headers = new Headers();
      headers.append("Content-Type", "application/json")
    
    const options = {
      method: 'PUT',
      headers,
      body: '{ "ch": '+this.props.challenge+', "id": '+this.state.questions[this.state.editing]["Order"]+', "ques": "'+this.state.questionText.value+'", "tans":"'+this.state.textAnswerBool+'"}'
    }

    const request = new Request('/editQuestion', options);
    
    fetch(request).catch(err => {
      console.log(err)
    })

    this.setState({
      editing: -1
    })

    this.getData()
  }

  edit_add(){
    console.log('{ "ch": '+this.props.challenge+', "nQues": '+this.state.numQuestions+'}')
    const headers = new Headers();
      headers.append("Content-Type", "application/json")
    
    const options = {
      method: 'PUT',
      headers,
      body: '{ "ch": '+this.props.challenge+', "nQues": '+this.state.numQuestions+'}'
    }

    const request = new Request('/addQuestion', options);
    
    fetch(request).catch(err => {
      console.log(err)
    })

    this.setState({
      editing: -1,
      numQuestions: this.state.numQuestions +1
    })

    this.getData()
  }

  edit_delete(){
    console.log('{"ch": '+this.props.challenge+', "id": '+(this.state.numQuestions-1)+'}')
    const headers = new Headers();
      headers.append("Content-Type", "application/json")
    
    const options = {
      method: 'PUT',
      headers,
      body: '{"ch": '+this.props.challenge+', "id": '+(this.state.numQuestions-1)+'}'
    }

    const request = new Request('/deleteQuestion', options);
    
    fetch(request).catch(err => {
      console.log(err)
    })

    this.setState({
      editing: -1,
      numQuestions: this.state.numQuestions -1
    })

    this.getData()
  }

  edit_switch(){
    this.setState({
      textAnswerBool: !this.state.textAnswerBool
    })
  }

  name_save(){
    console.log('{ "ch": '+this.props.challenge+', "name": "'+this.state.nameTag.value+'", "rewards":"'+this.state.rewardsTag.value+'", "price": '+this.state.priceTag.value+',"image":"'+this.state.imageTag.value+'"}')
    const headers = new Headers();
      headers.append("Content-Type", "application/json")
    
    const options = {
      method: 'PUT',
      headers,
      body: '{ "ch": '+this.props.challenge+', "name": "'+this.state.nameTag.value+'", "rewards":"'+this.state.rewardsTag.value+'", "price": '+this.state.priceTag.value+',"image":"'+this.state.imageTag.value+'"}'
    }

    const request = new Request('/editChallenge', options);
    
    fetch(request).catch(err => {
      console.log(err)
    })

    this.setState({
      editing: -1,
      name: this.state.nameTag!=null? this.state.nameTag.value : ""
    })

    this.getData()
  }

  render(){
    
    return (
      <div className="main_nav">
          <Link to="/challenges">Back</Link>
          {this.state.editing == -2 && <div className="editor_popup">
      Challenge Title: <input id="input_title" className='text_input' style={{width:'200px', height:'13px', fontSize:'18px'}} ref={(c) => this.state.nameTag = c} type="text" placeholder={this.state.name}/>
      <br/>Challenge Image (Link): <input id="input_image" className='text_input' style={{width:'200px', height:'13px', fontSize:'18px'}} ref={(c) => this.state.imageTag = c } placeholder={this.state.image} type="text"/>
      <br/>Challenge Rewards: <input id="input_image" className='text_input' style={{width:'200px', height:'13px', fontSize:'18px'}} ref={(c) => this.state.rewardsTag = c} placeholder={this.state.rewards} type="text"/>
      <br/>Challenge Price: <input id="input_image" className='text_input' style={{width:'200px', height:'13px', fontSize:'18px'}} ref={(c) => this.state.priceTag = c} placeholder={this.state.price} type="text"/>
      <br/><button onClick={this.edit_cancel}>Cancel</button><button onClick={()=>this.name_save()}>Save</button>
    </div>}
          {this.state.editing > -1 && <div className="editor_popup">
      Question {this.state.editing + 1}<br/>
      Question: <input id="input_question" className='text_input' style={{width:'200px', height:'13px', fontSize:'18px'}} ref={(c) => this.state.questionText = c} type="text" placeholder={this.state.questions[this.state.editing]["Question"]}/>
    <br/>Answer Type: <button onClick={this.edit_switch}>{this.state.textAnswerBool ? "Text Answer" : "Image Answer"}</button>
      <br/><button onClick={this.edit_cancel}>Cancel</button><button onClick={()=>this.edit_save()}>Save</button>
    </div>}
          <div className="questions_nav">
          <h1>{this.state.name}</h1>
          <h4>Rewards: {this.state.rewards}</h4>
          <h4>Price: {this.state.price} <button onClick={()=>this.setState({editing: -2})}>Edit Details</button></h4>
            {this.state.questions.map((p, i) => (
              <button className="nav_question" onClick={() => this.setState({
                editing: i
              })}>
              {p["Question"]}
            </button>
            ), this)}
        </div>
        <button onClick={this.edit_add}>Add Question</button><button onClick={this.edit_delete}>Delete Question</button>
      </div>
    )
  }  
}

export default Editor;