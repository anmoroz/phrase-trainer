import React from 'react';
import Axios from 'axios';

import PropTypes from 'prop-types';

import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Badge from 'material-ui/Badge';
import SwapHorizIcon from 'material-ui-icons/SwapHoriz';
import ShuffleIcon from 'material-ui-icons/Shuffle';
import RepeatIcon from 'material-ui-icons/Repeat';
import TimerIcon from 'material-ui-icons/Timer';
import TimerOffIcon from 'material-ui-icons/TimerOff';
import IconButton from 'material-ui/IconButton';

import CategorySelect from './CategorySelect';

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
        display: 'inline-block',
        height: '100%',
    },
    pullLeft: {
        float: 'left'
    },
    pullRight: {
        float: 'right'
    },
    badge: {
        margin: `0 ${theme.spacing.unit * 2}px`,
    },
});

const TIMER_SEC = 10

class PhraseTrainerGrid extends React.Component {

    constructor(props) {
        super(props)

        this.timer = 0

        this.state = {
            started: true,
            selectedCategoryId: 0,
            shuffle: true,
            translationDirection: 'rus-eng',
            timer: false,
            timerSeconds: TIMER_SEC,
            translationShow: false,
            phrase: {
                id: 0,
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

    handleChangeSelectCategory(event) {
        this.setState((oldState, props) => {
            return {selectedCategoryId: event.target.value};
        }, () => {
            this.nextPrase()
        });
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

    changeLanguages() {
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

    changeShuffle() {
        this.setState({
            shuffle: ! this.state.shuffle,
        })
    }

    startTimer() {
        if (this.timer !== 0) {
            return
        }

        var self = this;
        this.timer = setInterval(() => {
            let seconds = this.state.timerSeconds - 1;
            this.setState({
                timerSeconds: seconds >= 0 ? seconds : 0
            });
            if (seconds === 0) {
                self.nextPrase();
            } else if (seconds === 4) {
                self.showTranslation()
            }
        }, 1000);
    }

    changeTimer() {
        this.setState({
            timer: ! this.state.timer,
        }, () => {
            if (this.state.timer) {
                this.startTimer()
            } else {
                this.clearTimer()
            }
        })
    }

    clearTimer() {
        clearInterval(this.timer)
        this.timer = 0
        this.setState({
            timerSeconds: TIMER_SEC,
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

        Axios.get('/phrase', { params: {
            category: this.state.selectedCategoryId,
            lastId: this.state.phrase.id,
            shuffle: this.state.shuffle
        } })
            .then(function (response) {
                self.setState((oldState, props) => {
                    return {
                        phrase: response.data,
                        timerSeconds: TIMER_SEC,
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

    getCurrentCategoryId() {
        return this.state.selectedCategoryId
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
                            <Grid item xs={12} sm={12}>

                                <div className={classes.pullLeft}>
                                    <CategorySelect
                                        handleChangeSelectCategory={this.handleChangeSelectCategory.bind(this)}
                                        getCurrentCategoryId={this.getCurrentCategoryId.bind(this)}
                                    />
                                </div>
                                <div className={classes.pullRight }>
                                    <div className={classes.iconToolbar}>
                                        <IconButton
                                            color="default"
                                            title={this.state.timer ? "Timer On" : "Timer Off"}
                                            onClick={() => this.changeTimer()}
                                        >
                                            {this.state.timer
                                                ? <Badge
                                                    className={classes.badge}
                                                    badgeContent={this.state.timer ? <span style={{'color':'white'}}>{this.state.timerSeconds}</span> : ''}
                                                    color="primary"
                                                >
                                                    <TimerIcon />
                                                </Badge>
                                                : <TimerOffIcon />}


                                        </IconButton>
                                        <IconButton
                                            color="default"
                                            title={this.state.shuffle ? "Shuffle all" : "Repeat"}
                                            onClick={() => this.changeShuffle()}
                                        >
                                            {this.state.shuffle ? <ShuffleIcon /> : <RepeatIcon />}
                                        </IconButton>
                                        <IconButton
                                            color="default"
                                            title="Change languages"
                                            onClick={() => this.changeLanguages()}
                                            style={{'marginTop': '14px'}}
                                        >
                                            <SwapHorizIcon />
                                        </IconButton>
                                    </div>
                                </div>
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
                        style={{'color':'white', 'fontWeight': 'bold'}}
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