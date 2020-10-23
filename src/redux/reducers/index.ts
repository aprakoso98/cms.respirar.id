import { combineReducers } from "redux"
import reducerUi from './ui';
import reducerModal from './modal';
import reducerMarketplaces from './marketplaces';

export const reducers = {
	UI: reducerUi,
	Modal: reducerModal,
	Marketplace: reducerMarketplaces
}

const webReducer = combineReducers(reducers)

export default webReducer