// @ts-ignore
import DragSortableList from 'react-drag-sortable'
import React from 'react';

interface Props<D = { [key: string]: unknown }> {
	data: D[]
	renderItem: ({ item, index, i }: { item: D, i: number, index: number }) => JSX.Element
	className?: string
	addComponent?: {
		content: JSX.Element
		index: string
		classes?: string[]
	}[]
}

const DragSortable = <D,>({ addComponent, className, renderItem, data }: Props<D>) => {
	// const listWithNoDrag = [
	// 	{ content: (<div>test1<input type='text' className='no-drag' /></div>) },
	// 	{ content: (<div>test2<input type='text' className='no-drag' /></div>) },
	// 	{ content: (<div>test3<input type='text' className='no-drag' /></div>) },
	// ]
	// return <DragSortableList
	// 	items={listWithNoDrag}
	// 	dropBackTransitionDuration={0.3}
	// 	onSort={(a: any) => console.log(a)}
	// />
	const renderBanner = (data: any) => {
		const retData = data.map((item: D, i: number) => {
			return {
				// id,
				index: `${i}a`,
				classes: [className],
				content: renderItem({ item, i, index: i })
			}
		})
		const w = [...retData, ...addComponent ? addComponent : []]
			.sort((a, b) => {
				if (a.index < b.index) {
					return -1;
				}
				if (a.index > b.index) {
					return 1;
				}
				return 0;
			})
		return w
	}
	const onSort = (data: any, dropEvent: unknown) => {
		console.log(data)
		console.log(dropEvent)
	}
	return <DragSortableList
		class="flex flex-wrap"
		items={renderBanner(data)}
		dropBackTransitionDuration={0.3}
		onSort={onSort}
		type="grid"
		placeholder={<div className="bc-grey h-full w-full p-5 ta-c ai-c jc-c">Drop here</div>}
	/>
}

export default DragSortable