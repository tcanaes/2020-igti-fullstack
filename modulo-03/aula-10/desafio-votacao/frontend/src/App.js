import React, { Component } from 'react';
import Candidatos from './components/Candidatos/Candidatos';
import Titulo from './components/Titulo/Titulo';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      candidates: [],
      totalVotes: 0,
    };
  }

  componentDidMount() {
    setInterval(this.getVotingData, 1000);
  }

  getVotingData = async () => {
    const apiData = await fetch('http://localhost:8080/votes');
    const votingData = await apiData.json();
    this.setState({
      candidates: Object.assign([], votingData.candidates),
      totalVotes: votingData.totalVotes,
    });
  };

  render() {
    const { candidates } = this.state;
    return (
      <div className="container">
        <Titulo />
        <Candidatos candidates={candidates} />
      </div>
    );
  }
}
