import { Link } from 'react-router-dom'

const Hamburger =()=> {
    return(
        <div>
            <h1>I like Hamburgers!!!!!</h1>
            <Link to='/'>Back to the Dashboard</Link>
            <Link to='/test'>Back to the test</Link>

        </div>
    )
}


export default Hamburger;