import { SERACH_NAME_CITY } from "../Constants";
const initNameCity = {
    nameCity: ''
}

const cityReducer = (state = initNameCity, action) => {
    switch (action.type) {
        case SERACH_NAME_CITY:
            return {
                ...state,
                nameCity: action.payload
            }
            default:
                return state
    }
}

export default cityReducer