import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as MinActions from '../actions/min';

import { Card, CardMedia, CardText } from 'material-ui/Card';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Kaomoji from '../images/kaomoji.png';



const styles = {
  newMinButton: {
    margin: '20px 70px'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  frame: {
    maxWidth: '98%'
  }
}

const initialState = {
  dialogueOpened: false,
  caption: '',
  captionError: null,
  imageUrl: '',
  imageSrc: '',
  imageUrlError: null,
  description: '',
  descriptionError: null,
  imageLoading: false
};

class NewMinDialogue extends React.Component {
  constructor(props) {
    super(props);

    this.state = Object.assign({}, initialState);
  }

  handleNewMinButtonClick() {
    this.setState({dialogueOpened: !this.state.dialogueOpened});
  }

  handleModalSubmit() {
    this.props.actions.addMin(this.props.auth.user, {
      imageUrl: this.state.imageSrc,
      caption: this.state.caption,
      description: this.state.description
    })
    this.closeModalWindow()
    this.setState(Object.assign({}, initialState));
  }

  closeModalWindow() {
    this.setState({dialogueOpened: false});
  }

  render() {
    const newMinButton =
      <FloatingActionButton style={styles.newMinButton} onClick={() => this.handleNewMinButtonClick()}>
        <ContentAdd />
      </FloatingActionButton>;

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={() => this.closeModalWindow()}
      />,

      <FlatButton
        label="Submit"
        primary={true}
        disabled={
          this.state.captionError ||
          this.state.imageUrlError ||
          this.state.descriptionError ||
          !this.state.caption.length ||
          !this.state.imageUrl.length ||
          !this.state.description.length ||
          this.state.imageLoading
        }
        onClick={() => this.handleModalSubmit()}
      />,
    ];

    return(
      <CardText>
        {newMinButton}

        <Dialog
          modal
          repositionOnUpdate
          title="Create a Min (ﾉ≧∀≦)ﾉ:｡･:*:･ﾟ’★,｡･:*:･ﾟ’☆"
          open={this.state.dialogueOpened}
          actions={actions}
          autoScrollBodyContent={true}
        >
          <div style={styles.container}>
            <Card style={styles.frame}>
              <CardMedia>
                <img
                  alt={this.state.caption}
                  src={this.state.imageSrc}
                  onLoad={() => this.setState({imageLoading: false})}
                  onError={() => this.state.imageSrc ? this.setState({
                    imageSrc: Kaomoji,
                    imageUrlError: 'Invalid URL',
                    imageLoading: false
                  })
                  : null}
                />
              </CardMedia>
            </Card>

            <TextField
              value={this.state.imageUrl}
              hintText="Image URL"
              errorText={this.state.imageUrlError}
              floatingLabelText="Image URL"
              onChange={(event) => this.setState({
                imageUrl: event.target.value,
                imageSrc: event.target.value,
                imageUrlError: null,
                imageLoading: true
              })}
            />

            <TextField
              value={this.state.caption}
              hintText="Caption"
              floatingLabelText="Caption"
              onChange={(event) => this.setState({
                caption: event.target.value,
                captionError: null
              })}
            />

            <TextField
              multiLine
              value={this.state.description}
              hintText="Short Description"
              floatingLabelText="Short Description"
              onChange={(event) => this.setState({
                description: event.target.value,
                descriptionError: null
              })}
            />
          </div>
        </Dialog>
      </CardText>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    min: state.min
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(MinActions, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(NewMinDialogue);
