import React, { useEffect, useState } from 'react';
import HtmlParser from 'react-html-parser';
import { useHistory } from 'react-router-dom';
import { useStateObject } from 'src/hooks/useState';
import useWindowSize from 'src/hooks/useWindowSize';
import { getInfo } from 'src/utils/api';
import Button from '../elements/Button';
import { Divider } from '../elements/Divider';
import Icon from '../elements/Icon';
import Text from '../elements/Text';
import View from '../elements/View';
import Wrapper from '../elements/Wrapper';
import { parseAll } from '../../utils/helper';
import A from '../elements/A';

const Footer = () => {
	const history = useHistory()
	const [Content, setContent] = useStateObject({
		socmed: [],
		copyright: '',
		aboutAddress: HtmlParser(''),
		logo: () => null,
		waNumber: () => null,
		aboutPhone: () => null,
		aboutEmail: () => null,
	})
	const [isHome, setIsHome] = useState(window.location.pathname === '/')
	const [, , isMobile] = useWindowSize()
	// @ts-ignore
	history.listen(({ pathname }) => setIsHome(pathname === '/'))
	const getData = async () => {
		const { data } = await getInfo()
		// @ts-ignore
		setContent(parseAll(data))
	}
	const effect = () => {
		getData()
	}
	useEffect(effect, [])
	return <>
		{!isHome && <Divider />}
		<View className={`${isMobile ? 'pt-5' : 'pt-10 ph-15'} bg-light`} id="footer">
			<Wrapper direction={isMobile ? 'col' : 'row'} className={`${isMobile ? 'mb-10 ph-5' : 'mb-15 ph-10'}`} items={isMobile ? 'center' : 'start'}>
				<View className={`${isMobile ? 'w-1/2 mt-2' : 'w-1/6'}`}>
					<Content.logo />
				</View>
				<View items={isMobile ? 'center' : undefined} className={`${isMobile ? 'w-full mt-2' : 'w-2/6'}`}>
					<Text className="c-blue mb-5">Information</Text>
					<Text>WA Number</Text>
					{/* @ts-ignore */}
					<Content.waNumber className="f-10 mt-2" />
					<Text>{Content.aboutAddress}</Text>
				</View>
				<View items={isMobile ? 'center' : undefined} className={`${isMobile ? 'w-full mt-2' : 'w-1/6'}`}>
					<Text className="c-blue mb-5">Links</Text>
					<Button onClick={() => history.push('/about')} className="link">ABOUT US</Button>
					<Button onClick={() => history.push('/collections')} className="link">COLLECTIONS</Button>
				</View>
				<View items={isMobile ? 'center' : undefined} className={`${isMobile ? 'w-full mt-2' : 'w-1/6'}`}>
					<Text className="c-blue mb-5">Contacts</Text>
					<Content.aboutPhone />
					<Content.aboutEmail />
					<Wrapper className="mt-2" justify="start">
						{Content.socmed.rMap(
							({ icon, url = "" }) => <A target="_blank" href={url}  >
								<Icon className="f-20 mr-5 color-blue" name={icon} />
							</A>
						)}
					</Wrapper>
				</View>
			</Wrapper>
			<Wrapper className="bg-blue pv-3" justify="center">
				<Text className="color-light">{Content.copyright}</Text>
			</Wrapper>
		</View>
	</>
}

export default Footer