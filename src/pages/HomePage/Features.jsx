import React from "react";
import a from "../../images/work.svg"
import b from "../../images/office.svg"
import c from "../../images/business-deal.svg"
import "./assets/css/style.scss";

const Features = () => {
    return(
        <section id="about" class="about">
      <div class="container" data-aos="fade-up">

        <div class="section-title">
          <h2>Features</h2>
        </div>

        <div class="row content"  style={{height:"fit-content"}}>
          <div class="col-lg-6" style={{height:"fit-content", marginTop:"100px", fontSize:"18px"}}  data-aos="fade-right">
            <p>
              <span style={{fontSize:"30px", fontWeight:"bold"}}>Stay On Schedule</span>
              <br/>
              Map out goals and prioritize tasks. You get projects off the ground faster and meet deadlines—without scrambling at the last minute.
            </p>
            <ul>
              <li><i class="ri-check-double-line"></i> &#8594;  Manage all tasks with ease</li>
              <li><i class="ri-check-double-line"></i> &#8594;  Never miss a deadline with ATMOS</li>
              <li><i class="ri-check-double-line"></i> &#8594;  Track the progeress of the projects</li>
            </ul>
          </div>
          <div class="col-lg-6 pt-4 pt-lg-0" style={{height:"fit-content"}}>
            <img src={a} alt="" style={{height:"500px", width:"500px"}}/>
            {/* <p>
              Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
              velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
              culpa qui officia deserunt mollit anim id est laborum.
            </p> */}

            {/* <a href="#" class="btn-learn-more">Learn More</a> */}
          </div>
          <div class="col-lg-6 pt-4 pt-lg-0" style={{height:"fit-content"}}>
            <img src={b} alt="" style={{height:"500px", width:"500px"}}/>
            {/* <p>
              Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
              velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
              culpa qui officia deserunt mollit anim id est laborum.
            </p> */}

            {/* <a href="#" class="btn-learn-more">Learn More</a> */}
          </div>
          <div class="col-lg-6" style={{height:"fit-content", marginTop:"100px", fontSize:"18px"}}  data-aos="fade-left">
            <p>
              <span style={{fontSize:"30px", fontWeight:"bold"}}>Get things done</span>
              <br/>
              Get things done faster and more efficiently with the new Project Management app.            </p>
            <ul>
              <li><i class="ri-check-double-line"></i> &#8594;  Manage all tasks with ease</li>
              <li><i class="ri-check-double-line"></i> &#8594;  Never miss a deadline with ATMOS</li>
              <li><i class="ri-check-double-line"></i> &#8594;  Track the progeress of the projects</li>
            </ul>
          </div>
          <div class="col-lg-6" style={{height:"fit-content", marginTop:"100px", fontSize:"18px"}}  data-aos="fade-right">
            <p>
              <span style={{fontSize:"30px", fontWeight:"bold"}}>Improve collaboration</span>
              <br/>Make all the important things easy to find, like project plans and details, files, feedback, and more.
            </p>
            <ul>
              <li><i class="ri-check-double-line"></i> &#8594;  Manage all tasks with ease</li>
              <li><i class="ri-check-double-line"></i> &#8594;  Never miss a deadline with ATMOS</li>
              <li><i class="ri-check-double-line"></i> &#8594;  Track the progeress of the projects</li>
            </ul>
          </div>
          <div class="col-lg-6 pt-4 pt-lg-0" style={{height:"fit-content"}}>
            <img src={c} alt="" style={{height:"500px", width:"500px"}}/>
            {/* <p>
              Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
              velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
              culpa qui officia deserunt mollit anim id est laborum.
            </p> */}

            {/* <a href="#" class="btn-learn-more">Learn More</a> */}
          </div>
        </div>
      </div>

    </section>
    )
}

export default Features;