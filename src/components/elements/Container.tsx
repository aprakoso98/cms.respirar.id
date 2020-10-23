import React from 'react';
import View, { ViewProps } from './View';

const Container = ({ className = "", children, ...rest }: ViewProps) => {
	return <View idComponent="container" className={`${className}`} {...rest}>
		{children}
	</View>
}

export default Container