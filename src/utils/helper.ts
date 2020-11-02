import { FILE_PATH } from './api';
import { productMarketplaceType } from './types';

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

export const parseAll = <R>(data: unknown): R[] => {
	const allData = data as {
		key: string,
		detail: string,
		type: 'file' | 'image' | 'text' | 'list' | 'object' | 'email' | 'tel' | 'article' | 'whatsapp' | 'about-home'
	}[]
	return allData.reduce((ret: MyObject<unknown>[], data) => {
		const key = data.key
		const { type, detail } = data
		switch (type) {
			case 'file':
			case 'image':
				ret.push({ key, type, detail: FILE_PATH + detail })
				break
			case 'list':
			case 'object':
				ret.push({ key, type, detail: JSON.parse(detail) })
				break
			default:
				ret.push({ key, type, detail: detail })
				break
		}
		return ret
	}, []) as R[]
}