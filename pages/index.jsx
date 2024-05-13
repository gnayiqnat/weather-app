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

export default function IndexPage() {
	const inputCity = useRef('');
	const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

	const [isLoading, setIsLoading] = useState(false);

	const router = useRouter();

	async function fetchCity() {
		setIsLoading(true);

		const response = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${inputCity.current}&appid=${apiKey}&limit=1&units=metric`
		);

		const JSONdata = await response.json();
		if (JSONdata.cod == 200) {
			console.log(JSONdata);

			const location = JSONdata.name;
			const temp = JSONdata.main.temp;
			const feelsLike = JSONdata.main.feels_like;
			const humidity = JSONdata.main.humidity;

			setTimeout(() => {
				router.push({
					pathname: '/results',
					query: {
						name: location,
						temp: temp,
						feelsLike: feelsLike,
						humidity: humidity,
					},
				});
			}, 500);
		} else if (JSONdata.cod == 404) {
			console.log('City not found!');
		}
		setTimeout(() => {
			setIsLoading(false);
		}, 500);
	}

	return (
		<DefaultLayout>
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
		</DefaultLayout>
	);
}
