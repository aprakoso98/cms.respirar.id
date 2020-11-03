import store from '..';
const actionImages = (data: object) => {
	console.log(data)
	return {
		type: 'GET_IMAGES',
		payload: data
	}
}

export default actionImages

export const setImageData = (key: string, value?: string | boolean) => {
	store.dispatch(actionImages({ [key]: value }))
}