import React, { useEffect, } from 'react';
import Button from 'src/components/elements/Button';
import Container from 'src/components/elements/Container';
import FileUpload from 'src/components/elements/FileUpload';
import Icon from 'src/components/elements/Icon';
import Image from 'src/components/elements/Image';
import Input from 'src/components/elements/Input';
import Text from 'src/components/elements/Text';
import View from 'src/components/elements/View';
import Wrapper from 'src/components/elements/Wrapper';
import { useStateArray, } from 'src/hooks/useState';
import { parseAll } from 'src/utils/helper';
import { uploadFile, setInfo, FILE_PATH, getInfo } from 'src/utils/api';
import openModalArticle from 'src/components/commons/OpenModalArticle';

type DataInfoType = {
	updated?: boolean
	index: number
	key: string
	detail: string | unknown[] | MyObject<unknown>
	type: 'file' | 'image' | 'text' | 'list' | 'object' | 'email' | 'tel' | 'article' | 'whatsapp'
}

type RenderManagerAdittionalType = {
	updateData: (index: number, oldData: DataInfoType['detail'], detail: DataInfoType['detail']) => void
	id: string
}

const ManageInfo = () => {
	const [dataInfo, setDataInfo, initDataInfo] = useStateArray<DataInfoType>([])
	const saveData = async () => {
		const data = dataInfo.filter(d => d.updated)
		if (data.length > 0) {
			const uploadedFile = await uploadAllFiles(data)
			const { status, data: response } = await setInfo({
				data: uploadedFile.map(
					({ detail, key }) => ({
						key,
						detail: typeof detail === 'string' ? detail : JSON.stringify(detail)
					})
				)
			})
			if (status) {
				getData()
				alert(response)
			}
		}
	}
	const updateData = (i: number, oldData: DataInfoType['detail'], detail: DataInfoType['detail']) => {
		if (oldData !== detail) setDataInfo(({ ...dataInfo[i], detail, updated: true }), i)
	}
	const getData = async () => {
		const { status, data: allInfo } = await getInfo<DataInfoType>()
		if (status) {
			const data = parseAll<DataInfoType>(allInfo)
			initDataInfo(data)
		}
	}
	const effect = () => {
		getData()
	}
	useEffect(effect, [])
	return <Container flex id="info">
		{dataInfo.rMap(({ key, detail, type }, i) => {
			return <Wrapper items="start">
				<Text items="start" className="w-1/3">{key.split('-').join(' ').ucwords()}</Text>
				<View wrap className="w-full">
					<RenderManager updateData={updateData} index={i} detail={detail} id={key} type={type} />
				</View>
			</Wrapper>
		})}
		{dataInfo.filter(d => d.updated).length > 0 &&
			<Button className="absolute bg-blue" textProps={{ className: 'c-light' }} style={{ zIndex: 99, right: 20, bottom: 20 }} justify="center" onClick={saveData}><Icon name="save" className="c-light mr-3" />Save data</Button>
		}
	</Container>
}

type RetUpload = { key: string, detail: unknown }
const uploadAllFiles = async (dataInfo: DataInfoType[]): Promise<RetUpload[]> => {
	const path = 'info/'
	const promises = dataInfo.map(data => {
		return new Promise<RetUpload>(async (resolve) => {
			const { detail, type, key } = data
			if (type === 'image') {
				const { status, data } = await uploadFile({ path, file: detail })
				if (status) resolve({ key, detail: data.fullname })
			} else if (['object', 'list'].includes(type)) {
				let detailObject = detail as unknown[] | MyObject
				if (Array.isArray(detail)) {
					for (let index = 0; index < detail.length; index++) {
						let list = detail[index]
						if (typeof list === 'string' && list.isBase64File()) {
							detailObject = detailObject as string[]
							const { status, data } = await uploadFile({ path, file: detail })
							if (status) detailObject[index] = data.fullname
						} else {
							for (const key in list as MyObject) {
								const temp = list as MyObject
								if (typeof temp[key] === 'string' && temp[key].isBase64File()) {
									const { status, data } = await uploadFile({ path, file: temp[key] })
									if (status) (detailObject as MyObject[])[index][key] = data.fullname
								}
							}
						}
					}
				} else {
					for (const key in detailObject) {
						detailObject = detailObject as MyObject
						const temp = detailObject[key]
						if (typeof temp === 'string' && temp.isBase64File()) {
							const { status, data } = await uploadFile({ path, file: temp })
							if (status) detailObject[key] = data.fullname
						}
					}
				}
				resolve({ key, detail: detailObject })
			} else {
				resolve({ key, detail })
			}
		})
	})
	return Promise.all(promises)
}

const RenderManager = ({ updateData, index, detail, type, id: key }: Omit<DataInfoType, 'key'> & RenderManagerAdittionalType) => {
	const deleteFromList = (index: number, dataIndex: number, data: unknown[]) => {
		const newData = data.slice()
		newData.splice(dataIndex, 1)
		updateData(index, data, newData)
	}
	const addToList = <D,>(index: number, data: D[], value: D) => {
		const newData = data.slice()
		newData.push(value)
		updateData(index, data, newData)
	}
	switch (type) {
		case 'file':
		case 'image':
			return <FileUpload onChange={([image]) => updateData(index, detail, image.file)} accept={type === 'image' ? 'image/*' : undefined} className="w-1/3 o-h">
				{type === 'image' ? <Image source={detail as string} /> : <Icon name="edit" />}
			</FileUpload>
		case 'object':
		case 'list':
			switch (key) {
				case 'about-hours':
					const aboutHours = detail as string[]
					return <>
						{aboutHours.rMap((hour, i) => {
							return <Input onBlur={e => {
								let newDetail = (detail as string[]).slice()
								newDetail[i] = e.target.value
								updateData(index, detail, newDetail)
							}} value={hour} renderRightAccessory={() => <Icon className="f-5" name="trash" onClick={() => deleteFromList(index, i, detail as [])} />} />
						})}
						<Button justify="center" onClick={() => addToList(index, aboutHours, "")}><Icon name="plus" className="mr-3" />Add</Button>
					</>
				case 'about-why-shop':
					type AboutWhyType = { icon: string, title: string, description: string }
					const aboutWhy = detail as AboutWhyType[]
					const edit = (i: number, data: AboutWhyType) => {
						let newAbout = aboutWhy.slice()
						newAbout[i] = data
						updateData(index, aboutWhy, newAbout)
					}
					return <>
						{aboutWhy.rMap((data, i) => {
							const { icon, description, title } = data
							return <Wrapper className="info-items">
								<View className="mr-3" flex>
									<Input onBlur={e => edit(i, { ...data, icon: e.target.value })} value={icon} renderRightAccessory={() => <Icon className="f-5" name={icon} />} />
									<Input onBlur={e => edit(i, { ...data, title: e.target.value })} value={title} />
								</View>
								<View>
									<Icon onClick={() => openModalArticle(
										description,
										(value, hideModal) => {
											edit(i, { ...data, description: value })
											hideModal()
										}
									)} className="f-5 c-light mb-3" name="edit" />
									<Icon className="f-5 c-light" name="trash" onClick={() => deleteFromList(index, i, aboutWhy)} />
								</View>
							</Wrapper>
						})}
						<Button justify="center" onClick={() => addToList(index, aboutWhy, { description: '', icon: '', title: '' })}><Icon name="plus" className="mr-3" />Add</Button>
					</>
				case 'socmed':
					type SocmedType = { icon: string, name: string, url: string }
					const socmeds = detail as SocmedType[]
					return <>
						{socmeds.rMap(({ icon, name, url }, i) => {
							return <Wrapper className="info-items">
								<View className="mr-3" flex>
									<Input value={icon} renderRightAccessory={() => <Icon className="f-5" name={icon} />} />
									<Input value={name} />
									<Input value={url} />
								</View>
								<Icon className="f-5 c-light" name="trash" onClick={() => deleteFromList(index, i, detail as [])} />
							</Wrapper>
						})}
						<Button justify="center" onClick={() => addToList(index, socmeds, { icon: '', name: '', url: '' })}><Icon name="plus" className="mr-3" />Add</Button>
					</>
				case 'about-home':
					type AboutHomeType = { image: string, description: string }
					let AboutHome = detail as AboutHomeType
					return <Wrapper justify="start">
						<FileUpload onChange={([image]) => {
							updateData(index, detail, { ...AboutHome, image: image.file })
						}} accept="image/*" className="mr-3 w-1/3 o-h">
							<Image source={AboutHome.image.length > 100 ? AboutHome.image : FILE_PATH + AboutHome.image} />
						</FileUpload>
						<Icon onClick={() => openModalArticle(
							AboutHome.description,
							(description, hideModal) => {
								updateData(index, detail, { ...AboutHome, description })
								hideModal()
							})} name="edit" className="f-5" />
					</Wrapper>
			}
			return null
		case 'article':
			return <Button
				justify="center"
				onClick={() => openModalArticle(
					detail as string,
					(article, hideModal) => {
						updateData(index, detail, article)
						hideModal()
					})}><Icon name="edit" className="mr-3" />Edit</Button>
		default:
			return <Input
				onBlur={e => updateData(index, detail, e.target.value)}
				value={detail as string}
			/>
	}
}

export default ManageInfo