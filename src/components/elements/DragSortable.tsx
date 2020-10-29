// @ts-ignore
import DragSortableList from 'react-drag-sortable'
import React from 'react';
import View, { ViewProps } from './View';

interface Props<D = MyObject<unknown>> extends ViewProps {
	data: D[]
	renderItem: ({ item, index, i }: { item: D, i: number, index: number }) => JSX.Element
	onSort: (data: MyObject<number>) => void
	itemClass?: string
}

const DragSortable = <D,>({ onSort: onSortFn, itemClass, renderItem, data, ...props }: Props<D>) => {
	const renderBanner = (data: any) => {
		return data.map((item: { id: string } & D, i: number) => {
			return {
				id: item.id,
				classes: [itemClass],
				content: renderItem({ item, i, index: i })
			}
		})
	}
	const onSort = (data: { id: string, rank: number }[]) => {
		const idSortedList = data.reduce((ret: MyObject<number>, { id, rank }) => {
			ret[id] = rank
			return ret
		}, {})
		onSortFn(idSortedList)
	}
	return <View {...props}>
		<DragSortableList
			items={renderBanner(data)}
			dropBackTransitionDuration={0.3}
			onSort={onSort}
			type="grid"
			placeholder={<div className="bc-grey h-full w-full p-5 ta-c ai-c jc-c">Drop here</div>}
		/>
	</View>
}

export default DragSortable