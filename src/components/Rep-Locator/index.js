import { FormControl, List, ListItem, ListItemText, TextField, Typography } from '@material-ui/core';
import React, { Component } from 'react';
import { onClickReplocatorLink } from '../html-renderer';

export default class RepLocator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      addresses_found: []
    };
  }
  onChange = event => {
    const address = event.target.value;
    this.setState({ [event.target.name]: address }, () => {
      address && fetch('https://mapit.code4sa.org/address?partial=1&generation=2&type=WD&address=' + address)
        .then(response => response.json())
        .then(response => {
          if (response && response.addresses.length > 0) {
            this.setState({ addresses_found: response.addresses });
          }
        }).catch(err => console.log(err));
    });
  };


  render() {
    const { issue } = this.props;
    const repLocatorContacts = {
      'MP': 'mps',
      'MPL': 'mpls',
      'Ward councillor': 'councillors'
    }
    const { addresses_found } = this.state;
    const who = issue['Option type']
    const repLocatorFragment = repLocatorContacts[who];
    if (repLocatorFragment) {
      return (
        <>
          <FormControl fullWidth>
            <Typography align="left" variant="subtitle1">
              1. Enter your address to find your {who}
            </Typography>
            <Typography align="left" variant="subtitle1">
              2. Select your {who} and write them a message about your issue
            </Typography>

            <TextField
              fullWidth sx={{ m: 1 }}
              id="address"
              name="address"
              label="Your address or neighbourhood"
              variant="outlined"
              value={this.state.address}
              onChange={this.onChange}
              style={{ marginTop: '1rem' }}
            />
          </FormControl>
          <List>
            {
              addresses_found.map(address => (
                <ListItem key={address.lat}>
                  <ListItemText
                    id="replocatorLink"
                    style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline', fontWeight: 'bold' }}
                    onClick={onClickReplocatorLink(issue, `https://www.pa.org.za/place/latlon/${address.lat},${address.lng}/?#${repLocatorFragment}`)}
                    primary={address.formatted_address} />
                </ListItem>
              ))
            }
          </List>
        </>
      )
    } else {
      return ('')
    }
  }
}
