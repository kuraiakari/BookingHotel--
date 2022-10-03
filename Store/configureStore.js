import { createStore } from 'redux'

import cityReducer from '../Reducers/cityReducer'

const store = createStore(cityReducer)

export default store