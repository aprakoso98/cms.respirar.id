import React, { useEffect } from 'react';
import Container from 'src/components/elements/Container';
import Icon from 'src/components/elements/Icon';
import Image from 'src/components/elements/Image';
import Input from 'src/components/elements/Input';
import View from 'src/components/elements/View';
import { FILE_PATH, getBanner } from 'src/utils/api';
import { useStateArray } from 'src/hooks/useState';
import DragSortable from 'src/components/elements/DragSortable';
import { setPosition, manageBanner } from 'src/utils/api';
import FileUpload from 'src/components/elements/FileUpload';
import Wrapper from 'src/components/elements/Wrapper';

interface BannerType {
	redirect: string
	image: string
	btnText: string
	visible: string
	id: string
}

const ManageBanner = () => {
	const [banners, , initBanner] = useStateArray<BannerType>()
	const getData = async () => {
		const { status, data } = await getBanner<BannerType[]>()
		if (status) {
			initBanner(data)
		}
	}
	const effect = () => {
		getData()
	}
	useEffect(effect, [])
	return <Container>
		<FileUpload multiple onChange={async data => {
			await manageBanner({ type: 'insert', data })
			getData()
		}}><Icon name="plus" className="f-20" /></FileUpload>
		<DragSortable
			data={banners}
			className="-m-1"
			itemClass='w-1/4 p-1'
			onSort={async data => await setPosition({ target: 'banner', data })}
			renderItem={({ item: { visible, id, btnText, image, redirect } }) => {
				const isVisible = visible === '1'
				return <View className="bg-light o-h">
					<View className="o-h h-20 relative">
						<Wrapper style={{ right: 0, zIndex: 99 }} className="absolute bg-dark p-1">
							<Icon onClick={async () => {
								await manageBanner({ type: 'toggle', id, visible })
								getData()
							}} className="c-light mr-1" name={isVisible ? 'eye' : 'eye-slash'} />
							<Icon onClick={async () => {
								const confirm = window.confirm('Yakin hapus banner ini?')
								if (confirm) {
									await manageBanner({ type: 'delete', id })
									getData()
								}
							}} className="c-light" name="trash" />
						</Wrapper>
						<Image style={{ opacity: isVisible ? 1 : .3 }} source={FILE_PATH + image} />
					</View>
					{/* @ts-ignore */}
					<Input className="p-1 mv-1" renderLeftAccessory={() => <Icon name="font" />} value={btnText} />
					{/* @ts-ignore */}
					<Input className="p-1" renderLeftAccessory={() => <Icon name="link" />} value={redirect} />
				</View>
			}}
		/>
	</Container>
}

export default ManageBanner