import middlewares from "./middlewares";
import webReducer from './reducers';
import { createStore, applyMiddleware } from "redux"

const store = createStore(webReducer, applyMiddleware(...middlewares))

export default store