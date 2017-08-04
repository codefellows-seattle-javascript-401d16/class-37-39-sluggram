import React from 'react';
import * as util from '../../lib/util.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class PhotoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photoURI: this.props.photoURI ? this.props.photoURI : '',
      description: this.props.description ? this.props.description : '',
      preview: '',
      photoExpanded: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(props){
    if (props.photoURI) {
      console.log('got props on phform', props.photoURI);
    }
  }

  handleChange(e) {
    const { type, name } = e.target;

    this.setState({ photoExpanded: true });

    if (name === 'photoURI') {
      const { files } = e.target;
      const photoURI = files[0];
      this.setState({ photoURI });
      util.photoToDataURL(photoURI)
        .then(preview => this.setState({ preview }))
        .catch(console.error);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onComplete(this.state);
  }

  render() {
    return (
      <MuiThemeProvider>
        <Card
          style={{ margin: '18px 22px 18px 0' }}
          expanded={this.state.photoExpanded}
        >
          <CardHeader
            title="Add a Photo"
            showExpandableButton={true}
            actAsExpander={true}
          />
          <CardMedia
            expandable={true}
          >

            <img src={this.state.preview} alt="preview" />

          </CardMedia>
          <CardMedia>
            <form
              className="photo-form"
              onSubmit={this.handleSubmit}
            >
              <input
                type="file"
                name="photoURI"
                onChange={this.handleChange}
                ref={ref => this.upload = ref}
                style={{ display: 'none' }}
              />

              <RaisedButton
                className="photo-upload-button"
                onClick={e => this.upload.click()}
                fullWidth={true}
                label="Upload"
              />
            </form>
          </CardMedia>
        </Card>
      </MuiThemeProvider>
    );
  }
}

export default PhotoForm;
