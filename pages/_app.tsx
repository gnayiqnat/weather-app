import type { AppProps } from 'next/app';

import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { fontSans, fontMono } from '@/config/fonts';
import { useRouter } from 'next/router';
import '@/styles/globals.css';
import { SnackbarProvider } from 'notistack';

export default function App({ Component, pageProps }: AppProps) {
	const router = useRouter();

	return (
		<NextUIProvider navigate={router.push}>
			<NextThemesProvider>
				<SnackbarProvider
					anchorOrigin={{vertical: 'top', horizontal: 'center'}}
					style={{
						backgroundColor: 'rgb(211, 47, 47, 0.25)',
						padding: '8px 18px 8px 18px',
						borderRadius: '10px',
						borderStyle: 'solid',
						borderColor: 'rgb(211, 47, 47, 0.1)',
						boxShadow: '0px 0px 25px rgb(211, 47, 47, 0.25)',

						fontSize: '16px',
						fontWeight: '500',
						color: 'rgb(211, 47, 47)',
					}}
				>
					<Component {...pageProps} />{' '}
				</SnackbarProvider>
			</NextThemesProvider>
		</NextUIProvider>
	);
}

export const fonts = {
	sans: fontSans.style.fontFamily,
	mono: fontMono.style.fontFamily,
};
