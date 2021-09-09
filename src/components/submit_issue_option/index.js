import React from 'react'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Box, Button, Grid, Typography } from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';

export class FinalComponent extends React.Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const contact = {
      'Local home affairs service point': 'custom component',
      'National Department of Home Affairs': 'custom component',
      'Your representative Members of parliament': 'custom component',
      'Minister of Home Affairs': 'custom component',
      'The National Assembly for Home Affairs': 'custom component',
      'The NCOP committee': 'custom component'
    }
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
            <div>
              <Box
                display="flex"
                alignItems="flex-start"
                flexDirection="column"
                p={8}
              >
                <Box mb={1}>
                  <Button
                    variant="outlined"
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

                <Box mb={1}>
                  <Typography align="left" variant="h4">
                    Let's get you talking to the right person!
                  </Typography>
                </Box>
                <Box mb={1}>
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
                    >
                      Just me
                    </Button>
                  </Box>
                  <Box mr={3}>
                    <Button
                      variant="outlined"
                    >
                      Travel and identity documents
                    </Button>
                  </Box>
                </Box>

                <Grid container>
                  <Grid item xs={6}>
                    <Typography align="left" variant="subtitle1">
                      Who to contact in what order:
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <a href="/">Why is it important to escalate in this order?</a>
                  </Grid>
                </Grid>

                <div>
                  {Object.entries(contact).map(([key, value]) => (
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography>
                          {key}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          {value}
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </div>
                <div>
                  <button>Show me more areas</button>
                  <button>I don't see an appropriate area here</button>
                  <button>I'm not sure</button>
                </div>
                <div>
                  <a href="/">Why are we asking this question?</a>
                </div>
              </Box>
            </div>
          </Grid>
        </Grid>

      </div>
    )
  }
}
