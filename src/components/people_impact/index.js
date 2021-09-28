import { Box, Button, Grid, Typography } from '@material-ui/core';
import React from 'react'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


export class PeopleImpact extends React.Component {

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  selectedOption = (option) => {
    this.props.values.personAffected = option;
    this.props.nextStep();
  };

  render() {
    return (
      <div>
        <Grid container
        >
          <Grid item xs={2}>
            <Box
              display="flex"
              alignItems="flex-start"
              flexDirection="column"
              p={8}
            >
              image
            </Box>
          </Grid>
          <Grid item xs={10}>
            <Box
              display="flex"
              alignItems="flex-start"
              flexDirection="column"
              p={8}
            >
              <Box mb={1}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={this.back}
                >
                  <ArrowBackIcon /> Back
                </Button>
              </Box>
              <Box mb={1}>
                <Typography align="left" variant="subtitle1">
                  Question 1
                </Typography>
              </Box>
              <Box mb={1}>
                <Typography align="left" variant="h4">
                  How many people does your issue affect?
                </Typography>
              </Box>
              <Box py={3}
                display="flex"
                alignItems="flex-start"
              >
                <Box mr={3}>
                  <Button variant="contained" color="secondary" onClick={() => this.selectedOption('just me')}>Just me</Button>
                </Box>
                <Box>
                  <Button variant="contained" color="secondary" onClick={() => this.selectedOption('all southafricans')}>All South Africans</Button>
                </Box>
              </Box>
              <div>
                <a href="/">Why are we asking this question?</a>
              </div>
            </Box>
          </Grid>
        </Grid>
      </div>
    )
  }
}
