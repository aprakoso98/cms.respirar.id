import React, { HTMLAttributes } from 'react';
import { ViewProps } from './View';
import Wrapper from './Wrapper';

interface InputProps extends HTMLAttributes<HTMLInputElement> {
	wrapper?: ViewProps
	noBorder?: boolean
	renderRightAccessory?: () => React.ReactNode
	renderLeftAccessory?: () => React.ReactNode
}

const Input = ({
	renderRightAccessory = () => null,
	renderLeftAccessory = () => null,
	className = "",
	noBorder,
	wrapper,
	...rest
}: InputProps): JSX.Element => {
	return <Wrapper idComponent="input" className={`${noBorder ? 'no-border' : ''} ${className}`} {...wrapper}>
		{renderLeftAccessory()}
		<input className="w-full" {...rest} />
		{renderRightAccessory()}
	</Wrapper>
}

export default Input