import { Box, Button, Grid, ImageList, Typography } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ArrowBack from '@material-ui/icons/ArrowBack';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import data from '../../data/data.json';
import HTMLRender from '../html-renderer';
import RepLocator from '../Rep-Locator';

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
    return (
      <div>
        <Grid container
        >
          <Grid item xs={12} md={3}>
            <Box
              display="flex"
              alignItems="flex-end"
              flexDirection="column"
            >
              <ImageList sx={{ width: 500, height: 450 }}>
                <img src={`${process.env.PUBLIC_URL}/assets/app-images/question-img.svg`} alt="" />
              </ImageList >
            </Box>
          </Grid>
          <Grid item xs={12} md={9}>
            <div>
              <Box
                display="flex"
                alignItems="flex-start"
                flexDirection="column"
                p={2}
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
                    <Button
                      variant="outlined"
                      title="How many people does your issue affect?"
                      onClick={() => this.goToStep(2)}
                    >
                      {personAffected}
                    </Button>
                  </Box>
                  <Box mb={3}>
                    <Button
                      variant="outlined"
                      title="Which area does your issue most closely relate to?"
                      onClick={() => this.goToStep(3)}
                    >
                      {issuesAffected}
                    </Button>
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
                        <a href="/">Why is it important to escalate in this order?</a>
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
                <div>
                  {entities && entities.map((key, i) => (
                    <Accordion
                      key={key['Priority']}
                      expanded={expanded === i}
                      onChange={this.handleChange(i)}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography>
                          {key['Who']}
                        </Typography>
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
                  ))}
                </div>
              </Box>
            </div>
          </Grid>
        </Grid>
      </div>
    )
  }
}
