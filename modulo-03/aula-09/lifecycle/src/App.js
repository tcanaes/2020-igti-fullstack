import React, { Component } from 'react';
import Users from './components/users/Users';
import Toggle from './components/toggle/Toggle';

const apiUrl = 'https://randomuser.me/api/?seed=rush&nat=br&results=10';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      showUsers: false,
    }
  }

  async componentDidMount() {
    const response = await fetch(apiUrl);
    const json = await response.json();
    this.setState({users: json.results});
    console.log('componentDidMount de App.js');
  }

  componentDidUpdate() {
    console.log('componentDidUpdate de App.js');
  }

  componentWillUnmount() {
    console.log('componentWillUnmount de App.js');
  }

  handleShowUsers = (display) => {
    this.setState({showUsers: display})
  }
  
  render() {
    const {showUsers, users} = this.state;

    return (
      <div>
        <h3>React Livecycle!</h3>
        <Toggle onToggle={this.handleShowUsers} />
        <hr />
        { showUsers &&
          <Users users={users} />
        }
      </div>
    );
  }
}
