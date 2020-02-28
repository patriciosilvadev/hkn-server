import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { compose } from 'recompose';

import { withStyles } from '@material-ui/core/styles';
import {
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  IconButton,
} from '@material-ui/core';

import AssessmentOutlinedIcon from '@material-ui/icons/AssessmentOutlined';
import AttachmentIcon from '@material-ui/icons/Attachment';
import ListAltIcon from '@material-ui/icons/ListAlt';
import SignOutIcon from '@material-ui/icons/ExitToApp';
import EventIcon from '@material-ui/icons/Event';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import styles from './styles';
import { withFirebase } from '../../services/Firebase';
import * as ROUTES from '../../constants/routes';

const INITIAL_STATES = {
  isDrawerOpen: false,
  isOfficer: false,
};

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATES };
  }

  componentDidMount() {
    this.checkIfOfficer();
  }

  checkIfOfficer = () => {
    const { firebase } = this.props;
    firebase
      .queryCurrentUserRole()
      .then(role => {
        if (role === 'Officer') {
          this.setState({
            isOfficer: true,
          });
        }
      })
      .catch(error => {
        console.log(`ERROR: ${error}`);
      });
  };

  handleDrawerOpen = () => {
    this.setState({ isDrawerOpen: true });
  };

  handleDrawerClose = () => {
    this.setState({ isDrawerOpen: false });
  };

  render() {
    const { classes, children, firebase } = this.props;
    const { isDrawerOpen, isOfficer } = this.state;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position='absolute'
          className={classNames(
            classes.appBar,
            isDrawerOpen && classes.appBarShift
          )}
        >
          <Toolbar disableGutters={!isDrawerOpen} className={classes.toolbar}>
            <IconButton
              color='inherit'
              aria-label='Open drawer'
              onClick={this.handleDrawerOpen}
              className={classNames(
                classes.menuButton,
                isDrawerOpen && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component='h1'
              variant='h6'
              color='inherit'
              noWrap
              className={classes.title}
            >
              HKN Portal
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant='permanent'
          classes={{
            paper: classNames(
              classes.drawerPaper,
              !isDrawerOpen && classes.drawerPaperClose
            ),
          }}
          open={isDrawerOpen}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem button component={Link} to={ROUTES.RESUME}>
              <ListItemIcon>
                <AttachmentIcon />
              </ListItemIcon>
              <ListItemText primary='Resume' />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button component={Link} to={ROUTES.HOME}>
              <ListItemIcon>
                <EventIcon />
              </ListItemIcon>
              <ListItemText primary='Get Involved' />
            </ListItem>
          </List>
          <Divider />
          {isOfficer ? (
            <div>
              <List>
                <ListItem button component={Link} to={ROUTES.INDUCTEES}>
                  <ListItemIcon>
                    <ListAltIcon />
                  </ListItemIcon>
                  <ListItemText primary='Total Points' />
                </ListItem>
              </List>
              <Divider />
            </div>
          ) : null}
          <List>
            <ListItem button component={Link} to={ROUTES.POINTS}>
              <ListItemIcon>
                <AssessmentOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary='Points' />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button onClick={firebase.doSignOut}>
              <ListItemIcon>
                <SignOutIcon />
              </ListItemIcon>
              <ListItemText primary='Logout' />
            </ListItem>
          </List>
        </Drawer>
        <main className={classes.content}>{children}</main>
      </div>
    );
  }
}

NavBar.propTypes = {
  children: PropTypes.objectOf(React.Component).isRequired,
};

export default compose(withStyles(styles), withFirebase)(NavBar);
