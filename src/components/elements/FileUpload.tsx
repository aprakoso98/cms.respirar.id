import React from 'react';
import { toBase64Type } from '../../utils';

interface Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
	title?: string
	className?: string,
	isImage?: boolean,
	imgClass?: string,
	src?: string,
	onChange?: (files: toBase64Type[]) => void,
	children: JSX.Element
}

const FileUpload = ({
	title,
	style,
	className,
	isImage,
	imgClass,
	src,
	onChange = () => { },
	children
	, ...props
}: Props) => {
	const id = "Math.randomInt(1000000, 9999999).toString()"
	// const id2 = Math.randomInt(1000000, 9999999).toString()
	return <>
		<label title={title} className={className} htmlFor={id}>
			{
				children ? children :
					isImage && <img className={imgClass} alt="" src={src} />
			}
		</label>
		<input style={{ display: 'none' }} onChange={async e => {
			const files = e.target.files
			if (files) {
				const data = await files.toBase64()
				onChange(data)
			}
		}}  {...props} id={id} {...isImage ? { accept: 'image/*' } : {}} type="file" />
	</>
}

export default FileUpload