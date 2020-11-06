import React from 'react';
import View from './View';

interface ModalProps {
	visible: boolean
	children?: JSX.Element
	onClick?: () => void
}

const Modal = ({ onClick, visible, children }: ModalProps): JSX.Element => {
	const id = 'modal-container'
	return <>
		{visible && <View
			noPointer
			id={id}
			// @ts-ignore
			onClick={e => e.target.id === id ? onClick() : e.preventDefault()}
			style={{ zIndex: 999 }}
			className={`absolute w-full h-full bg-dark-tr`}
			items="center"
			justify="center">{children}</View>}
	</>
}

export default Modal