import React, { HTMLAttributes, useEffect, useState } from 'react';
import View, { ViewProps } from './View';
import Wrapper from './Wrapper';

interface InputProps extends HTMLAttributes<HTMLInputElement> {
	wrapper?: ViewProps
	noBorder?: boolean
	value?: string
	renderRightAccessory?: () => React.ReactNode
	renderLeftAccessory?: () => React.ReactNode
}

const Input = ({ className = "", renderRightAccessory, renderLeftAccessory, noBorder, value, wrapper, ...rest }: InputProps): JSX.Element => {
	const [key, setKey] = useState("".uuid())
	useEffect(() => {
		setKey("".uuid())
	}, [value])
	return <Wrapper key={key} idComponent="input" className={`bg-light ph-1 mv-1 ${noBorder ? 'no-border' : ''} ${className}`} {...wrapper}>
		{renderLeftAccessory && <View className="mr-1">
			{renderLeftAccessory()}
		</View>}
		<input defaultValue={value} className="w-full" {...rest} />
		{renderRightAccessory && <View className="mr-1">
			{renderRightAccessory()}
		</View>}
	</Wrapper>
}

export default Input