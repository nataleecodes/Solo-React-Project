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

//Main app component
class App extends React.Component {
    constructor() {
      super();
      this.state = {
        btnChoice: 'dinner',
        suggestion: null,
        tip: null
      }
    
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }

    //Get user input and update state to select wine recco & snarky quote
    getSuggestion(btnChoice) {
      const dbRef = firebase.database().ref(btnChoice);
      dbRef.once('value')
        .then((snapshot) => {
          this.setState({suggestion: snapshot.val()});
        });     

      const tipRef = firebase.database().ref('tips');
      tipRef.once('value')
        .then((snapshot) => {
          let tips = snapshot.val();
          const tipNumber = Math.floor(Math.random() * tips.length);
          this.setState({ tip: tips[tipNumber] });
        })
    }

    //Listen for changes to dropdown menu for user input
    handleChange(event) {
      this.setState({btnChoice: event.target.value});
    }

    //Lisen for submit button press & call getSuggestion to fetch reccos from DB
    handleSubmit(event) {
      event.preventDefault();
      this.getSuggestion(this.state.btnChoice);
    }
  
    //Render static header, dropdown, and dynamic content in the browser
    render() {
      return (
        <div className="flex-container col header">
          <h1>Emily Gilmore <span className="cursive">Recommends Wine</span></h1>
          <form onSubmit={this.handleSubmit}>
            <label className='eventQuestion'>What kind of event are you attending?</label>
            <select value={this.state.value} onChange={this.handleChange}>
              <option value="dinner">Dinner party</option>
              <option value="bbq">Backyard barbecue</option>
              <option value="meetParents">Meeting S.O.'s parents</option>
              <option value="birthday">Birthday or anniversary</option>
            </select>
            <input type="submit" value="Submit" />
          </form>

          {/* Display response info from Firebase database */}
          <div className="flex-container row responseRow">
            <img src="/public/assets/emily3.png" className="emilyPic" alt="Emily Gilmore standing with her arms crossed looking severe"/>
            <img src="/public/assets/emily3-closeup.png" className="emilyCloseUp" alt="Emily Gilmore with her arms crossed looking severe"/>
            <div className="speechBubble">
              <Wine suggestion={this.state.suggestion} />
              <Tip tip={this.state.tip} />
            </div>
          </div>
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
