import { Box, Grid, ImageList, Typography } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ArrowBack from '@material-ui/icons/ArrowBack';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { styled } from '@material-ui/styles';
import React from 'react';
import data from '../../data/data.json';
import HTMLRender from '../html-renderer';
import RepLocator from '../Rep-Locator';
import { BackButton, UsefulLinkButton } from '../utils/Buttons';

export class FinalComponent extends React.Component {
  state = {
    expanded: false
  }

  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  goToStep = i => {
    this.props.goToStep(i);
  };

  handleChange = (panel) => (event, isExpanded) => {
    event.preventDefault();
    this.setState({ expanded: isExpanded ? panel : false });
  };

  render() {
    const { expanded } = this.state;
    const { personAffected, issuesAffected } = this.props.values;
    const entities = data[personAffected][issuesAffected]
      ? data[personAffected][issuesAffected].sort(function (a, b) {
        return parseInt(a['Priority']) - parseInt(b['Priority']);
      })
      : []
    const repLocator = [
      'MP',
      'MPL',
      'Ward councillor'
    ]
    const AccordionNumberMarker = styled('span')({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#ED3D32',
      color: '#FFFFFF',
      fontStyle: 'normal',
      height: '24px',
      width: '24px',
      borderRadius: '50%',
      fontSize: '13px',
      padding: '2px',
      fontWeight: '600',
      position: 'absolute',
    });
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
                style={{ width: "100%", height: "184px", padding: "2px" }} />
            </ImageList>
          </Box>
        </Grid>
        <Grid item xs={12} md={9}
          style={{ color: '#FFFFFF' }}>
          <div>
            <Box
              display="flex"
              alignItems="flex-start"
              flexDirection="column"
              p={6}
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
                  Your results
                </Typography>
              </Box>

              <Box mb={3}>
                <Typography align="left" variant="h4">
                  Let's get you talking to the right person!
                </Typography>
              </Box>
              <Box mb={3}>
                <Typography align="left" variant="subtitle1">
                  These are the results based on answers you provided:
                </Typography>
              </Box>

              <Box
                display="flex"
                alignItems="flex-start"
              >
                <Box mb={1} mr={3}>
                  <UsefulLinkButton
                    title="How many people does your issue affect?"
                    onClick={() => this.goToStep(2)}
                  >
                    {personAffected}
                  </UsefulLinkButton>
                </Box>
                <Box mb={3}>
                  <UsefulLinkButton
                    title="Which area does your issue most closely relate to?"
                    onClick={() => this.goToStep(3)}
                  >
                    {issuesAffected}
                  </UsefulLinkButton>
                </Box>
              </Box>

              <Grid container>
                <Grid item md={6} xs={12}>
                  <Box mb={3}>
                    <Typography align="left" variant="body1">
                      Who to contact in what order:
                    </Typography>
                  </Box>
                </Grid>
                <Grid item md={6} xs={12}>
                  <Box mb={3}>
                    <Typography align="left" variant="subtitle1">
                      <a
                        href="/"
                        style={{ textDecorationLine: 'underline', color: '#FFFFFF' }}>
                        Why is it important to escalate in this order?
                      </a>
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              {entities && entities.map((key, i) => (
                <Box mb={1}
                  key={key['Priority']}
                >
                  <Accordion
                    expanded={expanded === i}
                    onChange={this.handleChange(i)}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Box>
                        <AccordionNumberMarker>
                          {i + 1}
                        </AccordionNumberMarker>
                      </Box>
                      <Box ml={6}>
                        <Typography>
                          {key['Who']}
                        </Typography>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box
                        display="flex"
                        alignItems="flex-start"
                        flexDirection="column"
                      >
                        {
                          repLocator.includes(key['Option type'])
                            ? <RepLocator who={key['Option type']} />
                            : <HTMLRender issue={key} />
                        }
                        <Typography align="left" variant="body2">
                          {key['Why should they help?']}
                        </Typography>
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                </Box>
              ))}
            </Box>
          </div>
        </Grid>
      </Grid>
    )
  }
}
