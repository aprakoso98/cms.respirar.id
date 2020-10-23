import React from 'react';
import View, { ViewProps } from './View';

interface Props extends ViewProps {
	size?: number
}

const Divider = ({ className, size = 1, style, ...rest }: Props) => {
	return <View idComponent="divider" className={className || 'bg-greyHard'} style={{ padding: size / 2, ...style }} {...rest} />
}

export { Divider }