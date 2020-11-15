import React, { useEffect } from 'react';
import Container from 'src/components/elements/Container';
import Icon from 'src/components/elements/Icon';
import Image from 'src/components/elements/Image';
import Input from 'src/components/elements/Input';
import View from 'src/components/elements/View';
import { useStateArray } from 'src/hooks/useState';
import DragSortable from 'src/components/elements/DragSortable';
import { setPosition, FILE_PATH, getHighlight, manageHighlight } from 'src/utils/api';
import FileUpload from 'src/components/elements/FileUpload';
import Wrapper from 'src/components/elements/Wrapper';
import { HighlightType, ManageHighlightType } from 'src/utils/types';

type OnBlurType = Record<'id' | 'current' | 'value', string> & { index: number, target: ManageHighlightType['target'] }

const HighlightHome = () => {
	const [highlihts, setHighlight, initHighlihts] = useStateArray<HighlightType>()
	const onBlur = async ({ current, id, target, index, value }: OnBlurType) => {
		setHighlight({ ...highlihts[index], ...target ? { [target]: value } : {} }, index)
		if (current !== value) {
			await manageHighlight({ type: 'change', id, target, value })
		}
	}
	const getData = async () => {
		const { status, data } = await getHighlight({ forCms: true })
		if (status) {
			initHighlihts(data)
		}
	}
	const effect = () => {
		getData()
	}
	useEffect(effect, [])
	return <Container>
		<FileUpload multiple onChange={async data => {
			await manageHighlight({ type: 'insert', data })
			getData()
		}}><Icon name="plus" className="f-20" /></FileUpload>
		<DragSortable
			data={highlihts}
			className="-m-1"
			itemClass='w-1/4 p-1'
			onSort={async data => await setPosition({ target: 'highlight_home', data })}
			renderItem={({ item: { visible, btnText, id, image, redirect, name }, index }) => {
				const isVisible = visible === '1'
				return <View className="bg-light o-h">
					<View className="o-h h-20 relative">
						<Wrapper style={{ right: 0, zIndex: 99 }} className="absolute bg-dark p-1">
							<Icon onClick={async () => {
								await manageHighlight({ type: 'toggle', id, visible })
								getData()
							}} className="c-light mr-1" name={isVisible ? 'eye' : 'eye-slash'} />
							<Icon onClick={async () => {
								const confirm = window.confirm('Yakin hapus data ini?')
								if (confirm) {
									await manageHighlight({ type: 'delete', id })
									getData()
								}
							}} className="c-light" name="trash" />
						</Wrapper>
						<Image style={{ opacity: isVisible ? 1 : .3 }} source={FILE_PATH + image} />
					</View>
					<Input
						items="center"
						onBlur={e => onBlur({ id, index, target: 'name', current: name, value: e.target.value })}
						className="p-1 mv-1"
						renderLeftAccessory={() => <Icon name="font" />}
						defaultValue={name}
					/>
					{/* <Input
						onBlur={e => onBlur({ id, index, target: 'btnText', current: redirect, value: e.target.value })}
						className="p-1"
						renderLeftAccessory={() => <Icon name="mouse" />}
						defaultValue={btnText}
					/> */}
					<Input
						items="center"
						onBlur={e => onBlur({ id, index, target: 'redirect', current: redirect, value: e.target.value })}
						className="p-1"
						renderLeftAccessory={() => <Icon name="link" />}
						defaultValue={redirect}
					/>
				</View>
			}}
		/>
	</Container>
}

export default HighlightHome