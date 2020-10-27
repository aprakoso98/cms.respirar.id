import React from 'react';
import { useHistory } from 'react-router-dom';
import { useToggle } from 'src/hooks/useState';
import Button from '../elements/Button';
import Icon from '../elements/Icon';
import Image from '../elements/Image';
import Text from '../elements/Text';
import View from '../elements/View';
import Wrapper from '../elements/Wrapper';

const SideBar = () => {
	const history = useHistory()
	const [manage, toggleManage] = useToggle()
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
					<Button justify="between" className="link">Ganti kata sandi</Button>
				</View>
			</Wrapper>
			<View>
				<Button justify="between" className="mb-1 link">Home</Button>
				<Button onClick={() => toggleManage()} className="mb-1 link">Manage <Icon name="chevron-right" /></Button>
				{manage && <View>
					<Button onClick={() => history.push('/app/banner')}>Banner</Button>
					<Button onClick={() => history.push('/app/info')}>Info</Button>
				</View>}
			</View>
		</View>
		<Button>Logout</Button>
	</>
}

export default SideBar