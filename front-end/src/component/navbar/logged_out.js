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
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import Dehaze from 'material-ui/svg-icons/Image/dehaze'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import * as querystring from 'querystring'
import FlatButton from 'material-ui/FlatButton'

class LoggedOut extends React.Component {
  render(){
    let googleLoginBaseURL='https://accounts.google.com/o/oauth2/v2/auth'
    let googleLoginQuery = querystring.stringify({
      client_id: __GOOGLE_CLIENT_ID__,
      response_type: 'code',
      redirect_uri:`${__API_URL__}/oauth/google/code`,
      scope: 'openid profile email',
      prompt: __DEBUG__ ? 'consent' : undefined,
    })
    console.log(__API_URL__,'!!!');
    let googleLoginURL = `${googleLoginBaseURL}?${googleLoginQuery}`


    return(
          <FlatButton
            label="LOGIN"
            href={googleLoginURL}
            style={{color:"white", marginTop: 5}}
          />
    )
  }
}

export default LoggedOut
