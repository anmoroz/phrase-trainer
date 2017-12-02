import React from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';

const styles = theme => ({
    formControl: {
        marginTop: 0,
        marginBottom: '12px',
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
});

class CategorySelect extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            categories: []
        };

        var self = this;

        Axios.get('/category')
            .then(function (response) {
                self.setState((oldState, props) => {
                    return {
                        categories: response.data,
                    };
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        const { classes } = this.props;

        return (
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="select-category">Category</InputLabel>
                <Select
                    id={"select-category"}
                    value={this.props.getCurrentCategoryId()}
                    onChange={(event) => this.props.handleChangeSelectCategory(event)}
                >
                    <MenuItem value={0}>
                        <em>All</em>
                    </MenuItem>
                    {this.state.categories.map((item, i) => {
                        return (
                            <MenuItem value={item.id} key={i}>{item.name}</MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
        );
    }
}

CategorySelect.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CategorySelect);