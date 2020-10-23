/* eslint-disable no-case-declarations */
import { FILE_PATH } from './api';
import { productMarketplaceType } from './types';
import Image, { ImageProps } from '../components/elements/Image';
import A from '../components/elements/A';
import HtmlParser from 'react-html-parser';

export const convertPath = (str: string): string => str.replace(/\$FILE_PATH/g, FILE_PATH)

export const convertPrices = (str: string): string[] => str.split('|').map(prize => prize.convertRupiah())

export const priceRange = (prices: string): string => {
	const pricesArr = convertPrices(prices)
	const range = pricesArr.filter((_, i) => i === 0 || i === pricesArr.length - 1).join(' - ')
	return range
}

export const replaceSpaces = (str: string): string => str.replace(/\s/g, '-')

export const generateMarketplace = (marketplacesString: string = '{}', marketplaceLists: any[]) => {
	const marketplaces: productMarketplaceType = JSON.parse(marketplacesString)
	// @ts-ignore
	return marketplaceLists.reduce((ret, data) => {
		if (marketplaces[data.id]) {
			ret.push({
				...data,
				link: marketplaces[data.id]
			})
		}
		return ret
	}, [])
}

export const parseAll = (data: unknown) => {
	const allData = data as {
		key: string,
		detail: string,
		type: 'image' | 'text' | 'list' | 'object' | 'email' | 'tel' | 'article' | 'whatsapp' | 'about-home'
	}[]
	return allData.reduce((ret: object, data) => {
		const key = data.key.kebabToCamel()
		const { type, detail } = data
		switch (type) {
			case 'image':
				// @ts-ignore 
				ret[key] = (props: ImageProps) => Image({ source: FILE_PATH + detail, ...props })
				break
			case 'about-home':
			case 'list':
			case 'object':
				// @ts-ignore 
				ret[key] = JSON.parse(detail)
				break
			case 'whatsapp':
			case 'email':
			case 'tel':
				const href = type === 'whatsapp' ? `https://wa.me/62${detail}` :
					type === 'email' ? `mailto://${detail}` : `tel://${detail}`
				// @ts-ignore 
				ret[key] = (props) => A({ target: '_blank', children: detail, href, ...props })
				break
			case 'article':
				// @ts-ignore 
				ret[key] = HtmlParser(detail)
				break
			default:
				// @ts-ignore 
				ret[key] = detail
				break
		}
		return ret
	}, {})
}