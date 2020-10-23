import React, { ReactElement } from 'react';
import View, { ViewProps } from './View';

const Wrapper = ({ idComponent = "wrapper", items = "center", children, ...rest }: ViewProps): ReactElement => {
	return <View justify="between" items={items} idComponent={idComponent} direction="row" {...rest}>
		{children}
	</View>
}

export default Wrapper