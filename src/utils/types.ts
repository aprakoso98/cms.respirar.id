import { RouteComponentProps } from "react-router-dom";
import { toBase64Type } from ".";
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

export type collectionType = Record<'id' | 'productUrl' | 'productName' | 'shortDescription' | 'image' | 'prices' | 'marketplaces', string>

export type producType = Record<'availability' | 'description' | 'id' | 'image' | 'image2' | 'image3' | 'image4' | 'image5' | 'image6' | 'kategori' | 'marketplaces' | 'prices' | 'productName' | 'productUrl' | 'shortDescription' | 'sizes' | 'sku', string> & Partial<Record<'updated' | 'deleted' | 'uploadedNewImage', boolean>>

export type productParsedType = {
	sizes: string[]
	prices: string[]
	marketplaces: MyObject
} & Omit<producType, 'sizes' | 'prices' | 'marketplaces'>


export type HighlightType = Record<'name' | 'image' | 'btnText' | 'redirect' | 'id' | 'position', string> & { visible?: '1' | '0' }

export type ManageHighlightType = {
	type: 'insert' | 'delete' | 'toggle' | 'change'
	data?: toBase64Type[]
	id?: string
	visible?: '1' | '0'
	target?: 'name' | 'redirect' | 'btnText'
	value?: string
}

export type loginResponse = Record<'token' | 'expired', string>