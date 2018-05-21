import React from 'react';
import ReactDOM from 'react-dom';
import Wine from './wine';
import Tip from './tip';
import firebase from 'firebase';

//Set up my firebase connection
const config = {
  apiKey: "AIzaSyDrKjzjM4WQOkSpivFbN9SNURmkTTiHsUw",
  authDomain: "egreccoswine.firebaseapp.com",
  databaseURL: "https://egreccoswine.firebaseio.com",
  projectId: "egreccoswine",
  storageBucket: "egreccoswine.appspot.com",
  messagingSenderId: "701628731960"
};

firebase.initializeApp(config);


class App extends React.Component {
    constructor() {
      super();
      this.state = {
        btnChoice: 'dinner',
        suggestion: null
      }
    
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
      const dbRef = firebase.database().ref();
      dbRef.once('value')
        .then((snapshot) => {
          console.log(snapshot.val());
        });    
    }

    getSuggestion(btnChoice) {
      const dbRef = firebase.database().ref(btnChoice);
      dbRef.once('value')
        .then((snapshot) => {
          console.log(snapshot.val());
        }); 
    }

    handleChange(event) {
      this.setState({btnChoice: event.target.value});
    }

    handleSubmit(event) {
      event.preventDefault();
      console.log('Submit was pressed');
      // console.log(this.state);
      console.log(this.state.btnChoice);

      this.getSuggestion(this.state.btnChoice);
    }
  
    render() {
      return (
        <div>
          <h1>Emily Gilmore Reccomends Wine</h1>
          <form onSubmit={this.handleSubmit}>
            <label className='eventQuestion'>
              What kind of event are you attending?
              <select value={this.state.value} onChange={this.handleChange}>
                {/* Something to drink together, crowd-pleaser */}
                <option value="dinner">Dinner party</option>
                {/* Sangria or red to match red meat*/}
                <option value="bbq">Backyard barbecue</option>
                {/* Something impressive */}
                <option value="meetParents">Meeting S.O.'s parents</option>
                {/* Champagne or prosecco or Cali Moet */}
                <option value="birthday">Birthday or anniversary</option>
              </select>
            </label>
            <input type="submit" value="Submit" />
          </form>

          <Wine suggestion={this.state.suggestion} />
          <Tip />
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
