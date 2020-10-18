import React, { Component } from 'react'
import User from './User';

export default class Users extends Component {
  constructor() {
    super();
    this.state = {
      secondsVisible: 0,
    }
    this.interval = null;
  }

  componentDidMount() {
    this.interval = setInterval(()=>{
      const { secondsVisible } = this.state;
      this.setState({ secondsVisible: secondsVisible + 1 });
    }, 1000);
  }

  componentDidUpdate() {console.log('UPDATEOU!')}
  componentWillUnmount(){
    clearInterval(this.interval);
  }

  render() {
    const { users } = this.props;
    const { secondsVisible } = this.state;
    return (
      <div>
        <p>Visível a {secondsVisible} segundos</p>
        <ul>
          {users.map(user => {
            //return <li key={user.login.uuid}>{user.name.first}</li>
            return <User key={user.login.uuid} user={user} />
          })}
        </ul>
      </div>
    );
  }
}
