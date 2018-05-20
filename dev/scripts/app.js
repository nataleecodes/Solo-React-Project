import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor() {
      super();
      this.state = {
        value: 'dinner'
      }
    
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
      this.setState({value: event.target.value});
      console.log({value: event.target.value});
    }

    handleSubmit(event) {
      event.preventDefault();
      console.log('Submit was pressed');
    }
  
  
  
    render() {
      return (
        <div>
          <h1>Emily Gilmore Reccomends Wine</h1>
          <form onSubmit={this.handleSubmit}>
            <label>
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
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
