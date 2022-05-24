import './Header.css'

export default function Header(props) {

    return (
        <>
            <header className="header">
                <h2>Burger Builder App</h2>
                <button className='btn-orderlist' type='submit'>Check order list</button>
            </header>
        </>
    )
}