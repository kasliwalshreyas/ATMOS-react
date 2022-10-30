// import './AboutUs.css';

import React, { useState, useEffect } from 'react';
import { BsLinkedin, BsGithub } from "react-icons/bs";
import OuterNavBar from '../../UI/OuterNavBar';
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
                <div class="container">
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



      {/* <div class="aboutus-section">
        <div class="container">
          <div class="row">
            <div class="col-md-3 col-sm-6 col-xs-12">
              <div class="aboutus">
                <h2 class="aboutus-title">About Us</h2>
                <p class="aboutus-text">Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in.</p>
                <p class="aboutus-text">This is Photoshop's version of Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum, nec sagittis sem</p>

              </div>
              <img src={img5} alt="developer-team" className="img4" />
            </div>
            <div class="col-md-3 col-sm-6 col-xs-12">

            </div>
            <div class="col-md-3 col-sm-6 col-xs-12">
              <img src={img4} alt="developer-team" className="img4" />
              <div class="aboutus">
                <h2 class="aboutus-title">Mission</h2>
                <p class="aboutus-text">Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in.</p>
                <p class="aboutus-text">This is Photoshop's version of Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum, nec sagittis sem</p>

              </div>
            </div>

          </div>
        </div>
      </div>

      <div class="team-section">
        <h2 class="aboutus-title">Meet Our Members</h2>

        <div class="inner-width">
          <div class="teams">
            <div class="team">
              <div class="container">
                <ProfileCard name={'Shreyas Kasliwal'} email={'spk@atmos.in'} />
                <ProfileCard name={'Akash Yadav'} email={'akash@atmos.in'} />
                <ProfileCard name={'Naman Bhaita'} email={'naman@atmos.in'} />
                <ProfileCard name={'Dushyant Yadav'} email={'dushyant@atmos.in'} />
                <ProfileCard name={'Avinash Saroj'} email={'avinash@atmos.in'} />

              </div>
            </div>
          </div>
        </div>
      </div>



 */}






    </>











    // <div className="App" >
    //   <div id="pageTitle" >
    //     <p>OUR TEAM</p>
    //   </div>
    //   <div className={visible ? 'fadeIn columns' : 'fadeOut columns'}>
    //     <div id="team">
    //       <div>
    //         <p id="teamTitle">AVINASH SAROJ</p>
    //         <p id="teamPos"></p>
    //       </div>
    //       <img src={img1} alt="CEO" />
    //     </div>
    //     <div id="team">
    //       <div>
    //         <p id="teamTitle">AKASH YADAV</p>
    //         <p id="teamPos"></p>
    //       </div>
    //       <img src={img2} alt="CTO" />
    //     </div>
    //     <div id="team">
    //       <div>
    //         <p id="teamTitle">DUSHYANT KUMAR</p>
    //         <p id="teamPos"></p>
    //       </div>
    //       <img src={img3} alt="CFO" />
    //     </div>
    //   </div>
    //   <div className={visible ? 'fadeIn columns' : 'fadeOut columns'} id="middleColumn">
    //     <div id="pageTitle1">
    //       <p>OUR TEAM</p>
    //     </div>
    //     <div id="pageData">
    //       <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
    //       <p>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
    //       <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
    //     </div>
    //   </div>
    //   <div className={visible ? 'fadeIn columns' : 'fadeOut columns'} id="rightColumn">
    //     <div id="team">
    //       <img id="imgRight" src={img1} alt="CEO" />
    //       <div>
    //         <p id="teamTitle">SHREYAS KASLIWAL</p>
    //         <p id="teamPos"></p>
    //       </div>
    //     </div>
    //     <div id="team">
    //       <img id="imgRight" src={img2} alt="CTO" />
    //       <div>
    //         <p id="teamTitle">NAMAN BHATIA</p>
    //         <p id="teamPos"></p>
    //       </div>
    //     </div>

    //   </div>
    // </div>
  );
}

export default AboutUS;