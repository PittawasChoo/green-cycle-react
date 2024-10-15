import React, { useState } from "react";

import Navbar from "components/Navbar";
import Layout from "components/Layout";
import Footer from "components/Footer";

import ReactLoading from "react-loading";
import emailjs from "emailjs-com";

const Report = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [subject, setSubject] = useState("");
    const [detail, setDetail] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const sendEmail = (e) => {
        setLoading(true);
        e.preventDefault();
        emailjs.sendForm("service_pr0irqc", "template_9c3mygs", e.target).then(
            (result) => {
                setEmail("");
                setName("");
                setSubject("");
                setDetail("");
                setLoading(false);
                setSuccess(true);
            },
            (error) => {
                setLoading(false);
                alert("An error occured, Plese try again", error.text);
            }
        );
    };

    return (
        <div>
            <Layout title="GreenCycle: A community-base forwarding system">
                <Navbar />
                <div style={{ width: "100vw", paddingTop: "80px" }}>
                    <img className="img-fluid" alt="banner" src="/images/report.png" />
                </div>
                <div style={{ width: "100vw", padding: "70px 120px 50px 120px" }}>
                    <div className="container">
                        <p className="header text-center">Report Content</p>
                        <div className="row mb-4">
                            <div className="col-md-3 col-sm-0" />
                            <div className="col-md-6 col-sm-12 pl-0">
                                <form id="form" onSubmit={sendEmail.bind(this)}>
                                    <p className="topic" style={{ marginBottom: "18px" }}>
                                        YOUR EMAIL <span style={{ color: "#EB5757" }}>*</span>
                                    </p>
                                    <input
                                        type="text"
                                        name="email"
                                        id="email"
                                        placeholder="Your Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        style={{
                                            width: "100%",
                                            height: "56px",
                                            borderRadius: "16px",
                                            backgroundColor: "#F2F3F7",
                                            border: "none",
                                            marginBottom: "18px",
                                            paddingLeft: "24px",
                                            paddingRight: "24px",
                                        }}
                                    />
                                    <p className="topic" style={{ marginBottom: "18px" }}>
                                        YOUR NAME <span style={{ color: "#EB5757" }}>*</span>
                                    </p>
                                    <input
                                        type="text"
                                        name="username"
                                        id="username"
                                        placeholder="Your Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        style={{
                                            width: "100%",
                                            height: "56px",
                                            borderRadius: "16px",
                                            backgroundColor: "#F2F3F7",
                                            border: "none",
                                            marginBottom: "18px",
                                            paddingLeft: "24px",
                                            paddingRight: "24px",
                                        }}
                                    />
                                    <p className="topic" style={{ marginBottom: "18px" }}>
                                        SUBJECT <span style={{ color: "#EB5757" }}>*</span>
                                    </p>
                                    <input
                                        type="text"
                                        name="subject"
                                        id="subject"
                                        placeholder="Your Subject"
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        style={{
                                            width: "100%",
                                            height: "56px",
                                            borderRadius: "16px",
                                            backgroundColor: "#F2F3F7",
                                            border: "none",
                                            marginBottom: "18px",
                                            paddingLeft: "24px",
                                            paddingRight: "24px",
                                        }}
                                    />
                                    <p className="topic" style={{ marginBottom: "18px" }}>
                                        WHAT'S YOUR CONCERN{" "}
                                        <span style={{ color: "#EB5757" }}>*</span>
                                    </p>
                                    <textarea
                                        name="detail"
                                        id="detail"
                                        maxLength="5000"
                                        placeholder=""
                                        value={detail}
                                        onChange={(e) => setDetail(e.target.value)}
                                        style={{
                                            resize: "none",
                                            width: "100%",
                                            height: "200px",
                                            borderRadius: "16px",
                                            backgroundColor: "#F2F3F7",
                                            border: "none",
                                            marginBottom: "18px",
                                            paddingLeft: "24px",
                                            paddingTop: "17px",
                                            paddingRight: "24px",
                                        }}
                                    />
                                    <div className="d-flex justify-content-center">
                                        {!email || !name || !subject || !detail ? (
                                            <div
                                                className="d-flex justify-content-center align-items-center"
                                                style={{
                                                    width: "261px",
                                                    height: "48px",
                                                    background: "#007AE9",
                                                    borderRadius: "8px",
                                                    textDecoration: "none",
                                                    color: "white",
                                                    fontFamily: "Open Sans",
                                                    fontStyle: "normal",
                                                    fontWeight: "400",
                                                    fontSize: "15px",
                                                    border: "none",
                                                    cursor: "default",
                                                    opacity: 0.3,
                                                }}
                                            >
                                                Send
                                            </div>
                                        ) : (
                                            <input
                                                className="d-flex justify-content-center align-items-center"
                                                style={{
                                                    width: "261px",
                                                    height: "48px",
                                                    background: "#007AE9",
                                                    borderRadius: "8px",
                                                    textDecoration: "none",
                                                    color: "white",
                                                    fontFamily: "Open Sans",
                                                    fontStyle: "normal",
                                                    fontWeight: "400",
                                                    fontSize: "15px",
                                                    border: "none",
                                                }}
                                                value="Send"
                                                type="submit"
                                            />
                                        )}
                                    </div>
                                </form>
                            </div>
                            <div className="col-md-3 col-sm-0" />
                        </div>
                    </div>
                </div>
                <Footer />
                {loading ? (
                    <div
                        className="d-flex justify-content-center align-items-center"
                        style={{
                            height: "100vh",
                            width: "100vw",
                            backgroundColor: "rgba(0,0,0,0.4)",
                            zIndex: "1000",
                            position: "fixed",
                            top: 0,
                        }}
                    >
                        <ReactLoading type="bars" color="#FFFFFF" height={"10%"} width={"10%"} />
                    </div>
                ) : (
                    <div />
                )}
                {success ? (
                    <div
                        onClick={() => setSuccess(false)}
                        style={{
                            position: "fixed",
                            width: "100%",
                            height: "100%",
                            zIndex: "100",
                            top: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <div
                            style={{
                                width: "100%",
                                height: "100%",
                                backgroundColor: "rgba(0,0,0,0.4)",
                                cursor: "pointer",
                            }}
                        />
                        <div
                            style={{
                                backgroundColor: "white",
                                position: "absolute",
                                boxShadow:
                                    "0px 4px 24px rgba(13, 53, 89, 0.03), 0px 4px 6px rgba(15, 81, 140, 0.06)",
                                borderRadius: "16px",
                                padding: "32px",
                            }}
                        >
                            <div className="d-flex">
                                <p
                                    style={{
                                        fontFamily: "Open Sans",
                                        fontSize: "20px",
                                        fontStyle: "normal",
                                        fontWeight: "700",
                                        lineHeight: "40px",
                                        marginBottom: "0",
                                    }}
                                >
                                    Report sent!
                                </p>
                                <img
                                    alt="close"
                                    className="ml-auto"
                                    src="/icons/close.png"
                                    style={{ width: "20px", height: "20px", cursor: "pointer" }}
                                />
                            </div>

                            <p className="modal-li">We will solve that as fast as possible.</p>
                        </div>
                    </div>
                ) : (
                    <div />
                )}
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
                    .topic {
                        font-family: Open Sans;
                        font-size: 12px;
                        font-style: normal;
                        font-weight: 400;
                        line-height: 16px;
                        letter-spacing: 0.08em;
                        text-align: left;
                    }
                    a {
                        cursor: pointer;
                    }
                    .modal-li {
                        font-family: Open Sans;
                        font-size: 14px;
                        font-style: normal;
                        font-weight: 400;
                        line-height: 18px;
                        letter-spacing: 0em;
                        text-align: left;
                        color: rgba(0, 0, 0, 0.7);
                    }
                `}</style>
            <script
                type="text/javascript"
                src="https://cdn.jsdelivr.net/npm/emailjs-com@2/dist/email.min.js"
            ></script>
            <script type="text/javascript">{emailjs.init("user_c0rUlu1hvIQvvWmv3AYcd")}</script>
        </div>
    );
};

export default Report;
