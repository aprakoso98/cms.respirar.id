export const reducerImagesInitState = {}

const reducerImages = (state = reducerImagesInitState, actions: any) => {
	switch (actions.type) {
		case 'GET_IMAGES':
			return {
				...state,
				...actions.payload
			}
		case 'GET_IMAGES_FULFILLED':
			return {
				...state,
				...actions.payload,
			}
		case 'GET_IMAGES_REJECTED':
			return { ...reducerImagesInitState }
		default: return state
	}
}

export default reducerImages