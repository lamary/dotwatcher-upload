import React from 'react';
import Head from 'next/head';
import Nav from '../../components/nav';
import auth from '../../utils/auth-check';

import styled from 'styled-components';

import { useFormik } from 'formik';
import Axios from 'axios';

const Wrapper = styled.div`
	display: grid;
	grid-template-columns: 50% 50%;
	grid-column-gap: 45px;
`;

const Page = styled.div`
	position: relative;
	padding: 0 60px;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 30px;
`;

const Profiles = () => {
	const { values, handleChange, handleSubmit, setStatus, status } = useFormik({
		initialValues: {
			riders: '',
		},

		onSubmit: async (values) => {
			try {
				const { data } = await Axios({
					url: '/api/delete-rider',
					method: 'delete',
					data: { riders: values.riders.split(',').map((x) => x.trim()) },
					headers: {
						'Content-Type': 'application/json',
					},
				});

				if (data.status === 200) {
					setStatus('Riders deleted. If the names are in the database they have been removed');
					return;
				}

				setStatus('Error deleting riders.');
			} catch (error) {
				setStatus('Error deleting riders, see console.');
				console.log(error);
			}
		},
	});

	return (
		<>
			<Head>
				<title>Profiles</title>
				<link rel='icon' href='/favicon.ico' />
				<link rel='stylesheet' href='https://unpkg.com/tachyons@4.10.0/css/tachyons.min.css' />
			</Head>

			<Nav />

			<Page>
				<h1 className='ttu tracked f3 fw6 mt0 mb4 tc mt6'>Delete riders</h1>

				<Wrapper>
					<Form onSubmit={handleSubmit}>
						{status && <p>{status}</p>}

						<textarea
							name='riders'
							value={values.riders}
							onChange={handleChange}
							placeholder='Rider names to delete'
							rows='15'
						/>

						<button
							type='submit'
							className='link ba bw1 b--blue bg-blue hover-bg-dark-blue white ttn f4 fw4 pv1 ph2'
						>
							Submit
						</button>
					</Form>

					<div>
						The riders name should be a comma seperated list (line breaks are allowed) and is case
						and special character specific - so make sure everything matches up. <br />
						<br /> For example `Name 1, Name 2, Name 3, Name 4`
					</div>
				</Wrapper>
			</Page>
		</>
	);
};

Profiles.getInitialProps = async (ctx) => {
	auth(ctx);

	return {};
};

export default Profiles;
