import React from 'react';
import { useHistory } from 'react-router-dom';

const Manage = () => {
	const history = useHistory()
	return <button onClick={() => history.push('/app')}>Manage</button>
}

export default Manage