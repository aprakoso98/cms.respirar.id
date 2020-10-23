import React, { HTMLAttributes } from 'react';

interface IconProps extends HTMLAttributes<HTMLLIElement> {
	name: string
	solid?: boolean
	regular?: boolean
	onClick?: () => void
}

const Icon = ({ onClick, regular, solid, className = "", name, ...rest }: IconProps) => {
	return <i {...rest}
		component-id="icon"
		onClick={onClick}
		className={`${regular ? 'far' : solid ? 'fas' : 'fa'} fa-${name} ${onClick ? 'pointer' : ''} ${className}`}
	/>
}

export default Icon