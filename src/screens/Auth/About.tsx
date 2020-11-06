import React, { FocusEvent, useEffect } from 'react';
import openModalArticle from 'src/components/commons/OpenModalArticle';
import Button from 'src/components/elements/Button';
import Container from 'src/components/elements/Container';
import FileUpload from 'src/components/elements/FileUpload';
import Icon from 'src/components/elements/Icon';
import Image from 'src/components/elements/Image';
import Input from 'src/components/elements/Input';
import View from 'src/components/elements/View';
import Wrapper from 'src/components/elements/Wrapper';
import { useStateArray } from 'src/hooks/useState';
import { FILE_PATH, getAbout, updateAbout } from 'src/utils/api';
import { aboutType } from 'src/utils/types';

const About = () => {
	const [about, setAbout, initAbout] = useStateArray<aboutType>()
	const updateMarketplaceData = (event: FocusEvent<HTMLInputElement>, key: keyof aboutType, index: number) => setAbout({ ...about[index], [key]: event.target.value, updated: true }, index)
	const saveData = async () => {
		const dataToSave = about.filter(d => d.updated)
		const { status, data } = await updateAbout({ data: dataToSave })
		alert(data)
		if (status) getData()
	}
	const getData = async () => {
		const { status, data } = await getAbout()
		if (status) {
			initAbout(data)
		}
	}
	const effect = () => {
		getData()
	}
	useEffect(effect, [])
	return <Container id="about">
		{about.filter(d => d.updated).length > 0 &&
			<Button className="absolute bg-blue" textProps={{ className: 'c-light' }} style={{ zIndex: 99, right: 20, bottom: 20 }} justify="center" onClick={saveData}><Icon name="save" className="c-light mr-3" />Save data</Button>
		}
		{about.rMap((data, index) => {
			const { headline, description, image, deleted } = data
			return <Wrapper items="start" className={`mb-2 info-items ${deleted ? 'deleted' : ''}`}>
				<FileUpload onChange={([image]) => setAbout({ ...about[index], image: image.file, uploadedNewImage: true, updated: true }, index)} className="w-1/5 mr-3">
					<Image source={image ? (image.length > 100 ? image : FILE_PATH + image) : require('src/assets/images/marketplace-thumb.jpg')} />
				</FileUpload>
				<View className="mr-3" self="start" flex>
					<Input className="w-full" onBlur={e => updateMarketplaceData(e, 'headline', index)} value={headline} />
					<Wrapper self="start">
						<Button onClick={() => openModalArticle(description, (description, hide) => {
							setAbout({ ...data, description, updated: true }, index)
							hide()
						})} justify="start"><Icon name="edit" className="mr-3" />Edit</Button>
						<Button onClick={() => setAbout({ ...data, updated: true, deleted: true }, index)} justify="start"><Icon name="trash" className="mr-3" />Delete</Button>
					</Wrapper>
				</View>
			</Wrapper>
		})}
		<Button onClick={() => {
			setAbout({ description: '', headline: '', image: '' })
		}} justify="center"><Icon name="plus" className="mr-3" />Add</Button>
	</Container >
}

export default About