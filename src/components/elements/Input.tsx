import React, { HTMLAttributes, useEffect, useState } from 'react';
import View, { ViewProps } from './View';

type InputProps = HTMLAttributes<HTMLInputElement> & {
	wrapper?: ViewProps
	noBorder?: boolean
	value?: string
	flex?: boolean
	space?: number
	type?: string
	currency?: boolean
	renderRightAccessory?: () => React.ReactNode
	renderLeftAccessory?: () => React.ReactNode
} & Pick<ViewProps, 'items' | 'content' | 'justify' | 'self' | 'align'>

const Input = ({ className = "", placeholder = "Type here...", onBlur, currency, space, flex, renderRightAccessory, renderLeftAccessory, noBorder, value, wrapper, ...rest }: InputProps): JSX.Element => {
	const [key, setKey] = useState("".uuid())
	const [Value, setValue] = useState(currency ? (value || '').extractNumber().convertRupiah() : value)
	const { items, content, justify, self, align } = rest
	const flexProps = { items, content, justify, self, align }
	useEffect(() => {
		setKey("".uuid())
	}, [value])
	return <View key={key} direction="row" idComponent="input" flex={flex} className={`bg-light mv-${space ? space : '1'} ${noBorder ? 'no-border' : ''} ${className}`} {...wrapper} {...flexProps}>
		{/* {renderLeftAccessory && <View className="mr-1"> */}
		{renderLeftAccessory && renderLeftAccessory()}
		{/* </View>} */}
		<input onBlur={(e) => {
			let newValue: string
			if (currency) {
				newValue = e.target.value.extractNumber().convertRupiah()
				e.target.value = newValue
				if (onBlur) onBlur(e)
			} else {
				newValue = e.target.value
				onBlur && onBlur(e)
			}
			setValue(newValue)
			setKey(''.uuid())
		}} defaultValue={Value} placeholder={placeholder} className="w-full" {...rest} />
		{/* {renderRightAccessory && <View className="mr-1"> */}
		{renderRightAccessory && renderRightAccessory()}
		{/* </View>} */}
	</View>
}

export default Input