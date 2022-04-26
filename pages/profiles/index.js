import React from 'react';
import Head from 'next/head';
import Nav from '../../components/nav';
import auth from '../../utils/auth-check';
import Axios from 'axios';
import styled from 'styled-components';

import { isWithinInterval } from 'date-fns';
import Link from 'next/link';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

const Page = styled.div`
	position: relative;
`;

const Links = styled.div`
	display: flex;
	justify-content: space-around;
`;

const Profiles = () => {
	return (
		<div>
			<Head>
				<title>Profiles</title>
				<link rel='icon' href='/favicon.ico' />
				<link rel='stylesheet' href='https://unpkg.com/tachyons@4.10.0/css/tachyons.min.css' />
			</Head>

			<Nav />

			<Page>
				<h1 className='ttu tracked f3 fw6 mt0 mb4 tc mt6'>Profiles</h1>

				<Links>
					<Link href='/profiles/delete' passHref>
						<a className='link ba bw1 b--blue bg-blue hover-bg-dark-blue white ttn f4 fw4 pv1 ph2'>
							Delete riders
						</a>
					</Link>

					<Link href='/profiles/export' passHref>
						<a className='link ba bw1 b--blue bg-blue hover-bg-dark-blue white ttn f4 fw4 pv1 ph2'>
							Export riders
						</a>
					</Link>
				</Links>
			</Page>
		</div>
	);
};

Profiles.getInitialProps = async (ctx) => {
	auth(ctx);

	return {};
};

export default Profiles;
