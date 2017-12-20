import React from 'react';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import { Link } from 'react-router-dom'

const styles = theme => ({
    root: {
        width: '100%',
    },
    wrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center'
    },
    navItem: {
        listStyle: 'none',
        display: 'inline-block',
        marginLeft: '10px',
        textDecoration: 'none'
    },
});

function ButtonAppBar(props) {
    const { classes } = props;

    return (
        <div className={classes.root}>
            <AppBar position="fixed">
                <Toolbar>
                    <div className={classes.wrapper}>
                        <Typography type="title" color="inherit" className={classes.flex}>
                            Phrase trainer <small>v</small>1.2
                        </Typography>
                        <Typography type="subheading" component="p">
                        <nav>
                            <ul>
                                <li className={classes.navItem}><Link to='/'>Trainer</Link></li>
                                <li className={classes.navItem}><Link to='/list'>Phrase list</Link></li>
                            </ul>
                        </nav>
                        </Typography>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default withStyles(styles)(ButtonAppBar);