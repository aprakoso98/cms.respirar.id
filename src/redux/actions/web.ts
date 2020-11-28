import { reducerWebInitState } from "../reducers/web"

const actionWeb = (data: typeof reducerWebInitState) => {
	return {
		type: 'GET_UI',
		payload: data
	}
}

export default actionWeb