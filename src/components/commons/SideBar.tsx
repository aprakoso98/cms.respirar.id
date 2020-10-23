import React from 'react';
import Button from '../elements/Button';
import Image from '../elements/Image';
import Text from '../elements/Text';
import View from '../elements/View';
import Wrapper from '../elements/Wrapper';

const SideBar = () => {
	return <>
		<View>
			<View className="mb-5 p-5">
				<Image source={require('src/assets/images/Logo.png')} />
			</View>
			<Wrapper className="mb-3">
				<View className="w-1/3">
					<View className="brd-10 w-20 h-20 bg-light" />
				</View>
				<View className="w-2/3">
					<Text>Admin</Text>
					<Button className="link">Ganti kata sandi</Button>
				</View>
			</Wrapper>
			<View>
				<Button className="mb-1 link">Home</Button>
				<Button className="mb-1 link">Bla</Button>
				<Button className="mb-1 link">Bla</Button>
				<Button className="mb-1 link">Bla</Button>
			</View>
		</View>
		<Button>Logout</Button>
	</>
}

export default SideBar