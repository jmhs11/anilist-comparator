const Button = ({ text, handleClick }) => {
	return (
		<div className='btn btn-primary' onClick={handleClick}>
			{text}
		</div>
	);
};

export default Button;
