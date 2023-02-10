import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rooms from './rooms';
import session from './session';
import { messagesReducer } from './messages';
import { mentionsReducer } from './mentions';
import { usersReducer } from './users';
let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const rootReducer = combineReducers({
    session,
    rooms,
    messages: messagesReducer,
    mentions: mentionsReducer,
    users: usersReducer

});

export const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};