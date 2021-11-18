import React, { useState } from "react";
import styled from "styled-components";

const Landing = () => {
  const [active, setActive] = useState(true);
  return (
    <div>
      <header id="header" className="d-flex align-items-center">
        <Header className="container">
          <a href="index.html" className="logo">
            <img src="assets/img/logo.png" alt />
          </a>
          <nav
            id="navbar"
            className={active === true ? "navbar" : "navbar-mobile"}
          >
            <ul>
              <li>
                <a
                  className="nav-link scrollto active"
                  href="#hero"
                  onClick={() => {
                    setActive(active === false ? true : true);
                  }}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  className="nav-link scrollto"
                  href="#about"
                  onClick={() => {
                    setActive(active === false ? true : true);
                  }}
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  className="nav-link scrollto"
                  href="#terms"
                  onClick={() => {
                    setActive(active === false ? true : true);
                  }}
                >
                  Term &amp; Conditions
                </a>
              </li>
              {/* <li><a class="nav-link scrollto" href="#privacy">Privacy Policy</a></li> */}
              {/* <li><a class="nav-link" href="#contact">Download App</a></li> */}
            </ul>
            <i
              className={`bi mobile-nav-toggle ${
                active === true ? "bi-list" : "bi-x"
              }`}
              onClick={() => {
                setActive(active === true ? false : true);
              }}
            />
          </nav>
          {/* .navbar */}
        </Header>
      </header>
      <Main id="main">
        {/* End Featured Services Section */}
        {/* ======= About Section ======= */}
        <section id="about" className="about section-bg">
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <h2>About Us</h2>
              <h3>
                Welcome To <span>PayUCart</span>
              </h3>
            </div>
            <div className="row">
              <div
                className="col-lg-12 content"
                data-aos="fade-up"
                data-aos-delay={100}
              >
                <p className="abt-loan">
                  Reliable, User-Friendly, Popular Advertising App Payucart.
                </p>
                <p className="abt-loan">
                  You need money, We need your time. Advertise &amp; Earn with
                  Payucart.
                </p>
                <p className="abt-loan">
                  Payucart, The platform which gives opportunity to many who
                  want to make money using their smartphones. It is one of the
                  best advertising tool gaining reputation in top Ads and other
                  Brands whose products are advertised and promoted via this
                  platform and the users get directly paid for this. To earn a
                  really good money and or to keep a regular source of income
                  using smartphone and doing simple Advertise watiching can join
                  and start Earning.
                </p>
                <p className="abt-loan">
                  Brands being advertised give commission to Payucart to have
                  advertised rigorously through this very simple and easy
                  platform with best user interface. A part of the commission is
                  taken by Payucart for maintenance and operations and a part is
                  directly paid to the users who do actually advertise these
                  products. Putting it simple, Payucart gets paid for providing
                  advertisement platform to various brands and a part of
                  commission it gets is paid further to users. Due to simple,
                  user-friendly interface and great yielding results the
                  Payucart succeeded in getting good advertising brand partners.
                  One can easily join, became member and start earning at
                  Payucart.
                </p>
                <p className="abt-loan">
                  Our vision is to create and manage digital platform which can
                  dynamically provide great services to various users. We wish
                  to make the platform as big that a high number of people who
                  need a daily income source may get benefitted from those who
                  want their organic advertisement.
                </p>
                <p className="abt-loan">
                  Here, Payucart is a kind of symbiosis relation system which
                  let benefitting all the parties. The brands, companies get
                  their products advertised, users get paid for the same and
                  Payucart gets commission for managing and operating the
                  system.
                </p>
                <p className="abt-loan">Payucart's service</p>
                <p className="abt-loan">
                  Do you need money ? Well, Spend some time in these simply
                  organized Advertise watching by Payucart and get paid really
                  Handsome Money. Its all the parties Advertiser, User and
                  Interface manager.
                </p>
                <p className="abt-loan">
                  Contact on :
                  <a href="mailto:payucart@gmail.com">payucart@gmail.com</a>
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* End About Section */}
        <section id="terms" className="services">
          <div className="container aos-init aos-animate" data-aos="fade-up">
            <div className="section-title">
              <h2>
                Terms &amp; <span>Conditions</span>
              </h2>
            </div>
            <div className="row">
              <div
                className="col-md-12 aos-init aos-animate"
                data-aos="zoom-in"
                data-aos-delay={100}
              >
                <h3 className="terms-l">
                  OWNERSHIP OF SITE: AGREEMENT TO TERMS OF USE
                </h3>
                <p className="abt-terms">
                  These Terms and Conditions of Use (the “Terms of Use”) apply
                  to The Earn App web site located at www.Payucart.com and all
                  associated sites linked to www.Payucart.com by The Earn App,
                  its subsidiaries, including The Earn App sites around the
                  world (collectively, the “Site”). The Site is the property of
                  The Earn App Inc and its licensors. BY USING THE SITE, YOU
                  AGREE TO THESE TERMS OF USE; IF YOU DO NOT AGREE, DO NOT USE
                  THE SITE. The Payucart App reserves the right, at its sole
                  discretion, to change, modify, add or remove portions of these
                  Terms of Use, at any time. It is your responsibility to check
                  these Terms of Use periodically for changes. Your continued
                  use of the Site following the posting of changes will mean
                  that you accept and agree to the changes. As long as you
                  comply with these Terms of Use, The Earn App grants you a
                  personal, non-exclusive, non-transferable, limited privilege
                  to enter and use the Site.
                </p>
                <h3 className="terms-l">CONTENT</h3>
                <p className="abt-terms">
                  All text, graphics, user interfaces, visual interfaces,
                  photographs, trademarks, logos, sounds, music, artwork and
                  computer code (collectively, “Content”), including but not
                  limited to the design, structure, selection, coordination,
                  expression, “look and feel” and arrangement of such Content,
                  contained on the Site is owned, controlled or licensed by or
                  to The Payucart app, and is protected by trade dress,
                  copyright, patent and trademark laws, and various other
                  intellectual property rights and unfair competition laws.
                </p>
                <p className="abt-terms">
                  Except as expressly provided in these Terms of Use, no part of
                  the Site and no Content may be copied, reproduced,
                  republished, uploaded, posted, publicly displayed, encoded,
                  translated, transmitted or distributed in any way (including
                  “mirroring”) to any other computer, server, Web site or other
                  medium for publication or distribution or for any commercial
                  enterprise, without The Earn App express prior written
                  consent.
                </p>
                <p className="abt-terms">
                  You may use information on The Payucart App and services (such
                  as data sheets, knowledge base articles, and similar
                  materials) purposely made available by The Payucart App for
                  downloading from the Site, provided that you (1) not remove
                  any proprietary notice language in all copies of such
                  documents, (2) use such information only for your personal,
                  non-commercial informational purpose and do not copy or post
                  such information on any networked computer or broadcast it in
                  any media, (3) make no modifications to any such information,
                  and (4) not make any additional representations or warranties
                  relating to such documents.
                </p>
                <h3 className="terms-l">YOUR USE OF THE SITE</h3>
                <p className="abt-terms">
                  You may not use any, program, algorithm or methodology, or any
                  similar or equivalent manual process, to access, acquire, copy
                  or monitor any portion of the Site or any Content, or in any
                  way reproduce or circumvent the navigational structure or
                  presentation of the Site or any Content, to obtain or attempt
                  to obtain any materials, documents or information through any
                  means not purposely made available through the Site. The
                  Payucart App reserves the right to bar any such activity.
                </p>
                <p className="abt-terms">
                  You may not attempt to gain unauthorized access to any portion
                  or feature of the Site, or any other systems or networks
                  connected to the Site or to any The Payucart App server, or to
                  any of the services offered on or through the Site, by
                  hacking, password “mining” or any other illegitimate means.
                </p>
                <p className="abt-terms">
                  You may not probe, scan or test the vulnerability of the Site
                  or any network connected to the Site, nor breach the security
                  or authentication measures on the Site or any network
                  connected to the Site. You may not reverse look-up, trace or
                  seek to trace any information on any other user of or visitor
                  to the Site, or any other customer of The Earn App, including
                  any The Earn App account not owned by you, to its source, or
                  exploit the Site or any service or information made available
                  or offered by or through the Site, in any way where the
                  purpose is to reveal any information, including but not
                  limited to personal identification or information, other than
                  your own information, as provided for by the Site.
                </p>
                <p className="abt-terms">
                  You agree that you will not take any action that imposes an
                  unreasonable or disproportionately large load on the
                  infrastructure of the Site or The Earn App’s systems or
                  networks, or any systems or networks connected to the Site or
                  to The Payucart App.
                </p>
                <h3 className="terms-l">MISCELLANEOUS</h3>
                <p className="abt-terms">
                  You may not use or export or re-export any Content or any copy
                  or adaptation of such Content, or any product or service
                  offered on the Site, in violation of any applicable laws or
                  regulations, including without limitation export laws and
                  regulations.
                </p>
                <ul className="terms-k">
                  <li>
                    We are not responsible of your account if password is hacked
                  </li>
                  <li>
                    We are responsible if app is been hacked and all data erased
                    and shut downed.
                  </li>
                  <li>We inform you if the app need update and changes.</li>
                  <li>Redistribute content from Loan Pay.</li>
                </ul>
                <h3 className="terms-l">FEEDBACK AND INFORMATION</h3>
                <p className="abt-terms">
                  Any feedback you provide at this site shall be deemed to be
                  non-confidential. The Earn App shall be free to use such
                  information on an unrestricted basis
                </p>
              </div>
            </div>
          </div>
        </section>
      </Main>
      {/* End #main */}
      {/* ======= Footer ======= */}
      <footer id="footer">
        <div className="container py-4">
          <div className="copyright">
            © Copyright{" "}
            <strong>
              <span>PayuCart</span>
            </strong>
            . All Rights Reserved
          </div>
          <div className="credits">
            Designed by
            <a href="https://arramton.com/" target="_blank">
              Arramton Infotech Pvt. Ltd.
            </a>
          </div>
        </div>
      </footer>
      {/* End Footer */}
      {/* <div id="preloader"></div> */}
      <a
        href="#"
        className="back-to-top d-flex align-items-center justify-content-center"
      >
        <i className="bi bi-arrow-up-short" />
      </a>
    </div>
  );
};

export default Landing;

const Header = styled.div`
  display: block;
  /* justify-content: space-between; */
  align-items: center;
  a {
    float: left;
  }
  nav {
    float: right;
    margin-bottom: 0;
    min-height: 80px;
    padding-top: 18px;
    min-width: min-content;
  }
  @media only screen and (max-width: 991px) {
    nav ul {
      li {
        list-style: none;
      }
    }
  }
`;

const Main = styled.main`
  @media only screen and (max-width: 991px) {
    section,
    h3,
    p {
      font-size: 1.5rem;
    }
  }
`;
