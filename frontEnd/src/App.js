import './App.css';
import React, { useEffect, useState } from 'react'
import { CssBaseline } from '@material-ui/core'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Nav, Login, Register, MainPage } from './components'

import { useDispatch, useSelector } from 'react-redux'
import { ADD_NOTE, RESET_NOTE } from './store/action/note'
import { USER_UPDATE } from './store/action/user'

import { changeUser, getNotes } from './api/expressApi'

function App() {

  const [loading, setLoading] = useState(true)
  const [isLogged, setIsLogged] = useState(false)

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    const tok = localStorage.getItem('token')
    dispatch({
      type: USER_UPDATE,
      payload: tok
    })

  }, [])

  useEffect(() => {
    setLoading(true)
    if (user && user !== '') {
      setIsLogged(true)
      changeUser(user)
      const notes = getNotes((note) => {
        dispatch({
          type: ADD_NOTE,
          payload: {
            id: note._id,
            title: note.title,
            text: note.text
          }
        })
      })
    } else {
      setIsLogged(false)
      dispatch({
        type: RESET_NOTE,
      })
      changeUser('')
    }
    setLoading(false)

  }, [user])



  const loggedUser = () => {
    return (
      <Switch>
        <Route path='/' component={MainPage} />
      </Switch>
    )
  }

  const nonLoggedUser = () => {
    return (
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route path='/' component={Login} />
      </Switch>
    )
  }




  const isLoadedData = () => {
    return (
      <div>
        <CssBaseline />
        <Router>
          <div>
            <Nav />
          </div>
          <div className="mt">
            {
              isLogged ? loggedUser() : nonLoggedUser()
            }
          </div>
        </Router>
      </div>
    )
  }

  const isNotLoaded = () => {
    return <div className="loading">
      <img className="loading-img" src='/favicon.jpg' />
    </div>
  }



  return loading ? isNotLoaded() : isLoadedData();
}

export default App