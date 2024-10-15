import React from "react";

import Footer from "components/Footer";
import Layout from "components/Layout";
import Navbar from "components/Navbar";

import "bootstrap/dist/css/bootstrap.min.css";

const Main = () => (
    <div style={{ maxWidth: "100vw", overflowX: "hidden" }}>
        <Layout title="GreenCycle: A community-base forwarding system">
            <Navbar />
            <div
                className="d-flex align-items-start"
                style={{
                    height: "780px",
                    width: "100%",
                    background:
                        "linear-gradient(90deg, rgba(224, 234, 242, 0.99) 20.31%, rgba(162, 214, 226, 0.51) 37.5%, rgba(164, 215, 225, 0.505912) 34.58%, rgba(234, 236, 198, 0.3) 100%)",
                    paddingTop: "135px",
                }}
            >
                <div
                    className="container"
                    style={{
                        paddingTop: "35px",
                    }}
                >
                    <div className="row d-flex justify-content-center">
                        <div
                            className="col"
                            style={{
                                fontFamily: "Poppins",
                                fontSize: "68px",
                                fontStyle: "normal",
                                fontWeight: "600",
                                lineHeight: "86px",
                                letterSpacing: "0em",
                                textDecoration: "none",
                                color: "#081F32",
                                marginBottom: "35px",
                            }}
                        >
                            <span>Recycling </span>
                            <span style={{ color: "#007AE9" }}>waste</span>
                            <div>
                                <span>management.</span>
                            </div>
                        </div>
                    </div>

                    <div className="row d-flex justify-content-start">
                        <div
                            className="col"
                            style={{
                                fontFamily: "Open Sans",
                                fontSize: "15px",
                                fontStyle: "normal",
                                fontWeight: "400",
                                lineHeight: "19px",
                                letterSpacing: "0.08em",
                                textAlign: "left",
                                width: "500px",
                                color: "#616161",
                                position: "absolute",
                            }}
                        >
                            <p>
                                All things recycling related. Including a recycling campaign, how to
                                prepare your waste before discarding, and matching your specific
                                type of garbage with the product owner.
                            </p>
                        </div>
                    </div>

                    <div className="button">
                        <div
                            className="d-flex justify-content-start align-items-center"
                            style={{
                                cursor: "pointer",
                            }}
                        >
                            <a
                                href="/search"
                                style={{
                                    color: "white",
                                    fontWeight: "700",
                                    fontSize: "12px",
                                    letterSpacing: "1.5px",
                                    backgroundColor: "#4263EB",
                                    padding: "16px 32px 16px 32px",
                                    borderRadius: "8px",
                                    textDecoration: "none",
                                    marginTop: "10%",
                                    zIndex: "1",
                                }}
                            >
                                GET STARTED
                            </a>
                        </div>
                    </div>
                </div>
                <div
                    className="col d-flex justify-content-end"
                    style={{ position: "absolute", top: "44px", right: "0", overflow: "hidden" }}
                >
                    <img alt="banner" src="/images/banner1-2.png" width={800} height={592} />
                </div>
            </div>

            <div style={{ width: "100%", height: "500px" }}>
                <div className="container">
                    <div className="row">
                        <div
                            className="col d-flex justify-content-start col-md-6"
                            style={{ position: "relative" }}
                        >
                            <div style={{ position: "absolute", top: "150px", overflow: "hidden" }}>
                                <img
                                    alt="banner2"
                                    src="/images/banner2.png"
                                    width={350}
                                    height={240}
                                />
                            </div>
                        </div>

                        <div className="col d-flex justify-content-start col-md-6">
                            <p
                                style={{
                                    fontFamily: "Poppins",
                                    fontSize: "40px",
                                    fontStyle: "normal",
                                    fontWeight: "600",
                                    lineHeight: "55px",
                                    color: "#000000",
                                    left: "0",
                                    paddingTop: "100px",
                                    textAlign: "left",
                                }}
                            >
                                Make recycling easier
                            </p>
                        </div>
                    </div>

                    <div
                        style={{
                            width: "100%",
                            fontFamily: "Open Sans",
                            fontSize: "14px",
                            fontStyle: "normal",
                            fontWeight: "400",
                            lineHeight: "24px",
                            color: "#000000",
                            marginTop: "16px",
                            marginLeft: "16px",
                        }}
                    >
                        <div className="row">
                            <div
                                className="d-flex align-items-center offset-md-6"
                                style={{ marginBottom: "16px" }}
                            >
                                <div className="media">
                                    <img
                                        alt="menu"
                                        style={{ marginRight: "12px" }}
                                        src="/icons/menu.png"
                                        width={24}
                                        height={24}
                                    />
                                    <span style={{ lineHeight: "24px" }}>
                                        A tool to find and match out your waste with charities
                                        campaign.
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div
                                className="d-flex align-items-center offset-md-6"
                                style={{ marginBottom: "16px" }}
                            >
                                <div className="media">
                                    <img
                                        alt="menu"
                                        style={{ marginRight: "12px" }}
                                        src="/icons/menu.png"
                                        width={24}
                                        height={24}
                                    />
                                    <span style={{ lineHeight: "24px" }}>
                                        More choices when it comes to deciding how to handle waste,
                                        other than throwing away.
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div
                                className="d-flex align-items-center offset-md-6"
                                style={{ marginBottom: "16px" }}
                            >
                                <div className="media">
                                    <img
                                        alt="menu"
                                        style={{ marginRight: "12px" }}
                                        src="/icons/menu.png"
                                        width={24}
                                        height={24}
                                    />
                                    <span style={{ lineHeight: "24px" }}>
                                        Well collected information from both product owner and
                                        campaign manager.
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div
                                className="d-flex align-items-center offset-md-6"
                                style={{ marginBottom: "16px" }}
                            >
                                <div className="media">
                                    <img
                                        alt="menu"
                                        style={{ marginRight: "12px" }}
                                        src="/icons/menu.png"
                                        width={24}
                                        height={24}
                                    />
                                    <span style={{ lineHeight: "24px" }}>
                                        Cool tips and practices to manage your waste.
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div
                                className="d-flex align-items-center offset-md-6"
                                style={{ marginBottom: "16px" }}
                            >
                                <div className="media">
                                    <img
                                        alt="menu"
                                        style={{ marginRight: "12px" }}
                                        src="/icons/menu.png"
                                        width={24}
                                        height={24}
                                    />
                                    <span style={{ lineHeight: "24px" }}>
                                        Help make a friendlier community and environment.
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3rd */}
            <div style={{ width: "100%", height: "600px", backgroundColor: "#F3F7ED" }}>
                <div className="container">
                    <div className="row">
                        <div className="col d-flex justify-content-start col-md-6">
                            <p
                                style={{
                                    fontFamily: "Poppins",
                                    fontSize: "40px",
                                    fontStyle: "normal",
                                    fontWeight: "600",
                                    lineHeight: "55px",
                                    color: "#000000",
                                    left: "0",
                                    paddingTop: "120px",
                                    textAlign: "left",
                                }}
                            >
                                Matching with any charity
                            </p>
                        </div>

                        <div
                            className="col d-flex justify-content-end col-md-6"
                            style={{ position: "relative" }}
                        >
                            <div style={{ position: "absolute", top: "48px", overflow: "hidden" }}>
                                <img
                                    alt="banner3"
                                    src="/images/banner3.png"
                                    width={450}
                                    height={382}
                                />
                            </div>
                        </div>
                    </div>

                    <div
                        style={{
                            width: "100%",
                            fontFamily: "Open Sans",
                            fontSize: "14px",
                            fontStyle: "normal",
                            fontWeight: "400",
                            lineHeight: "24px",
                            color: "#000000",
                            marginTop: "16px",
                        }}
                    >
                        <div className="row">
                            <div
                                className="d-flex align-items-center col-md-6"
                                style={{ marginBottom: "16px" }}
                            >
                                <p style={{ lineHeight: "24px" }}>
                                    Don’t know where to donate ? worry not. We help you find the
                                    right place for donating your recycling items. In old days, you
                                    may have to scroll through the search engine, or if you’re lucky
                                    enough, it may actually appear right on your feeds.
                                    Unfortunately, the first method might not be available by the
                                    time you found them, the second one might not up to your
                                    interest. That’s where we jump in, we only provide valid
                                    information and give you the power to search for a particular
                                    charity campaign that matches what you are looking for.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 4th */}
            <div style={{ width: "100%", height: "520px" }}>
                <div className="container">
                    <div className="row">
                        <div
                            className="col d-flex justify-content-start col-md-6"
                            style={{ position: "relative" }}
                        >
                            <div style={{ position: "absolute", top: "80px", overflow: "hidden" }}>
                                <img
                                    alt="banner4"
                                    src="/images/banner4.png"
                                    width={480}
                                    height={326}
                                />
                            </div>
                        </div>

                        <div className="col d-flex justify-content-start col-md-6">
                            <p
                                style={{
                                    fontFamily: "Poppins",
                                    fontSize: "40px",
                                    fontStyle: "normal",
                                    fontWeight: "600",
                                    lineHeight: "55px",
                                    color: "#000000",
                                    left: "0",
                                    paddingTop: "120px",
                                    textAlign: "left",
                                }}
                            >
                                Can I recycle this ?
                            </p>
                        </div>
                    </div>

                    <div
                        style={{
                            width: "100%",
                            fontFamily: "Open Sans",
                            fontSize: "14px",
                            fontStyle: "normal",
                            fontWeight: "400",
                            lineHeight: "24px",
                            color: "#000000",
                            marginTop: "16px",
                        }}
                    >
                        <div className="row">
                            <div
                                className="d-flex align-items-center col-md-6 offset-md-6"
                                style={{ marginBottom: "16px" }}
                            >
                                <p style={{ lineHeight: "24px" }}>
                                    Not everyone could sort out each garbage type and that’s not
                                    something to be afraid of. GreenCycle will provide you what you
                                    need to know. What can be recycled and what’s not. Also, you
                                    will learn how to prepare them before donating, recycling, or
                                    disposing.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="button">
                        <div
                            style={{ cursor: "pointer" }}
                            className="d-flex justify-content-start align-items-center col-md-6 offset-md-6"
                        >
                            <a
                                href="/search"
                                style={{
                                    color: "white",
                                    fontWeight: "700",
                                    fontSize: "12px",
                                    letterSpacing: "1.5px",
                                    backgroundColor: "#4263EB",
                                    padding: "16px 32px 16px 32px",
                                    borderRadius: "8px",
                                    textDecoration: "none",
                                }}
                            >
                                Find what's right
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* 5th */}
            <div style={{ width: "100%", height: "650px", backgroundColor: "#EDF7F6" }}>
                <div className="container">
                    <div className="row">
                        <div className="col d-flex justify-content-center col-md-12">
                            <p
                                style={{
                                    fontFamily: "Poppins",
                                    fontSize: "40px",
                                    fontStyle: "normal",
                                    fontWeight: "600",
                                    lineHeight: "55px",
                                    color: "#000000",
                                    left: "0",
                                    paddingTop: "120px",
                                    textAlign: "left",
                                }}
                            >
                                Don’t know where to start ?
                            </p>
                        </div>
                    </div>

                    <div
                        style={{
                            width: "100%",
                            fontFamily: "Open Sans",
                            fontSize: "14px",
                            fontStyle: "normal",
                            fontWeight: "400",
                            lineHeight: "24px",
                            color: "#000000",
                        }}
                    >
                        <div className="row" style={{ margin: "32px 150px 0px 150px" }}>
                            <div className="d-flex justify-content-center col-md-3 col-lg-4">
                                <div className="figure text-center">
                                    <a href="/materialDetail?id=3XMQjv5ayil3S0VAKuJE">
                                        <img
                                            alt="banner5"
                                            src="/images/banner5-1.png"
                                            className="figure-img img-fluid rounded"
                                            width={180}
                                            height={214}
                                        />
                                    </a>
                                    <div
                                        style={{
                                            lineHeight: "24px",
                                            fontSize: "16px",
                                            fontFamily: "Poppins",
                                            marginTop: "16px",
                                        }}
                                    >
                                        <b>Plastic Bottle</b>
                                    </div>
                                    <p style={{ lineHeight: "24px" }}>
                                        By separating the cap and the bottle, both can be recycled.
                                    </p>
                                </div>
                            </div>

                            <div className="d-flex justify-content-center col-md-4 col-lg-4">
                                <div className="figure text-center">
                                    <a href="/materialDetail?id=VZWOiiMOt4Yp5gK0lNDm">
                                        <img
                                            alt="banner5-2"
                                            src="/images/banner5-2.png"
                                            className="figure-img img-fluid rounded"
                                            width={180}
                                            height={214}
                                        />
                                    </a>
                                    <div
                                        style={{
                                            lineHeight: "24px",
                                            fontSize: "16px",
                                            fontFamily: "Poppins",
                                            marginTop: "16px",
                                        }}
                                    >
                                        <b>Plastic Bag</b>
                                    </div>
                                    <p style={{ lineHeight: "24px" }}>
                                        Reuse them for the second, third or even forth times.
                                    </p>
                                </div>
                            </div>

                            <div className="d-flex justify-content-center col-md-4 col-lg-4">
                                <div className="figure text-center">
                                    <a href="/materialDetail?id=8niUskcwEh2PxEvhie3v">
                                        <img
                                            alt="banner5-3"
                                            src="/images/banner5-3.png"
                                            className="figure-img img-fluid rounded"
                                            width={180}
                                            height={214}
                                        />
                                    </a>
                                    <div
                                        style={{
                                            lineHeight: "24px",
                                            fontSize: "16px",
                                            fontFamily: "Poppins",
                                            marginTop: "16px",
                                        }}
                                    >
                                        <b>Milk Carton</b>
                                    </div>
                                    <p style={{ lineHeight: "24px" }}>
                                        After cleaning the packaging, the carton is ready to be
                                        recycled.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </Layout>
    </div>
);

export default Main;
