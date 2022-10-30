import React from "react";
import "./assets/css/style.scss";
import Navbar from "./Navbar";
import Client from "./Client";
import i from "./assets/img/hero-img.png";
import Features from "./Features";
import { NavLink } from "react-router-dom";
import Pricing from "./Pricing";
export default function Home() {
    return (
        <>
<Navbar />
             <section id="hero" class="d-flex align-items-center">

<div class="container">
  <div class="row">
    <div class="col-lg-6 d-flex flex-column justify-content-center pt-4 pt-lg-0 order-2 order-lg-1" data-aos="fade-up" data-aos-delay="200">
      <h1>Better Solutions For Your Business</h1>
      <h2>We Provide A Platform for people to form teams and work on various Projects</h2>
      <div class="d-flex justify-content-center justify-content-lg-start">
        <NavLink to="/signup">
        <a class="btn-get-started scrollto">Get Started</a>
        </NavLink>
        {/* <a href="https://www.youtube.com/watch?v=jDDaplaOz7Q" class="glightbox btn-watch-video"><i class="bi bi-play-circle"></i><span>Watch Video</span></a> */}
      </div>
    </div>
    <div class="col-lg-6 order-1 order-lg-2 hero-img" data-aos="zoom-in" data-aos-delay="200">
      <img src={i} class="img-fluid animated" alt=""/>
    </div>
  </div>
</div>

</section>
<Client />
<Features />
<Pricing />
        </>
    );
}

