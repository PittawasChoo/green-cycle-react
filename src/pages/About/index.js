import React from "react";

import Layout from "components/Layout";
import Footer from "components/Footer";
import Navbar from "components/Navbar";

import "bootstrap/dist/css/bootstrap.min.css";

const about = () => (
    <div style={{ overflowX: "hidden" }}>
        <Layout title="GreenCycle: A community-base forwarding system">
            <Navbar />
            <div style={{ width: "100vw", minHeight: "100vh", padding: "160px 120px 100px 120px" }}>
                <div className="container">
                    <div className="row">
                        <p className="header">The beginning of GreenCycle</p>
                    </div>
                    <div className="row mb-5">
                        <div className="col-md-5 col-sm-12 pl-0 mb-4">
                            <p className="detail" style={{ marginBottom: "24px" }}>
                                GreenCycle is a project based on today’s waste management problem.
                                There are tons of projects from each sector that want to help
                                society in this matter, but these projects weren’t widespread, lots
                                of people do not aware that these environmentally friendly products
                                or campaigns exist.
                            </p>
                            <p className="detail">
                                As developers, we want to gather all these eco-friendly projects,
                                especially recycling one, and recyclable products in the same
                                system. Where people can easily search for a particular product or
                                material, how to prepare them before disposing or donating by just
                                one action through QR Code.
                            </p>
                        </div>
                        <div className="col-md-1 col-sm-0 p-0 m-0" />
                        <div className="col-md-6 col-sm-12 pr-0 mb-4">
                            <div
                                style={{
                                    backgroundImage: 'url("/images/about.jpeg")',
                                    height: "100%",
                                    width: "100%",
                                    backgroundSize: "cover",
                                    borderRadius: "16px",
                                }}
                            />
                        </div>
                    </div>
                </div>
                <hr />
                <div className="container mt-5">
                    <div className="row mb-3">
                        <p className="header-2">Featured</p>
                    </div>
                    <div className="row">
                        <div className="col-md-4 col-sm-12 pl-0 mb-3 d-flex">
                            <div
                                className="d-flex justify-content-center align-items-center"
                                style={{
                                    width: "100px",
                                    height: "100px",
                                    backgroundColor: "#E0EB17",
                                    borderRadius: "8px",
                                }}
                            >
                                <span style={{ fontSize: "50px" }}>🦸🏻‍♂️</span>
                            </div>
                            <div className="ml-4 d-flex align-items-center">
                                <div style={{ marginLeft: "20px" }}>
                                    <p className="name">Pittawas Choochuea</p>
                                    <p className="title">4th year student</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-12 pl-0 mb-3 d-flex">
                            <div
                                className="d-flex justify-content-center align-items-center"
                                style={{
                                    width: "100px",
                                    height: "100px",
                                    backgroundColor: "#4263EB",
                                    borderRadius: "8px",
                                }}
                            >
                                <span style={{ fontSize: "50px" }}>🧖🏻‍♀️</span>
                            </div>
                            <div className="ml-4 d-flex align-items-center">
                                <div style={{ marginLeft: "20px" }}>
                                    <p className="name">Suthathip Srikosapala</p>
                                    <p className="title">4th year student</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-12 pl-0 mb-3 d-flex">
                            <div
                                className="d-flex justify-content-center align-items-center"
                                style={{
                                    width: "100px",
                                    height: "100px",
                                    backgroundColor: "#19B9C5",
                                    borderRadius: "8px",
                                }}
                            >
                                <span style={{ fontSize: "50px" }}>👩🏻‍💼</span>
                            </div>
                            <div className="ml-4 d-flex align-items-center">
                                <div style={{ marginLeft: "20px" }}>
                                    <p className="name">Supannada Chotipant</p>
                                    <p className="title">Counselor</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
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
        `}</style>
    </div>
);

export default about;
