import React from 'react'
import { Grid } from '@material-ui/core'
import { Switch, Route } from 'react-router-dom'
import withWidth from '@material-ui/core/withWidth';

import Drawer from './Drawer'
import Showcage from './Showcage'
import CreateNote from './CreateNote';
import EditNote from './EditNote';


const MainPage = ({ width }) => {
    return (
        <Grid container spacing={2}>
            <Grid item sm={3} lg={2}>
                <Drawer onPage={width === 'xs' ? false : true} />
            </Grid>

            <Grid item xs={12} sm={9} lg={10}>

                <Switch>
                    <Route exact path="/create" component={CreateNote} />
                    <Route exact path="/edit/:id" component={EditNote} />
                    <Route path="/" component={Showcage} />
                </Switch>

            </Grid>

        </Grid>
    )
}

export default withWidth()(MainPage)
