import React from "react";
import { Link } from "react-router-dom";

import Layout from "components/Layout";

import "bootstrap/dist/css/bootstrap.min.css";

const SelectRole = () => {
    return (
        <div style={{ background: "rgb(250, 250, 250)" }}>
            <Layout title="GreenCycle: A community-base forwarding system">
                <div className="container">
                    <div className="row">
                        <div
                            className="col d-flex align-items-start p-0 m-0 col-md-6 col-lg-8"
                            style={{
                                height: "100vh",
                                width: "100%",
                                background: "rgb(250, 250, 250)",
                                maxWidth: "100vw",
                            }}
                        >
                            <div style={{ width: "50%", height: "100vh", float: "left" }}>
                                <div style={{ marginTop: "111px" }}>
                                    <Link to="/">
                                        <div
                                            style={{
                                                fontFamily: "DM Serif Display",
                                                fontSize: "24px",
                                                fontStyle: "normal",
                                                fontWeight: "400",
                                                lineHeight: "25px",
                                                letterSpacing: "0em",
                                                textDecoration: "none",
                                                color: "#081F32",
                                                cursor: "pointer",
                                            }}
                                        >
                                            <img
                                                alt="logo2"
                                                src="/images/logo2.png"
                                                width={185}
                                                height={33}
                                            />
                                        </div>
                                    </Link>

                                    <div
                                        style={{
                                            fontFamily: "Open Sans",
                                            fontSize: "38px",
                                            fontStyle: "normal",
                                            fontWeight: "600",
                                            lineHeight: "52px",
                                            marginTop: "110px",
                                            marginBottom: "13px",
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        Are you one of these ?
                                    </div>

                                    <p className="description">
                                        Select your role before entering GreenCycle system. If
                                        you’re not one of any role below, skip signing in and just
                                        get along.
                                    </p>

                                    <Link to="/signUp" state={{ role: "manufacturer" }}>
                                        <div
                                            className="d-flex justify-content-start align-items-center shadow-sm"
                                            style={{
                                                width: "420px",
                                                height: "100px",
                                                backgroundColor: "#FFFFFF",
                                                borderRadius: "9px",
                                                textDecoration: "none",
                                                marginBottom: "30px",
                                                padding: "32px",
                                                cursor: "pointer",
                                            }}
                                        >
                                            <img
                                                alt="manu"
                                                src="/images/manu.png"
                                                width={60}
                                                height={60}
                                            />
                                            <div
                                                style={{
                                                    width: "auto",
                                                    margin: "0px 0px 0px 24px",
                                                }}
                                            >
                                                <p
                                                    className="box-title"
                                                    style={{ marginBottom: "0" }}
                                                >
                                                    Manufacturer
                                                </p>
                                                <p
                                                    className="box-detail"
                                                    style={{ marginBottom: "0" }}
                                                >
                                                    Are you a product owner or relating fields ?
                                                </p>
                                            </div>
                                        </div>
                                    </Link>

                                    <Link to="/signUp" state={{ role: "contributor" }}>
                                        <div
                                            className="d-flex justify-content-start align-items-center shadow-sm pointer"
                                            style={{
                                                width: "420px",
                                                height: "100px",
                                                backgroundColor: "#FFFFFF",
                                                borderRadius: "9px",
                                                textDecoration: "none",
                                                padding: "32px",
                                                cursor: "pointer",
                                            }}
                                        >
                                            <img
                                                alt="cont"
                                                src="/images/cont.png"
                                                width={60}
                                                height={60}
                                            />
                                            <div
                                                style={{
                                                    width: "auto",
                                                    margin: "0px 0px 0px 24px",
                                                }}
                                            >
                                                <p
                                                    className="box-title"
                                                    style={{ marginBottom: "0" }}
                                                >
                                                    Contributor
                                                </p>
                                                <p
                                                    className="box-detail"
                                                    style={{ marginBottom: "0" }}
                                                >
                                                    Do you establish any charity campaign ?
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* bg */}
                        <div
                            className="col col-md-6"
                            style={{
                                height: "100vh",
                                background: "#EAECC6",
                                backgroundImage: 'url("/images/register-2.png")',
                                backgroundPosition: "right",
                                backgroundRepeat: "no-repeat",
                                position: "absolute",
                                right: "0",
                                overflow: "hidden",
                            }}
                        />

                        {/* row */}
                    </div>
                    {/* container */}
                </div>
            </Layout>

            <style>{`
                ::placeholder {
                    color: #cacaca;
                    font-family: Open Sans;
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 19px;
                }
                .description {
                    font-family: Open Sans;
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 24px;
                    letter-spacing: 0.08em;
                    color: #616161;
                    width: 420px;
                    margin-bottom: 50px;
                }
                .box-title {
                    font-family: Open Sans;
                    font-size: 15px;
                    font-style: normal;
                    font-weight: 700;
                    line-height: 20px;
                    letter-spacing: 0px;
                    text-align: left;
                }
                .box-detail {
                    font-family: Open Sans;
                    font-size: 12px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 16px;
                    letter-spacing: 0px;
                    text-align: left;
                }
            `}</style>
        </div>
    );
};

export default SelectRole;
