import { combineReducers } from "redux"
import reducerModal from './modal';
import reducerWeb from './web';
import reducerImages from './images';

export const reducers = {
	Web: reducerWeb,
	Modal: reducerModal,
	Images: reducerImages
}

const webReducer = combineReducers(reducers)

export default webReducer