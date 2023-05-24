import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {  useDispatch, useSelector } from 'react-redux';
import { Pagination, PaginationItem } from '@material-ui/lab';

import { getPosts } from '../actions/posts';
import useStyles from './styles';

const Paginate = ({ page: p }) => {
    const { totalPages: pages } = useSelector((s) => s.posts);
    const dispatch = useDispatch();
    const classes = useStyles();
    
    // fetching the posts any time the page changes
    useEffect(() => {
        if(p) dispatch(getPosts(p));
    }, [p]);

    return (
        <Pagination classes={{ ul: classes.ul }} count={pages} page={Number(p) || 1 } shape="round" size="medium" variant='outlined' renderItem={(i) => (
            <PaginationItem {...i} component={Link} to={`/posts?page=${i.page}`} />
        )} />
    )
}

export default Paginate;