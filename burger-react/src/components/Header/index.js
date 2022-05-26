import { Link } from 'react-router-dom'
import './Header.css'

export default function Header() {

    return (
        <>
            <header className="header">
                <div>
                    <Link to='/'>
                        <img src={require(`../../images/burger-logo.png`)} alt='burger logo' width='50' height='50' />
                    </Link>
                </div>
                <h2>Burger Builder App</h2>
                <ul className='header__menu'>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/orders">Orders</Link>
                    </li>
                    <li>
                        <Link to="/contacts">Contacts</Link>
                    </li>

                    <li>
                        <Link to="/faq">FAQ</Link>
                    </li>
                </ul>
            </header>
        </>
    )
}