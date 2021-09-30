import { FormControl, List, ListItem, TextField } from '@material-ui/core';
import { Business, Label, Language, LocalPhoneOutlined } from '@material-ui/icons';
import React, { Component } from 'react';
import ReactGA from 'react-ga';


export const onClickReplocatorLink = (issue) => (e) => {
  e.preventDefault();
  const label = `${issue['What does your issue most closely relate to?']} - ${issue['Who']}`
  ReactGA.event({
    category: 'Option',
    action: 'Action new tab',
    label
  });
}


export default class HTMLRender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      municipal_addresses_found: []
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

  getHtml(option) {
    switch (option['Option type']) {
      case 'National Department':
        return (
          <p>
            Find contact details for the {option['Who']} at <a href={option['Option data']}>{option['Option data']}</a>
          </p>
        )

      case 'Municipal Department':
        return (
          <>
            <FormControl fullWidth
              style={{ width: '80%', alignContent: 'center', margin: 'auto' }}
            >
              <TextField
                fullWidth sx={{ m: 1 }}
                id="address"
                name="address"
                label={`Enter your address to find your ${option['Who']}`}
                variant="outlined"
                value={this.state.address}
                onChange={this.onMunicpalValueChange}
              />
            </FormControl>
            <List>
              {
                this.state.municipal_addresses_found.map(address => (
                  <div key={address.name}>
                    <ListItem>
                      <Label /> Name: {address.longName}
                    </ListItem>
                    <ListItem>
                      <LocalPhoneOutlined /> Phone Number:
                      <a
                        href={`tel:${address.phoneNumber}`}
                        onClick={onClickReplocatorLink(option)}
                      >
                        {address.phoneNumber}
                      </a>
                    </ListItem>
                    <ListItem>
                      <Language /> Website Url:
                      <a href={address.url} target="_blank" rel="noreferrer">
                        {address.url}
                      </a>
                    </ListItem>
                    <ListItem>
                      <Business /> Street Address:
                      <a href={`https://maps.google.com/?q=${address.streetAddress}`}
                        target="_blank"
                        rel="noreferrer">
                        {address.streetAddress}
                      </a>
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
