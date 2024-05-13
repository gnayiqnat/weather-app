import { title } from '@/components/primitives';
import DefaultLayout from '@/layouts/default';
import { Button, Card, CardBody } from '@nextui-org/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { IoArrowBackOutline } from 'react-icons/io5';

export default function ResultPage() {
	const searchParams = useSearchParams();

	const location = searchParams.get('name');
	const temp = searchParams.get('temp');
	const feelsLike = searchParams.get('feelsLike');
	const humidity = searchParams.get('humidity');

	useEffect(() => {}, []);

	const router = useRouter();

	return (
		<>
			<DefaultLayout>
				<Button
					className=' absolute -mt-12 font-semibold'
					variant='light'
					startContent={<IoArrowBackOutline />}
					onClick={() => {
						router.back();
					}}
				>
					Back
				</Button>
				<section className='prose flex flex-col justify-center items-center'>
					<h2 className={title()}>{Math.round(temp)} °C</h2>
					
				</section>
			</DefaultLayout>
		</>
	);
}
