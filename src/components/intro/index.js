import { Box, ImageList, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import ReactGA from 'react-ga4';
import { GetStartedButton, UsefulLinkButton } from '../utils/Buttons';

class Intro extends React.Component {
  continue = e => {
    e.preventDefault();
    ReactGA.event({
      category: 'Question Answer',
      action: 'Get started',
      label: 'Get started'
    });
    this.props.nextStep();
  };
  render() {
    const { width } = this.props.values;

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
            p={1}
          >
            <ImageList sx={{ width: 100, height: 100 }}>
              <img
                src={
                  width < 960
                    ? `${process.env.PUBLIC_URL}/assets/app-images/issues-img-mobile.svg`
                    : `${process.env.PUBLIC_URL}/assets/app-images/issues-img.svg`
                }
                alt=""
                style={{ width: "100%", padding: "0px" }} />
            </ImageList>
          </Box>
        </Grid>
        <Grid
          item
          xs={12} md={9}
          style={{ color: '#FFFFFF' }}
        >
          <Grid container
          >
            <Grid item xs={12} md={6}>
              <Box
                display="flex"
                alignItems="flex-start"
                flexDirection="column"
                p={1}
              >
                <Box mb={2}>
                  <Typography align="left" variant="h4">
                    Have an issue, but not sure who to talk to?
                  </Typography>
                </Box>
                <Box mb={2}>
                  <Typography align="left" variant="subtitle1">
                    Find out who can and should help you with the issue you are facing by answering 2-3 questions
                  </Typography>
                </Box>
                <GetStartedButton
                  variant="contained"
                  color="secondary"
                  onClick={this.continue}
                >Get started now</GetStartedButton>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                display="flex"
                alignItems="flex-start"
                flexDirection="column"
                p={1}
              >
                <Typography align="left" variant="subtitle1">
                  Shortcuts:
                </Typography>
                <Box mb={1}>
                  <UsefulLinkButton>
                    <a href="https://www.pa.org.za/write/"
                      style={{ color: '#FFFFFF', textDecoration: 'none' }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Write to an MP
                    </a>
                  </UsefulLinkButton>
                </Box>
                <Box mb={1}>
                  <UsefulLinkButton>
                    <a href="https://www.pa.org.za/write-committees/"
                      style={{ color: '#FFFFFF', textDecoration: 'none' }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Write to a Parliamentary Committee
                    </a>
                  </UsefulLinkButton>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default Intro
