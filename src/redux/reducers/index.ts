import { combineReducers } from "redux"
import reducerModal from './modal';
import reducerWeb from './web';

export const reducers = {
	Web: reducerWeb,
	Modal: reducerModal,
}

const webReducer = combineReducers(reducers)

export default webReducer