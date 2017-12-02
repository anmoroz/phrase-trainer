import React, { Component } from "react"
import { withStyles } from 'material-ui/styles';

import PhraseTrainer from '../components/PhraseTrainer';

const styles = theme => ({
    contentwrapper: {
        alignItems: "center",
        maxWidth: "1000px",
        margin: "0 auto",
        paddingTop: "56px"
    }
});

function Main(props) {
    const { classes } = props;
    return (
        <div className={classes.contentwrapper}>
            <PhraseTrainer />
        </div>
    )
}

export default withStyles(styles)(Main);