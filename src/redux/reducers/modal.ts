export const modalInitState = {
	visible: false,
	content: ""
}

const reducerModal = (state = modalInitState, actions: any) => {
	switch (actions.type) {
		case 'GET_MODAL':
			return {
				...state,
				...actions.payload
			}
		case 'GET_MODAL_FULFILLED':
			return {
				...state,
				...actions.payload
			}
		case 'GET_MODAL_REJECTED':
			return { ...modalInitState }
		default: return state
	}
}

export default reducerModal