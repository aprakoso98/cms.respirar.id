import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'src/components/elements/Button';
import Container from 'src/components/elements/Container';
import { Divider } from 'src/components/elements/Divider';
import Image from 'src/components/elements/Image';
import Text from 'src/components/elements/Text';
import View from 'src/components/elements/View';
import { useStateArray } from 'src/hooks/useState';
import useWindowSize from 'src/hooks/useWindowSize';
import { FILE_PATH, getProduct } from 'src/utils/api';
import { collectionType, screenProps } from 'src/utils/types';
import { priceRange, replaceSpaces } from '../utils/helper';

const Collections = ({ match: { params } }: screenProps): JSX.Element => {
	const history = useHistory()
	const [, , isMobile] = useWindowSize()
	const [collections, , setCollections] = useStateArray<collectionType>()
	const getData = async () => {
		const { status, data } = await getProduct(params) as { status: boolean, data: collectionType[] }
		if (status) {
			setCollections(data)
		}
	}
	const effect = () => {
		getData()
	}
	useEffect(effect, [params])
	return <Container className={`${isMobile ? 'ph-5 mb-5' : 'ph-15 mb-10'}`}>
		<Text className="title">Collections</Text>
		{/* @ts-ignore */}
		{params.search !== '' && <Text>Search result for : <Text className="ml-1 !Italic">{params.search}</Text></Text>}
		<View direction={isMobile ? 'col' : 'row'} className="flex-wrap -m-2 pb-3 pt-10">
			{collections.length > 0 ? collections.rMap((product: collectionType) => <View className={`p-2 ${isMobile ? '' : 'w-1/3'}`}>
				<View className="p-5 background-blueSky relative">
					<Image source={FILE_PATH + product.image} />
					<Button textProps={{ className: 'c-light' }} className="absolute bg-blue c-light w-full l-0 b-0" onClick={() => history.push(`/${replaceSpaces(product.productUrl)}`)}>BUY NOW</Button>
				</View>
				<View className="pv-2">
					<Text className="f-5 c-blue">{product.productName}</Text>
					<Text>{product.shortDescription}</Text>
					<Text className="c-blue">{priceRange(product.prices)}</Text>
				</View>
				<Divider />
			</View>) : <Text className="mh-2">No item found</Text>}
		</View>
	</Container>
}

export default Collections