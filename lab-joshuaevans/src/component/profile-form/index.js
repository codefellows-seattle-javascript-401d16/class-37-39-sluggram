import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as util from '../../lib/util.js';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import ContentAdd from 'material-ui/svg-icons/content/add';


class ProfileForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = props.profile
      ? { ...props.profile, preview: '', open: false }
      : { bio: '', avatar: null, preview: '', open: false };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(props) {
    if (props.profile) {
      this.setState(props.profile)
    }
  }

  handleChange(e) {
    const { type, name } = e.target;

    if (name === 'bio') {
      this.setState({ bio: e.target.value });
    }

    if (name === 'avatar') {
      const { files } = e.target;
      const avatar = files[0];
      this.setState({ avatar });
      util.photoToDataURL(avatar)
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
        >
          <CardHeader
            title="Settings"
            subtitle="Configure your profile"
            avatar={this.state.preview}
            showExpandableButton={true}
            actAsExpander={true}
          />
          <CardMedia expandable={true}>
            <img src={this.state.preview} alt="avatar preview" />
          </CardMedia>
          <CardMedia>
            <form
              className="profile-form"
              onSubmit={this.handleSubmit}
            >
              <input
                type="file"
                name="avatar"
                onChange={this.handleChange}
                ref={ref => this.upload = ref}
                style={{ display: 'none' }}
              />
              <FloatingActionButton
                className="floatingButton"
                mini={true}
                style={{ margin: '16px' }}
                backgroundColor="#aaa"
                onClick={e => this.upload.click()}
              >
                <ContentAdd />
              </FloatingActionButton>
              <TextField
                name="bio"
                value={this.state.bio}
                onChange={this.handleChange}
                hintText="Write a Bio"
                multiLine={true}
                rows={2}
              />

              <RaisedButton
                type="submit"
                label={this.props.buttonText}
                fullWidth={true}
              />
            </form>
          </CardMedia>
        </Card>
      </MuiThemeProvider>
    );
  }
}

export default ProfileForm;
