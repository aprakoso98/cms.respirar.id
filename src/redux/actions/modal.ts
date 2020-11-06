import store from '..';
const actionModal = (data: object) => {
	return {
		type: 'GET_MODAL',
		payload: data
	}
}

export default actionModal

const defaultClass = 'p-3 bg-light'

export const modal = {
	resetToDefault: function () {
		store.dispatch(actionModal({ backdropClick: () => null, className: null }))
		return this
	},
	setBackdropClick: function (backdropClick: Function) {
		store.dispatch(actionModal({ backdropClick }))
		return this
	},
	show: function (className?: string, replace?: boolean) {
		className = className || ''
		className = replace ? className : `${defaultClass} ${className}`
		store.dispatch(actionModal({ className, visible: true }))
		return this
	},
	hide: function () {
		store.dispatch(actionModal({ visible: false }))
		return this
	},
	setContent: function (content: JSX.Element) {
		store.dispatch(actionModal({ content }))
		return this
	}
}

