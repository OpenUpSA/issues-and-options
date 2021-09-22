import React, { Component } from 'react'

export default class HTMLRender extends Component {

  getHtml(option) {
    switch (option['Option type']) {
      case 'National Department':
        return (
          <p>
            Find contact details for the {option['Who']} at <a href={option['Option data']}>{option['Option data']}</a>
          </p>
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
