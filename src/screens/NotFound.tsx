import React from 'react';
import Container from 'src/components/elements/Container';
import Text from 'src/components/elements/Text';

const NotFound = () => {
	return <Container flex justify="center" items="center" id="404">
		<Text className="f-25">404</Text>
		<Text>Halaman yang anda cari tidak ditemukan</Text>
	</Container>
}

export default NotFound