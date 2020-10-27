import React, { HTMLAttributes } from 'react';
import View, { ViewProps } from './View';
import Wrapper from './Wrapper';

interface InputProps extends HTMLAttributes<HTMLInputElement> {
	wrapper?: ViewProps
	noBorder?: boolean
	renderRightAccessory?: () => React.ReactNode
	renderLeftAccessory?: () => React.ReactNode
}

const Input = ({
	renderRightAccessory,
	renderLeftAccessory,
	className = "",
	noBorder,
	wrapper,
	...rest
}: InputProps): JSX.Element => {
	return <Wrapper idComponent="input" className={`${noBorder ? 'no-border' : ''} ${className}`} {...wrapper}>
		{renderLeftAccessory && <View className="mr-1">
			{renderLeftAccessory()}
		</View>}
		<input className="w-full" {...rest} />
		{renderRightAccessory && <View className="mr-1">
			{renderRightAccessory()}
		</View>}
	</Wrapper>
}

export default Input