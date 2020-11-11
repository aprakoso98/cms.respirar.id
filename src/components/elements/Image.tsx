import React, { HTMLAttributes } from 'react';
// import { useSelector } from 'react-redux';
// import { setImage } from 'src/redux/actions/images';

export interface ImageProps extends HTMLAttributes<HTMLImageElement> {
	source: string
}

const Image = ({ className = "", source, ...rest }: ImageProps) => {
	// @ts-ignore
	// const Images = useSelector(state => state.Images)
	// useEffect(() => {
	// 	setImage(source, source)
	// }, [source])
	// return <img {...rest} alt="" component-id="image" className={`flex ${className}`} src={Images[source]?.source} />
	return <img {...rest} alt="" component-id="image" className={`flex ${className}`} src={source} />
}

export default Image