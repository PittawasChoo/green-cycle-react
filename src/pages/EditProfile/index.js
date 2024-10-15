import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import Layout from "components/Layout";
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

const EditProfile = () => {
    const navigate = useNavigate();

    const [token, setToken] = useState(null);
    const [name, setName] = useState(null);
    const [detail, setDetail] = useState(null);
    const [address, setAddress] = useState(null);
    const [website, setWebsite] = useState(null);
    const [email, setEmail] = useState(null);
    const [contactNumber, setContactNumber] = useState(null);
    const [inputImage, setInputImage] = useState(null);
    const [image, setImage] = useState(null);
    const [role, setRole] = useState(null);
    const [showmMessege, setShowMessage] = useState(false);

    const inputRef = useRef();

    useEffect(() => {
        const fetchData = async () => {
            const cookies = new Cookies();
            let cktoken = cookies.get("token");
            setToken(cktoken);

            const header = {
                Authorization: cktoken,
            };

            await axios
                .get(`http://localhost:3003/user/role`, {
                    headers: header,
                })
                .then((res) => {
                    setRole(res.data.role);
                })
                .catch((error) => {
                    // console.log("error here");
                });

            await axios
                .get(`http://localhost:3003/` + role + `/data`, {
                    headers: header,
                })
                .then((res) => {
                    setName(res.data.name);
                    setDetail(res.data.detail);
                    setContactNumber(res.data.contactNumber);
                    setAddress(res.data.address);
                    setWebsite(res.data.website);
                    setEmail(res.data.email);
                    setImage(res.data.image);
                });
        };

        fetchData();
    }, [role]);

    const triggerInput = (e) => {
        e.persist();
        inputRef.current.click();
    };

    const uploadImg = async (image) => {
        if (image === null) {
            return null;
        }
        let data = new FormData();
        data.append("file", image, image.name);
        // const res = await axios.post('http://localhost:3003/upload', data)
        const res = await axios.post("http://localhost:3003/upload", data);
        return res.data;
    };

    const updateProfile = async () => {
        const uploadedImage = await uploadImg(inputImage);
        const body = {
            name: name,
            detail: detail,
            contactNumber: contactNumber,
            address: address,
            website: website,
            email: email,
            image: uploadedImage || image,
        };

        if (!!name && !!detail && !!contactNumber && !!address && !!website && !!email) {
            await axios.post(`http://localhost:3003/` + role + `/updateManufacturer`, body, {
                headers: {
                    Authorization: token,
                },
            });
            const pathname = role === "contributor" ? "/contHome" : "/manuHome";
            navigate({ pathname });
        } else setShowMessage(true);
    };

    return (
        <div>
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
                                        Your Profile
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
                                                            setInputImage(e.target.files[0])
                                                        }
                                                    />
                                                    <img
                                                        alt="uploaded-img"
                                                        src={
                                                            inputImage
                                                                ? URL.createObjectURL(inputImage)
                                                                : image
                                                        }
                                                        style={{
                                                            width: "100%",
                                                            height: "100%",
                                                            border: 0,
                                                            borderRadius: "50%",
                                                            objectFit: "cover",
                                                        }}
                                                    />
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
                                        {showmMessege ? (
                                            <p
                                                style={{
                                                    fontFamily: "Open Sans",
                                                    fontSize: "13px",
                                                    fontStyle: "normal",
                                                    color: "red",
                                                    marginTop: "10px",
                                                }}
                                            >
                                                Please insert all information about your account.
                                            </p>
                                        ) : (
                                            <div />
                                        )}
                                        <div
                                            style={{
                                                width: "90%",
                                                textAlign: "center",
                                            }}
                                        >
                                            <input
                                                type="button"
                                                value="Continue"
                                                onClick={() => updateProfile()}
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
                        </div>

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

export default EditProfile;
