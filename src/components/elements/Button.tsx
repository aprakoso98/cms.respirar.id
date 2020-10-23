import React, { ReactElement } from 'react';
import Text, { textChild, TextProps } from './Text';
import { ViewProps } from './View';
import Wrapper from './Wrapper';

interface ButtonProps extends Omit<ViewProps, 'children'> {
	children?: textChild | textChild[]
	textProps?: Omit<TextProps, 'children'>
	ghd?: true | false
}

const Button = ({ textProps, replaceClass, children, justify, className = "", ...rest }: ButtonProps): ReactElement => {
	return <Wrapper
		idComponent="button"
		justify={justify ? justify : typeof children === 'string' ? 'center' : 'between'}
		className={`pointer ${replaceClass ? '' : 'ph-5 pv-2'} ${className}`} {...rest}>
		{
			typeof children === 'string' ? <Text justify={undefined} {...textProps}>{children}</Text> :
			Array.isArray(children) ? children.rMap(
				(c: any) => typeof c === 'string' ? <Text justify={undefined} {...textProps}>{c}</Text> : c
			) : children
		}
	</Wrapper>
}

export default Button