import { timeline } from './reducers/timeline';
import { mensagem } from './reducers/header';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';

// Timeline é o reducer, poderia usar outros.
const reducers = combineReducers({timeline, mensagem});
export const store = createStore(reducers, applyMiddleware(thunkMiddleware));