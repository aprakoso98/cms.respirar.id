import React, { HTMLAttributes } from 'react';
// import React, { HTMLAttributes, useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { setImageData } from 'src/redux/actions/images';

export interface ImageProps extends HTMLAttributes<HTMLImageElement> {
	source: string
}

const Image = ({ className = "", source, ...rest }: ImageProps) => {
	// const [key] = useState("".uuid())
	// // @ts-ignore
	// const images = useSelector(state => state.Images)
	// const loadImage = (url: string) => {
	// 	const image = new window.Image()
	// 	image.src = url
	// 	image.onload = () => setImageData(key, url)
	// 	image.onerror = () => setImageData(key, false)
	// }
	// useEffect(() => {
	// 	loadImage(source)
	// }, [source])
	// return <img {...rest} alt="" component-id="image" className={`flex ${className}`} src={images[key]} />
	return <img {...rest} alt="" component-id="image" className={`flex ${className}`} src={source} />
}

export default Image