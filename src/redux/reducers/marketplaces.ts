const initState: object = []

const reducerMarketplaces = (state = initState, actions: any) => {
	switch (actions.type) {
		case 'GET_MARKETPLACES':
			return state
		case 'GET_MARKETPLACES_FULFILLED':
			return actions.payload.data
		case 'GET_MARKETPLACES_REJECTED':
			return initState
		default: return state
	}
}

export default reducerMarketplaces