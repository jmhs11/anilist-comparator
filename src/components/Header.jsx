import AniListIcon from './icons/AniListIcon';

const Header = ({ slot }) => {
	return (
		<header className='my-2 md:my-4 px-4 flex justify-between items-center gap-4'>
			<div className='flex justify-center items-center gap-4'>
				<AniListIcon className='h-10 w-10' />
				<h1 className='text-3xl font-bold text-white'>COMPARATOR</h1>
			</div>
			{slot}
		</header>
	);
};

export default Header;
