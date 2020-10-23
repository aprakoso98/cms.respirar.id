const initState: object = {
	search: ''
}

const reducerUi = (state = initState, actions: any) => {
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
			return { ...initState }
		default: return state
	}
}

export default reducerUi