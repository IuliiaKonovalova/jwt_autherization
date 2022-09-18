import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from 'features/user';

const Navbar = () => {

	const dispatch = useDispatch();
	const { isAuthenticated } = useSelector(state => state.user);

  // If user is authenticated, show logout button and dashboard link
	const authLinks = (
		<>
			<li className='nav-item'>
				<NavLink className='nav-link' to='/dashboard'>
					Dashboard
				</NavLink>
			</li>
			<li className='nav-item'>
				<a className='nav-link' href='#!' onClick={() => dispatch(logout())}>
					Logout
				</a>
			</li>
		</>
	);

  // If user is not authenticated, show login and register links
	const guestLinks = (
		<>
			<li className='nav-item'>
				<NavLink className='nav-link' to='/login'>
					Login
				</NavLink>
			</li>
			<li className='nav-item'>
				<NavLink className='nav-link' to='/register'>
					Register
				</NavLink>
			</li>
		</>
	);

	return (
		<nav className='navbar navbar-expand-lg bg-light'>
			<div className='container-fluid'>
				<Link className='navbar-brand' to='/'>
					Auth Site
				</Link>
				<button
					className='navbar-toggler'
					type='button'
					data-bs-toggle='collapse'
					data-bs-target='#navbarNav'
					aria-controls='navbarNav'
					aria-expanded='false'
					aria-label='Toggle navigation'
				>
					<span className='navbar-toggler-icon'></span>
				</button>
				<div className='collapse navbar-collapse' id='navbarNav'>
					<ul className='navbar-nav'>
						<li className='nav-item'>
							<NavLink className='nav-link' to='/'>
								Home
							</NavLink>
						</li>
            {/* add the following links according to authentication status */}
						{isAuthenticated ? authLinks : guestLinks}
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;