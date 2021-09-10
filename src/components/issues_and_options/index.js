import React, { Component } from 'react'
import Intro from '../intro';
import { IssueImpact } from '../issue_impact';
import { PeopleImpact } from '../people_impact';
import { FinalComponent } from '../submit_issue_option';

export default class IssuesAndOptions extends Component {
  state = {
    step: 1,
    personAffected: null,
    issuesAffected: null,
  }

  // go back to previous step
  prevStep = () => {
    const { step } = this.state;
    this.setState({ step: step - 1 });
  }

  // proceed to the next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({ step: step + 1 });
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
            values={this.state}
          />
        );
      case 2:
        return (
          <PeopleImpact
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={this.state}
          />
        );
      case 3:
        return (
          <IssueImpact
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            values={this.state}
          />
        );
      case 4:
        return <FinalComponent
          prevStep={this.prevStep}
          values={this.state}
        />;
      default:
        (
          console.log('This is a multi-step form built with React.')
        );
    }
  }
}
