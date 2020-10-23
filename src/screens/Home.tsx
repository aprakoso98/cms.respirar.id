import React, { useEffect, useState } from 'react';
import Banner from 'src/components/commons/Banner';
import Container from 'src/components/elements/Container';
import HomeCard from 'src/components/commons/HomeCard';
import View from 'src/components/elements/View';
import Wrapper from 'src/components/elements/Wrapper';
import useWindowSize from '../hooks/useWindowSize';
import { getProduct } from '../utils/api';
import AboutHome from '../components/commons/AboutHome';

const Home = () => {
	const [, , isMobile] = useWindowSize()
	const [products, setProducts] = useState([])
	const getData = async () => {
		const { status, data } = await getProduct({ highlight: true })
		if (status) {
			setProducts(data as [])
		}
	}
	useEffect(() => {
		getData()
	}, [])
	return <Container className={isMobile ? '' : 'pt-5'} id="home">
		<Banner />
		{/* @ts-ignore */}
		<View className={`${isMobile ? 'pb-5 ph-5' : 'pb-10 ph-15'}`}>
			<Wrapper wrap={isMobile} justify="center" className="-m-1">
				{products.rMap(product => {
					return <HomeCard className="m-1 bg-blue" {...product} />
				})}
			</Wrapper>
		</View>
		<AboutHome />
	</Container>
}

export default Home