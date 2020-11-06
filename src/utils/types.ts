import { RouteComponentProps } from "react-router-dom";
import { Colors } from "./constants";

export type screenProps<Params extends { [K in keyof Params]?: string } = {}> = RouteComponentProps<{ product: string } & Params>

export type colorType = keyof typeof Colors | string & { color?: string }

export interface ResponseType<R> {
	status: boolean
	data: R
}

export type marketplaceType = {
	baseUrl: string
	icon: string
	marketplaceName: string
	id: string
	updated?: boolean
	uploadedNewImage?: boolean
	deleted?: boolean
}

export type aboutType = {
	headline: string
	image: string
	description: string
	position?: number
	id?: string
	updated?: boolean
	uploadedNewImage?: boolean
	deleted?: boolean
}

export type productMarketplaceType = MyObject

export type collectionType = {
	id: string,
	productUrl: string,
	productName: string,
	shortDescription: string,
	image: string,
	prices: string,
	marketplaces: string
}

export type producType = {
	availability: string
	description: string
	id: string
	image: string
	marketplaces: string
	prices: string
	productName: string
	productUrl: string
	shortDescription: string
	sizes: string
	sku: string
	updated?: boolean
	deleted?: boolean
	uploadedNewImage?: boolean
}

export type productParsedType = {
	sizes: string[]
	prices: string[]
	marketplaces: MyObject
} & Omit<producType, 'sizes' | 'prices' | 'marketplaces'>
