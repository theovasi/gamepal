import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Grid from "@material-ui/core/Grid";
import FaceRounded from "@material-ui/icons/FaceRounded";
import GroupRounded from "@material-ui/icons/GroupRounded";
import SchoolRounded from "@material-ui/icons/SchoolRounded";
import Header from './Header'
import { Cookies, withCookies } from 'react-cookie';


const serverURL = "http://localhost:8080/";

const styles = { card: { width: '100%',
    height: 200,
    float: 'left',
    marginTop: 10,
  },
  media: {
    objectFit: 'cover',
  },

  cardHeadline: {
    height: 20,
    padding: '5 0 5 10',
    backgroundColor: '#EDF0F3'
  }
};

class MostPlayed extends Component {

  constructor() {
    super();

    this.state = {

    };
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid item>
        <Card className={ classes.card }>
          <Typography gutterBottom variant="h7" className={ classes.cardHeadline }>
           Statistics 
          </Typography>
          <List dense={ true }>
            <ListItem>
              <ListItemIcon>
                <FaceRounded />
              </ListItemIcon>
              <ListItemText primary="Friendly" />
              <ListItemAvatar>
                <Avatar
                  src="/src/static/images/rating.png"
                  alt="Rating"
                />
              </ListItemAvatar>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <GroupRounded />
              </ListItemIcon>
              <ListItemText primary="Good teammate" />
              <ListItemAvatar>
                <Avatar
                  src="/src/static/images/rating.png"
                  alt="Rating"
                />
              </ListItemAvatar>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <SchoolRounded />
              </ListItemIcon>
              <ListItemText primary="Helpful" />
              <ListItemAvatar>
                <Avatar
                  src="/src/static/images/rating.png"
                  alt="Rating"
                />
              </ListItemAvatar>
            </ListItem>
          </List>
        </Card>
      </Grid> 
    );
  }
}

MostPlayed.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(MostPlayed);
