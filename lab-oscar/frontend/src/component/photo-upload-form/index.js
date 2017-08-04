import React from 'react';
import * as util from '../../lib/util.js';
import './_photo-form.scss';

class PhotoForm extends React.Component {
  constructor(props){
    console.log('*****',props );
    super(props);
    this.state = {
      photURI : this.props.photo? this.props.photo.photURI : '',
      description: this.props.photo ? this.props.photo.description : '',
      preview: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(props){
    if(props.photoURI)
      console.log('&&&&&', props.photoURI);
  }

  handleChange(e){
    let {type, name} = e.target;

    if(name === 'description'){
      this.setState({description: e.target.value});
    }

    if(name === 'photoURI'){
      let {files} = e.target;
      let photoURI = files[0];
      this.setState({photoURI});
      util.photoToDataURL(photoURI)
        .then(preview => this.setState({preview}))
        .catch(console.error);
    }
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.onComplete(this.state);
  }

  render(){
    console.log('^^^^',this.state);
    return(
      <div className='photo-upload-form'>
        <div className='profile-preview'>
          {this.state.preview != ''?
            <img src={this.state.preview} />
            : null }
        </div>
        <div className='form-container'>
        <form
          onSubmit={this.handleSubmit}
        >
          {!this.props.photo ?
            <input
              type='file'
              name='photoURI'
              onChange={this.handleChange}
            />
            :
            null
          }
          <textarea
            type='text'
            name='description'
            value={this.state.description}
            onChange={this.handleChange}
          >
          </textarea>

          <button type='submit'> {this.props.buttonText}</button>
        </form>
      </div>
      </div>
    );
  }
}

export default PhotoForm;
