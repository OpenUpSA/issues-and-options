import { Box, ImageList, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import React from 'react';

class Intro extends React.Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };
  render() {
    const { width } = this.props.values;
    return (
      <div>
        <Grid container
        >
          <Grid item xs={12} md={3}>
            <Box
              display="flex"
              alignItems="flex-center"
              flexDirection="column"
            >
              <ImageList sx={{ width: 100, height: 100 }}>
                <img
                  src={
                    width < 960
                      ? `${process.env.PUBLIC_URL}/assets/app-images/issues-img-mobile.svg`
                      : `${process.env.PUBLIC_URL}/assets/app-images/issues-img.svg`
                  }
                  alt=""
                  style={{ width: "100%", height: "184px", padding: "2px" }} />
              </ImageList>
            </Box>
          </Grid>
          <Grid item xs={12} md={9}>
            <Grid container>
              <Grid item xs={12} md={6}>
                <Box
                  display="flex"
                  alignItems="flex-start"
                  flexDirection="column"
                  p={2}
                >
                  <Typography align="left" variant="h4">
                    Have an issue, but not sure who to to talk to?
                  </Typography>
                  <Typography align="left" variant="subtitle1">
                    Find out who can and should help you with the issue you are facing by answering 2-3 questions
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={this.continue}
                  >Get started Now</Button>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  display="flex"
                  alignItems="flex-start"
                  flexDirection="column"
                  p={2}
                >
                  <Typography align="left" variant="subtitle1">
                    Useful links
                  </Typography>
                  <Box mb={1}>
                    <Button variant="outlined">Find my local representative</Button>
                  </Box>
                  <Box mb={1}>
                    <Button variant="outlined">Learn about the structures of government</Button>
                  </Box>
                  <Box mb={1}>
                    <Button variant="outlined">See a list of all MPs</Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default Intro
