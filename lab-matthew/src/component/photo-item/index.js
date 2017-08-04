import React from 'react'
import {connect} from 'react-redux'
import PhotoForm from '../photo-form'
import * as photoActions from '../../action/photo-actions.js'

class PhotoItem extends React.Component {
  constructor(props){
    super(props)
  }


  render(){
    console.log('photo-item this.props', this.props)
    let {image} = this.props
    return(
      <div className='photo-item'>
        <h2> photo item </h2>

        <img src={this.props.photoURL} />
        <button onClick={() => this.props.photoDelete(image)}> delete photo </button>

        <PhotoForm
          buttonText = 'update photo'
          onComplete={this.props.photoCreate}
          photo={image}
          />

      </div>
    )
  }
}

let mapStateToProps = () => ({
})

let mapDispathToProps = () => ({
})

export default connect(
  mapStateToProps,
  mapDispathToProps
)(PhotoItem)
