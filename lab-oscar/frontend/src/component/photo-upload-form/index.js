import React from 'react';
import * as util from '../../lib/util.js';

class PhotoForm extends React.Component {
  constructor(props){
    console.log('*****',props );
    super(props);
    this.state = {
      photURI : this.props.photoURI? this.props.photURI : '',
      description: this.props.description ? this.props.description : '',
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
    return(
      <form
        onSubmit={this.handleSubmit}
      >
        <img src={this.state.preview} />

        <input
          type='file'
          name='photoURI'
          onChange={this.handleChange}
        />

        <textarea
          type='text'
          name='description'
          value={this.state.description}
          onChange={this.handleChange}
        >
        </textarea>

        <button type='submit'> {this.props.buttonText}</button>
      </form>
    );
  }
}

export default PhotoForm;
