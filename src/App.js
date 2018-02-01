import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import DatePicker from 'material-ui/DatePicker';
import Paper from 'material-ui/Paper';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      price: '',
      location: '',
      phoneNumber: '',
      startTime: '',
      endTime: '',
      timezone: ''
    };
  }

  register() {
     axios.post(`/addProduct`, this.state)
     .then((response)=>{
       console.log('register response', response.data);
       this.setState({
         name: '',
         description: '',
         price: '',
         location: '',
         phoneNumber: '',
         startTime: '',
         endTime: '',
         timezone: ''
       })
       alert("Successful add to Database");
     })
     .catch((err)=>{
         console.log('Error: ', err);
         alert("Was not successfully added to the database");
         return null;
     });
   }

  render() {
    const style = {
      minHeight: '94%',
      flex: 1,
      marginRight: '30%',
      marginLeft: '30%',
    };
    return (
      <div className="mainContainer">
        <div className="title">Admin Panel</div>
        <Paper style={style} zDepth={3} className="page">
          <div className="inputBody">
            <TextField
              floatingLabelText="Product Name"
              value={this.state.name}
              onChange={(e)=>(this.setState({name: e.target.value}))}
            /><br />
            <TextField
               value={this.state.description}
               floatingLabelText="Product description"
               onChange={(e)=>(this.setState({description: e.target.value}))}
               multiLine={true}
               rows={2}
             /><br />
            <TextField
              value={this.state.price}
              onChange={(e)=>(this.setState({price: e.target.value}))}
              floatingLabelText="Product Price"
            /><br />
            <TextField
              value={this.state.location}
              onChange={(e)=>(this.setState({location: e.target.value}))}
              floatingLabelText="Location"
            /><br />
            <TextField
              value={this.state.phoneNumber}
              onChange={(e)=>(this.setState({phoneNumber: e.target.value}))}
              floatingLabelText="Phone Number"
            /><br />
            <TextField
              value={this.state.timezone}
              onChange={(e)=>(this.setState({timezone: e.target.value}))}
              floatingLabelText="Timezone (America/New_York)"

            /><br />
            <br />

            <label>Start Time and Date</label><br/>
            <input
               onChange={(e)=>(this.setState({startTime: e.target.value}))}
               type="datetime-local"
               value={this.state.startTime}

            ></input><br/>
            <br />
            <label>End Time and Date</label><br/>
            <input
               onChange={(e)=>(this.setState({endTime: e.target.value}))}
               type="datetime-local"
               value={this.state.endTime}
            ></input><br/>
            <br/>

          </div>


        <RaisedButton
          label="Submit"
          primary={true}
          style={{margin: 12}}
          onClick={this.register.bind(this)}
        />
        </Paper>
      </div>
    );
  }
}
