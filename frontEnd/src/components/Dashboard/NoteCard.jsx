import React from 'react'
import { Grid, Card, CardContent, Typography, CardHeader, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'
import { DELETE_NOTE } from '../../store/action/note'
import { deleteNote } from '../../api/expressApi'

import { Link } from 'react-router-dom'

import { DeleteOutline } from '@material-ui/icons';

const useStyles = makeStyles({
    root: {
        textDecoration: 'none',
        color: 'black'
    }, title: {
        padding: '2px 15px',
        fontWeight: 700
    },
    icon: {
        color: 'gray',
        cursor: 'pointer'
    },
    iconContainer: {
        height: 35,
        width: 35,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        "&:hover": {
            background: '#D3D3D3'
        }
    }
})




const NoteCard = ({ note }) => {
    const classes = useStyles()

    const dispatch = useDispatch()

    const deleteHandler = () => {

        deleteNote(note.id).then(res => {
            dispatch({
                type: DELETE_NOTE,
                payload: {
                    id: note.id
                }
            })
        })

    }


    const sliceText = (text) => {
        if (text.length <= 150)
            return text
        return text.slice(0, 150) + '...'
    }

    return (
        <Grid item xs={6} sm={6} md={4} lg={3} style={{
            textDecoration: 'none'
        }}>

            <Card >
                <Grid container>
                    <Grid item xs={10}>
                        <Link to={`/edit/${note.id}`} className={classes.root}>
                            <Typography className={classes.title}>{note.title}</Typography>
                        </Link>
                    </Grid>
                    <Grid className={classes.icon} item xs={2}>
                        <div className={classes.iconContainer}>
                            <DeleteOutline onClick={deleteHandler} />
                        </div>
                    </Grid>
                </Grid>
                <Link to={`/edit/${note.id}`} className={classes.root}>
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            {sliceText(note.text)}
                        </Typography>
                    </CardContent>
                </Link>
            </Card>
        </Grid>
    )
}

export default NoteCard
