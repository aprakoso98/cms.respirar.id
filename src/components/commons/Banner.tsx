import React, { useEffect, useState } from 'react';
import ReactElasticCarousel from 'react-elastic-carousel';
import useWindowSize from 'src/hooks/useWindowSize';
import Button from '../elements/Button';
import Icon from '../elements/Icon';
import Image from '../elements/Image';
import View from '../elements/View';
import { FILE_PATH, getBanner } from '../../utils/api';
import Text from '../elements/Text';
import { useHistory } from 'react-router-dom';

const autoPlaySpeed = 3000

const Banner = () => {
	const history = useHistory()
	const [, , isMobile] = useWindowSize()
	const [banners, setBanners] = useState([])
	const getData = async () => {
		const { data: banner } = await getBanner()
		setBanners(banner as [])
	}
	const effect = () => {
		getData()
	}
	useEffect(effect, [])
	return <View className={`${isMobile ? 'pb-5' : 'pb-10 ph-15'}`} id="banner">
		<ReactElasticCarousel
			// enableAutoPlay
			pagination={false}
			autoPlaySpeed={autoPlaySpeed}
			className="relative"
			showArrows={!isMobile}
			renderArrow={({ type, onClick }) => {
				const style = {
					...type === 'NEXT' ? { right: 25 } : { left: 25 },
					top: '45%',
					zIndex: 9
				}
				return <Button style={style} onClick={onClick} className="link absolute">
					<Icon style={{ fontSize: 50 }} className="color-light" name={type === 'NEXT' ? 'arrow-right' : 'arrow-left'} />
				</Button>
			}}
		>{
				banners.reverse().rMap(({ image, btnText, redirect = "" }) => {
					return <View className="relative w-full">
						{redirect !== '' && <Button onClick={() => {
							if (redirect.validURL()) {
								redirect.openUrl()
							} else {
								history.push(redirect)
							}
						}} style={{ bottom: '15%', left: '15%' }} className="b-light-1 bg-transparent absolute">
							<Text className="c-light">{btnText}</Text>
							<Icon className="ml-5 c-light" name="chevron-right" />
						</Button>}
						<Image source={FILE_PATH + image} />
					</View>
				})
			}
		</ReactElasticCarousel>
	</View>
}

export default Banner