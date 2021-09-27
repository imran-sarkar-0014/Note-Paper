import React, { useState, useEffect } from 'react'
import { Container, Grid, Input, Button } from '@material-ui/core'
import { useParams, useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { UPDATE_NOTE } from '../../store/action/note'
import { updateNote } from '../../api/expressApi'


const useStyles = makeStyles({
    title: {
        fontSize: 20,
        fontWeight: '400'
    },
    text: {
        width: '100%',
        minHeight: 300,
        resize: 'none',
        outline: 'none',
        padding: 5,
        fontSize: 16,
        fontWeight: '300'
    },
    textContainer: {
        marginTop: 30
    }
})

const EditNote = () => {

    const [title, setTitle] = useState('')
    const [text, setText] = useState('')

    const history = useHistory()
    const { id } = useParams()
    const dispatch = useDispatch()
    const note = useSelector(state => state.note)


    useEffect(() => {
        note.forEach(n => {
            if (n.id === id) {
                setTitle(n.title)
                setText(n.text)
            }
        })
    }, [id])

    const onUpdateHandler = () => {
        updateNote({
            id: id,
            title: title,
            text: text
        }).then(res => {
            dispatch({
                type: UPDATE_NOTE,
                payload: {
                    id: id,
                    title: title,
                    text: text
                }
            })
            history.push('/')
        })
    }

    const classes = useStyles()
    return (
        <Container style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingTop: 20,
        }}>
            <Grid container className='center' spacing={3}>
                <Grid item xs={9}>
                    <Input fullWidth
                        placeholder='Title'
                        className={classes.title}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    ></Input>
                </Grid>
                <Grid item xs={3} style={{
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <Button variant="contained" color='secondary' onClick={onUpdateHandler}>Save</Button>
                </Grid>
            </Grid>

            <Grid container className={classes.textContainer}>
                <Grid item xs={12}>
                    <textarea
                        className={classes.text}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    ></textarea>
                </Grid>
            </Grid>

        </Container>
    )
}

export default EditNote
