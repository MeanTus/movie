import React from 'react'
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';

export const Footer1 = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <h5 style={{ letterSpacing: '2px' }}>Movie</h5>
                    <hr/>
                </div>
                <div className="row mb-4">
                    <h5 className="col-md-2 col-sm-12 tittle">About</h5>
                    <p className="col-md-auto">My name is Minh Tu</p>
                    <p className="col-md-auto">31/07/2000</p>
                </div>
                <div className="row mb-4">
                    <h5 className="col-md-2 tittle">Contact</h5>
                    <p className="col-md-auto"><MailOutlineIcon/>: tu.minhnguyen3107@gmail.com</p>
                </div>
                <div className="row mb-4">
                    <h5 className="col-md-2 tittle">Connect</h5>
                    <a className="col-md-auto" href="https://www.facebook.com/minhhtuss">
                        <FacebookIcon/> Facebook
                    </a>
                    <a className="col-md-auto instagram" href="https://www.instagram.com/minhh.tuss/">
                        <InstagramIcon className="instaIcon"/> Instagram
                    </a>
                </div>
                <div className="row">
                    <hr/>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        Copyright © 2021
                    </div>
                </div>
            </div>
        </footer>
    )
}
