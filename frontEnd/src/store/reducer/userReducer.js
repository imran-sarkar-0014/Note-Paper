import { USER_UPDATE } from '../action/user'
const inital = ''

const userReducer = (state = inital, action) => {
    switch (action.type) {
        case USER_UPDATE:
            return action.payload
        default:
            return state
    }
}

export default userReducer