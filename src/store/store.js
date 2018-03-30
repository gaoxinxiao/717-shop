import {createStore,applyMiddleware} from 'redux'
import reducers from './reducers.js'
import createSagaMiddleware from 'redux-saga'
import sagas from './sagas.js'

let sagaMiddleware=createSagaMiddleware()
let store = createStore(reducers,applyMiddleware(sagaMiddleware))

sagaMiddleware.run(sagas)

export default store