import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as MinActions from '../actions/min';

import Mins from './Mins';



class Main extends React.Component {
  componentDidMount() {
    this.props.actions.fetchPublicMins();
  }

  render() {
    return(
      <Mins data={this.props.min.publicMins} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    min: state.min
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(MinActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
