import store from '..';
const actionModal = (data: object) => {
	return {
		type: 'GET_MODAL',
		payload: data
	}
}

export default actionModal

export const modal = {
	show: function () {
		console.log(new Date())
		store.dispatch(actionModal({ visible: true }))
		return this
	},
	hide: function () {
		console.log(new Date())
		store.dispatch(actionModal({ visible: false }))
		return this
	},
	setContent: function (content: any) {
		console.log(new Date())
		store.dispatch(actionModal({ content }))
		return this
	}
}

