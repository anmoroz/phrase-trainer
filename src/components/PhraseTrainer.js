import React from 'react';
import Axios from 'axios';

import Button from 'material-ui/Button';

import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

import SwapHorizIcon from 'material-ui-icons/SwapHoriz';
import IconButton from 'material-ui/IconButton';

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop: 10,
        marginBottom: 40,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        marginBottom: '-26px',
        height: '100%',
    },
    startButton: {
        marginTop: 40,
    },
    button: {
        margin: theme.spacing.unit,
    },
    iconToolbar: {
        textAlign: 'right',
        height: '100%',
    },
});

class PhraseTrainerGrid extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            started: true,
            translationDirection: 'rus-eng',
            translationShow: false,
            phrase: {
                rus: '',
                eng: '',
                category: ''
            },
            block: {
                left: {
                    title: 'Русский',
                    text: ''
                },
                right: {
                    title: 'English',
                    text: ''
                }
            }
        };
    }

    componentDidMount() {
        this.nextPrase()
    }

    handleStart() {
        this.setState((oldState, props) => {
            if (oldState.started == false) {
                this.nextPrase();
            }
            return {
                started: true
            };
        });
    }

    showTranslation() {
        this.setState((oldState, props) => {
            return {translationShow: true};
        });
    }

    changeDirection() {
        this.setState({
            translationDirection: (this.isEngToRus() ? 'rus-eng' : 'eng-rus'),
            translationShow: false,
            block: {
                left: {
                    title: this.state.block.right.title,
                    text: this.state.block.right.text,
                },
                right: {
                    title: this.state.block.left.title,
                    text: this.state.block.left.text,
                }
            }
        })
    }

    isEngToRus() {
        return (this.state.translationDirection == 'eng-rus')
    }

    nextPrase() {
        var self = this;

        this.setState((oldState, props) => {
            return {translationShow: false};
        });

        Axios.get('/random-phrase')
            .then(function (response) {
                self.setState((oldState, props) => {
                    //console.log(oldState);
                    return {
                        phrase: response.data,
                        block: {
                            left: {
                                title: oldState.block.left.title,
                                text: (self.isEngToRus() ? response.data.eng : response.data.rus)
                            },
                            right: {
                                title: oldState.block.right.title,
                                text: (self.isEngToRus() ? response.data.rus : response.data.eng)
                            }
                        }
                    };
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        const {classes} = this.props;
        const {started, translationShow} = this.state;

        return (
            <div>
                <Button raised color="primary"
                    className={classes.startButton}
                    onClick={() => this.handleStart()}
                    style={{ display: (!started ? 'block' : 'none') }}
                >
                    Start
                </Button>

                <div style={{ display: (started ? 'block' : 'none') }}>

                    <Grid className={classes.root}>
                        <Grid container>
                            <Grid item xs={12} sm={12} className={classes.iconToolbar}>
                                <IconButton color="default" onClick={() => this.changeDirection()}>
                                    <SwapHorizIcon />
                                </IconButton>
                            </Grid>
                        </Grid>

                        <Grid container spacing={24}>
                            <Grid item xs={12} sm={6}>
                                <Paper className={classes.paper}>
                                    <Typography type="headline" component="h3">
                                        {this.state.block.left.title}
                                    </Typography>
                                    <Typography type="subheading" component="p">
                                        {this.state.block.left.text}
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Paper className={classes.paper}>
                                    <Typography type="headline" component="h3">
                                        {this.state.block.right.title}
                                    </Typography>
                                    <div >
                                        <Typography type="subheading" component="p">
                                            {translationShow ? this.state.block.right.text : "???"}
                                        </Typography>
                                    </div>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Button raised
                        className={classes.button}
                        onClick={() => this.showTranslation()}
                    >
                        Translate
                    </Button>
                    <Button raised
                        color="primary"
                        className={classes.button}
                        onClick={() => this.nextPrase()}
                        style={{'color':'white', 'font-weight': 'bold'}}
                    >
                        Next
                    </Button>
                </div>
            </div>
        );
    }
}

PhraseTrainerGrid.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PhraseTrainerGrid);