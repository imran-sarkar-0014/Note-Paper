import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import NoteCard from './NoteCard'

import { useSelector } from 'react-redux'

import AddIcon from '../AddIcon'



const Showcage = () => {

    const note = useSelector(state => state.note)

    return (
        <Grid container spacing={2} >
            {
                note.length === 0 ?
                    <Grid item xs={12}>
                        <Typography style={{
                            textAlign: 'center'
                        }}>
                            Add Your Note
                        </Typography>
                    </Grid>
                    :
                    note.map(n => (
                        <NoteCard key={n.id} note={n} />
                    ))
            }



            <AddIcon />

        </Grid>
    )
}

export default Showcage
