import { Box, Grid, ImageList, Typography } from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';
import React from 'react';
import ReactGA from 'react-ga';
import data from '../../data/data.json';
import { BackButton, BasicButton, UsefulLinkButton } from '../utils/Buttons';


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
    ReactGA.event({
      category: 'Question Answer',
      action: 'What is your issue about?',
      label: option
    });
  };

  render() {
    const { issues } = data
    const issuesToDisplay = Object.keys(
      Object.fromEntries(
        Object.entries(issues).sort(([, a], [, b]) => a > b)
      ));
    return (
      <Grid container spacing={2}
        style={{ background: '#007B5A' }}
      >
        <Grid
          item
          xs={12}
          md={3}
          style={{ background: 'rgba(255, 255, 255, 0.05)' }}
        >
          <Box
            display="flex"
            alignItems="flex-center"
            flexDirection="column"
            p={6}
          >
            <ImageList sx={{ width: 100, height: 100 }}>
              <img
                src={`${process.env.PUBLIC_URL}/assets/app-images/question-img.svg`}
                alt=""
                style={{ width: "100%", padding: "0px" }} />
            </ImageList>
          </Box>
        </Grid>
        <Grid item xs={12} md={9}
          style={{ color: '#FFFFFF' }}>
          <Box
            display="flex"
            alignItems="flex-start"
            flexDirection="column"
            p={1}
          >
            <Box mb={1}>
              <BackButton
                variant="outlined"
                color="primary"
                onClick={this.back}
              >
                <ArrowBack /> Back
              </BackButton>
            </Box>
            <Box mb={1}>
              <Typography align="left" variant="subtitle1">
                Question 2
              </Typography>
            </Box>
            <Box mb={1}>
              <Typography align="left" variant="h4">
                Which area does your issue most closely relate to?
              </Typography>
            </Box>
            <div>
              <Box py={3}
                display="flex"
                flexWrap="wrap"
              >
                {issuesToDisplay.map(issue => (
                  <Box my={1} mx={1}
                    display="flex"
                    key={issue}
                  >
                    <BasicButton
                      variant="contained"
                      color="secondary"
                      onClick={() => this.selectedOption(issue)}>{issue}
                    </BasicButton>
                  </Box>
                ))}
              </Box>
            </div>
            <Box
              display="flex"
              mb={3}
            >
              <UsefulLinkButton>
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSc_U5hOIFRVESwY1STkF5JCHK360DF-DE0Z6pTx7xXBiYhI5A/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#FFFFFF', textDecoration: 'none' }}
                >
                  I don't see an appropriate area here
                </a>
              </UsefulLinkButton>
            </Box>
          </Box>
        </Grid>
      </Grid>
    )
  }
}
