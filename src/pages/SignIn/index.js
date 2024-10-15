import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import Layout from "components/Layout";
import ReactLoading from "react-loading";
import { Link, useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

const SignIn = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const cookies = new Cookies();
            let token = await cookies.get("token");

            if (token) {
                const res = await axios
                    .get(`http://localhost:3003/user/checkSignIn`, {
                        headers: {
                            Authorization: token,
                        },
                    })
                    .catch((error) => {});

                if (res) {
                    if (res.data.isVerified) {
                        if (res.data.role === "admin") {
                            navigate({ pathname: "/adminHome" });
                        } else if (res.data.role === "manufacturer") {
                            navigate({ pathname: "/manuHome" });
                        } else if (res.data.role === "contributor") {
                            navigate({ pathname: "/contHome" });
                        }
                    } else if (res.data.own) {
                        navigate({ pathname: "/createSucessful" });
                    } else {
                        navigate({ pathname: "/createAccount" });
                    }
                }
            }
            setLoading(false);
        };

        fetchData();
    }, [navigate]);

    const signIn = async () => {
        const cookies = new Cookies();
        setLoading(true);
        if (!email || !password) {
            setMessage("Please enter email and password");
            setLoading(false);
        } else {
            setMessage("");
            await axios
                .post(`http://localhost:3003/signin`, {
                    email: email,
                    password: password,
                })
                .then((res) => {
                    if (res.data.token !== undefined) {
                        cookies.set("token", res.data.token, { path: "/" });
                        if (res.data.isVerified) {
                            if (res.data.role === "admin") {
                                navigate({ pathname: "/adminHome" });
                            } else if (res.data.role === "manufacturer") {
                                navigate({ pathname: "/manuHome" });
                            } else if (res.data.role === "contributor") {
                                navigate({ pathname: "/contHome" });
                            }
                        } else if (res.data.own) {
                            navigate({ pathname: "/createSucessful" });
                        } else {
                            navigate({ pathname: "/createAccount" });
                        }
                    } else {
                        setMessage(res.data.error);
                        setLoading(false);
                    }
                });
        }
    };

    return (
        <div style={{ background: "rgb(250, 250, 250)" }}>
            <Layout title="GreenCycle: A community-base forwarding system">
                <div className="container">
                    <div className="row">
                        <div
                            className="col d-flex align-items-start p-0 m-0 col-md-6 col-lg-6"
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
                                                alt="logo"
                                                src="/images/logo2.png"
                                                width={185}
                                                height={33}
                                            />
                                        </div>
                                    </Link>
                                    <p
                                        style={{
                                            fontFamily: "Open Sans",
                                            fontSize: "38px",
                                            fontStyle: "normal",
                                            fontWeight: "600",
                                            lineHeight: "52px",
                                            marginTop: "90px",
                                            marginBottom: "33px",
                                        }}
                                    >
                                        Sign In
                                    </p>
                                    <form>
                                        <label
                                            style={{
                                                fontFamily: "Open Sans",
                                                fontSize: "12px",
                                                fontStyle: "normal",
                                                fontWeight: "400",
                                                lineHeight: "17px",
                                                color: "#2B2B2B",
                                                letterSpacing: "1px",
                                            }}
                                        >
                                            EMAIL
                                        </label>
                                        <br />
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            style={{
                                                width: "448px",
                                                height: "56px",
                                                borderRadius: "16px",
                                                backgroundColor: "#F2F3F7",
                                                border: "none",
                                                marginTop: "16px",
                                                marginBottom: "16px",
                                                paddingLeft: "24px",
                                            }}
                                        />
                                        <br />
                                        <label
                                            style={{
                                                fontFamily: "Open Sans",
                                                fontSize: "12px",
                                                fontStyle: "normal",
                                                fontWeight: "400",
                                                lineHeight: "17px",
                                                color: "#2B2B2B",
                                                letterSpacing: "1px",
                                            }}
                                        >
                                            PASSWORD
                                        </label>
                                        <br />
                                        <input
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            style={{
                                                width: "448px",
                                                height: "56px",
                                                borderRadius: "16px",
                                                backgroundColor: "#F2F3F7",
                                                border: "none",
                                                marginTop: "16px",
                                                paddingLeft: "24px",
                                            }}
                                        />
                                        <br />
                                        <p
                                            style={{
                                                fontFamily: "Open Sans",
                                                fontSize: "13px",
                                                fontStyle: "normal",
                                                color: "red",
                                                marginTop: "10px",
                                                paddingRight: "50px",
                                            }}
                                        >
                                            {message}
                                        </p>
                                        <div
                                            style={{
                                                width: "448px",
                                                textAlign: "center",
                                            }}
                                        >
                                            <input
                                                type="button"
                                                value="Sign In"
                                                onClick={signIn}
                                                style={{
                                                    marginTop: "19px",
                                                    borderRadius: "8px",
                                                    backgroundColor: "#007AE9",
                                                    border: "none",
                                                    color: "white",
                                                    width: "261px",
                                                    height: "48px",
                                                    marginBottom: "26px",
                                                    fontSize: "16px",
                                                    fontFamily: "open Sans",
                                                    fontStyle: "normal",
                                                    fontWeight: "normal",
                                                    lineHeight: "19px",
                                                }}
                                            />
                                            <br />
                                            <span
                                                style={{
                                                    fontFamily: "Open Sans",
                                                    fontSize: "17px",
                                                    fontStyle: "normal",
                                                    fontWeight: "normal",
                                                    lineHeight: "19px",
                                                }}
                                            >
                                                Not a member ?{" "}
                                            </span>
                                            <Link to="/selectRole">
                                                <div
                                                    style={{
                                                        fontFamily: "Open Sans",
                                                        fontSize: "17px",
                                                        fontStyle: "normal",
                                                        fontWeight: 200,
                                                        lineHeight: "19px",
                                                        textDecoration: "none",
                                                        cursor: "pointer",
                                                    }}
                                                >
                                                    <b>Sign Up</b>
                                                </div>
                                            </Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

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

                        {/* row end     */}
                    </div>
                </div>
                {loading ? (
                    <div
                        className="d-flex justify-content-center align-items-center"
                        style={{
                            height: "100vh",
                            width: "100vw",
                            backgroundColor: "#188a8d",
                            zIndex: "20",
                            position: "fixed",
                            top: 0,
                        }}
                    >
                        <ReactLoading type="bars" color="#FFFFFF" height={"10%"} width={"10%"} />
                    </div>
                ) : (
                    <div />
                )}
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
                `}</style>
        </div>
    );
};

export default SignIn;
