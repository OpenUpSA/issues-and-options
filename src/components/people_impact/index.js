import { Box, Grid, ImageList, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import React from 'react';
import { BackButton, BasicButton } from '../utils/Buttons';


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
                <ArrowBackIcon /> Back
              </BackButton>
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
                <BasicButton
                  variant="contained"
                  color="secondary"
                  onClick={() => this.selectedOption('just me')}
                  elevation={0}>
                  Just me
                </BasicButton>
              </Box>
              <Box>
                <BasicButton
                  variant="contained"
                  color="secondary"
                  onClick={() => this.selectedOption('all southafricans')}
                >
                  Everyone in South Africa
                </BasicButton>
              </Box>
            </Box>
            <Typography align="left" variant="subtitle1">
              <a
                href="/"
                style={{ textDecorationLine: 'underline', color: '#FFFFFF' }}>
                Why are we asking this question?
              </a>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    )
  }
}
