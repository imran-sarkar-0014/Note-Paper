import { combineReducers } from 'redux'
import noteReducer from './noteReducer'
import drawerReducer from './drawerReducer'
import userReducer from './userReducer'
import errorReducer from './errorReducer.js'

const rootReducer = combineReducers({
    note: noteReducer,
    drawer: drawerReducer,
    user: userReducer,
    error: errorReducer
})

export default rootReducer