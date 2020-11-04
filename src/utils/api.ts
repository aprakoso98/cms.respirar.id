import config from '../env.json'
import axios from 'axios';
import { ResponseType } from './types';

const { BASE_URL } = config
const API = BASE_URL + '/api.php'
export const FILE_PATH = BASE_URL + '/files'

/* Must with token */
export type UploadFileType = {
	name: string
	format: string
	path: string
	fullname: string
}
export const uploadFile = async (params: object = {}): Promise<ResponseType<UploadFileType>> => {
	const resp = await axios.post(API, {
		action: "UploadFile",
		...params
	})
	return resp.data
}
export const setInfo = async <S>(params: object = {}): Promise<ResponseType<S>> => {
	const resp = await axios.post(API, {
		action: "SetInfo",
		...params
	})
	return resp.data
}
export const setPosition = async <S>(params: object = {}): Promise<ResponseType<S>> => {
	const resp = await axios.post(API, {
		action: "SetPosition",
		...params
	})
	return resp.data
}
export const manageBanner = async <S>(params: object = {}): Promise<ResponseType<S>> => {
	const resp = await axios.post(API, {
		action: "ManageBanner",
		...params
	})
	return resp.data
}

/* Without token */
export const getBanner = async <S>(params: object = {}): Promise<ResponseType<S>> => {
	const resp = await axios.post(API, {
		action: "GetBanner",
		...params
	})
	return resp.data
}

export const getProduct = async <S>(params: object = {}): Promise<ResponseType<S>> => {
	const resp = await axios.post(API, {
		action: "GetProduct",
		...params
	})
	return resp.data
}

export const getMarketplace = async <S>(params: object = {}): Promise<ResponseType<S>> => {
	const resp = await axios.post(API, {
		action: "GetMarketplace",
		...params
	})
	return resp.data
}

export const getAbout = async <S>(params: object = {}): Promise<ResponseType<S>> => {
	const resp = await axios.post(API, {
		action: "GetAbout",
		...params
	})
	return resp.data
}

export const getInfo = async <S>(params: object = {}): Promise<ResponseType<S>> => {
	const resp = await axios.post(API, {
		action: "GetInfo",
		...params
	})
	return resp.data
}