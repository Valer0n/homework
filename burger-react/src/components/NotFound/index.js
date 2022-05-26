import React from 'react';
import './NotFound.css';
import { Link } from 'react-router-dom';

export default function NotFound() {

    return (
        <>
            <div className='not-found'>
                <h2>
                    Page not found.
                </h2>
                <ul className='not-found__menu'>
                    <li>
                        <Link to="/">Create new Burger</Link>
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
            </div>
        </>
    )
}