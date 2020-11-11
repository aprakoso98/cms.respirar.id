import store from ".."

const actionImages = (data: object) => {
	return {
		type: 'GET_IMAGES',
		payload: data
	}
}

export default actionImages

let timeout: number

const loadImage = (src: string) => new Promise<string>((resolve, reject) => {
	const img = new window.Image()
	img.onload = () => resolve(src)
	img.onerror = () => reject(false)
	img.src = src
})

export const setImage = (key: string, source: string) => {
	const Images = store.getState().Images as MyObject<MyObject>
	if (timeout) {
		clearTimeout(timeout)
	}
	timeout = setTimeout(async () => {
		const dispatch = store.dispatch
		for (const key in Images) {
			try {
				if (!Images[key]?.loaded) {
					const source = await loadImage(Images[key]?.dataImage)
					dispatch(actionImages({ [key]: { loaded: true, source } }))
				}
			} catch (e) { }
		}
	}, 1000)
	const dispatch = store.dispatch
	dispatch(actionImages({ [key]: { ...Images[key], dataImage: source } }))
}