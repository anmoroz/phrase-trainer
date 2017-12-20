import React, { Component } from "react"
import { withStyles } from 'material-ui/styles';

import ItemsList from '../components/ItemsList';

const styles = theme => ({
    contentwrapper: {
        alignItems: "center",
        maxWidth: "1000px",
        margin: "0 auto",
        paddingTop: "78px"
    }
});

function Main(props) {
    const { classes } = props;
    return (
        <div className={classes.contentwrapper}>
            <ItemsList />
        </div>
    )
}

export default withStyles(styles)(Main);