import { title } from '@/components/primitives';
import DefaultLayout from '@/layouts/default';
import { Button, Card, CardBody } from '@nextui-org/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { IoArrowBackOutline } from 'react-icons/io5';

export default function ResultPage() {
	const searchParams = useSearchParams();

	const location = searchParams.get('name');
	const country = searchParams.get('country');
	const temp = searchParams.get('temp');
	const feelsLike = searchParams.get('feelsLike');
	const humidity = searchParams.get('humidity');

	useEffect(() => {}, []);

	const router = useRouter();

	return (
		<>
			<AnimatePresence>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ type: 'linear', duration: 0.5 }}
				>
					<DefaultLayout>
						<Button
							className=' absolute -mt-12 font-semibold'
							variant='light'
							startContent={<IoArrowBackOutline />}
							onClick={() => {
								router.push('/');
							}}
						>
							Back
						</Button>
						<section className='prose flex flex-col justify-center items-center'>
							<h6 className='mb-1 opacity-70'>
								{location}, {country}
							</h6>
							<h2 className={title()}>{Math.round(temp)} °C</h2>
						</section>
					</DefaultLayout>
				</motion.div>
			</AnimatePresence>
		</>
	);
}
