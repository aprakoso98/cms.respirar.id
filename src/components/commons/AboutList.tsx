import React from 'react';
import View from '../elements/View';
import Wrapper from '../elements/Wrapper';
import Text from '../elements/Text';
import HtmlParser from 'react-html-parser';
import Image from '../elements/Image';
import { FILE_PATH } from '../../utils/api';
import useWindowSize from 'src/hooks/useWindowSize';

const AboutList = ({ list = [] }): JSX.Element => {
	const [, , isMobile] = useWindowSize()
	return <>
		{list.rMap((about: { image: string, description: string, headline: string }, i: number) => {
			const isOdd = i % 2 !== 0
			return <Wrapper className={`${isMobile ? 'ph-5 pv-5' : 'mh-15 mv-10'}`} direction={isMobile ? 'col-reverse' : isOdd ? 'row-reverse' : 'row'}>
				<View className={`${isMobile ? '' : `w-2/3 ${isOdd ? 'ph-5' : 'pr-5'}`}`}>
					<Text className={`title ${isMobile ? '' : 'w-2/5'}`}>{about.headline}</Text>
					{HtmlParser(about.description)}
				</View>
				<View className={`${isMobile ? '' : `w-1/3 ${isOdd ? 'pr-5' : 'pl-5'}`}`}>
					<Image source={FILE_PATH + about.image} />
				</View>
			</Wrapper>
		})}
	</>
}

export default AboutList