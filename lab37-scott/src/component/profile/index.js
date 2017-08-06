import React from 'react';
import {connect} from 'react-redux';
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
    //handle avatar input, send to PTDU promise. return the
    if(name === 'avatar'){
      let {files} = e.target;
      let avatar = files[0];
      this.setState({avatar});
      util.photoToDataURL(avatar)
        .then(preview => {
          console.log('preview: ', {preview});
          this.setState({preview});
        })
        .catch(console.error);
    }
  }

  handleSubmit(e){
    e.preventDefault();
    console.log('HS state: ', this.state);
    this.props.onComplete(this.state);
  }

  render(){
    console.log('update form state: ', this.state);
    return(
      <form className='profile-form' onSubmit={this.handleSubmit}>
        <img src={this.state.preview} height='100' width='100'/>
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
        <button type='submit'>{this.props.buttonText}</button>
      </form>
    );
  }

}


let mapStateToProps = (state) => ({
  profile: state.profile,
});
let mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm);
