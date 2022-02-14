import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'
import psReducer from './reducers'
import pSaga from './sagas'

export default function pStore() {
	const composeEnhancers =
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
	const sagaMiddleware = createSagaMiddleware()
	const middleWares = [reduxImmutableStateInvariant(), sagaMiddleware]
	const store = createStore(
		psReducer(),	
		composeEnhancers(applyMiddleware(...middleWares))
	)
	sagaMiddleware.run(pSaga)
	return store
}
