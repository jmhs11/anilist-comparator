import AniListIcon from './icons/AniListIcon';

const Header = () => {
	return (
		<header className='my-4 flex justify-center items-center gap-4'>
			<AniListIcon className='h-10 w-10' />
			<h1 className='text-3xl font-bold text-white'>COMPARATOR</h1>
		</header>
	);
};

export default Header;
