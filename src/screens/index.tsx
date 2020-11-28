import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Container from 'src/components/elements/Container';
import { useSelector } from 'react-redux';
// import Home from './Auth';
import Login from './UnAuth';
import ManageInfo from './Auth/Info';
import Register from './UnAuth/Register';
import Modal from 'src/components/elements/Modal';
import Wrapper from 'src/components/elements/Wrapper';
import View from 'src/components/elements/View';
import useWindowSize from 'src/hooks/useWindowSize';
import SideBar from '../components/commons/SideBar';
import Text from 'src/components/elements/Text';
import ManageBanner from './Auth/Banner';
import Marketplaces from './Auth/Marketplaces';
import About from './Auth/About';
import Product from './Auth/Product';
import HighlightHome from './Auth/HighlightHome';

const App = (): JSX.Element => {
	const [, , isMobile] = useWindowSize()
	// @ts-ignore
	const ModalState = useSelector(state => state.Modal)
	return <Container className={`w-full ${ModalState.visible ? 'fixed' : 'relative'}`} justify={isMobile ? 'center' : 'between'} id="app">
		{isMobile ?
			<View className="p-2" items="center">
				<Text>Maaf, CMS tidak untuk tampilan mobile.</Text>
			</View> : <>
				<Modal onClick={ModalState.backdropClick} visible={ModalState.visible}>
					<View className={ModalState.className}>{ModalState.content}</View>
				</Modal>
				<Routes />
			</>
		}
	</Container>
}

const AuthRoutes = ({ url }: { url: string }) => {
	const [, height] = useWindowSize()
	return <Wrapper flex>
		<View id="sidebar" justify="between" className="bg-blueSky p-3 h-full w-1/4">
			<SideBar />
		</View>
		<View id="app-wrapper" style={{ height }} className="p-3 w-3/4">
			<Switch>
				<Route exact path={url} component={() => <Redirect to={`${url}/banner`} />} />
				{/* <Route exact path={url} component={Home} /> */}
				<Route path={`${url}/banner`} component={ManageBanner} />
				<Route path={`${url}/info`} component={ManageInfo} />
				<Route path={`${url}/marketplaces`} component={Marketplaces} />
				<Route path={`${url}/about`} component={About} />
				<Route path={`${url}/product`} component={Product} />
				<Route path={`${url}/highlight-home`} component={HighlightHome} />
			</Switch>
		</View>
	</Wrapper>
}

const Routes = () => {
	// @ts-ignore
	const Web = useSelector(state => state.Web)
	return <Switch>
		<Route exact path="/" component={() => <Redirect to="/app" />} />
		<Route path="/app" render={({ match: { url } }) => {
			if (!Web.loggedIn) return <Redirect to="/login" />
			return <AuthRoutes url={url} />
		}} />
		<Route path="/:unauth" render={() => {
			if (Web.loggedIn) return <Redirect to="/app" />
			return <Switch>
				<Route path="/login" component={Login} />
				<Route path="/register" component={Register} />
			</Switch>
		}} />
	</Switch>
}

export default App