import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useCookies } from "react-cookie";

import Layout from "components/Layout";

const SignUp = () => {
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const role = searchParams.get("role");

    // eslint-disable-next-line
    const [cookies, setCookie] = useCookies(["token"]);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    async function signUp() {
        if (role !== "contributor" && role !== "manufacturer") {
            navigate({
                pathname: "../selectRole",
            });
        } else {
            if (password !== confirmPassword) {
                setMessage("Password mismatch");
            } else {
                // const res = await axios.post('http://localhost:3003/signup', {
                const res = await axios.post(`http://localhost:3003/signup`, {
                    email: email,
                    password: password,
                    role: role,
                });
                setCookie("token", res.data.token, {
                    path: "/",
                });
                navigate({
                    pathname: "../createAccount",
                });
            }
        }
    }

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
                                                alt="logo2"
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
                                        Create account
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
                                            CONFIRM PASSWORD
                                        </label>
                                        <br />
                                        <input
                                            type="password"
                                            name="confirm-password"
                                            placeholder="Confirm Password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
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
                                                value="Sign Up"
                                                onClick={() => signUp()}
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
                                                Already have an account ?{" "}
                                            </span>
                                            <Link to="/signIn">
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
                                                    <b>Sign In</b>
                                                </div>
                                            </Link>
                                        </div>
                                    </form>
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
                    </div>
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
            `}</style>
        </div>
    );
};

export default SignUp;
