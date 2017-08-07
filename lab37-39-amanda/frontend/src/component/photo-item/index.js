import React from 'react'
import {connect} from 'react-redux'

import PhotoForm from '../photo-form'
import * as util from '../../lib/util.js'
import photoActions from '../../action/photo-action.js'

export class PhotoItem extends React.Component{
  constructor(props){
    super(props)

    this.state = { editing:false }

    this.handlePhotoUpdate = this.handlePhotoUpdate.bind(this)
    this.handlePhotoDelete = this.handlePhotoDelete.bind(this)
  }

  handlePhotoUpdate(photo){
    return this.props.updatePhoto(photo)
      .then(() => {
        this.setState({editing:false})
      })
      .catch(console.error)
  }

  handlePhotoDelete(){
    return this.props.deletePhoto(this.props.photo)
      .then(console.log)
      .catch(console.error)
  }

  render() {
    let {photo}= this.props
    return(
      <div>
        {util.renderIf(!this.state.editing,
          <div>
            <img src={photo.url} />
            <p> {photo.description} </p>
            <i onClick={this.handlePhotoDelete}
              className='trash-icon' />
            <i onClick={() => this.setState({editing: true})}
              className= 'pencil-icon'/>
          </div>
        )}

        {util.renderIf(this.state.editing,
          <div>
            <PhotoForm
              photo={this.state.photo}
              buttonText='update photo'
              onComplete={this.handlePhotoUpdate}
            />
          </div>
        )}
      </div>
    )
  }
}

let mapStateToProps = () => ({})
let mapDispatchToProps = (dispatch) => ({
  deletePhoto: (photo) => dispatch(photoActions.userPhotoDeleteRequest(photo)),
  updatePhoto: (photo) => dispatch(photoActions.userPhotoUpdateRequest(photo)),
})

export default connect (
  mapDispatchToProps,
  mapStateToProps
)(PhotoItem)
