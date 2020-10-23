import React, { HTMLAttributes } from 'react';

export interface ImageProps extends HTMLAttributes<HTMLImageElement> {
	source: string
}

const Image = ({ className = "", source, ...rest }: ImageProps) => {
	return <img {...rest} alt="" component-id="image" className={`flex ${className}`} src={source} />
}

export default Image