import config from '../env.json'
import axios from 'axios';
import { aboutType, HighlightType, ManageHighlightType, marketplaceType, productParsedType, producType, ResponseType } from './types';

const { BASE_URL, FILE_URL } = config
const API = BASE_URL + '/api.php'
export const FILE_PATH = FILE_URL + '/'

const httpRequest = async <S>(action: string, params: MyObject<unknown> = {}): Promise<ResponseType<S>> => {
	const resp = await axios.post(API, { action, ...params })
	return resp.data
}

/* Must with token */
export type UploadFileType = {
	name: string
	format: string
	path: string
	fullname: string
}
export const uploadFile = (params: MyObject<unknown> = {}) => {
	return httpRequest<UploadFileType>('UploadFile', params)
}
export const updateMarketplace = (params: { data: marketplaceType[] }) => {
	return httpRequest<string>('UpdateMarketplace', params)
}
export const updateAbout = (params: { data: aboutType[] }) => {
	return httpRequest<string>('UpdateAbout', params)
}
export const updateProduct = (params: { data: productParsedType[] }) => {
	const data: producType[] = params.data.map(data => {
		const prices = data.prices.join('|')
		const sizes = data.sizes.join('|')
		const marketplaces = JSON.stringify(data.marketplaces)
		return { ...data, prices, sizes, marketplaces }
	})
	return httpRequest<string>('UpdateProduct', { data })
}
export const setInfo = <S, P = {}>(params: MyObject<P> = {}): Promise<ResponseType<S>> => {
	return httpRequest<S>('SetInfo', params)
}
export const setPosition = <S, P = {}>(params: MyObject<P> = {}): Promise<ResponseType<S>> => {
	return httpRequest<S>('SetPosition', params)
}
export const manageBanner = <S, P = {}>(params: MyObject<P> = {}): Promise<ResponseType<S>> => {
	return httpRequest<S>('ManageBanner', params)
}
export const manageHighlight = (params: ManageHighlightType = {} as ManageHighlightType): Promise<ResponseType<string>> => {
	return httpRequest<string>('ManageHighlight', params)
}

/* Without token */
export const getBanner = <S, P = {}>(params: MyObject<P> = {}): Promise<ResponseType<S>> => {
	return httpRequest<S>('GetBanner', params)
}
export const getHighlight = (params: { forCms?: boolean } = {}): Promise<ResponseType<HighlightType[]>> => {
	return httpRequest<HighlightType[]>('GetHighlight', params)
}
export const getProduct = async (params: MyObject = {}): Promise<ResponseType<productParsedType[]>> => {
	const { status, data: response } = await httpRequest<producType[]>('GetProduct', params)
	const data = response.map(data => {
		const prices = data.prices.split('|')
		const sizes = data.sizes.split('|')
		const marketplaces = JSON.parse(data.marketplaces)
		return { ...data, prices, sizes, marketplaces }
	})
	return { status, data }
}
export const getMarketplace = (params: MyObject = {}): Promise<ResponseType<marketplaceType[]>> => {
	return httpRequest<marketplaceType[]>('GetMarketplace', params)
}
export const getAbout = (params: MyObject = {}): Promise<ResponseType<aboutType[]>> => {
	return httpRequest<aboutType[]>('GetAbout', params)
}
export const getInfo = <S, P = {}>(params: MyObject<P> = {}): Promise<ResponseType<S>> => {
	return httpRequest<S>('GetInfo', params)
}