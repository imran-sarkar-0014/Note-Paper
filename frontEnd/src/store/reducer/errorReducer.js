const { SHOW_ERROR, HIDE_ERROR } = require('../action/errorMsg')

const initial = false

const errorReducer = (state = initial, action) => {
    switch (action.type) {
        case SHOW_ERROR:
            return true
        case HIDE_ERROR:
            return false
        default: return state
    }
}

export default errorReducer