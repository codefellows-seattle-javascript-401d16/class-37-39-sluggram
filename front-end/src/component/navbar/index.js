import MuiStyle from '../../style/_muiStyle.js'
import React from 'react'
import {BrowserRouter, Route, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import appStoreCreate from '../../lib/app-store-create.js'
import LandingContainer from '../landing-container/index.js'
import SettingsContainer from '../settings-container'
import DashboardContainer from '../dashboard-container'
import * as util from '../../lib/util.js'
import {tokenSet} from '../../action/auth-actions.js'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import Paper from 'material-ui/Paper'
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton'
import LoggedOut from './logged_out.js'

class NavBar extends React.Component {
  constructor(props){
    super(props)
    this.state={
      loggedIn:false,
      popOver:false,
    }
    this.handlePopOverEnter = this.handlePopOverEnter.bind(this)
  }

  handlePopOverEnter(e){
    e.preventDefault()

    this.setState({
      popOver: true,
      anchorEl: event.currentTarget,
    })
  }

  handlePopOverExit(prevState){
    this.setState({
      popOver: false,
    })
  }

  render(){
    return(
      <MuiThemeProvider>
          <div>
              <AppBar
                title="Maxelgram"
                style={{color:'9b59b6'}}
                titleStyle={{fontFamily:'Baloo Bhaijaan', textAlign:'center'}}
                iconElementLeft={this.state.loggedIn ? <Logged/>: <LoggedOut />}
              />
          </div>
      </MuiThemeProvider>
    )
  }

}

export default NavBar
