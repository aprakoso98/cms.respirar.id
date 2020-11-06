import React, { FocusEvent, useEffect } from 'react';
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
import { marketplaceType } from 'src/utils/types';
import { updateMarketplace } from '../../utils/api';

const Marketplaces = () => {
	const [marketPlaces, setMarketplace, initMarketplace] = useStateArray<marketplaceType>()
	const updateMarketplaceData = (event: FocusEvent<HTMLInputElement>, key: keyof marketplaceType, index: number) => setMarketplace({ ...marketPlaces[index], [key]: event.target.value, updated: true }, index)
	const saveData = async () => {
		const dataToSave = marketPlaces.filter(d => d.updated)
		const { status, data } = await updateMarketplace({ data: dataToSave })
		alert(data)
		if (status) getData()
	}
	const getData = async () => {
		const { status, data } = await getMarketplace()
		if (status) {
			initMarketplace(data)
		}
	}
	const effect = () => {
		getData()
	}
	useEffect(effect, [])
	return <Container id="marketplaces">
		{marketPlaces.filter(d => d.updated).length > 0 &&
			<Button className="absolute bg-blue" textProps={{ className: 'c-light' }} style={{ zIndex: 99, right: 20, bottom: 20 }} justify="center" onClick={saveData}><Icon name="save" className="c-light mr-3" />Save data</Button>
		}
		{marketPlaces.rMap((data, index) => {
			const { icon, baseUrl, marketplaceName, deleted } = data
			return <Wrapper items="start" className={`mb-2 info-items ${deleted ? 'deleted' : ''}`}>
				<FileUpload onChange={([{ file: icon }]) => setMarketplace({ ...marketPlaces[index], icon, uploadedNewImage: true, updated: true }, index)} className="w-1/5 mr-3">
					<Image source={icon ? (icon.length > 100 ? icon : FILE_PATH + icon) : require('src/assets/images/marketplace-thumb.jpg')} />
				</FileUpload>
				<View className="mr-3" self="start" flex>
					<Input className="w-full" onBlur={e => updateMarketplaceData(e, 'marketplaceName', index)} value={marketplaceName} />
					<Input className="w-full" onBlur={e => updateMarketplaceData(e, 'baseUrl', index)} value={baseUrl} />
					<Button onClick={() => setMarketplace({ ...data, updated: true, deleted: true }, index)} justify="start"><Icon name="trash" className="mr-3" />Delete</Button>
				</View>
			</Wrapper>
		})}
		<Button onClick={() => {
			setMarketplace({} as marketplaceType)
		}} justify="center"><Icon name="plus" className="mr-3" />Add</Button>
	</Container >
}

export default Marketplaces