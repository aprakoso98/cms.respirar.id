export const reducerWebInitState = {
	loggedIn: true,
	token: '',
	expired: ''
}

const reducerWeb = (state = reducerWebInitState, actions: any) => {
	switch (actions.type) {
		case 'GET_UI':
			return {
				...state,
				...actions.payload
			}
		case 'GET_UI_FULFILLED':
			return {
				...state,
				...actions.payload,
			}
		case 'GET_UI_REJECTED':
			return { ...reducerWebInitState }
		default: return state
	}
}

export default reducerWeb