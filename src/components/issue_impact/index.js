import { Box, Button, Grid, Typography } from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';
import React from 'react';
import data from '../../data/data.json';

export class IssueImpact extends React.Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  selectedOption = (option) => {
    this.props.values.issuesAffected = option;
    this.props.nextStep();
  };

  render() {
    const issues = Object.keys(data.issues);
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
                  <ArrowBack /> Back
                </Button>
              </Box>
              <Box mb={1}>
                <Typography align="left" variant="subtitle1">
                  Question 1
                </Typography>
              </Box>
              <Box mb={1}>
                <Typography align="left" variant="h4">
                  Which area does your issue most closely relate to?
                </Typography>
              </Box>
              <div>
                <Box py={3}
                  // display="flex"
                  // alignItems="flex-start"
                  display="flex"
                  flexWrap="wrap"
                >
                  {issues.map(issue => (
                    <Box my={1} mx={1}
                      display="flex"
                      key={issue}
                    >
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => this.selectedOption(issue)}>{issue}
                      </Button>
                    </Box>
                  ))}
                </Box>
              </div>
              <div>
                <Box py={3}
                  display="flex"
                  alignItems="flex-start"
                >
                  <Box mb={1} mr={3}>
                    <Button
                      variant="outlined"
                    >
                      Show me more areas
                    </Button>
                  </Box>
                  <Box mb={1} mr={3}>
                    <Button
                      variant="outlined"
                    >
                      I don't see an appropriate area here
                    </Button>
                  </Box>
                  <Box mb={1} mr={3}>
                    <Button
                      variant="outlined"
                    >
                      I'm not sure
                    </Button>
                  </Box>
                </Box>
              </div>
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
