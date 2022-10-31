import './AboutUs.css';

import React, { useState, useEffect } from 'react';
import { BsLinkedin, BsGithub } from "react-icons/bs";
import OuterNavBar from './Navbar.jsx';
import ProfileCard from './ProfileCard';
import img4 from '../../images/developer-team.svg';
import img5 from '../../images/business-deal.svg';
import styles from './AboutUs.module.css';
import img1 from '../../images/profilePicShreyas.png';
import img2 from '../../images/profilepic.png';
// import img3 from '../../images/caricature-dimitri.svg';

const AboutUS = () => {

  const visible = true;
  return (
    <>
      <OuterNavBar />
      {/* <img src={img4} alt="developer-team" className="img4" /> */}

      <div className='aboutUsMainView'>
        <div className='aboutus-section'>
          <div className='leftPartAboutUS'>
            <div className='aboutUsDiv'>
              <h1 className='aboutus-title'>About Us</h1>
              <p className='aboutus-text'>
                We are a team of 5 developers who are passionate about building
                applications that are useful to the community. We are currently
                working on a project that will help people find the best deals on
                their favorite products. We are also working on a project that will
                help people find the best deals on their favorite products. We are
                also working on a project that will help people find the best deals
                on their favorite products.
              </p>
            </div>
            <img src={img4} alt="developer-team" className="img4" />
          </div>
          <div className='rightPartAboutUS'>
            <img src={img5} alt="developer-team" className="img4" />
            <div className='aboutUsDiv'>
              <h1 className='aboutus-title'>Mission</h1>
              <p className='aboutus-text'>
                We are a team of 5 developers who are passionate about building
                applications that are useful to the community. We are currently
                working on a project that will help people find the best deals on
                their favorite products. We are also working on a project that will
                help people find the best deals on their favorite products. We are
                also working on a project that will help people find the best deals
                on their favorite products.
              </p>
            </div>
          </div>
        </div>
        <div class="team-section">
          <h2 class="aboutus-title">Meet Our Members</h2>

          <div class="inner-width">
            <div class="teams">
              <div class="team">
                <div class="containerAboutUs">
                  <ProfileCard name={'Shreyas Kasliwal'} email={'spk@atmos.in'} image={img1} />
                  <ProfileCard name={'Akash Yadav'} email={'akash@atmos.in'} image={img2} />
                  <ProfileCard name={'Naman Bhaita'} email={'naman@atmos.in'} image={"https://img.icons8.com/cotton/64/000000/winter-outfit-man--v2.png"} />
                  <ProfileCard name={'Dushyant Yadav'} email={'dushyant@atmos.in'} image={"https://img.icons8.com/cotton/64/000000/winter-outfit-man--v2.png"} />
                  <ProfileCard name={'Avinash Saroj'} email={'avinash@atmos.in'} image={"https://img.icons8.com/cotton/64/000000/winter-outfit-man--v2.png"} />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </>
  );
}

export default AboutUS;