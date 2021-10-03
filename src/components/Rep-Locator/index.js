import { FormControl, List, ListItem, ListItemText, TextField } from '@material-ui/core';
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
          <FormControl fullWidth
            style={{ width: '80%', alignContent: 'center', margin: 'auto' }}
          >
            <p>Enter your address to find your {who}</p>
            <TextField
              fullWidth sx={{ m: 1 }}
              id="address"
              name="address"
              label="Your address or neighbourhood"
              variant="outlined"
              value={this.state.address}
              onChange={this.onChange}
            />
          </FormControl>
          <List>
            {
              addresses_found.map(address => (
                <ListItem key={address.lat}>
                  <a
                    href={`https://www.pa.org.za/place/latlon/${address.lat},${address.lng}/?#${repLocatorFragment}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Click to open.">
                    <ListItemText
                      id="replocatorLink"
                      onClick={onClickReplocatorLink(issue)}
                      primary={address.formatted_address} />
                  </a>
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
