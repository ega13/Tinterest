import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, Redirect } from 'react-router-dom';

import * as AuthActions from '../actions/auth';
import { LOCALSTORAGEKEY, GITHUBREPOURL } from '../common';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';



const styles = {
  appBar: {
    boxShadow: 'none'
  },
  titleStyle: {
    fontFamily: 'Josefin Sans, sans-serif',
    fontSize: '28px'
  },
  iconStyleRight: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: '0'
  },
  buttonStyle: {
    marginTop: '0',
    lineHeight: '0',
    boxSizing: 'borderBox',
    border: '1px solid black',
    borderRadius: '4px',
  }
};

class Auth extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      drawerOpened: false
    };
  }

  handleAuthButtonClick(localAuth) {
    const actions = this.props.actions;

    localAuth ? actions.signOut() : actions.signInWithTwitter();
  }

  render() {
    const localAuth = JSON.parse(window.localStorage.getItem(LOCALSTORAGEKEY));
    const auth = this.props.auth;
    const pathname = window.location.pathname;
    const iconElementRight =
      <FlatButton
        disabled={auth.inProgress ? true : false}
        style={styles.buttonStyle}
        label={auth.inProgress ? ':D' : (localAuth ? 'Sign out' : <span><i className="fa fa-twitter" aria-hidden="true"></i> Sign in</span>)}
        onClick={() => this.handleAuthButtonClick(localAuth)}
      />;

    if (!localAuth && pathname === '/dashboard') {
      return <Redirect to="/" />;
    }

    return(
      <div>
        <AppBar
          style={styles.appBar}
          titleStyle={styles.titleStyle}
          iconStyleRight={styles.iconStyleRight}
          title="Tinterest"
          iconElementRight={iconElementRight}
          onTitleTouchTap={() => this.props.history.push('/')}
          onLeftIconButtonTouchTap={() => this.setState({drawerOpened: true})}
        />

        <Drawer
          docked={false}
          open={this.state.drawerOpened}
          onRequestChange={(drawerOpened) => this.setState({drawerOpened})}
        >
          <MenuItem onClick={() => this.props.history.push('/')}>Home</MenuItem>
          <MenuItem onClick={() => this.props.history.push('/dashboard')}>Dashboard</MenuItem>
          <MenuItem onClick={() => window.open(GITHUBREPOURL)}>GitHub Repository</MenuItem>
        </Drawer>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(AuthActions, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Auth));
