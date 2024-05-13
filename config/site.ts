export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: 'Weather App',
	description: 'A weather app built on Next UI',
	navItems: [
		{
			label: 'Home',
			href: '/',
		},
		{
			label: 'Results',
			href: '/results',
		},
	],
	links: {
		github: 'https://github.com/gnayiqnat/weather-app',
	},
};
