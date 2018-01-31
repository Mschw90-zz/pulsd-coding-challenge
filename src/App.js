import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      discription: '',
      price: '',
      location: '',
      phoneNumber: ''
    };
  }

  register() {
     axios.post(`/addProduct`, this.state)
     .then((response)=>{
       console.log('register response', response.data);
       this.setState({
         name: '',
         discription: '',
         price: '',
         location: '',
         phoneNumber: ''
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
    return (
      <div>
        <div>Admin Panel</div>
        <div>
          <TextField
            floatingLabelText="Product Name"
            value={this.state.name}
            onChange={(e)=>(this.setState({name: e.target.value}))}
          /><br />
          <TextField
             value={this.state.discription}
             floatingLabelText="Product Discription"
             onChange={(e)=>(this.setState({discription: e.target.value}))}
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
        </div>
        <RaisedButton
          label="Primary"
          primary={true}
          style={{margin: 12}}
          onClick={this.register.bind(this)}
        />

      </div>
    );
  }
}
