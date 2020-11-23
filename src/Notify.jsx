import React from 'react'
import { Link } from 'react-router-dom'
import './index.css'

class Notify extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          editing: -1,
          messageTag: null
        }
        this.view_cancel = this.view_cancel.bind(this)
        this.download_emails = this.download_emails.bind(this)
      }

    sendGroupEmail(message){

    }

    view_cancel(){
        this.setState({
            editing: -1
        })
    }

    send_push(message){
        const headers = new Headers();
        headers.append("Content-Type", "application/json")
        headers.append("Authorization", "key=AAAAP64TvVE:APA91bGuylgrZCV2-7fWMKiojHosfhqJDg981NAbAbw8aBq7NbVrNZsAT2f8oGj5K80WKBfaHeY26w9vSfl-eYo7WD6eIigqqKAk3gFNmwFIQlh631rE-hPBhC_2wYiQVMgoTmPBvHPJ")
        
        const options = {
        method: 'POST',
        headers,
        body: '{ "notification": { "body": "'+message+'", "title": "Island Hunt" }, "priority": "high", "data": {  "clickaction": "FLUTTERNOTIFICATIONCLICK", "id": "1", "status": "done" }, "to": "/topics/all"  }'
        }

        const request = new Request('https://fcm.googleapis.com/fcm/send', options);
        
        fetch(request).catch(err => {
        console.log(err)
        })

        this.setState({
            editing: -1
        })
    }

    download_emails() {
        fetch('/getEmails').then(res => res.json()).then(json =>{
            var list = ""
            for(var i=0; i<json.length; i++){
                list = list+(new Buffer(json[i]["Email"], 'base64')).toString('ascii');
            }
            var element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(list));
            element.setAttribute('download', "Mailing List");
          
            element.style.display = 'none';
            document.body.appendChild(element);
          
            element.click();
          
            document.body.removeChild(element);
          })        
      }

    render(){
        return (
            <div className="main_nav">
            <Link to="/answers">Back</Link>
            {this.state.editing == 0 && <div className="editor_popup">
            Message:<input id="input_image" className='text_input' style={{width:'200px', height:'13px', fontSize:'18px'}} ref={(c) => this.state.messageTag = c} placeholder={this.state.rewards} type="text"/>
                    <br/><button onClick={()=>this.setState({editing:-1})}>Cancel</button><button onClick={()=>this.send_push(this.state.messageTag.value)}>Send</button>
                </div>}
            <div className="questions_nav">
            <h1>Send User Notifications</h1>
            <button className="nav_question" onClick={this.download_emails}>
                        Download Mailing List
                    </button>
                    <button className="nav_question" onClick={()=>this.setState({ editing: 0 })}>
                        Send Smartphone Notification
                    </button>
            </div>
          </div>
        )
    }
}

export default Notify