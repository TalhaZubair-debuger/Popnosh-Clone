import React from 'react'
import { Link } from 'react-router-dom'
import { faFacebookF, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
    const date = new Date()
    return (
        <footer>
            <hr className='hrMain' />
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <ul><li><Link to="shop" className='list'>Shop</Link></li>
                            <li><Link to="gifts" className='list'>Gifts</Link></li>
                            <li><Link to="contact-us" className='list'>Contact</Link></li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <ul>
                            <li><Link to="#" className='list'><FontAwesomeIcon icon={faFacebookF} />  Facebook</Link></li>
                            <li><Link to="#" className='list'><FontAwesomeIcon icon={faInstagram} />  Instagram</Link></li>
                            <li><Link to="#" className='list'><FontAwesomeIcon icon={faYoutube} />  Youtube</Link></li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <p>
                            &copy;{date.getFullYear()}, Pop nosh Online Shop
                        </p>
                        <p>
                            Powered by: Talha Bin Zubair
                        </p>
                        <p>
                            talhazubair.info@gmail.com
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer