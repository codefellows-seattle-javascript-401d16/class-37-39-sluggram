import React from 'react';
import photoToDataURL from '../../lib/photo-to-data-url.js';
import { error, log } from '../../lib/loggers.js';

export default class ProfileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bio: '',
      avatar: null,
      preview: '',
      ...props.profile,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(props) {
    if(props.profile)
      this.setState(props.profile);
  }

  handleChange(evt) {
    const { name, value } = evt.target;
    if(name === 'bio') {
      this.setState({
        bio: value,
      });
    }
    if(name === 'avatar') {
      const { files } = evt.target;
      const avatar = files[0];
      photoToDataURL(avatar)
        .then(preview => this.setState({
          preview,
          avatar,
        }))
        .catch(error);
    }
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.onSubmit(this.state);
  }

  render() {
    return (
      <form
        className='profile-form'
        onSubmit={this.handleSubmit}
      >
        <img src={this.state.preview} />
        <input
          type='file'
          name='avatar'
          onChange={this.handleChange}
        />
        <textarea
          type='text'
          name='bio'
          value={this.state.bio}
          onChange={this.handleChange}
        />
        <button
          type='submit'
        >
          {this.props.buttonText}
        </button>
      </form>
    );
  }
}
