import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Dialog from 'material-ui/Dialog';
import TimerIcon from 'material-ui-icons/Timer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';
import Slide from 'material-ui/transitions/Slide';

import { FormControl, FormLabel, FormControlLabel } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';

const styles = {
    root: {
        width: '100%',
    },
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
    contentWrapper: {
        alignItems: "center",
        maxWidth: "1000px",
        width: "100%",
        margin: "0 auto",
        paddingTop: "56px"
    },
};

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class FullScreenDialog extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            open: false,
        };
    }

    handleNumberInputChange(event) {
        console.log(event.target.value);
        /*this.setState({
            [key]: parseInt(event.target.value, 10),
        });*/
    };

    handleClickOpen() {
        this.setState({ open: true });
    };

    handleRequestClose() {
        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Button
                    onClick={() => this.handleClickOpen()}
                    style={{'color':'white'}}
                >
                    Settings
                </Button>
                <Dialog
                    fullScreen
                    open={this.state.open}
                    onRequestClose={() => this.handleRequestClose()}
                    transition={Transition}
                    className={classes.root}
                >
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton color="contrast" onClick={() => this.handleRequestClose()} aria-label="Close">
                                <CloseIcon style={{'color':'white'}} />
                            </IconButton>
                            <Typography type="title" color="inherit" className={classes.flex}>
                                Settings
                            </Typography>
                            <Button style={{'color':'white'}} onClick={() => this.handleRequestClose()}>
                                save
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <div className={classes.contentWrapper}>
                        <TimerIcon />
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="position-top">sec</InputLabel>
                            <Input
                                id="position-top"
                                type="number"
                                value={10}
                                onChange={(event) => this.handleNumberInputChange(event)}
                            />
                        </FormControl>


                    </div>
                </Dialog>
            </div>
        );
    }
}

FullScreenDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FullScreenDialog);