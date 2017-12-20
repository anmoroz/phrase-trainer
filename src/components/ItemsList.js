import React from 'react';
import Axios from 'axios';

import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

import CategorySelect from './CategorySelect';

import { withStyles } from 'material-ui/styles';


const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop: 10,
        marginBottom: 8,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        height: '100%',
    },
    pullLeft: {
        float: 'left'
    },
});

class ItemsListGrid extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            selectedCategoryId: 0,
            items: [],
            pager: {
                pageSize: 10,
                currentPage: 1,
                pages: []
            },
        }
    }

    componentDidMount() {
        this.setPage(1)
    }

    loadDataFromServer(page) {
        var self = this;

        Axios.get('/phrases', { params: {
            category: this.state.selectedCategoryId,
            offset: (page - 1) * this.state.pager.pageSize,
            limit: this.state.pager.pageSize
        } })
            .then(function (response) {
                var pager = self.getPager(response.data.meta.total_count, page, response.data.meta.limit);
                self.setState({
                    items: response.data.items,
                    pager: pager,
                });
                window.scrollTo(0, 0)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleChangeSelectCategory(event) {
        this.setState((oldState, props) => {
            return {selectedCategoryId: event.target.value};
        }, () => {
            this.setPage(1)
        });
    }

    getCurrentCategoryId() {
        return this.state.selectedCategoryId
    }

    getPager(totalItems, currentPage, pageSize) {
        currentPage = currentPage || 1
        pageSize = pageSize || 10

        var totalPages = Math.ceil(totalItems / pageSize)
        var startPage, endPage

        if (totalPages <= 6) {
            startPage = 1
            endPage = totalPages
        } else {
            if (currentPage <= 4) {
                startPage = 1
                endPage = 6
            } else if (currentPage + 2 >= totalPages) {
                startPage = totalPages - 5
                endPage = totalPages
            } else {
                startPage = currentPage - 3
                endPage = currentPage + 3
            }
        }

        var startIndex = (currentPage - 1) * pageSize
        var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1)

        var pages = []
        for (let i = startPage; i < endPage + 1; i++) {
            pages.push(i)
        }

        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }

    setPage(page) {
        var pager = this.state.pager;

        if (page < 1 || page > pager.totalPages) {
            return;
        }

        this.loadDataFromServer(page);
    }

    render() {
        const {classes} = this.props;
        const {items, pager} = this.state;
        const renderItems = items.map((item, index) => {
            return <li key={index}>
                <Paper className={classes.paper}>
                    <Typography type="subheading" component="p">
                        {item.eng}
                    </Typography>
                    <Typography type="subheading" component="p">
                        {item.rus}
                    </Typography>
                </Paper>
            </li>;
        });

        //console.log(pager)

        return (
            <div>
                <Grid className={classes.root}>
                    <Grid container>
                        <Grid item xs={12} sm={12}>
                            <div className={classes.pullLeft}>
                                <CategorySelect
                                    handleChangeSelectCategory={this.handleChangeSelectCategory.bind(this)}
                                    getCurrentCategoryId={this.getCurrentCategoryId.bind(this)}
                                />
                            </div>
                        </Grid>
                    </Grid>

                    <Grid container spacing={24}>
                        <Grid item xs={12} sm={12}>
                            <ul className="phrases-list">
                                {renderItems}
                            </ul>
                        </Grid>
                    </Grid>
                </Grid>
                <ul className="pagination">
                    <li className={pager.currentPage === 1 ? 'disabled' : ''}>
                        <a onClick={() => this.setPage(1)}>«</a>
                    </li>
                    <li className={pager.currentPage === 1 ? 'disabled' : ''}>
                        <a onClick={() => this.setPage(pager.currentPage - 1)}>‹</a>
                    </li>
                    {pager.pages.map((page, index) =>
                        <li key={index} className={pager.currentPage === page ? 'active' : ''}>
                            <a onClick={() => this.setPage(page)}>{page}</a>
                        </li>
                    )}
                    <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                        <a onClick={() => this.setPage(pager.currentPage + 1)}>›</a>
                    </li>
                    <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                        <a onClick={() => this.setPage(pager.totalPages)}>»</a>
                    </li>
                </ul>
            </div>
        );
    }
}

ItemsListGrid.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ItemsListGrid);