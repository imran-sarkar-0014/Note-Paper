import { DRAWER } from '../action/drawer'

const inital = false

const drawerReducer = (state = inital, action) => {

    switch (action.type) {

        case DRAWER:
            return action.payload

        default:
            return state;
    }
}

export default drawerReducer