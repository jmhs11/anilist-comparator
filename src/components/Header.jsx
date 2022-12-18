import AniListIcon from './icons/AniListIcon';

const Header = ({ slot }) => {
	return (
		<header className='grid px-4 my-2 md:my-4 grid-cols-header'>
			<div className='flex items-center justify-center col-start-2 gap-4'>
				<AniListIcon className='w-10 h-10' />
				<h1 className='text-3xl font-bold text-white'>DIFF</h1>
			</div>
			{slot}
		</header>
	);
};

export default Header;
