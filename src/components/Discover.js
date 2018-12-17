import React from 'react';
import { Cookies, withCookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import Header from './Header';
import { withStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import FaceRounded from "@material-ui/icons/FaceRounded";
import GroupRounded from "@material-ui/icons/GroupRounded";
import SchoolRounded from "@material-ui/icons/SchoolRounded";

const serverURL = "http://localhost:8080/";

const styles = {
  root: {
    margin: '0 auto',
    maxWidth: '1280px',
    flexGrow: 1,
  },

  searchContainer: {
    height: 200,
    width: '100%',
		margin: '5 0 5 0', backgroundColor: '#eee',
    display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
  },

  recommendedContainer: {
    margin: '0 auto',
    width: '60%'
  },

	searchBar: {
		width: '60%',
		height: 40,
    display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff',
	},

	searchInput: {
		width: '95%',
		height: '100%',
		padding: '5 5 5 10',
    display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},

  searchIcon: {
    height: '100%',
		width: '5%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

	userRating: {
		width: '30%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
	},

	ratingIcon: {
		padding: 5
	}
}

class Discover extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
    classes: instanceOf(Object).isRequired
  }

  generate = (element) => {
    return [0, 1, 2, 3, 4, 5].map(value => 
      React.cloneElement(element, {
        key: value,
      }),
    );
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={ classes.root }>
        <Header cookies={ this.props.cookies }/>
        <Card className={ classes.searchContainer }>
					<Card className={ classes.searchBar }>
						<InputBase
							placeholder="Search…"
							classes={{
								root: classes.searchInput,
								input: classes.inputInput,
							}}
						/>
						<div className={classes.searchIcon}>
							<SearchIcon />
						</div>
					</Card>
        </Card>
        <Card className={ classes.recommendedContainer }>
          <List dense={ true }>
            {this.generate(
              <ListItem>
                <ListItemAvatar>
                  <Avatar
                    src='src/static/images/teammate.jpg'
                  />
                </ListItemAvatar>
                <ListItemText 
                  primary="Username"
                />
                <div className={ classes.userRating }>
									<FaceRounded color="action" className={ classes.ratingIcon }/>
									<Avatar
										src="src/static/images/rating.png"
									/>
									<GroupRounded color="action" className={ classes.ratingIcon}/>
									<Avatar
										src="src/static/images/rating.png"
									/>
									<SchoolRounded color="action" className={ classes.ratingIcon}/>
									<Avatar
										src="src/static/images/rating.png"
									/>
                </div>
              </ListItem>
            )}
          </List>
        </Card>
      </div>
    ); 
  }
}

export default withStyles(styles)(withCookies(Discover));
