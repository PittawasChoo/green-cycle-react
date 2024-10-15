import React, { useRef, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import Layout from "components/Layout";
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

const CreateAccount = () => {
    const navigate = useNavigate();

    const cookies = new Cookies();

    const [name, setName] = useState(null);
    const [contactNumber, setContactNumber] = useState(null);
    const [email, setEmail] = useState(null);
    const [website, setWebsite] = useState(null);
    const [address, setAddress] = useState(null);
    const [detail, setDetail] = useState(null);
    const [message, setMessage] = useState(null);
    const [image, setImage] = useState(null);

    const inputRef = useRef();

    function triggerInput(e) {
        e.persist();
        inputRef.current.click();
    }

    async function uploadImg(image) {
        let data = new FormData();
        data.append("file", image, image.name);
        // const res = await axios.post('http://localhost:3003/upload', data)
        const res = await axios.post("http://localhost:3003/upload", data);
        return res.data;
    }

    async function createAcc() {
        if (!name || !contactNumber || !email || !website || !address || !detail || !image) {
            setMessage("Please insert all information about your account.");
        } else {
            const token = cookies.get("token");

            const res = await axios.get("http://localhost:3003/user/role", {
                headers: { Authorization: token },
            });

            if (res.data.role === "contributor") {
                const imageURL = await uploadImg(image);

                const body = {
                    image: imageURL,
                    name: name,
                    contactNumber: contactNumber,
                    email: email,
                    website: website,
                    address: address,
                    detail: detail,
                };

                // const res = await axios.post('http://localhost:3003/contributor/add', body, {
                await axios.post(`http://localhost:3003/contributor/add`, body, {
                    headers: {
                        Authorization: token,
                    },
                });

                const cookies = new Cookies();
                cookies.remove("token");

                fetch("http://localhost:3003/signout", {
                    method: "GET",
                });

                navigate("../createSuccessful");
            } else if (res.data.role === "manufacturer") {
                const imageURL = await uploadImg(image);

                const body = {
                    image: imageURL,
                    name: name,
                    contactNumber: contactNumber,
                    email: email,
                    website: website,
                    address: address,
                    detail: detail,
                };

                // const res = await axios.post('http://localhost:3003/manufacturer/add', body, {
                await axios.post(`http://localhost:3003/manufacturer/add`, body, {
                    headers: {
                        Authorization: token,
                    },
                });

                const cookies = new Cookies();
                cookies.remove("token");

                fetch("http://localhost:3003/signout", {
                    method: "GET",
                });

                navigate("../createSuccessful");
            } else {
                const cookies = new Cookies();
                cookies.remove("token");

                fetch("http://localhost:3003/signout", {
                    method: "GET",
                });

                navigate("../");
            }
        }
    }

    return (
        <div style={{ backgroundColor: "" }}>
            <Layout title="GreenCycle: A community-base forwarding system">
                <div className="container">
                    <div className="row">
                        <div
                            className="col d-flex align-items-start p-0 m-0 col-md-6 col-lg-6"
                            style={{
                                height: "100vh",
                                width: "100%",
                                maxWidth: "100vw",
                            }}
                        >
                            <div style={{ width: "100%", minHeight: "100vh", float: "left" }}>
                                <div style={{ marginTop: "111px" }}>
                                    <img
                                        alt="logo2"
                                        src="/images/logo2.png"
                                        width={185}
                                        height={33}
                                    />

                                    <p
                                        style={{
                                            fontFamily: "Open Sans",
                                            fontSize: "38px",
                                            fontStyle: "normal",
                                            fontWeight: "600",
                                            lineHeight: "52px",
                                            marginTop: "90px",
                                            marginBottom: "33px",
                                            textAlign: "nowrap",
                                        }}
                                    >
                                        Let others know you
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
                                            DISPLAY IMAGE
                                        </label>
                                        <div
                                            style={{
                                                width: "100%",
                                                // display: "flex",
                                                // justifyContent: "center",
                                                marginTop: "16px",
                                                marginLeft: "25%",
                                            }}
                                        >
                                            <div className="uploader-container">
                                                <div
                                                    className="img-uploader"
                                                    onClick={(e) => triggerInput(e)}
                                                    style={{
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        display: "flex",
                                                        borderRadius: "50%",
                                                        borderStyle: "solid",
                                                        borderColor: "#F2F3F7",
                                                    }}
                                                >
                                                    <input
                                                        style={{
                                                            position: "absolute",
                                                            top: "-9999px",
                                                        }}
                                                        ref={inputRef}
                                                        type="file"
                                                        onChange={(e) =>
                                                            setImage(e.target.files[0])
                                                        }
                                                    />
                                                    {image ? (
                                                        <img
                                                            alt="image1"
                                                            src={URL.createObjectURL(image)}
                                                            style={{
                                                                width: "180px",
                                                                height: "180px",
                                                                border: 0,
                                                                borderRadius: "50%",
                                                            }}
                                                        />
                                                    ) : (
                                                        <img
                                                            alt="camera"
                                                            src="/icons/camera.png"
                                                            width={50}
                                                            height={50}
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
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
                                            DISPLAY NAME
                                        </label>
                                        <br />
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="i.e. Company Name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            style={{
                                                // usedtobepercentage
                                                width: "448px",
                                                height: "56px",
                                                borderRadius: "16px",
                                                backgroundColor: "#F2F3F7",
                                                border: "none",
                                                marginTop: "16px",
                                                marginBottom: "16px",
                                                paddingLeft: "5%",
                                                paddingRight: "5%",
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
                                            CONTACT NUMBER
                                        </label>
                                        <br />
                                        <input
                                            type="text"
                                            name="contact-number"
                                            placeholder="i.e. 0xxxxxxxx"
                                            value={contactNumber}
                                            onChange={(e) => setContactNumber(e.target.value)}
                                            style={{
                                                width: "448px",
                                                height: "56px",
                                                borderRadius: "16px",
                                                backgroundColor: "#F2F3F7",
                                                border: "none",
                                                marginTop: "16px",
                                                marginBottom: "16px",
                                                paddingLeft: "5%",
                                                paddingRight: "5%",
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
                                            EMAIL
                                        </label>
                                        <br />
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="i.e. yourcompany@provider.com"
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
                                                paddingLeft: "5%",
                                                paddingRight: "5%",
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
                                            WEBSITE
                                        </label>
                                        <br />
                                        <input
                                            type="url"
                                            name="url"
                                            placeholder="i.e. yourcompany.site"
                                            value={website}
                                            onChange={(e) => setWebsite(e.target.value)}
                                            style={{
                                                width: "448px",
                                                height: "56px",
                                                borderRadius: "16px",
                                                backgroundColor: "#F2F3F7",
                                                border: "none",
                                                marginTop: "16px",
                                                marginBottom: "16px",
                                                paddingLeft: "5%",
                                                paddingRight: "5%",
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
                                            ADDRESS
                                        </label>
                                        <br />
                                        <input
                                            type="text"
                                            name="address"
                                            placeholder="i.e. xx/xx youraddress yourcity yourcountry xxxxx"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            style={{
                                                width: "448px",
                                                height: "56px",
                                                borderRadius: "16px",
                                                backgroundColor: "#F2F3F7",
                                                border: "none",
                                                marginTop: "16px",
                                                marginBottom: "16px",
                                                paddingLeft: "5%",
                                                paddingRight: "5%",
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
                                            TELL US ABOUT YOU
                                        </label>
                                        <br />
                                        <textarea
                                            name="detail"
                                            maxLength="200"
                                            placeholder=""
                                            value={detail}
                                            onChange={(e) => setDetail(e.target.value)}
                                            style={{
                                                resize: "none",
                                                width: "448px",
                                                height: "120px",
                                                borderRadius: "16px",
                                                backgroundColor: "#F2F3F7",
                                                border: "none",
                                                marginTop: "16px",
                                                marginBottom: "16px",
                                                padding: "16px 5% 16px 5%",
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
                                                width: "90%",
                                                textAlign: "center",
                                            }}
                                        >
                                            <input
                                                type="button"
                                                value="Continue"
                                                onClick={() => createAcc()}
                                                style={{
                                                    marginTop: "19px",
                                                    borderRadius: "8px",
                                                    backgroundColor: "#007AE9",
                                                    border: "none",
                                                    color: "white",
                                                    width: "261px",
                                                    height: "48px",
                                                    marginBottom: "100px",
                                                    fontSize: "16px",
                                                    fontFamily: "open Sans",
                                                    fontStyle: "normal",
                                                    fontWeight: "normal",
                                                    lineHeight: "19px",
                                                }}
                                            />
                                            <br />
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
                                position: "fixed",
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
                .img-uploader {
                    width: 180px;
                    height: 180px;
                    border-radius: 16px;
                    background-color: #f2f3f7;
                    cursor: pointer;
                }
                .uploader-container {
                    margin: auto;
                }
            `}</style>
        </div>
    );
};

export default CreateAccount;
