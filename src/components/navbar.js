import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg web_bg">
      <div className="container-fluid">
        <a className="navbar-brand ms-auto py-3 text-white" href="/">Titan Inventory Management</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse d-flex justify-content-end me-5" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link to={"/inventory"} className='text-white px-3 py-3 text-decoration-none'>Inventory</Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar