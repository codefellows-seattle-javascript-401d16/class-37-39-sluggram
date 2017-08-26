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
import State from 'material-ui/svg-icons/Image/dehaze'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';


class LoggedOut extends React.Component {
  render(){
    return(
      <IconMenu
        iconButtonElement={
          <IconButton><State color={"white"}/></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem primaryText="Dash Board"
        containerElement={<Link to="/Dash Board"/>}
        />
        <MenuItem
          primaryText="Log Out"
          containerElement={<Link to="/"/>}
        />
        <MenuItem primaryText="Settings"
        containerElement={<Link to="/Settings"/>}
        />
      </IconMenu>
    )

  }
}

export default LoggedOut
