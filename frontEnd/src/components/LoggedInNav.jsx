import React from 'react'
import { Button } from '@material-ui/core'
import { USER_UPDATE } from '../store/action/user.js'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'

const useStyles = makeStyles({
    container: {
        display: 'flex',
        justifyContent: 'end',
        marginRight: '10px'
    }
})

const LoggedInNav = () => {
    const classes = useStyles()

    const dispatch = useDispatch()
    const logOutHandler = () => {
        localStorage.setItem('token', '')
        dispatch({
            type: USER_UPDATE,
            payload: ''
        })
    }
    return (
        <div className={classes.container}>
            <Button onClick={logOutHandler} style={{ color: 'white' }}>Log Out</Button>
        </div>
    )
}

export default LoggedInNav
