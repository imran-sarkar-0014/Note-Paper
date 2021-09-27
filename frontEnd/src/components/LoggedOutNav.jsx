import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
    container: {
        display: 'flex',
        justifyContent: 'end',
        marginRight: '10px',
    },
    Link: {
        textDecoration: 'none',
        fontSize: 14,
        color: 'white',
        marginRight: 5,
    }
})

const LoggedOutNav = () => {
    const classes = useStyles()
    return (
        <div className={classes.container}>
            <Link to='/login' className={classes.Link} >LogIn</Link>
            <Link to='/register' className={classes.Link} >Register</Link>
        </div>
    )
}

export default LoggedOutNav
