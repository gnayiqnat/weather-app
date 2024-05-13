import DefaultLayout from '@/layouts/default';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { IoArrowBackOutline } from 'react-icons/io5';
export default function ResultPage() {
	const router = useRouter();

	return (
		<>
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
			</DefaultLayout>
		</>
	);
}
