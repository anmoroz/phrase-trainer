import React from 'react';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

const styles = theme => ({
    root: {
        width: '100%',
    },
    wrapper: {
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        alignItems: "center"
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
                            Phrase trainer v. 1.0
                        </Typography>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default withStyles(styles)(ButtonAppBar);