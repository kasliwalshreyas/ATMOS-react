import React, { useState, useEffect } from 'react';
import { BsLinkedin, BsGithub } from "react-icons/bs";

const ProfileCard = ({ name, email, image }) => {
    return (
        <>
            <div class="boxAboutUs">
                <div class="top-barAboutUs"></div>
                <div class="topAboutUs">
                    {/* <i class="fa fa-check-circle" aria-hidden="true"></i> */}
                    {/* <input type="checkbox" class="heart-btn" id="heart-btn-1" /> */}
                    {/* <label class="heart" for="heart-btn-1"></label> */}
                </div>
                <div class="contentAboutUs">
                    <img src={image} alt="" />
                    <strong>{name}</strong>
                    <p>{email}</p>
                </div>
                <div className='btnAboutUs'>
                    <a href="https://www.linkedin.com/in/dimitri-bertrand-2b1b4b1b9/" rel="noreferrer"><BsLinkedin /></a>
                    <a href="#" rel="noreferrer"><BsGithub /></a>
                </div>
            </div>
        </>
    );
}

export default ProfileCard;