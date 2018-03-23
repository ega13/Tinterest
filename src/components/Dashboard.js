import React from 'react';
import { connect } from 'react-redux';

import Mins from './Mins';



class Dashboard extends React.Component {
  render() {
    return(
      <Mins data={this.props.min.dashboardMins} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    min: state.min
  };
}

export default connect(mapStateToProps, null)(Dashboard);
