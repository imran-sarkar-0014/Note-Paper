import React, { useState } from 'react'
import { Container, Grid, Input, Button } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { ADD_NOTE } from '../../store/action/note'
import { addNote } from '../../api/expressApi'
import { makeStyles } from '@material-ui/core'
import { useHistory } from 'react-router-dom'


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

const CreateNote = () => {

    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const history = useHistory()
    const dispatch = useDispatch()
    const onSubmitHandler = (e) => {
        e.preventDefault()

        if (title === '' || text === '')
            return

        addNote(
            {
                title: title,
                text: text
            }
        ).then(res => {

            dispatch({
                type: ADD_NOTE,
                payload: {
                    id: res.data._id,
                    title: title,
                    text: text
                }
            })

            history.push('/')
        })


        setTitle('')
        setText('')
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
                    <Button variant="contained" color='secondary' onClick={onSubmitHandler}>Save</Button>
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

export default CreateNote
