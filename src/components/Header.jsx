import AniListIcon from './icons/AniListIcon';

const Header = ({ slot }) => {
	return (
		<header className='my-2 md:my-4 px-4 grid grid-cols-header w-screen'>
			<div className='flex justify-center items-center gap-4 col-start-2'>
				<AniListIcon className='h-10 w-10' />
				<h1 className='text-3xl font-bold text-white'>DIFF</h1>
			</div>
			{slot}
		</header>
	);
};

export default Header;
