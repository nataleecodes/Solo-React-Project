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
        suggestion: null,
        tip: null
      }
    
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }

    // componentDidMount() {
    //   const dbRef = firebase.database().ref();
    //   dbRef.once('value')
    //     .then((snapshot) => {
    //       console.log(snapshot.val());
    //     });    
    // }

    getSuggestion(btnChoice) {
      const dbRef = firebase.database().ref(btnChoice);
      dbRef.once('value')
        .then((snapshot) => {
          console.log(snapshot.val());
          this.setState({suggestion: snapshot.val()});
        });     

      const tipRef = firebase.database().ref('tips');
      tipRef.once('value')
        .then((snapshot) => {
          let tips = snapshot.val();
          console.log(tips);
          const tipNumber = Math.floor(Math.random() * tips.length);
          this.setState({ tip: tips[tipNumber] });
        })
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
        <div className="flex-container col">
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

          <div className="flex-container row responseRow">
            <img src="/public/assets/emily3.png" className="emilyPic"/>
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
