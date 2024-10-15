import React from "react";
import Cookies from "universal-cookie";
import Layout from "components/Layout";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

const CreateSuccessful = () => {
    const navigate = useNavigate();

    const backHome = () => {
        const cookies = new Cookies();
        cookies.remove("token");

        fetch("https://greencycle-back.herokuapp.com/signout", {
            method: "GET",
        });

        navigate("../");
    };

    return (
        <div>
            <Layout title="GreenCycle: A community-base forwarding system">
                <div
                    className="p-0 m-0"
                    style={{
                        height: "100vh",
                        width: "100%",
                        background: "rgb(250, 250, 250)",
                        maxWidth: "100vw",
                    }}
                >
                    <div
                        className="col"
                        style={{
                            width: "50%",
                            height: "100vh",
                            float: "left",
                            backgroundColor: "rgba(234, 236, 198, 0.5)",
                        }}
                    >
                        <div style={{ height: "100%", width: "100%", textAlign: "center" }}>
                            <span
                                style={{
                                    height: "100%",
                                    verticalAlign: "middle",
                                    display: "inline-block",
                                }}
                            />
                            <div style={{ verticalAlign: "middle", display: "inline-block" }}>
                                <img
                                    alt="sign-in"
                                    src="/images/signIn.png"
                                    width={600}
                                    height={568.2}
                                />
                            </div>
                        </div>
                    </div>
                    <div style={{ width: "50%", height: "100vh", float: "right" }}>
                        <div style={{ padding: "111px 142px" }}>
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
                                    GreenCycle
                                </div>
                            </Link>
                            <p
                                style={{
                                    fontFamily: "Open Sans",
                                    fontSize: "38px",
                                    fontStyle: "normal",
                                    fontWeight: "600",
                                    lineHeight: "52px",
                                    marginTop: "110px",
                                    marginBottom: "13px",
                                }}
                            >
                                We’re working to verify your account.
                            </p>
                            <p className="description">
                                Your account has succesfully registered. We have send you a
                                confirmation mail. Please confirm your email with the link
                                containing in the email.
                            </p>
                            <div
                                style={{ cursor: "pointer" }}
                                className="back-home"
                                onClick={() => backHome()}
                            >
                                Back to home
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
            <style jsx global>{`
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
                    font-size: 12px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 17px;
                    letter: 8%;
                    color: #616161;
                    width: 420px;
                    margin-bottom: 24px;
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
                .back-home {
                    font-family: Open Sans;
                    font-size: 12px;
                    font-style: normal;
                    font-weight: 600;
                    line-height: 17px;
                    color: #007ae9;
                }
            `}</style>
        </div>
    );
};

export default CreateSuccessful;
