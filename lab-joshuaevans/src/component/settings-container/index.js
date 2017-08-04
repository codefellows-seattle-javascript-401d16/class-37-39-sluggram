import React from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ProfileForm from '../profile-form';
import { profileCreateRequest } from '../../action/profile-actions.js';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';


class SettingsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleProfileCreate = this.handleProfileCreate.bind(this);
    this.handleProfileUpdate = this.handleProfileUpdate.bind(this);
  }

  handleProfileCreate(profile) {
    return this.props.profileCreate(profile)
      .then((res) => {
        this.props.history.push('/dashboard')
      })
      .catch(console.error);
  }

  handleProfileUpdate() {
  }

  render() {
    const handleComplete = this.props.profile
      ? this.handleProfileCreate
      : this.handleProfileUpdate;

    return (
      <div className="settings-container">
        <ProfileForm
          buttonText="create profile"
          onComplete={this.handleProfileCreate}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
});

const mapDispatchToProps = dispatch => ({
  profileCreate: profile => dispatch(profileCreateRequest(profile)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer);
