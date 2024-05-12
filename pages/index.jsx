import { Link } from '@nextui-org/link';
import { Snippet } from '@nextui-org/snippet';
import { Code } from '@nextui-org/code';
import { button as buttonStyles } from '@nextui-org/theme';
import { siteConfig } from '@/config/site';
import { title, subtitle } from '@/components/primitives';
import { GithubIcon } from '@/components/icons';
import DefaultLayout from '@/layouts/default';
import { Button, Input } from '@nextui-org/react';
import { useRef } from 'react';

export default function IndexPage() {
	const inputCity = useRef('');

	const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

	function fetchCity() {
		fetch(
			`https://api.openweathermap.org/data/2.5/weather?q={${inputCity.current}}&appid={${apiKey}}`
		).then((r) => {
			console.log(r);
		});
	}

	return (
		<DefaultLayout>
			<section className='flex flex-col items-center justify-center gap-4 py-8 md:py-10'>
				<div className='inline-block max-w-lg text-center justify-center'>
					<h1 className={title()}>Weather&nbsp;</h1>
					<h1 className={title({ color: 'blue' })}>Forecast&nbsp;</h1>
					<div className='flex flex-column items-center justify-center gap-3 mt-10'>
						<Input
							required
							onChange={(event) => {
								inputCity.current = event.target.value;
							}}
							placeholder='Enter your city'
							className=' w-[450px]'
							size='lg'
						></Input>
						<Button
						color='primary'
						variant='shadow'
							className='w-[100px] opacity-85'
							size='lg'
							onClick={() => {
								fetchCity();
							}}
						>
							Search
						</Button>
					</div>
				</div>

				{/* <div className='flex gap-3'>
					<Link
						isExternal
						className={buttonStyles({ variant: 'shadow', radius: 'full' })}
						href={siteConfig.links.github}
					>
						<GithubIcon size={20} />
						GitHub
					</Link>
				</div>
				 */}
			</section>
		</DefaultLayout>
	);
}
