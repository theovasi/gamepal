import React, { Component } from "react";
import PropTypes from 'prop-types';
import "../static/css/profile.css";
import Grid from "@material-ui/core/Grid";
import { withStyles } from '@material-ui/core/styles';
import Header from './Header'
import ProfileBanner from './ProfileBanner'
import GameHistory from './GameHistory'
import Statistics from './Statistics'
import MostPlayed from './MostPlayed'
import { Cookies, withCookies } from 'react-cookie';


const serverURL = "http://localhost:8080/";
const styles = {
  root: {
    margin: '0 auto',
    maxWidth: '1280px',
    flexGrow: 1,
  }
}

class Profile extends Component {
  render() {
     
  const { classes } = this.props;

  return (
    <div className={ classes.root }>
      <Grid container direction={ 'column' }>
        <Header cookies={ this.props.cookies }/>
        <ProfileBanner cookies={ this.props.cookies }/>
        <Grid container item spacing={ 8 }>
          <Grid container item direction={ 'column' } xs={3}>
            <Statistics />
            <MostPlayed />
          </Grid>
          <GameHistory />
        </Grid>
      </Grid>
    </div>
  );
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withCookies(Profile));
