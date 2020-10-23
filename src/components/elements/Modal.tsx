import React from 'react';
import View from './View';

interface ModalProps {
	visible: boolean
	children?: string
}

const Modal = ({ visible, children }: ModalProps): JSX.Element => {
	return <>
		{visible && <View
			style={{ zIndex: 99 }}
			className={`absolute w-full h-full bg-dark-tr`}
			items="center"
			justify="center">{children}</View>}
	</>
}

export default Modal