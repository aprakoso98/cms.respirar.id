import { getMarketplace } from '../../utils/api';
const actionMarketplaces = () => {
	return {
		type: 'GET_MARKETPLACES',
		payload: getMarketplace()
	}
}

export default actionMarketplaces