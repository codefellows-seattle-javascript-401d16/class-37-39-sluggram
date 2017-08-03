import React from 'react';
import * as util from '../../lib/util.js';

class ProfileForm extends React.Component{
  constructor(props){
    super(props);
    this.state = props.profile ?
      {...props.profile, preview: ''} : //if update, initial state on update
      { bio: '',
        avatar: null,
        preview: '',
      };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(props){
    if(props.profile) this.setState(props.profile);
  }

  handleChange(e){
    let {type, name} = e.target;
    if(name === 'bio') this.setState({bio: e.target.value});
    if(name === 'avatar'){
      let {files} = e.target;
      let avatar = files[0];
      this.setState({avatar});
      util.photoToDataURL(avatar)
        .then(preview => {

        });
    }
  }

  handleSubmit(e){
    e.preventDefault();

  }

  render(){
    return(
      <form className='profile-form' onSubmit={this.handleSubmit}>
        <img src={this.state.avatar} />
        <input
          type='file'
          name='avatar'
          placeholder='Upload Avatar'
          onChange={this.handleChange}
        />
        <textarea
          name='bio'
          value={this.state.bio}
          onChange={this.handleChange}
        >
        </textarea>

      </form>
    );
  }

}

export default ProfileForm;
