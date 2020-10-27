import React, { useEffect } from 'react';
import Container from 'src/components/elements/Container';
import Icon from 'src/components/elements/Icon';
import Image from 'src/components/elements/Image';
import Input from 'src/components/elements/Input';
import View from 'src/components/elements/View';
import { FILE_PATH, getBanner } from 'src/utils/api';
import { useStateArray } from '../../hooks/useState';
import DragSortable from '../../components/elements/DragSortable';

interface BannerType {
	redirect: string
	image: string
	btnText: string
	id: string
}

const ManageBanner = () => {
	const [banners, , setBanner] = useStateArray<BannerType>()
	const onSort = async (sortedList: any) => {
		const idSortedList = sortedList.reduce((ret: { [key: string]: string }, { id, rank }: { id: number, rank: string }) => {
			ret[id] = rank
			return ret
		}, {})
		console.log(idSortedList)
		// await changeOrder({ target: 'banner', order: idSortedList })
	}
	const getData = async () => {
		const { status, data } = await getBanner<BannerType[]>()
		if (status) {
			setBanner(data)
		}
	}
	const effect = () => {
		getData()
	}
	useEffect(effect, [])
	return <Container>
		<DragSortable
			data={banners}
			className='w-1/4 p-1'
			addComponent={[{
				index: '0',
				classes: ['flex w-1/4 p-2'],
				content: <View onClick={() => alert(6789)} flex items="center" justify="center" className="no-drag h-full link bg-blue o-h">
					<Icon name="plus" className="f-20 c-light" />
				</View>
			}]}
			renderItem={({ item: { id, btnText, image, redirect } }) => <View className="p-1 o-h">
				<Image source={FILE_PATH + image} />
				{/* @ts-ignore */}
				{/* <Input className="p-1 mv-1" renderLeftAccessory={() => <Icon name="font" />} value={btnText} /> */}
				{/* @ts-ignore */}
				{/* <Input className="p-1" renderLeftAccessory={() => <Icon name="link" />} value={redirect} /> */}
			</View>}
		/>
	</Container>
}

export default ManageBanner