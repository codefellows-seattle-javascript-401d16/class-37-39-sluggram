import React from 'react';

class DashboardContainer extends React.Component {
  render(){
    console.log(this.props);
    return(
      <h1> You are now logged in. </h1>
    );
  }
}

export default DashboardContainer;