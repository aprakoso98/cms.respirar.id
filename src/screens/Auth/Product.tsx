import React, { FocusEvent, useEffect } from 'react';
import openModalArticle from 'src/components/commons/OpenModalArticle';
import Button from 'src/components/elements/Button';
import Container from 'src/components/elements/Container';
import FileUpload from 'src/components/elements/FileUpload';
import Icon from 'src/components/elements/Icon';
import Image from 'src/components/elements/Image';
import Input from 'src/components/elements/Input';
import View from 'src/components/elements/View';
import Wrapper from 'src/components/elements/Wrapper';
import { useStateArray } from 'src/hooks/useState';
import { modal } from 'src/redux/actions/modal';
import { FILE_PATH, getMarketplace, getProduct, updateProduct } from 'src/utils/api';
import { marketplaceType, productParsedType } from 'src/utils/types';

const Product = () => {
	const [products, setProduct, initProducts] = useStateArray<productParsedType>()
	const [marketPlaces, , initMarketplace] = useStateArray<marketplaceType>()
	const updateProductData = (event: FocusEvent<HTMLInputElement>, key: keyof productParsedType, index: number) => setProduct({ ...products[index], [key]: event.target.value, updated: true }, index)
	const saveData = async () => {
		const dataToSave = products.filter(d => d.updated)
		const { status, data } = await updateProduct({ data: dataToSave })
		alert(data)
		if (status) getData()
	}
	const getData = async () => {
		const resp = await getMarketplace()
		if (resp.status) initMarketplace(resp.data)
		const { status, data } = await getProduct()
		if (status) initProducts(data)
	}
	const editMarketplace = (index: number, marketplace: productParsedType['marketplaces'], set?: boolean) => {
		if (set) {
			for (const key in marketplace) if (!marketplace[key]) delete marketplace[key]
			setProduct({ ...products[index], marketplaces: marketplace })
			modal.hide()
		} else {
			modal.setBackdropClick(modal.hide).setContent(<>
				{marketPlaces.rMap(m => {
					const targetUrl = marketplace[m.id] || ''
					return <Input
						onBlur={e => marketplace[m.id] = e.target.value}
						renderLeftAccessory={() => <Image className="m-1 w-10 h-10" source={FILE_PATH + m.icon} />}
						value={targetUrl.slice(1)} />
				})}
				<Button onClick={() => editMarketplace(index, marketplace, true)}>Save</Button>
			</>).show('w-1/3')
		}
	}
	const setSizeAndPricing = (index: number, key?: 'delete' | 'sizes' | 'prices', i?: number, value?: string) => {
		let product = products[index]
		if (key) {
			i = i as number
			if (key === 'sizes' || key === 'prices') {
				let data: string[] = product[key].slice()
				value = value as string
				data[i] = value
				product = { ...product, [key]: data }
			} else {
				product.sizes = product.sizes.splice(Math.abs(i), 1)
				product.prices = product.prices.splice(Math.abs(i), 1)
			}
		} else {
			product.sizes.push('')
			product.prices.push('')
		}
		setProduct({ ...product, updated: true }, index)
	}
	const effect = () => {
		getData()
	}
	useEffect(effect, [])
	return <Container className="odd-even-color" id="product">
		{products.rMap((data, index) => {
			const { productName, availability, prices, sizes, marketplaces: marketplace, shortDescription, sku, productUrl, description, image, deleted } = data
			return <Wrapper items="start" className={`items mb-2 ${deleted ? 'deleted' : ''}`}>
				<FileUpload onChange={([image]) => setProduct({ ...products[index], image: image.file, uploadedNewImage: true, updated: true }, index)} className="w-1/5 mr-3">
					<Image source={image ? (image.length > 100 ? image : FILE_PATH + image) : require('src/assets/images/marketplace-thumb.jpg')} />
				</FileUpload>
				<View className="mr-3" self="start" flex>
					<Input className="w-full" onBlur={e => updateProductData(e, 'productName', index)} value={productName} />
					<Input className="w-full" onBlur={e => updateProductData(e, 'productUrl', index)} value={productUrl} />
					<Input className="w-full" onBlur={e => updateProductData(e, 'availability', index)} value={availability} />
					<Input className="w-full" onBlur={e => updateProductData(e, 'shortDescription', index)} value={shortDescription} />
					<Input className="w-full" onBlur={e => updateProductData(e, 'sku', index)} value={sku} />
					<View className="bg-blue p-2 mb-1">
						{prices.rMap((_, i) => {
							return <Wrapper>
								<Input onBlur={e => setSizeAndPricing(index, 'sizes', i, e.target.value)} flex value={sizes[i]} />
								<Input currency className="mh-1" onBlur={e => setSizeAndPricing(index, 'prices', i, e.target.value)} flex value={prices[i]} />
								<Button onClick={() => setSizeAndPricing(index, 'delete')} justify="start"><Icon name="trash" className="mr-3" />Delete</Button>
							</Wrapper>
						})}
						<Button self="center" onClick={() => setSizeAndPricing(index)}><Icon name="plus" className="mr-3" />Add</Button>
					</View>
					<Wrapper>
						<Button onClick={() => openModalArticle(description, (description, hide) => {
							setProduct({ ...data, description, updated: true }, index)
							hide()
						})} justify="start"><Icon name="edit" className="mr-3" />Edit Description</Button>
						<Button onClick={() => editMarketplace(index, marketplace)} justify="start"><Icon name="edit" className="mr-3" />Edit Marketplace</Button>
						<Button onClick={() => setProduct({ ...data, updated: true, deleted: true }, index)} justify="start"><Icon name="trash" className="mr-3" />Delete</Button>
					</Wrapper>
				</View>
			</Wrapper>
		})}
		<Button className="except" onClick={() => setProduct({ prices: [] as string[] } as productParsedType)} justify="center"><Icon name="plus" className="mr-3" />Add</Button>
		{products.filter(d => d.updated).length > 0 &&
			<Button className="absolute bg-blue" textProps={{ className: 'c-light' }} style={{ zIndex: 99, right: 20, bottom: 20 }} justify="center" onClick={saveData}><Icon name="save" className="c-light mr-3" />Save data</Button>
		}
	</Container>
}

export default Product