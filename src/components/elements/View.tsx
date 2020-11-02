/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-eval */
import React, { HTMLAttributes, ReactElement, ReactFragment } from 'react';

type childrenType = JSX.Element | ReactElement | ReactFragment | boolean | null;

export interface ViewProps extends HTMLAttributes<HTMLDivElement> {
	children?: childrenType | childrenType[]
	direction?: 'row' | 'col' | 'col-reverse' | 'row-reverse'
	items?: 'start' | 'end' | 'center' | 'baseline' | 'stretch'
	content?: 'center' | 'start' | 'end' | 'between' | 'around' | 'evenly'
	justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly'
	self?: 'auto' | 'start' | 'end' | 'center' | 'stretch'
	align?: 'left' | 'center' | 'right' | 'justify'
	flex?: boolean
	idComponent?: string
	replaceClass?: boolean
	noPointer?: boolean
	wrap?: boolean
}

const View = ({
	direction = "col",
	className = "",
	idComponent = "view",
	onClick,
	noPointer,
	flex,
	children,
	replaceClass,
	wrap,
	justify,
	self,
	items,
	content,
	align: text,
	...rest
}: ViewProps): ReactElement => {
	const classes = ['self', 'justify', 'items', 'content', 'text'].map(c => eval(c) && `${c}-${eval(c)}`).filter(c => c).join(' ')
	className = replaceClass ? className : `flex ${wrap ? 'flex-wrap' : ''} flex-${direction} ${flex ? 'flex-1' : ''} ${classes} ${onClick && !noPointer ? 'pointer' : ''} ${className}`
		.replace(/\s\s+/g, ' ')
	return <div onClick={onClick} component-id={idComponent} className={className} {...rest}>{children && children}</div>
}

export default View