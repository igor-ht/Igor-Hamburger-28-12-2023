import './Header.scss';
import { Link } from 'react-router-dom';
import Settings from './components/Settings/Settings';

export default function Header() {
	return (
		<header>
			<div className="header-icon">WEATHER</div>
			<nav>
				<Link to="/">Home</Link>
				<Link to="/favorites">Favorites</Link>
			</nav>
			<Settings />
		</header>
	);
}
