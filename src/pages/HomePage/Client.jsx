import React from "react";
// import "./assets/css/style.scss";
import { Container, Flex, Image,Transition  } from '@mantine/core';
import a from "./assets/img/clients/client-1.png";
import b from "./assets/img/clients/client-2.png";
import c from "./assets/img/clients/client-3.png";
import d from "./assets/img/clients/client-4.png";
import e from "./assets/img/clients/client-5.png";
import f from "./assets/img/clients/client-6.png";
import { motion, useScroll } from "framer-motion"

const Client = ({ isVisible }) => {
    return (
        <section id="clients" class="clients section-bg" >
        {/* <Container >
        <Flex
          direction={{ base: 'column', sm: 'row' }}
          gap={{ base: 'sm', sm: 'lg' }}
          justify={{ sm: 'center' }}
        >
          
          <Image width={200} height={80} fit="contain" src={a} />
          <Image width={200} height={80} fit="contain" src={b} />
          <Image width={200} height={80} fit="contain" src={c} />
          <Image width={200} height={80} fit="contain" src={d} />
          <Image width={200} height={80} fit="contain" src={e} />
          <Image width={200} height={80} fit="contain" src={f} />
        </Flex> */}
          
          <div class="row" data-aos="zoom-in">
  
            <div class="col-lg-2 col-md-4 col-6 d-flex align-items-center justify-content-center">
              <img src={a} class="img-fluid" alt=""/>
            </div>
  
            <div class="col-lg-2 col-md-4 col-6 d-flex align-items-center justify-content-center">
              <img src={b} class="img-fluid" alt=""/>
            </div>
  
            <div class="col-lg-2 col-md-4 col-6 d-flex align-items-center justify-content-center">
              <img src={c} class="img-fluid" alt=""/>
            </div>
  
            <div class="col-lg-2 col-md-4 col-6 d-flex align-items-center justify-content-center">
              <img src={d} class="img-fluid" alt=""/>
            </div>
  
            <div class="col-lg-2 col-md-4 col-6 d-flex align-items-center justify-content-center">
              <img src={e} class="img-fluid" alt=""/>
            </div>
  
            <div class="col-lg-2 col-md-4 col-6 d-flex align-items-center justify-content-center">
              <img src={f} class="img-fluid" alt=""/>
            </div>
  
          </div>
  
          {/* </Container> */}
      </section>
    );
}

export default Client;