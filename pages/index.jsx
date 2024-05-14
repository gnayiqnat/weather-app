import { Link } from '@nextui-org/link';
import { Snippet } from '@nextui-org/snippet';
import { Code } from '@nextui-org/code';
import { button as buttonStyles } from '@nextui-org/theme';
import { siteConfig } from '@/config/site';
import { title, subtitle } from '@/components/primitives';
import { GithubIcon } from '@/components/icons';
import DefaultLayout from '@/layouts/default';
import { Button, Input, Spinner } from '@nextui-org/react';
import { useEffect, useRef, useState } from 'react';
import { permanentRedirect } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { enqueueSnackbar } from 'notistack';

export default function IndexPage() {
	const inputCity = useRef('');
	const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

	const [isLoading, setIsLoading] = useState(false);
	const [errorNotFound, setErrorNotFound] = useState(false);

	const router = useRouter();

	// NPM module for converting country code to full country name
	var countries = require('i18n-iso-countries');
	countries.registerLocale(require('i18n-iso-countries/langs/en.json'));

	async function fetchCity() {
		setIsLoading(true);
		const response = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${inputCity.current}&appid=${apiKey}&limit=1&units=metric`
		);

		const JSONdata = await response.json();
		if (JSONdata.cod == 200) {
			const location = JSONdata.name;
			const country = countries.getName(JSONdata.sys.country, 'en');
			const temp = JSONdata.main.temp;
			const feelsLike = JSONdata.main.feels_like;
			const humidity = JSONdata.main.humidity;

			setTimeout(() => {
				router.push({
					pathname: '/results',
					query: {
						name: location,
						country: country,
						temp: temp,
						feelsLike: feelsLike,
						humidity: humidity,
					},
				});
			}, 500);
		} else if (JSONdata.cod == 404) {
			console.log('City not found!');
			enqueueSnackbar('City not found!', {preventDuplicate: true})
		}
		setTimeout(() => {
			setIsLoading(false);
		}, 500);
	}

	return (
		<DefaultLayout>
			<AnimatePresence>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ type: 'linear', duration: 0.5 }}
				>
					<section className='flex flex-col items-center justify-center gap-4 py-8 md:py-10'>
						<div className='inline-block max-w-lg text-center justify-center'>
							<h1 className={title()}>Weather&nbsp;</h1>
							<h1 className={title({ color: 'blue' })}>Forecast&nbsp;</h1>
							<div className='w-[500px] flex flex-column  items-center justify-center gap-3 mt-10'>
								<Input
									required
									onKeyDown={(e) => {
										e.key === 'Enter' && fetchCity();
									}}
									onChange={(e) => {
										inputCity.current = e.target.value;
									}}
									placeholder='Enter your city'
									className=''
									size='lg'
								></Input>
								<Button
									color='primary'
									variant='shadow'
									className=' opacity-85'
									size='lg'
									onClick={() => {
										fetchCity();
									}}
								>
									{isLoading ? <Spinner color='white' size='sm' /> : 'Search'}
								</Button>
							</div>
						</div>
					</section>
				</motion.div>
			</AnimatePresence>
		</DefaultLayout>
	);
}
