import React from 'react';
import { useHistory } from 'react-router-dom';
import useWindowSize from 'src/hooks/useWindowSize';
import { FILE_PATH } from 'src/utils/api';
import Button from '../elements/Button';
import Icon from '../elements/Icon';
import Image from '../elements/Image';
import Text from '../elements/Text';
import View from '../elements/View';

interface Props {
	productName: string
	image: string
	productUrl: string
	className?: string
}

const HomeCard = ({ productUrl, productName, className = "", image }: Props) => {
	const history = useHistory()
	const [, , isMobile] = useWindowSize()
	return <View className={`relative ${className}`}>
		<Image source={FILE_PATH + image} />
		<View justify="between" className={`absolute h-full ${isMobile ? 'p-10' : 'p-15'}`}>
			<Text className="-mt-5 title color-light">{productName}</Text>
			<Button justify="between" self="start" onClick={() => history.push(productUrl)}>
				<Text className="mr-3">Learn More</Text>
				<Icon name="chevron-right" solid />
			</Button>
		</View>
	</View>
}

export default HomeCard