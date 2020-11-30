import React from 'react';
import JoditEditor from 'src/components/elements/JoditEditor';
import { modal } from 'src/redux/actions/modal';
import Wrapper from '../elements/Wrapper';
import Button from '../elements/Button';
import { XmlEntities } from 'html-entities';

const openModalArticle = (currentValue: string, onSave: (newValue: string, hideModal: typeof modal.hide) => void, onCancel?: () => void) => {
	const entities = new XmlEntities()
	let newValue: string
	modal
		.setBackdropClick(onCancel || modal.hide)
		.setContent(<>
			<JoditEditor onChange={(value) => newValue = value} value={entities.decode(currentValue)} />
			<Wrapper justify="end">
				<Button className="mr-3" onClick={onCancel || modal.hide}>Cancel</Button>
				<Button onClick={() => onSave(newValue, modal.hide)}>Save</Button>
			</Wrapper>
		</>)
		.show('w-5/6 h-full mv-10')
}

export default openModalArticle