import {
    ADD_NOTE,
    DELETE_NOTE,
    UPDATE_NOTE,
    RESET_NOTE
} from '../action/note'

const inital = [
]

const noteReducer = (state = inital, action) => {
    switch (action.type) {

        case RESET_NOTE:
            return inital

        case ADD_NOTE:
            return [...state, action.payload]

        case UPDATE_NOTE:
            return state.filter(note => {
                if (note.id === action.payload.id) {
                    note.text = action.payload.text
                    note.title = action.payload.title
                    return note
                } else {
                    return note
                }
            })

        case DELETE_NOTE:
            return state.filter(note => note.id !== action.payload.id)

        default:
            return state
    }
}

export default noteReducer