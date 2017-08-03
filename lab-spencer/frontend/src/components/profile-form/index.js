import React from 'react';
import {photoToDataURL, log, logError} from '../../lib/util.js';
import {connect} from 'react-redux';
import superagent from 'superagent';

class ProfileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.profile ? { ...props.profile, preview: '' }
      : {
        bio: '',
        avatar: null,
        preview: '',
      };


    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(props) {
    superagent.get(`${__API_URL__}/profiles/me`)
      .set('Authorization', `Bearer ${props.auth}`)
      .then(res => {
        log(res.body);
        this.setState({ bio: res.body.bio, preview: res.body.avatar });
      })
      .catch(logError);
  }

  handleChange(event) {
    let {name, value} = event.target;

    if(name === 'bio')
      this.setState({ [name]: value });

    if(name === 'avatar') {
      let {files} = event.target;
      let avatar = files[0];
      this.setState({avatar});
      photoToDataURL(avatar)
        .then(preview => this.setState({preview}))
        .catch(logError);
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onComplete(this.state);
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
          name='bio'
          value={this.state.bio}
          onChange={this.handleChange}
          placeholder='Biography'
        ></textarea>
        <button
          type='submit'
          onSubmit={this.handleSubmit}
        >
          {this.props.buttonText}
        </button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
});

const mapDispatchToProps = (dispatch, getState) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm);
