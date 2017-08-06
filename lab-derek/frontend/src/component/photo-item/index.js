import React from 'react';
import {connect} from 'react-redux';
import PhotoForm from '../photo-form';
import * as util from '../../lib/util.js';
import * as photoActions from '../../actions/photo-actions.js';

class PhotoItem extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    let {image} = this.props;
    return(
      <div className='photo-item'>
        <h2> photo item </h2>
        {util.renderIf(this.props.image,
          <img src={this.props.image.url} />
        )}
        {util.renderIf(this.props.image.owner === this.props.state.profile.owner,
          <button onClick={() => this.props.photoDelete(image)}> delete photo </button>)}
      </div>
    );
  }
}

let mapStateToProps = (state) => ({
  state: state,
});

let mapDispatchToProps = () => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PhotoItem);
