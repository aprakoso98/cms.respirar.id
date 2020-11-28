import React from 'react';
import { useDispatch } from 'react-redux';
import Button from 'src/components/elements/Button';
import Container from 'src/components/elements/Container';
import Icon from 'src/components/elements/Icon';
import Image from 'src/components/elements/Image';
import Input from 'src/components/elements/Input';
import Text from 'src/components/elements/Text';
import View from 'src/components/elements/View';
import { useStateObject, useToggle } from 'src/hooks/useState';
import actionWeb from 'src/redux/actions/web';
import { apiLogin } from 'src/utils/api';
import { loginResponse } from 'src/utils/types';

const Login = () => {
	const dispatch = useDispatch()
	const [eye, setEye] = useToggle(true)
	const [form, setForm] = useStateObject({
		username: '',
		password: ''
	})
	const doLogin = async () => {
		const { status, data } = await apiLogin(form)
		if (status) {
			const resp = data as loginResponse
			dispatch(actionWeb({ loggedIn: true, ...resp }))
		} else {
			alert(data)
		}
	}
	return <Container justify="center" items="center" className="w-full h-full">
		<View className="bg-grey p-5">
			<View className="w-1/2" self="center">
				<Image source={require('src/assets/images/Logo.png')} />
			</View>
			<View className="mv-3">
				<Input onBlur={({ target: { value } }) => setForm({ username: value })} value={form.username} className="ph-1" renderLeftAccessory={() => <Text>Username</Text>} />
				<Input onBlur={({ target: { value } }) => setForm({ password: value })} value={form.password} type={eye ? 'password' : 'text'} className="ph-1" items="center" renderLeftAccessory={() => <Text>Password</Text>} renderRightAccessory={() => <Icon onClick={setEye} name={eye ? 'eye' : 'eye-slash'} />} />
			</View>
			<Button onClick={doLogin}>Login</Button>
		</View>
	</Container>
}

export default Login