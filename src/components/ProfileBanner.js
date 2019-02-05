import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Header from './Header';
import { Cookies, withCookies } from 'react-cookie';


const serverURL = "http://localhost:8080/";

const styles = {
  card: {
    height: 200,
    width: '100%',
    marginTop: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: `url("src/static/images/test_banner.jpg")`,
    backgroundSize: 'cover'
  },

  userInfo: {
    display: 'block',
  },

  profilePicture: {
    width: 100,
    height: 100,
    border: '3px solid #fff',
    borderRadius: 60,
    margin: '0 auto'
  },

  username: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: '#fff',
    margin: '0 auto',
    textShadow: '0px 0px 10px black'
  },
};

class ProfileBanner extends Component {

  constructor() {
    super();

    this.state = {
      username: null
    };
  }


  render() {
    const { classes } = this.props;

    if (this.state.username == null) {
      let username = fetch(serverURL + 'user', {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": this.props.cookies.get('token') 
        }
      })
        .then(res => res.json())
        .then(data => this.setState({ username: data.username }))
        .catch(err => console.log(err));
    }

    return (
      <Card className={ classes.card }>
        <CardContent className={ classes.userInfo }>
          <CardMedia 
            className={ classes.profilePicture }
            image="src/static/images/profile.jpeg"
            title="Profile picture"
          />
          <Typography component="h5" variant="h5" className={ classes.username }>
            { this.state.username }
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

ProfileBanner.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withCookies(ProfileBanner));
