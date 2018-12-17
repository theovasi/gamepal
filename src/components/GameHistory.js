import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import FaceRounded from "@material-ui/icons/FaceRounded";
import GroupRounded from "@material-ui/icons/GroupRounded";
import SchoolRounded from "@material-ui/icons/SchoolRounded";
import Avatar from "@material-ui/core/Avatar";
import { Cookies, withCookies } from 'react-cookie';


const serverURL = "http://localhost:8080/";

const styles = {
  card: {
    width: '100%',
    height: 605,
    float: 'right',
    marginTop: 10,
  },

  cardHeadline: {
    height: 20,
    padding: '5 0 5 10',
    backgroundColor: '#EDF0F3'
  },

  gameEntry: {
    height: 110,
    margin: '5 5 5 5',
    borderRadius: 4
  },

  indicatorWin: {
    height: '100%',
    width: '5%',
    backgroundColor: '#28965A',
    borderRadius: '0 4px 4px 0',
    float: 'right'

  },

  indicatorDefeat: {
    height: '100%',
    width: '5%',
    backgroundColor: '#D64933',
    borderRadius: '0 4px 4px 0',
    float: 'right'
  },

  gameEntryContent: {
    width: '95%',
    float: 'left',
  },

  gameEntryHeader: {
    width: '100%',
    height: 30,
    borderBottom: '1px solid #EDF0F3'
  },

  gameEntryTitle: {
    float: 'left',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '5 5 5 10' 
  }, 

  gameEntrySubtitle: {
    float: 'right',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '5 10 5 5' 
  },

  team: {
    height: 50,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  ratingReceived: {
    height: 20,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  teammateAvatar: {
    width: 30,
    height: 30,
    borderRadius: 20,
    margin: 3
  },

  gameEntryIcon: {
    padding: 5
  }
};

class GameHistory extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Grid item xs={9}>
        <Card className={ classes.card }>
          <Typography variant="h7" className={ classes.cardHeadline }>
            Game History 
          </Typography>
          <Card className={ classes.gameEntry }>
            <div className={ classes.gameEntryContent }>
              <div className={ classes.gameEntryHeader }>
                <Typography variant="title" color="textPrimary" 
                  className={ classes.gameEntryTitle }>Overwatch</Typography>
                <Typography variant="subtitle2" color="textSecondary" 
                  className={ classes.gameEntrySubtitle }>5 minutes ago</Typography>
              </div>
              <div className={ classes.team }>
                <Typography variant="subtitle2" color="textSecondary">With:</Typography>
                <Avatar className={ classes.teammateAvatar }
                  src="src/static/images/teammate.jpg"
                />
                <Avatar className={ classes.teammateAvatar }
                  src="src/static/images/teammate.jpg"
                />
                <Avatar className={ classes.teammateAvatar }
                  src="src/static/images/teammate.jpg"
                />
                <Avatar className={ classes.teammateAvatar }
                  src="src/static/images/teammate.jpg"
                />
                <Avatar className={ classes.teammateAvatar }
                  src="src/static/images/teammate.jpg"
                />
                <Avatar className={ classes.teammateAvatar }
                  src="src/static/images/teammate.jpg"
                />
              </div>
              <div className={ classes.ratingReceived }>
                <Typography variant="subtitle2"
                  color="textSecondary">Avg. rating received:
                </Typography>
                <FaceRounded color="action" className={ classes.gameEntryIcon }/>
                <Avatar
                  src="src/static/images/rating.png"
                />
                <GroupRounded color="action" className={ classes.gameEntryIcon }/>
                <Avatar
                  src="src/static/images/rating.png"
                />
                <SchoolRounded color="action" className={ classes.gameEntryIcon }/>
                <Avatar
                  src="src/static/images/rating.png"
                />
              </div>
            </div>
            <div className={ classes.indicatorWin }>
            </div>
          </Card>
          <Card className={ classes.gameEntry }>
            <div className={ classes.gameEntryContent }>
              <div className={ classes.gameEntryHeader }>
                <Typography variant="title" color="textPrimary"
                  className={ classes.gameEntryTitle }>Overwatch</Typography>
                <Typography variant="subtitle2" color="textSecondary"
                  className={ classes.gameEntrySubtitle }>3 hours ago</Typography>
              </div>
            </div>
            <div className={ classes.indicatorDefeat }>
            </div>
          </Card>
          <Card className={ classes.gameEntry }>
            <div className={ classes.gameEntryContent }>
              <div className={ classes.gameEntryHeader }>
                <Typography variant="title" color="textPrimary"
                  className={ classes.gameEntryTitle }>Fortnite</Typography>
                <Typography variant="subtitle2" color="textSecondary" 
                  className={ classes.gameEntrySubtitle }>November 25th</Typography>
              </div>
            </div>
            <div className={ classes.indicatorWin }>
            </div>
          </Card>
        </Card>
      </Grid>
    );
  }
}

GameHistory.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(GameHistory);
