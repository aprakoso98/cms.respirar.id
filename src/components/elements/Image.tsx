import React, { HTMLAttributes } from 'react';
import { LazyLoadImage, LazyLoadImageProps } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

type ImgProps = { source?: string, thumb?: any }
export type ImageProps = LazyLoadImageProps & ImgProps
export type PureImageProps = HTMLAttributes<HTMLImageElement> & ImgProps

export const PureImage = ({ className = "", source, ...rest }: PureImageProps) => {
	// tadinya punya class flex
	return <img {...rest} alt="" component-id="image" className={`${className}`} src={source} />
}

const Image = ({ className = "", thumb, source, ...rest }: ImageProps) => {
	// const [image, setImage] = useState<any>(thumb)
	// useEffect(() => {
	// 	const img = new window.Image()
	// 	img.onload = () => setImage(source)
	// 	img.src = source || ''
	// }, [source])
	return <LazyLoadImage wrapperClassName={className} alt="" component-id="image" effect="blur" {...rest} src={source} />
}

export default Image