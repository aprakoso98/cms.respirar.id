import React, { AnchorHTMLAttributes } from 'react';

interface Props extends AnchorHTMLAttributes<{}>{}

const A = ({ children = "", ...props }: Props) => {
	return <a children={children} {...props} />
}

export default A