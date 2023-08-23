import React from 'react';
import { Link } from 'react-router-dom';

function Navbar(props) {
  return (
    <>
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
            <div className="container">
                <Link className="navbar-brand" to="home">Notes</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto">

                        {props.userData ?
                            <>
                                <li className="nav-item">
                                    <Link to="home" className="nav-link">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <a onClick={props.logout} className="nav-link">Logout</a>
                                </li>
                            </>
                            :
                            <>
                                <li className="nav-item">
                                    <Link to="register" className="nav-link">Register</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="login" className="nav-link">Login</Link>
                                </li>
                            </>
                        }
                    </ul>
                    
                </div>
            </div>
        </nav>
    </>
  )
}

export default Navbar
