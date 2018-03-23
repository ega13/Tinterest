import React, { Component } from 'react';

import './Footer.css';


class Footer extends Component {
  render() {
    return(
      <div className="footer">
        <a href=""><i className="fa fa-twitter"></i></a>
        <a href=""><i className="fa fa-facebook-official"></i></a>
        <a href=""><i className="fa fa-google-plus-official"></i></a>
        <a href=""><i className="fa fa-linkedin"></i></a>
        <a href=""><i className="fa fa-github"></i></a>
        <a href=""><i className="fa fa-codepen"></i></a>
        <a href=""><i className="fa fa-envelope-o"></i></a>
        <p>This book trading app was created in fulfilment of the Manage a Book Trading Club project of the Free Code Camp Curriculum</p>
      </div>
    )
  }
}

export default Footer;
