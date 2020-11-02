import store from '..';
const actionModal = (data: object) => {
	return {
		type: 'GET_MODAL',
		payload: data
	}
}

export default actionModal

export const modal = {
	resetBackdropClick: function () {
		store.dispatch(actionModal({ backdropClick: () => null }))
		return this
	},
	setBackdropClick: function (backdropClick: Function) {
		store.dispatch(actionModal({ backdropClick }))
		return this
	},
	show: function () {
		store.dispatch(actionModal({ visible: true }))
		return this
	},
	hide: function () {
		store.dispatch(actionModal({ visible: false }))
		return this
	},
	setContent: function (content: any) {
		store.dispatch(actionModal({ content }))
		return this
	}
}

