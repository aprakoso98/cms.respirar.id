import React, { HTMLAttributes, useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { setImage } from 'src/redux/actions/images';

export interface ImageProps extends HTMLAttributes<HTMLImageElement> {
	source: string
	thumb?: any
}

const Image = ({ className = "", thumb, source, ...rest }: ImageProps) => {
	const [image, setImage] = useState<any>(thumb)
	useEffect(() => {
		const img = new window.Image()
		img.onload = () => setImage(source)
		img.src = source
	}, [source])
	// return <img {...rest} alt="" component-id="image" className={`flex ${className}`} src={Images[source]?.source} />
	return <img {...rest} alt="" component-id="image" className={`flex ${className}`} src={image} />
}

export default Image