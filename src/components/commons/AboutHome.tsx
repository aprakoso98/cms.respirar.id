import React, { useEffect, useState } from 'react';
import Wrapper from '../elements/Wrapper';
import useWindowSize from '../../hooks/useWindowSize';
import Text from '../elements/Text';
import { useHistory } from 'react-router-dom';
import Icon from '../elements/Icon';
import View from '../elements/View';
import Image from '../elements/Image';
import Button from '../elements/Button';
import { FILE_PATH, getInfo } from 'src/utils/api';
import { parseAll } from 'src/utils/helper';

const AboutHome = () => {
	const history = useHistory()
	const [About, setAbout] = useState({
		description: '',
		image: ''
	})
	const [, , isMobile] = useWindowSize()
	const getData = async () => {
		const { status, data } = await getInfo({ key: 'about-home' })
		if (status) {
			// @ts-ignore
			setAbout(parseAll(data).aboutHome)
		}
	}
	useEffect(() => {
		getData()
	}, [])
	return <Wrapper direction={isMobile ? 'col-reverse' : 'row'} className={`bg-grey ${isMobile ? 'pv-5 ph-5' : 'ph-25'}`} id="about">
		<View className={`${isMobile ? '' : 'w-1/2'}`}>
			{!isMobile && <Text className="title">About Respirar</Text>}
			<Text className="mr-5 mb-5 sub-title">{About.description}</Text>
			<Button onClick={() => history.push('/about')} self="start">
				<Text className="mr-5">Learn more</Text>
				<Icon name="chevron-right" />
			</Button>
		</View>
		<View className={`${isMobile ? '' : '-mt-5 w-1/2'}`}>
			<Image source={FILE_PATH + About.image} />
		</View>
		{isMobile && <Text className="title">About Respirar</Text>}
	</Wrapper>
}

export default AboutHome