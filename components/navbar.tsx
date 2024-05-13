import {
	Button,
	Kbd,
	Link,
	Input,
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarMenu,
	NavbarMenuToggle,
	NavbarBrand,
	NavbarItem,
	NavbarMenuItem,
} from '@nextui-org/react';

import { link as linkStyles } from '@nextui-org/theme';

import { siteConfig } from '@/config/site';
import NextLink from 'next/link';
import clsx from 'clsx';

import { ThemeSwitch } from '@/components/theme-switch';
import { GithubIcon, SearchIcon } from '@/components/icons';

import { Logo } from '@/components/icons';

export const Navbar = () => {
	const searchInput = (
		<Input
			aria-label='Search'
			classNames={{
				inputWrapper: 'bg-default-100',
				input: 'text-sm',
			}}
			endContent={
				<Kbd className='hidden lg:inline-block' keys={['command']}>
					K
				</Kbd>
			}
			labelPlacement='outside'
			placeholder='Search...'
			startContent={
				<SearchIcon className='text-base text-default-400 pointer-events-none flex-shrink-0' />
			}
			type='search'
		/>
	);

	return (
		<NextUINavbar maxWidth='xl' position='sticky' className=' mt-2'>
			<NavbarContent className='basis-1/5 sm:basis-full' justify='start'>
				<NavbarBrand className='gap-3 max-w-fit'>
					<NextLink className='flex justify-start items-center gap-1' href='/'>
						<Logo />
						<p className='font-bold text-inherit'></p>
					</NextLink>
				</NavbarBrand>

				{/* <div className='hidden lg:flex gap-4 justify-start ml-2'>
					{siteConfig.navItems.map((item) => (
						<NavbarItem key={item.href}>
							<NextLink
								className={clsx(
									linkStyles({ color: 'foreground' }),
									'data-[active=true]:text-primary data-[active=true]:font-medium'
								)}
								color='foreground'
								href={item.href}
							>
								{item.label}
							</NextLink>
						</NavbarItem>
					))}
				</div>
				 */}
			</NavbarContent>

			<NavbarContent
				className='hidden sm:flex basis-1/5 sm:basis-full'
				justify='end'
			>
				<NavbarItem className='hidden sm:flex gap-5'>
					<Link isExternal href={siteConfig.links.github}>
						<GithubIcon className='text-default-500' />
					</Link>

					<ThemeSwitch />
				</NavbarItem>
				{/* <NavbarItem className='hidden md:flex'>
					<Button
						isExternal
						as={Link}
						className='text-sm font-normal text-default-600 bg-default-100'
						href={siteConfig.links.github}
						startContent={<GithubIcon className='text-default-500' />}
						variant='flat'
					>
						Github
					</Button>
				</NavbarItem> */}
			</NavbarContent>

			<NavbarContent className='sm:hidden basis-1 pl-4' justify='end'>
				<Link isExternal href={siteConfig.links.github}>
					<GithubIcon className='text-default-500' />
				</Link>
				<ThemeSwitch />
				{/* <NavbarMenuToggle /> */}
			</NavbarContent>
		</NextUINavbar>
	);
};
