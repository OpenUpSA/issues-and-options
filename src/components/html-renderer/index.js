import { Box, FormControl, Grid, List, ListItem, TextField, Typography } from '@material-ui/core';
import { Business, Label, Language, LocalPhoneOutlined } from '@material-ui/icons';
import React, { Component } from 'react';
import ReactGA from 'react-ga';


export const onClickReplocatorLink = (issue, link) => (e) => {
  e.preventDefault();
  const label = `${issue['What does your issue most closely relate to?']} - ${issue['Who']}`
  ReactGA.event({
    category: 'Option',
    action: 'Action new tab',
    label
  });
  if (link) {
    window.open(link, '_blank');
  }
}


export default class HTMLRender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      municipal_addresses_found: [],
      mayor_addresses_found: {},
      mayor_contacts_found: []
    };
  }

  onMunicpalValueChange = event => {
    const address = event.target.value;
    this.setState({ [event.target.name]: address }, () => {
      address && fetch('https://mapit.code4sa.org/address?partial=1&generation=2&type=MN&address=' + address)
        .then(response => response.json())
        .then(response => {
          if (response && response.addresses.length > 0) {
            const muniCodeRef = response.addresses[0].areas[0];
            const muniCode = response[muniCodeRef].codes.MDB;
            fetch('https://municipaldata.treasury.gov.za/api/cubes/municipalities/facts?cut=municipality.demarcation_code:' + muniCode)
              .then(response => response.json())
              .then(response => {
                if (response && response.data.length > 0) {
                  const longName = response.data[0]['municipality.long_name'];
                  const phoneNumber = response.data[0]['municipality.phone_number'];
                  const url = response.data[0]['municipality.url'];
                  let streetAddress = ""
                  Object.keys(response.data[0]).forEach(key => {
                    if (key.includes("street_address")) {
                      streetAddress = streetAddress + response.data[0][key] + "\n";
                    }
                  })

                  this.setState({
                    municipal_addresses_found: [{
                      phoneNumber,
                      url,
                      longName,
                      streetAddress
                    }]
                  });
                }
              }).catch(err => console.log(err));
          }
        }).catch(err => console.log(err));
    });
  };

  onMayorValueChange = event => {
    const address = event.target.value;
    this.setState({ [event.target.name]: address, mayor_contacts_found: [] }, () => {
      address && fetch('https://mapit.code4sa.org/address?partial=1&generation=2&type=MN&address=' + address)
        .then(response => response.json())
        .then(response => {
          if (response && response.addresses.length > 0) {
            this.setState({
              mayor_addresses_found: response
            })
          }
        });
    })
  }

  showMayorAddress = (address, mayorAddress) => () => {
    const muniCodeRef = address.areas[0];
    const muniCode = mayorAddress[muniCodeRef].codes.MDB;
    fetch('https://municipaldata.treasury.gov.za/api/cubes/officials/facts?cut=municipality.demarcation_code:' + muniCode)
      .then(response => response.json())
      .then(response => {
        if (response && response.data.length > 0) {
          const roles = ["Mayor/Executive Mayor", "Secretary of Mayor/Executive Mayor"]
          const contactDetails = response.data.filter(item => roles.includes(item['role.role']));
          const contacts = []
          for (const contactDetail of contactDetails) {
            const phoneNumber = contactDetail['contact_details.phone_number'];
            const emailAddress = contactDetail['contact_details.email_address'];
            const name = contactDetail['contact_details.name'];
            const title = contactDetail['contact_details.title'];
            const role = contactDetail['role.role'];
            contacts.push({
              phoneNumber,
              emailAddress,
              name,
              title,
              role
            });
          }
          this.setState({
            mayor_contacts_found: [...contacts]
          })
        }
      });
  }

  onClickLink = (link) => {
    ReactGA.event({
      category: 'Option',
      action: 'Option website link click',
      label: link
    });
  }


  getHtml(option) {
    switch (option['Option type']) {
      case 'National Department':
        return (
          <p>
            Find contact details for the {option['Who']} at {' '}
            <a
              href={option['Option data']}
              target="_blank"
              rel="noopener noreferrer"
              onClick={this.onClickLink(option['Option data'])}
            >{option['Option data']}</a>
          </p>
        )

      case 'Municipal Department':
        return (
          <>
            <FormControl fullWidth>
              <Typography align="left" variant="subtitle1">
                Enter your address to find your {option['Who']}
              </Typography>
              <Box
                mt={3}>
                <TextField
                  fullWidth sx={{ m: 1 }}
                  id="address"
                  name="address"
                  label="Your address or neighbourhood"
                  variant="outlined"
                  value={this.state.address}
                  onChange={this.onMunicpalValueChange}
                />
              </Box>
            </FormControl>
            <List>
              {
                this.state.municipal_addresses_found.map(address => (
                  <div key={address.longName}>
                    <ListItem>
                      <Grid container spacing={1}>
                        <Grid item xs={12} sm={6}>
                          <Typography align="left" variant="subtitle1">
                            <Label /> Name:
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Typography align="left" variant="subtitle1">
                            {address.longName}
                          </Typography>
                        </Grid>
                      </Grid>
                    </ListItem>
                    <ListItem>
                      <Grid container spacing={1}>
                        <Grid item xs={12} sm={6}>
                          <Typography align="left" variant="subtitle1">
                            <LocalPhoneOutlined />
                            <span>
                              Phone Number:
                            </span>
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <span>
                            <a
                              href={`tel:${address.phoneNumber}`}
                              onClick={onClickReplocatorLink(option, null)}
                            >
                              {address.phoneNumber}
                            </a>
                          </span>
                        </Grid>
                      </Grid>
                    </ListItem>
                    <ListItem>
                      <Grid container spacing={1}>
                        <Grid item xs={12} sm={6}>
                          <Typography align="left" variant="subtitle1">
                            <Language />
                            <span>
                              Website Url:
                            </span>
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <span>
                            <a href={address.url} target="_blank" rel="noreferrer">
                              {address.url}
                            </a>
                          </span>
                        </Grid>
                      </Grid>
                    </ListItem>
                    <ListItem>
                      <Grid container spacing={1}>
                        <Grid item xs={12} sm={6}>
                          <Typography align="left" variant="subtitle1">
                            <Business />
                            <span>
                              Street Address:
                            </span>
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <span>
                            <a href={`https://maps.google.com/?q=${address.streetAddress}`}
                              target="_blank"
                              rel="noreferrer">
                              {address.streetAddress}
                            </a>
                          </span>
                        </Grid>
                      </Grid>
                    </ListItem>
                  </div>
                ))
              }
            </List>
          </>
        )

      case 'Mayor':
        const addresses = this.state.mayor_addresses_found.addresses
          ? this.state.mayor_addresses_found.addresses
          : [];
        const mayorAddress = this.state.mayor_addresses_found;
        return (
          <>
            <FormControl fullWidth>
              <Typography align="left" variant="subtitle1">
                Enter your address to find your {option['Who']}
              </Typography>
              <Box
                mt={3}>
                <TextField
                  fullWidth sx={{ m: 1 }}
                  id="address"
                  name="address"
                  label="Your address or neighbourhood"
                  variant="outlined"
                  value={this.state.address}
                  onChange={this.onMayorValueChange}
                />
              </Box>
            </FormControl>
            <List>
              {
                addresses.map(address => (
                  <div key={address.formatted_address}>
                    <ListItem>
                      <Typography
                        style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                        title="Click to show Mayor contact details"
                        onClick={this.showMayorAddress(address, mayorAddress)}
                      >
                        {address.formatted_address}
                      </Typography>
                    </ListItem>
                  </div>
                ))
              }
            </List>
            <List>
              {
                this.state.mayor_contacts_found.map(address => (
                  <div key={address.name}>
                    <ListItem>
                      <Typography align="left" variant="subtitle1">
                        {address.role}
                      </Typography>
                    </ListItem>
                    <ListItem>
                      <Grid container spacing={1}>
                        <Grid item xs={12} sm={6}>
                          <Label />
                          <span>
                            Name:
                          </span>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <span>
                            {address.title} {address.name}
                          </span>
                        </Grid>
                      </Grid>
                    </ListItem>
                    <ListItem>
                      <Grid container spacing={1}>
                        <Grid item xs={12} sm={6}>
                          <LocalPhoneOutlined />
                          <span>
                            Phone Number:
                          </span>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <span>
                            <a href={`tel:${address.phoneNumber}`}
                              onClick={onClickReplocatorLink(option, null)}
                            >
                              {address.phoneNumber}
                            </a>
                          </span>
                        </Grid>
                      </Grid>
                    </ListItem>
                    <ListItem>
                      <Grid container spacing={1}>
                        <Grid item xs={12} sm={6}>
                          <Language />
                          <span>
                            Email Address:
                          </span>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <span>
                            <a href={`mailto:${address.emailAddress}`}>
                              {address.emailAddress}
                            </a>
                          </span>
                        </Grid>
                      </Grid>
                    </ListItem>
                  </div>
                ))
              }
            </List>
          </>
        )
      default:
        return <div dangerouslySetInnerHTML={{ __html: option['Option data'] }} />;
    }
  }

  render() {
    const { issue } = this.props;
    return (
      <>
        {this.getHtml(issue)}
      </>
    )
  }
}
