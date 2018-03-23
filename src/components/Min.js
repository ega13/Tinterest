import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as MinActions from '../actions/min';
import { ROOTURL, LOCALSTORAGEKEY, COLWIDTH, COLMARGIN } from '../common';

import { pink300 } from 'material-ui/styles/colors';
import { Card, CardActions, CardMedia, CardText } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import Kaomoji from '../images/kaomoji.png';


const margin = 16;

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: COLMARGIN + 'px',
    width: COLWIDTH + 'px'
  },
  image: {
    margin: [margin, margin, 0, margin].join("px ") + "px",
    width: (COLWIDTH - margin * 2) + 'px'
  },
  overlay: {
    padding: '10px',
    color: 'white'
  },
  overlayTitle: {
    fontSize: '14px'
  },
  buttonsContainer: {
    margin: '0 6px'
  },
  iconButton: {
    width: '36px',
    height: '36px',
    marginRight: '0',
    padding: '6px'
  },
  icon: {
    fontSize: '18px',
    color: '#000000'
  },
  descriptionContainer: {
    padding: '4px 20px 12px 20px'
  },
  author: {
    marginTop: '16px',
    fontSize: '12px'
  },
  deleteButtonContainer: {
    display: 'flex',
    justifyContent: 'center'
  }
};

class Min extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageError: false,
      expanded: false,
      deleteButtonLabel: 'Delete Min',
      confirmDelete: false
    };
  }

  handleDeleteButton(min) {
    if (!this.state.confirmDelete) {
      this.setState({
        deleteButtonLabel: 'Confirm',
        confirmDelete: true
      });
    }
    else if (this.state.confirmDelete) {
      this.props.actions.deleteMin(min);
    }
  }

  render() {
    const min = this.props.min;
    const localAuth = JSON.parse(window.localStorage.getItem(LOCALSTORAGEKEY));
    const overlay =
      <div style={styles.overlay}>
        <div style={styles.overlayTitle}>{min.caption}</div>
      </div>;

    return(
      <Card expanded={this.state.expanded} style={styles.container}>
        <CardMedia
          style={styles.image}
          overlayContentStyle={{paddingTop: '0', background: '#99ddff'}}
          overlay={overlay}
        >
          <img
            alt={min.caption}
            src={this.state.imageError ? Kaomoji : min.imageUrl}
            onError={() => this.setState({imageError: true})}
          />
        </CardMedia>

        <CardActions style={styles.buttonsContainer}>
          <IconButton
            style={styles.iconButton}
            iconStyle={styles.icon}
            iconClassName="fa fa-twitter"
            onClick={() => window.open(`https://twitter.com/intent/tweet?text=${min.description}%20(${ROOTURL})`)}
          />

          {
            localAuth ?
              (
                <span>
                  <IconButton
                    disabled={localAuth ? (localAuth.user.uid === min.uid ? true : false) : false}
                    style={{...styles.iconButton, margin: '0 12px'}}
                    iconStyle={min.liked ? (Object.keys(min.liked).indexOf(localAuth.user.uid) < 0 ? styles.icon : {...styles.icon, color: pink300}) : styles.icon}
                    iconClassName={min.liked ? (Object.keys(min.liked).indexOf(localAuth.user.uid) < 0 ? 'fa fa-heart-o' : 'fa fa-heart') : 'fa fa-heart-o'}
                    onClick={() => this.props.actions.likeMin(this.props.auth.user, min)}
                  />
                  {min.liked ? Object.keys(min.liked).length : 0}
                </span>
              ) :
              null
          }

          <IconButton
            style={{...styles.iconButton, float: 'right'}}
            iconStyle={styles.icon}
            iconClassName="fa fa-plus-square-o"
            onClick={() => this.setState({expanded: !this.state.expanded})}
          />
        </CardActions>

        <CardText style={styles.descriptionContainer} expandable>
          <div>{min.description}</div>
          <div style={styles.author}>Shared by {min.author}</div>
          {
            localAuth && localAuth.user.uid === min.uid ?
            (
              <div>
                <br />
                <br />
                <div style={styles.deleteButtonContainer}>
                  <RaisedButton
                    secondary={this.state.confirmDelete}
                    label={this.state.deleteButtonLabel}
                    onClick={() => this.handleDeleteButton(min)}
                  />
                </div>
              </div>
            ) :
            null
          }
        </CardText>
      </Card>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(MinActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Min);
