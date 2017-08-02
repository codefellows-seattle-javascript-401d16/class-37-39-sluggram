import React from 'react';

class ProfileForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {

  }

  handleSubmit(event) {
    event.preventDefault();

  }

  render() {
    return (
      <form
        className='profile-form'
        onSubmit={this.handleSubmit}
      >

      </form>
    );
  }
}

export default ProfileForm;
