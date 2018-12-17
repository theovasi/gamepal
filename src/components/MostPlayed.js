import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Cookies, withCookies } from 'react-cookie';


const serverURL = "http://localhost:8080/";
const gamePercentages = { 
  'Overwatch': 58,
  'Fortnite': 18,
  'CS:GO': 12,
  'League of Legends': 6,
  'Battlerite': 4,
  'PUBG': 2
}
const gameColors = {
  'Overwatch': '#f99e1a',
  'Fortnite': '#4c51f7',
  'CS:GO': '#0c0f12',
  'League of Legends': '#5f9db3',
  'Battlerite': '#f77565',
  'PUBG': '#74ce39'

}

const styles = {
  card: {
    width: '100%',
    height: 400,
    float: 'left',
    marginTop: 5,
  },
  media: {
    objectFit: 'cover',
  },

  cardHeadline: {
    height: 20,
    padding: '5 0 5 10',
    backgroundColor: '#EDF0F3'
  },

  barListItem: {
    height: 40,
    padding: 5
  },

  title: {
    padding: '2 5 2 5',
    width: '100%',
    textAlign: 'left'
  },

  barContainer: {
    padding: '2 5 2 5',
    width: '100%'
  },

  bar: {
    height: 20,
    float: 'left',
    borderRadius: 5
  },

  percentage: {
    float: 'left',
    width: '20%',
  }
};


class MostPlayed extends Component {

  generateBars = (percentages, colors) => {
    const { classes } = this.props;
    let bars = [];

    for (let key in percentages) {
      bars.push(
        <div className={ classes.barListItem }>
          <Typography className={ classes.title }>
            { key }
          </Typography>
          <div className={ classes.barContainer }>
            <div className={ classes.bar } style={{ width: ""+percentages[key]+"%",
                                                    backgroundColor: colors[key]}}>
            </div>
            <Typography className={ classes.percentage }>
              { percentages[key] }%
            </Typography>
          </div>
        </div>)
    }
    return bars;
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid item>
        <Card className={ classes.card }>
          <Typography gutterBottom variant="h7" className={ classes.cardHeadline }>
            Most Played
          </Typography>
          { this.generateBars(gamePercentages, gameColors) }
        </Card>
      </Grid> 
    );
  }
}

MostPlayed.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(MostPlayed);
