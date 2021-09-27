import React from 'react'

import { default as Icon } from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
    iconContainer: {
        position: 'fixed',
        top: '80%',
        right: 20,


        height: 60,
        width: 60,
        borderRadius: '50%',
        backgroundColor: 'blue',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        color: 'white',
        fontSize: 35
    }
})


const AddIcon = () => {
    const classes = useStyles()
    return (
        <Link to='/create'>
            <div className={classes.iconContainer}>
                <Icon className={classes.icon} />
            </div>
        </Link>
    )
}

export default AddIcon
