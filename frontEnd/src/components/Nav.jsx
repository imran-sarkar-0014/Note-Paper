import React, { useState } from 'react'
import { Button, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import LoggedInNav from './LoggedInNav'
import LoggedOutNav from './LoggedOutNav'

import withWidth from '@material-ui/core/withWidth';

import { useSelector, useDispatch } from 'react-redux'
import { DRAWER } from '../store/action/drawer'

const useStyles = makeStyles({
    container: {
        height: 55,
        backgroundColor: 'red',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 10
    },
    brand_name: {
        textDecoration: 'none',
        textAlign: 'center',
        fontSize: '1.5em',
        color: 'white',
        marginLeft: 15
    },
    nav_link: {
        textAlign: 'right',
        fontSize: 10,
    },
    errorMsg: {
        position: 'fixed',
        top: 60,
        left: '25%',
        width: 250,
        textAlign: 'center',
        padding: '10px 20px',
        background: 'red',
        borderRadius: '30px',
        color: 'white',
        transform: '100ms ease'
    }
})

const Nav = ({ width }) => {

    const classes = useStyles()
    const user = useSelector(state => state.user)
    const dispactch = useDispatch()

    const onClickHandler = () => {
        // todo for redux
        dispactch({
            type: DRAWER,
            payload: true
        })
    }

    return (
        <Grid container className={classes.container}>
            <Grid item xs={8}  >
                {
                    width === 'xs' && user !== '' && <Button onClick={onClickHandler}> <MenuIcon style={{
                        color: 'white',
                        width: 45,
                        marginRight: 10
                    }} />
                    </Button>
                }
                <Typography component={Link} to='/' className={classes.brand_name} style={{ textAlign: 'center', }} >
                    Note Paper
                </Typography>
            </Grid>
            <Grid item xs={4} className={classes.nav_link}>
                {
                    user !== '' ?
                        < LoggedInNav />
                        :
                        <LoggedOutNav />
                }
            </Grid>


        </Grid >
    )
}

export default withWidth()(Nav)
