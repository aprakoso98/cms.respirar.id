import React from 'react';
import { IJodit } from 'jodit'
import ReactJoditEditor, { JoditProps } from "jodit-react"

type buttonType = 'source' | 'bold' | 'strikethrough' | 'underline' | 'italic' | 'eraser' | 'superscript' | 'subscript' | 'ul' | 'ol' | 'outdent' | 'indent' | 'font' | 'fontsize' | 'brush' | 'paragraph' | 'image' | 'file' | 'video' | 'table' | 'link' | 'align' | 'undo' | 'redo' | 'selectall' | 'cut' | 'copy' | 'paste' | 'copyformat' | 'hr' | 'symbol' | 'fullsize' | 'print' | 'preview' | 'find' | 'about' | '|' | '\n'

type Props = Omit<JoditProps, 'config'> & { config?: Omit<Partial<IJodit['options']>, 'buttons'> & { buttons: buttonType[] } }

const JoditEditor = (props: Props) => {
	const config: Props['config'] = {
		buttons: [
			'bold', 'italic', 'underline', 'eraser', '|',
			'fontsize', 'brush', '|',
			'ul', 'ol', 'align', '|',
			'hr', '|',
			'undo', 'redo', 'preview'
		]
	}
	// @ts-ignore
	return <ReactJoditEditor {...props} config={config} />
}

export default JoditEditor