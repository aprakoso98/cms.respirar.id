import React, { useEffect } from 'react';
import Button from 'src/components/elements/Button';
import Container from 'src/components/elements/Container';
import FileUpload from 'src/components/elements/FileUpload';
import Icon from 'src/components/elements/Icon';
import Image from 'src/components/elements/Image';
import Input from 'src/components/elements/Input';
import View from 'src/components/elements/View';
import Wrapper from 'src/components/elements/Wrapper';
import { useStateArray } from 'src/hooks/useState';
import { FILE_PATH, getMarketplace } from 'src/utils/api';

type MarketplaceType = {
	id: string
	marketplaceName: string
	icon: string
	baseUrl: string
}

const Marketplaces = () => {
	const [marketPlaces, , initMarketplace] = useStateArray<MarketplaceType>()
	const getData = async () => {
		const { status, data } = await getMarketplace<MarketplaceType[]>()
		if (status) {
			initMarketplace(data)
		}
	}
	const effect = () => {
		getData()
	}
	useEffect(effect, [])
	return <Container id="marketplaces">
		{marketPlaces.rMap((data) => {
			const { icon, baseUrl, marketplaceName } = data
			return <Wrapper className="info-items">
				<FileUpload className="w-1/5">
					<Image source={FILE_PATH + icon} />
				</FileUpload>
				<View className="mr-3" items="start" flex>
					<Input className="w-full" value={marketplaceName} />
					<Input className="w-full" value={baseUrl} />
					<Button><Icon name="trash" className="mr-3" />Delete</Button>
				</View>
			</Wrapper>
		})}
		<Button justify="center"><Icon name="plus" className="mr-3" />Add</Button>
	</Container>
}

export default Marketplaces