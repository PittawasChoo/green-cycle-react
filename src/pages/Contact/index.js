import React from "react";

import Layout from "components/Layout";
import Footer from "components/Footer";
import Navbar from "components/Navbar";

import "bootstrap/dist/css/bootstrap.min.css";

const contact = () => (
    <div style={{ overflowX: "hidden" }}>
        <Layout
            title="GreenCycle: A community-base forwarding system"
            style={{ minHeight: "100%" }}
        >
            <Navbar />
            <div style={{ width: "100vw", paddingTop: "80px" }}>
                <img alt="banner" className="img-fluid" src="/images/contact.png" />
            </div>
            <div style={{ width: "100vw", padding: "70px 120px 50px 120px", flex: 1 }}>
                <div className="container">
                    <p className="header text-center">Contact Us</p>
                    <div className="row mb-4">
                        <div className="col-md-2 pl-0">
                            <p className="topic" style={{ marginBottom: "24px" }}>
                                Address
                            </p>
                        </div>
                        <div className="col-md-8 p-0 m-0">
                            <p className="detail">
                                Faculty of Information Technology, King Mongkut's Institute of
                                Technology Ladkrabang, 1, Chalong Krung 1, Ladkrabang, Bangkok 10520
                            </p>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="container mt-4">
                    <div className="row mb-4">
                        <div className="col-md-2 pl-0">
                            <p className="topic" style={{ marginBottom: "24px" }}>
                                Email
                            </p>
                        </div>
                        <div className="col-md-8 p-0 m-0">
                            <p className="detail">
                                - greencycle@gmail.com <br />
                                - 60070064@kmitl.ac.th (Admin) <br />
                                - 60070104@kmitl.ac.th (Admin) <br />
                            </p>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="container mt-4">
                    <div className="row mb-4">
                        <div className="col-md-2 pl-0">
                            <p className="topic" style={{ marginBottom: "24px" }}>
                                Tel.
                            </p>
                        </div>
                        <div className="col-md-8 p-0 m-0">
                            <p className="detail">090-958-8838</p>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="container mt-4">
                    <div className="row mb-4">
                        <div className="col-md-2 pl-0">
                            <p className="topic" style={{ marginBottom: "24px" }}>
                                Follow us on
                            </p>
                        </div>
                        <div className="col-md-8 p-0 m-0">
                            <a href="https://www.instagram.com/greencycle.community/">
                                <img
                                    alt="ig"
                                    src="/icons/ig.svg"
                                    style={{ width: "24px", height: "24px", marginLeft: "5px" }}
                                />
                            </a>
                            <a
                                href="https://www.facebook.com/GreenCycleCommunity"
                                style={{ marginLeft: "10px" }}
                            >
                                <img
                                    alt="fb"
                                    src="/icons/fb.svg"
                                    style={{ width: "24px", height: "24px", marginLeft: "5px" }}
                                />
                            </a>
                            <a
                                href="https://twitter.com/_greencycle"
                                style={{ marginLeft: "10px" }}
                            >
                                <img
                                    alt="twitter"
                                    src="/icons/twitter.svg"
                                    style={{ width: "24px", height: "24px", marginLeft: "5px" }}
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ width: "100%", bottom: 0 }}>
                <Footer />
            </div>
        </Layout>
        <style>{`
            .header {
                font-family: Poppins;
                font-size: 38px;
                font-style: normal;
                font-weight: 600;
                line-height: 57px;
                color: #212429;
                margin-bottom: 32px;
            }
            .header-2 {
                font-family: Poppins;
                font-size: 32px;
                font-style: normal;
                font-weight: 600;
                line-height: 48px;
                color: #212429;
            }
            .detail {
                font-family: Open Sans;
                font-size: 16px;
                font-style: normal;
                font-weight: 200;
                line-height: 22px;
                letter-spacing: 0.08em;
                color: #212429;
            }
            .name {
                font-family: Open Sans;
                font-size: 18px;
                font-style: normal;
                font-weight: 600;
                line-height: 25px;
            }
            .title {
                font-family: Open Sans;
                font-size: 16px;
                font-style: normal;
                font-weight: 200;
                line-height: 25px;
                color: #2b2b2b;
                margin-bottom: 0;
            }
            a {
                cursor: pointer;
            }
        `}</style>
    </div>
);

export default contact;
