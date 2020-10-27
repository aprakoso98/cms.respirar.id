import { useState } from 'react'

interface stateType { [key: string]: unknown }

export const useToggle = (init: boolean = false): [boolean, (set?: boolean) => void] => {
	const [toggle, setToggle] = useState(init)
	return [toggle, (set) => setToggle(set !== undefined ? set : !toggle)]
}

export const useStateObject = <S extends stateType>(initState: S): [S, (newValue: S) => void] => {
	const [state, setState] = useState(initState)
	return [state, (newValue: S) => setState({ ...state, ...newValue })]
}

export const useStateArray = <S>(initialValue: S[] = []): [
	S[],
	(state: S, indexOrPush?: boolean | number) => void,
	(override: S[]) => void
] => {
	const [state, setState] = useState(initialValue || [])
	return [state, (value: S, indexOrPush?: boolean | number) => {
		const newState = state.slice()
		if (typeof indexOrPush === 'boolean') {
			newState.push(value)
		} else if (typeof indexOrPush === 'number') {
			newState[indexOrPush] = value
		}
		setState(newState)
	}, (override: S[]) => setState(override)]
}