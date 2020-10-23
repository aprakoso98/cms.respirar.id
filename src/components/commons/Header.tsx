// @ts-nocheck
import React, { useEffect } from 'react';
import View from '../elements/View';
import Container from '../elements/Container';
import Wrapper from '../elements/Wrapper';
import Button from '../elements/Button';
import Icon from '../elements/Icon';
import { useHistory } from 'react-router-dom';
import Input from '../elements/Input';
import { useStateObject } from 'src/hooks/useState';
import { Colors } from 'src/utils/constants';
import useWindowSize from 'src/hooks/useWindowSize';
import { getInfo } from 'src/utils/api';
import { parseAll } from 'src/utils/helper';

const Header = () => {
	const [state, setState] = useStateObject({
		search: '',
		searchVisible: false,
		currentPath: window.location.pathname,
		menuVisible: false,
		Logo: () => null
	})
	const getData = async () => {
		const { data } = await getInfo({ key: 'logo' })
		// @ts-ignore
		setState({ Logo: parseAll(data).logo })
	}
	const effect = () => {
		getData()
	}
	useEffect(effect, [])
	const history = useHistory()
	const menu = [['/', 'Home'], ['/about', 'About Us'], ['/collections', 'Collections']]
	const [, , isMobile] = useWindowSize()
	history.listen(({ pathname }) => setState({ currentPath: pathname }))
	const searchProduct = (search: string) => {
		if (search !== '') {
			history.push(`/collections/${search}`)
		}
	}
	const accessory = () => <Icon
		className={`${isMobile ? 'mr-2' : state.searchVisible ? 'ml-2' : ''}`}
		onClick={() => setState({ searchVisible: !state.searchVisible })}
		name="search" />
	const Search = <View items={!isMobile && 'end'} className={`${isMobile ? '' : 'w-1/5'}`}>
		<Input
			type="search"
			className={`ph-3 pv-2 ${isMobile ? 'bg-light mt-2' : state.searchVisible ? 'bg-light' : ''}`}
			placeholder="Search Product"
			style={isMobile ? {} : { width: isMobile ? '100%' : !state.searchVisible ? 0 : 175 }}
			onBlur={() => setState({ searchVisible: false })}
			renderRightAccessory={!isMobile ? accessory : undefined}
			renderLeftAccessory={isMobile ? accessory : undefined}
			wrapper={{
				justify: isMobile ? undefined : 'between',
				style: {
					borderColor: isMobile ? Colors.text : state.searchVisible ? Colors.text : Colors.transparent
				}
			}}
			onKeyDown={({ key, target }) => {
				if (key === 'Enter') {
					searchProduct(target.value)
				}
			}}
		/>
	</View>
	const Menu = () => {
		return <>
			<Wrapper
				id="menu"
				justify="center"
				items={isMobile ? 'between' : 'center'}
				direction={isMobile ? 'col' : 'row'}
				className={`${isMobile ? '' : 'w-3/5'}`}>
				{
					menu.rMap(([path, name]: string[]) => {
						return <Button
							replaceClass={isMobile}
							onClick={() => {
								setState({ menuVisible: false })
								history.push(path)
							}}
							textProps={{ className: 'c-dark' }}
							className={`${isMobile ? 'pv-2' : ''} ${state.currentPath === path ? 'active' : ''} bg-transparent`}>{name}{isMobile && <Icon name="chevron-right" />}</Button>
					})
				}
			</Wrapper>
		</>
	}

	return <Container className={`${isMobile ? 'ph-5 pv-5' : 'pv-5 ph-15'}`} id="header">
		<Wrapper direction>
			<View items="start" className={`${isMobile ? 'w-1/2' : 'w-1/5'}`}>
				<state.Logo />
			</View>
			{isMobile ? <Icon onClick={() => setState({ menuVisible: !state.menuVisible })} name="bars" /> : <>
				<Menu />
				{Search}
			</>}
		</Wrapper>
		<View style={{ maxHeight: state.menuVisible ? 200 : 0 }} className={`o-h animated ${isMobile ? state.menuVisible ? 'mt-2' : '' : ''}`}>
			{isMobile && <>
				<Menu />
				{Search}
			</>}
		</View>
	</Container>
}

export default Header