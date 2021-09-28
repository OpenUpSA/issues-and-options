import { FormControl, List, ListItem, TextField } from '@material-ui/core';
import React, { Component } from 'react'

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
                  const demarcationCode = response.data[0]['municipality.demarcation_code'];
                  const phoneNumber = response.data[0]['municipality.phone_number'];
                  const url = response.data[0]['municipality.url'];
                  const name = response.data[0]['municipality.name'];
                  this.setState({
                    municipal_addresses_found: [{
                      demarcationCode,
                      phoneNumber,
                      url,
                      name
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
                  <ListItem key={address.name}>
                    <p>
                      {address.name} ({address.demarcationCode}): {address.phoneNumber}
                    </p>
                  </ListItem>
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
      <div>
        {this.getHtml(issue)}
      </div>
    )
  }
}
