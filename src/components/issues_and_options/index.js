import React, { Component } from 'react'
import Intro from '../intro';
import { IssueImpact } from '../issue_impact';
import { PeopleImpact } from '../people_impact';
import { FinalComponent } from '../submit_issue_option';

export default class IssuesAndOptions extends Component {
  state = {
    step: 1,
    justMe: false,
    allSouthAfricans: false,
    areaSlected: []
  }
  // go back to previous step
  prevStep = () => {
    const { step } = this.state;
    this.setState({ step: step - 1 });
  }
  // proceed to the next step
  nextStep = (payload) => {
    const { step } = this.state;
    this.setState({ step: step + 1 });
    console.log({ payload });
  }
  // handle field change
  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  }
  render() {
    const { step } = this.state;
    switch (step) {
      case 1:
        return (
          <Intro
            nextStep={this.nextStep}
            values=""
          />
        );
      case 2:
        return (
          <PeopleImpact
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values=""
          />
        );
      case 3:
        return (
          <IssueImpact
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            values=""
          />
        );
      case 4:
        return <FinalComponent
          prevStep={this.prevStep}
        />;
      default:
        (console.log('This is a multi-step form built with React.'))
    }
    return (
      <div>
        Success hello world
      </div>
    )
  }
}
