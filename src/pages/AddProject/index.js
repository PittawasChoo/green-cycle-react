import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import Multiselect from "multiselect-react-dropdown";
import ReactLoading from "react-loading";
import { get } from "lodash";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Link, useLocation } from "react-router-dom";
import { Tooltip } from "react-tooltip";

import Navbar from "components/Navbar";
import Layout from "components/Layout";
import Footer from "components/Footer";

const multiselectStyle = {
    chips: {
        background: "none",
        color: "#007AE9",
        borderRadius: "8px",
        border: "1px solid #007AE9",
        fontFamily: "Open Sans",
        fontSize: "14px",
        fontWeight: "400",
        lineHeight: "19px",
        letterSpacing: "0em",
        marginBottom: 0,
    },
    searchBox: {
        width: "100%",
        height: "56px",
        borderRadius: "16px",
        backgroundColor: "#F2F3F7",
        border: "none",
        paddingLeft: "24px",
        paddingRight: "24px",
        display: "flex",
        alignItems: "center",
    },
    multiselectContainer: {
        fontFamily: "Open Sans",
        fontSize: "14px",
        fontWeight: "400",
        lineHeight: "19px",
        borderRadius: "16px",
    },
    optionContainer: {
        background: "#F2F3F7",
        border: "1px solid #007AE9",
        borderRadius: "16px",
        display: "grid",
        gridTemplateColumns: "auto auto auto auto",
        listStyleType: "none",
    },
};

const selectStatusStyle = {
    chips: {
        fontFamily: "Open Sans",
        fontSize: "14px",
        fontWeight: "400",
        lineHeight: "19px",
        letterSpacing: "0em",
        marginBottom: 0,
        paddingLeft: 0,
    },
    searchBox: {
        width: "100%",
        height: "56px",
        borderRadius: "16px",
        backgroundColor: "#F2F3F7",
        border: "none",
        paddingLeft: "24px",
        paddingRight: "24px",
        display: "flex",
        alignItems: "center",
    },
    multiselectContainer: {
        fontFamily: "Open Sans",
        fontSize: "14px",
        fontWeight: "400",
        lineHeight: "19px",
        borderRadius: "16px",
    },
    optionContainer: {
        background: "#F2F3F7",
        border: "1px solid #007AE9",
        borderRadius: "16px",
    },
};

const AddProject = () => {
    const rrdLocation = useLocation();
    const id = get(rrdLocation, "state.id", null);

    const [token, setToken] = useState(null);
    const [page, setPage] = useState(1);
    const [name, setName] = useState(null);
    const [detail, setDetail] = useState(null);
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const [image4, setImage4] = useState(null);
    const [category, setCategory] = useState(null);
    const [allMaterial, setAllMaterial] = useState([]);
    const [material, setMaterial] = useState([]);
    const [option, setOption] = useState([]);
    const [selectedMaterialArray, setSelectedMaterialArray] = useState([]);
    const [modal, setModal] = useState(false);
    const [reqMaterial, setReqMaterial] = useState(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [projectId, setProjectId] = useState(null);
    const [oldImage1, setOldImage1] = useState(null);
    const [oldImage2, setOldImage2] = useState(null);
    const [oldImage3, setOldImage3] = useState(null);
    const [oldImage4, setOldImage4] = useState(null);
    const [alertText, setAlertText] = useState("publishing");
    const [postAddress, setPostAddress] = useState(null);
    const [location, setLocation] = useState(null);
    const [dueDate, setDueDate] = useState(null);
    const [status, setStatus] = useState("Available");
    const [preparing, setPreparing] = useState(null);
    const [shippingService, setShippingService] = useState(null);
    const [selectedStatusArray, setSelectedStatusArray] = useState([{ name: "Available", id: 1 }]);

    const inputRef1 = useRef();
    const inputRef2 = useRef();
    const inputRef3 = useRef();
    const inputRef4 = useRef();

    useEffect(() => {
        const fetchData = async () => {
            let statusOption = [
                { name: "Available", id: 1 },
                { name: "Not available", id: 2 },
                { name: "Hidden", id: 3 },
            ];

            // axios.get('http://localhost:3003/material/approved')
            await axios.get(`http://localhost:3003/material/approved`).then((res) => {
                let optionArray = [];
                for (let i = 0; i < get(res, "data", []).length; i++) {
                    optionArray = [
                        ...optionArray,
                        {
                            name: res.data[i].name,
                            id: i + 1,
                            mid: res.data[i].id,
                        },
                    ];
                }

                setOption(optionArray);
                setAllMaterial(res.data);
            });

            const cookies = new Cookies();
            let token = cookies.get("token");

            setToken(token);

            if (id) {
                // await axios.post(`http://localhost:3003/contributor/projectById`,
                await axios
                    .post("http://localhost:3003/contributor/projectById", {
                        id: id,
                    })
                    .then((res) => {
                        const data = res.data;

                        setName(data.name);
                        setDetail(data.projectDetail);
                        setPostAddress(data.address);
                        setOldImage1(data.image1 || null);
                        setOldImage2(data.image2 || null);
                        setOldImage3(data.image3 || null);
                        setOldImage4(data.image4 || null);
                        setCategory(data.categories);
                        setLocation(data.location);
                        setMaterial(data.material);
                        setDueDate(data.dueDate);
                        setStatus(data.status);
                        setPreparing(data.preparing);
                        setShippingService(data.shippingService);
                        setAlertText("updating");
                    });
                const filteredMaterial = option.filter((item) => {
                    let check = false;
                    for (let i = 0; i < material.length; i++) {
                        if (item.mid.includes(material[i].id)) {
                            check = true;
                        }
                    }
                    return check;
                });
                const filteredStatus = statusOption.filter((item) => {
                    let check = false;
                    for (let i = 0; i < material.length; i++) {
                        if (item.name === status) {
                            check = true;
                        }
                    }
                    return check;
                });
                setSelectedStatusArray(filteredStatus);
                setSelectedMaterialArray(filteredMaterial);
            }
        };

        fetchData();
    }, [id, material, option, status]);

    const triggerInput1 = (e) => {
        e.persist();
        inputRef1.current.click();
    };

    const triggerInput2 = (e) => {
        e.persist();
        inputRef2.current.click();
    };

    const triggerInput3 = (e) => {
        e.persist();
        inputRef3.current.click();
    };

    const triggerInput4 = (e) => {
        e.persist();
        inputRef4.current.click();
    };

    const togglePage = (page) => {
        if (page === 1) {
            setPage(2);
        } else if (page === 2) {
            setPage(1);
        }
    };

    const toggleModal = () => {
        setModal(!modal);
    };

    const onSelectMaterial = (selectedList, selectedItem) => {
        let materialArray = [];
        let categoryArray = [];

        for (let i = 0; i < selectedList.length; i++) {
            materialArray = [
                ...materialArray,
                {
                    name: selectedList[i].name,
                    id: selectedList[i].mid,
                },
            ];
        }

        for (let j = 0; j < materialArray.length; j++) {
            for (let k = 0; k < allMaterial.length; k++) {
                if (allMaterial[k].name === materialArray[j].name) {
                    for (let l = 0; l < get(allMaterial[k], "category", []).length; l++) {
                        if (!categoryArray.includes(allMaterial[k].category[l])) {
                            categoryArray = [...categoryArray, allMaterial[k].category[l]];
                        }
                    }
                }
            }
        }

        setMaterial(materialArray);
        setSelectedMaterialArray(selectedList);
        setCategory(categoryArray);
    };

    const onRemoveMaterial = (selectedList, removedItem) => {
        let materialArray = [];
        let categoryArray = [];

        for (let i = 0; i < selectedList.length; i++) {
            materialArray = [
                ...materialArray,
                {
                    name: selectedList[i].name,
                    id: selectedList[i].mid,
                },
            ];
        }

        for (let j = 0; j < materialArray.length; j++) {
            for (let k = 0; k < allMaterial.length; k++) {
                if (allMaterial[k].name === materialArray[j].name) {
                    for (let l = 0; l < get(allMaterial[k], "category", []).length; l++) {
                        if (!categoryArray.includes(allMaterial[k].category[l])) {
                            categoryArray = [...categoryArray, allMaterial[k].category[l]];
                        }
                    }
                }
            }
        }

        setMaterial(materialArray);
        setSelectedMaterialArray(selectedList);
        setCategory(categoryArray);
    };

    const onSelectStatus = (selectedList, selectedItem) => {
        setStatus(selectedItem.name);
        setSelectedStatusArray(selectedList);
    };

    const uploadImg = async (image) => {
        if (!image) {
            return null;
        }
        let data = new FormData();
        data.append("file", image, image.name);
        // const res = await axios.post('http://localhost:3003/upload', data)
        const res = await axios.post("http://localhost:3003/upload", data);
        return res.data;
    };

    const compareImg = async (img, prevImg) => {
        if (img) {
            return await uploadImg(img);
        } else {
            return prevImg;
        }
    };

    const createProject = async () => {
        setLoading(true);
        const header = {
            Authorization: token,
        };

        const img1 = await uploadImg(image1);
        const img2 = await uploadImg(image2);
        const img3 = await uploadImg(image3);
        const img4 = await uploadImg(image4);

        // await axios.post('http://localhost:3003/contributor/addProject',
        await axios
            .post(
                `http://localhost:3003/contributor/addProject`,
                {
                    name: name,
                    projectDetail: detail,
                    address: postAddress,
                    image1: img1,
                    image2: img2,
                    image3: img3,
                    image4: img4,
                    categories: category,
                    location: location,
                    material: material,
                    dueDate: dueDate,
                    status: status,
                    preparing: preparing,
                    shippingService: shippingService,
                },
                {
                    headers: header,
                }
            )
            .then((res) => {
                setProjectId(res.data);
                setSuccess(true);
                setLoading(false);
            });
    };

    const updateProject = async () => {
        setLoading(true);
        const header = {
            Authorization: token,
        };

        const img1 = await compareImg(image1, oldImage1);
        const img2 = await compareImg(image2, oldImage2);
        const img3 = await compareImg(image3, oldImage3);
        const img4 = await compareImg(image4, oldImage4);

        // await axios.post(`http://localhost:3003/contributor/updateProject/` + id,
        await axios.post(
            `http://localhost:3003/contributor/updateProject/` + id,
            {
                name: name,
                projectDetail: detail,
                address: postAddress,
                image1: img1 || oldImage1,
                image2: img2,
                image3: img3,
                image4: img4,
                categories: category,
                location: location,
                material: material,
                dueDate: dueDate,
                status: status,
                preparing: preparing,
                shippingService: shippingService,
            },
            {
                headers: header,
            }
        );
        setProjectId(id);
        setSuccess(true);
        setLoading(false);
    };

    const requestMaterial = () => {
        const header = {
            Authorization: token,
        };

        const body = { name: reqMaterial };

        // axios.post('http://localhost:3003/material/reqMaterial', body, {headers, header})
        axios.post(`http://localhost:3003/material/reqMaterial`, body, {
            headers: header,
        });

        setReqMaterial(null);
        setModal(false);
    };

    return (
        <div style={{ maxWidth: "100vw" }}>
            <Layout title="GreenCycle: A community-base forwarding system">
                <Navbar />
                <div
                    className="d-flex align-items-start"
                    style={{
                        height: "100vh",
                        width: "100%",
                        background: "#F8F8F8",
                        padding: "120px 120px 50px 120px",
                    }}
                >
                    <div
                        className="shadow"
                        style={{
                            width: "283px",
                            height: "100%",
                            borderRadius: "16px",
                            padding: "30px 24px 0 24px",
                        }}
                    >
                        {page === 1 ? (
                            <div>
                                <p
                                    style={{
                                        padding: "16px",
                                        color: "#007AE9",
                                        cursor: "default",
                                        margin: 0,
                                        fontWeight: "600",
                                    }}
                                >
                                    Basic Information
                                </p>
                                <hr style={{ margin: 0 }} />
                                <div
                                    onClick={() => togglePage(page)}
                                    style={{
                                        padding: "16px",
                                        color: "black",
                                        textDecoration: "none",
                                        cursor: "pointer",
                                        fontWeight: "600",
                                    }}
                                >
                                    Requirement
                                </div>
                                <hr style={{ margin: 0 }} />
                            </div>
                        ) : (
                            <div>
                                <div
                                    onClick={() => togglePage(page)}
                                    style={{
                                        padding: "16px",
                                        color: "black",
                                        textDecoration: "none",
                                        cursor: "pointer",
                                        fontWeight: "600",
                                    }}
                                >
                                    Basic Information
                                </div>
                                <hr style={{ margin: 0 }} />
                                <p
                                    style={{
                                        padding: "16px",
                                        color: "#007AE9",
                                        cursor: "default",
                                        margin: 0,
                                        fontWeight: "600",
                                    }}
                                >
                                    Requirement
                                </p>
                                <hr style={{ margin: 0 }} />
                            </div>
                        )}
                    </div>
                    <div
                        className="shadow"
                        style={{
                            flex: "1",
                            height: "100%",
                            marginLeft: "24px",
                            borderRadius: "16px",
                            padding: "43px 10px 30px 39px",
                        }}
                    >
                        {page === 1 ? (
                            <div style={{ height: "100%" }}>
                                <form
                                    style={{
                                        height: "85%",
                                        marginBottom: "40px",
                                        overflowY: "scroll",
                                        paddingRight: "15px",
                                    }}
                                >
                                    <label
                                        style={{
                                            fontFamily: "Open Sans",
                                            fontSize: "12px",
                                            fontStyle: "normal",
                                            fontWeight: "400",
                                            lineHeight: "17px",
                                            color: "#2B2B2B",
                                            letterSpacing: "1px",
                                            marginBottom: "16px",
                                        }}
                                    >
                                        CAMPAIGN <span style={{ color: "#EB5757" }}>*</span>
                                    </label>
                                    <br />
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Campaign Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        style={{
                                            width: "100%",
                                            height: "56px",
                                            borderRadius: "16px",
                                            backgroundColor: "#F2F3F7",
                                            border: "none",
                                            marginBottom: "16px",
                                            paddingLeft: "24px",
                                            paddingRight: "24px",
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
                                            marginBottom: "16px",
                                        }}
                                    >
                                        DETAIL <span style={{ color: "#EB5757" }}>*</span>
                                    </label>
                                    <br />
                                    <textarea
                                        name="detail"
                                        maxLength="5000"
                                        placeholder=""
                                        value={detail}
                                        onChange={(e) => setDetail(e.target.value)}
                                        style={{
                                            resize: "none",
                                            width: "100%",
                                            height: "150px",
                                            borderRadius: "16px",
                                            backgroundColor: "#F2F3F7",
                                            border: "none",
                                            marginBottom: "16px",
                                            paddingLeft: "24px",
                                            paddingTop: "17px",
                                            paddingRight: "24px",
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
                                            marginBottom: "16px",
                                        }}
                                    >
                                        POST ADDRESS <span style={{ color: "#EB5757" }}>*</span>
                                    </label>
                                    <br />
                                    <textarea
                                        name="postAddress"
                                        maxLength="5000"
                                        placeholder=""
                                        value={postAddress}
                                        onChange={(e) => setPostAddress(e.target.value)}
                                        style={{
                                            resize: "none",
                                            width: "100%",
                                            height: "150px",
                                            borderRadius: "16px",
                                            backgroundColor: "#F2F3F7",
                                            border: "none",
                                            marginBottom: "16px",
                                            paddingLeft: "24px",
                                            paddingTop: "17px",
                                            paddingRight: "24px",
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
                                            marginBottom: "16px",
                                        }}
                                    >
                                        PHOTO <span style={{ color: "#EB5757" }}>*</span>
                                    </label>
                                    <br />
                                    <div className="d-flex">
                                        <div className="uploader-container">
                                            <div
                                                className="d-flex justify-content-center align-items-center img-uploader"
                                                onClick={(e) => triggerInput1(e)}
                                            >
                                                <input
                                                    style={{
                                                        position: "absolute",
                                                        top: "-9999px",
                                                    }}
                                                    ref={inputRef1}
                                                    type="file"
                                                    onChange={(e) => setImage1(e.target.files[0])}
                                                />
                                                {image1 ? (
                                                    <img
                                                        alt="image1"
                                                        src={URL.createObjectURL(image1)}
                                                        style={{
                                                            width: "180px",
                                                            height: "180px",
                                                            border: 0,
                                                            borderRadius: "16px",
                                                        }}
                                                    />
                                                ) : oldImage1 ? (
                                                    <img
                                                        alt="old-image1"
                                                        src={oldImage1}
                                                        style={{
                                                            width: "180px",
                                                            height: "180px",
                                                            border: 0,
                                                            borderRadius: "16px",
                                                        }}
                                                    />
                                                ) : (
                                                    <img
                                                        alt="upload"
                                                        src="/icons/upload.png"
                                                        width={50}
                                                        height={50}
                                                    />
                                                )}
                                            </div>
                                            <p className="photo-description">* Photo 1</p>
                                            {(image1 || oldImage1) && (
                                                <p
                                                    className="remove"
                                                    onClick={() => {
                                                        setImage1(null);
                                                        setOldImage1(null);
                                                    }}
                                                >
                                                    Remove
                                                </p>
                                            )}
                                        </div>
                                        <div className="uploader-container">
                                            <div
                                                className="d-flex justify-content-center align-items-center img-uploader"
                                                onClick={(e) => triggerInput2(e)}
                                            >
                                                <input
                                                    style={{
                                                        position: "absolute",
                                                        top: "-9999px",
                                                    }}
                                                    ref={inputRef2}
                                                    type="file"
                                                    onChange={(e) => {
                                                        setImage2(e.target.value);
                                                        setOldImage2(e.target.value);
                                                    }}
                                                />
                                                {image2 ? (
                                                    <img
                                                        alt="image2"
                                                        src={URL.createObjectURL(image2)}
                                                        style={{
                                                            width: "180px",
                                                            height: "180px",
                                                            border: 0,
                                                            borderRadius: "16px",
                                                        }}
                                                    />
                                                ) : oldImage2 ? (
                                                    <img
                                                        alt="old-image2"
                                                        src={oldImage2}
                                                        style={{
                                                            width: "180px",
                                                            height: "180px",
                                                            border: 0,
                                                            borderRadius: "16px",
                                                        }}
                                                    />
                                                ) : (
                                                    <img
                                                        alt="upload"
                                                        src="/icons/upload.png"
                                                        width={50}
                                                        height={50}
                                                    />
                                                )}
                                            </div>
                                            <p className="photo-description">Photo 2</p>
                                            {(image2 || oldImage2) && (
                                                <p
                                                    className="remove"
                                                    onClick={() => {
                                                        setImage2(null);
                                                        setOldImage2(null);
                                                    }}
                                                >
                                                    Remove
                                                </p>
                                            )}
                                        </div>
                                        <div className="uploader-container">
                                            <div
                                                className="d-flex justify-content-center align-items-center img-uploader"
                                                onClick={(e) => triggerInput3(e)}
                                            >
                                                <input
                                                    style={{
                                                        position: "absolute",
                                                        top: "-9999px",
                                                    }}
                                                    ref={inputRef3}
                                                    type="file"
                                                    onChange={(e) => {
                                                        setImage3(e.target.files[0]);
                                                        setOldImage3(e.target.files[0]);
                                                    }}
                                                />
                                                {image3 ? (
                                                    <img
                                                        alt="image3"
                                                        src={URL.createObjectURL(image3)}
                                                        style={{
                                                            width: "180px",
                                                            height: "180px",
                                                            border: 0,
                                                            borderRadius: "16px",
                                                        }}
                                                    />
                                                ) : oldImage3 ? (
                                                    <img
                                                        alt="old-image3"
                                                        src={oldImage3}
                                                        style={{
                                                            width: "180px",
                                                            height: "180px",
                                                            border: 0,
                                                            borderRadius: "16px",
                                                        }}
                                                    />
                                                ) : (
                                                    <img
                                                        alt="upload"
                                                        src="/icons/upload.png"
                                                        width={50}
                                                        height={50}
                                                    />
                                                )}
                                            </div>
                                            <p className="photo-description">Photo 3</p>
                                            {(image3 || oldImage3) && (
                                                <p
                                                    className="remove"
                                                    onClick={() => {
                                                        setImage3(null);
                                                        setOldImage3(null);
                                                    }}
                                                >
                                                    Remove
                                                </p>
                                            )}
                                        </div>
                                        <div className="uploader-container">
                                            <div
                                                className="d-flex justify-content-center align-items-center img-uploader"
                                                onClick={(e) => triggerInput4(e)}
                                            >
                                                <input
                                                    style={{
                                                        position: "absolute",
                                                        top: "-9999px",
                                                    }}
                                                    ref={inputRef4}
                                                    type="file"
                                                    onChange={(e) => {
                                                        setImage4(e.target.files[0]);
                                                        setOldImage4(e.target.files[0]);
                                                    }}
                                                />
                                                {image4 ? (
                                                    <img
                                                        alt="image4"
                                                        src={URL.createObjectURL(image4)}
                                                        style={{
                                                            width: "180px",
                                                            height: "180px",
                                                            border: 0,
                                                            borderRadius: "16px",
                                                        }}
                                                    />
                                                ) : oldImage4 ? (
                                                    <img
                                                        alt="old-image4"
                                                        src={oldImage4}
                                                        style={{
                                                            width: "180px",
                                                            height: "180px",
                                                            border: 0,
                                                            borderRadius: "16px",
                                                        }}
                                                    />
                                                ) : (
                                                    <img
                                                        alt="upload"
                                                        src="/icons/upload.png"
                                                        width={50}
                                                        height={50}
                                                    />
                                                )}
                                            </div>
                                            <p className="photo-description">Photo 4</p>
                                            {(image4 || oldImage4) && (
                                                <p
                                                    className="remove"
                                                    onClick={() => {
                                                        setImage4(null);
                                                        setOldImage4(null);
                                                    }}
                                                >
                                                    Remove
                                                </p>
                                            )}
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
                                            marginBottom: "16px",
                                        }}
                                    >
                                        LOCATION <span style={{ color: "#EB5757" }}>* </span>
                                        <img
                                            alt="tooltip"
                                            data-tip="React-tooltip"
                                            data-for="location"
                                            src="/icons/tooltip.png"
                                            width={12}
                                            height={12}
                                        />
                                        <Tooltip id="location" place="right" effect="solid">
                                            Donor will donate to this address. Click on map to
                                            locate
                                        </Tooltip>
                                    </label>
                                    <div style={{ borderRadius: "16px", overflow: "hidden" }}>
                                        <LoadScript
                                            googleMapsApiKey={
                                                process.env.REACT_APP_GOOGLE_MAPS_API_KEY
                                            }
                                        >
                                            <GoogleMap
                                                onClick={(e) => setLocation(e.latLng.toJSON())}
                                                mapContainerStyle={{
                                                    width: "100%",
                                                    height: "300px",
                                                }}
                                                center={
                                                    location || {
                                                        lat: 13.7563,
                                                        lng: 100.5018,
                                                    }
                                                }
                                                options={{
                                                    streetViewControl: false,
                                                    mapTypeControl: false,
                                                    // draggableCursor: "default",
                                                    // draggingCursor: "move"
                                                }}
                                                zoom={10}
                                            >
                                                <Marker position={location} />
                                            </GoogleMap>
                                        </LoadScript>
                                    </div>
                                </form>
                                <div style={{ paddingRight: "29px" }}>
                                    {name &&
                                    detail &&
                                    postAddress &&
                                    (image1 || oldImage1) &&
                                    location ? (
                                        <div
                                            className="d-flex justify-content-center align-items-center"
                                            onClick={() => togglePage(1)}
                                            style={{
                                                width: "177px",
                                                height: "48px",
                                                background: "#007AE9",
                                                borderRadius: "8px",
                                                textDecoration: "none",
                                                float: "right",
                                                color: "white",
                                                fontFamily: "Open Sans",
                                                fontStyle: "normal",
                                                fontWeight: "400",
                                                fontSize: "16px",
                                                lineHeight: "18px",
                                                cursor: "pointer",
                                            }}
                                        >
                                            Next
                                        </div>
                                    ) : (
                                        <div
                                            className="d-flex justify-content-center align-items-center"
                                            style={{
                                                width: "177px",
                                                height: "48px",
                                                background: "#007AE9",
                                                borderRadius: "8px",
                                                textDecoration: "none",
                                                float: "right",
                                                opacity: "0.3",
                                                color: "white",
                                                fontFamily: "Open Sans",
                                                fontStyle: "normal",
                                                fontWeight: "400",
                                                fontSize: "16px",
                                                lineHeight: "18px",
                                                cursor: "pointer",
                                            }}
                                        >
                                            Next
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            // .............................. PAGE 2 ..............................

                            <div style={{ height: "100%" }}>
                                <form
                                    style={{
                                        height: "85%",
                                        marginBottom: "40px",
                                        overflowY: "scroll",
                                        paddingRight: "15px",
                                    }}
                                >
                                    <label
                                        style={{
                                            fontFamily: "Open Sans",
                                            fontSize: "12px",
                                            fontStyle: "normal",
                                            fontWeight: "400",
                                            lineHeight: "17px",
                                            color: "#2B2B2B",
                                            letterSpacing: "1px",
                                            marginBottom: "16px",
                                        }}
                                    >
                                        WHAT WE WANT <span style={{ color: "#EB5757" }}>* </span>
                                        <img
                                            alt="tooltip"
                                            data-tip="React-tooltip"
                                            data-for="whatWeWant"
                                            src="/icons/tooltip.png"
                                            width={12}
                                            height={12}
                                        />
                                        <Tooltip id="whatWeWant" place="right" effect="solid">
                                            Pick the materials which this campaign want
                                        </Tooltip>
                                    </label>
                                    <br />
                                    <Multiselect
                                        className="select-material"
                                        showArrow
                                        options={option}
                                        displayValue="name"
                                        placeholder=""
                                        showCheckbox={true}
                                        selectedValues={selectedMaterialArray}
                                        onSelect={onSelectMaterial}
                                        onRemove={onRemoveMaterial}
                                        closeOnSelect={false}
                                        style={multiselectStyle}
                                        closeIcon="cancel"
                                        avoidHighlightFirstOption={true}
                                    />
                                    <div style={{ marginTop: "18px", marginBottom: "16px" }}>
                                        <div
                                            onClick={() => toggleModal()}
                                            style={{
                                                fontFamily: " Open Sans",
                                                fontStyle: "normal",
                                                fontWeight: "normal",
                                                fontSize: "14px",
                                                lineHeight: "19px",
                                                color: "#007AE9",
                                                cursor: "pointer",
                                            }}
                                        >
                                            + Request for new material type
                                        </div>
                                    </div>
                                    <label
                                        style={{
                                            fontFamily: "Open Sans",
                                            fontSize: "12px",
                                            fontStyle: "normal",
                                            fontWeight: "400",
                                            lineHeight: "17px",
                                            color: "#2B2B2B",
                                            letterSpacing: "1px",
                                            marginBottom: "16px",
                                        }}
                                    >
                                        DUE DATE
                                        <span> </span>
                                        <img
                                            alt="tool-tip"
                                            data-tip="React-tooltip"
                                            data-for="dueDate"
                                            src="/icons/tooltip.png"
                                            width={12}
                                            height={12}
                                        />
                                        <Tooltip id="dueDate" place="right" effect="solid">
                                            (Optional) Your status will automatically change to
                                            Unavailable after the due date.
                                        </Tooltip>
                                    </label>
                                    <br />
                                    <input
                                        type="date"
                                        name="duedate"
                                        value={dueDate}
                                        onChange={(e) => setDueDate(e.target.value)}
                                        style={{
                                            width: "100%",
                                            height: "56px",
                                            borderRadius: "16px",
                                            backgroundColor: "#F2F3F7",
                                            border: "none",
                                            marginBottom: "16px",
                                            paddingLeft: "24px",
                                            paddingRight: "24px",
                                            fontFamily: "Open Sans",
                                            fontSize: "14px",
                                            fontWeight: "400",
                                            lineHeight: "19px",
                                            letterSpacing: "0em",
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
                                            marginBottom: "16px",
                                        }}
                                    >
                                        STATUS <span style={{ color: "#EB5757" }}>* </span>
                                        <img
                                            alt="tooltip"
                                            data-tip="React-tooltip"
                                            data-for="status"
                                            src="/icons/tooltip.png"
                                            width={12}
                                            height={12}
                                        />
                                        <Tooltip id="status" place="right" effect="solid">
                                            Available: Open for donation. <br />
                                            Unavailable: Close for donation. <br />
                                            Hidden: Others won’t be able to view your campaign.
                                        </Tooltip>
                                    </label>
                                    <br />
                                    <Multiselect
                                        singleSelect
                                        className="select-status"
                                        showArrow
                                        options={[
                                            { name: "Available", id: 1 },
                                            { name: "Not available", id: 2 },
                                            { name: "Hidden", id: 3 },
                                        ]}
                                        displayValue="name"
                                        placeholder=""
                                        selectedValues={selectedStatusArray}
                                        onSelect={onSelectStatus}
                                        avoidHighlightFirstOption={true}
                                        style={selectStatusStyle}
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
                                            marginBottom: "16px",
                                        }}
                                    >
                                        HOW TO SEND
                                        <span> </span>
                                        <img
                                            alt="tool-tip"
                                            data-tip="React-tooltip"
                                            data-for="howToSend"
                                            src="/icons/tooltip.png"
                                            width={12}
                                            height={12}
                                        />
                                        <Tooltip id="howToSend" place="right" effect="solid">
                                            (Optional) Provide more preparing details before
                                            donating.
                                        </Tooltip>
                                    </label>
                                    <textarea
                                        name="preparing"
                                        maxLength="5000"
                                        placeholder=""
                                        value={preparing}
                                        onChange={(e) => setPreparing(e.target.value)}
                                        style={{
                                            resize: "none",
                                            width: "100%",
                                            height: "150px",
                                            borderRadius: "16px",
                                            backgroundColor: "#F2F3F7",
                                            border: "none",
                                            marginBottom: "16px",
                                            paddingLeft: "24px",
                                            paddingTop: "17px",
                                            paddingRight: "24px",
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
                                            marginBottom: "16px",
                                        }}
                                    >
                                        SHIPPING SERVICE
                                        <span> </span>
                                        <img
                                            alt="tool-tip"
                                            data-tip="React-tooltip"
                                            data-for="shippingService"
                                            src="/icons/tooltip.png"
                                            width={12}
                                            height={12}
                                        />
                                        <Tooltip id="shippingService" place="right" effect="solid">
                                            (Optional) If there is any promotional shipping service.
                                        </Tooltip>
                                    </label>
                                    <br />
                                    <textarea
                                        name="shippingService"
                                        maxLength="5000"
                                        placeholder=""
                                        value={shippingService}
                                        onChange={(e) => setShippingService(e.target.value)}
                                        style={{
                                            resize: "none",
                                            width: "100%",
                                            height: "150px",
                                            borderRadius: "16px",
                                            backgroundColor: "#F2F3F7",
                                            border: "none",
                                            marginBottom: "16px",
                                            paddingLeft: "24px",
                                            paddingTop: "17px",
                                            paddingRight: "24px",
                                        }}
                                    />
                                    <br />
                                </form>
                                <div style={{ paddingRight: "29px" }}>
                                    {name &&
                                    detail &&
                                    postAddress &&
                                    (image1 || oldImage1) &&
                                    location &&
                                    // TODO: Replace this condition with is not empty
                                    // material !== [] &&
                                    status ? (
                                        <div
                                            className="d-flex justify-content-center align-items-center"
                                            onClick={
                                                id ? () => updateProject() : () => createProject()
                                            }
                                            style={{
                                                width: "177px",
                                                height: "48px",
                                                background: "#007AE9",
                                                borderRadius: "8px",
                                                textDecoration: "none",
                                                float: "right",
                                                color: "white",
                                                fontFamily: "Open Sans",
                                                fontStyle: "normal",
                                                fontWeight: "400",
                                                fontSize: "16px",
                                                lineHeight: "18px",
                                                cursor: "pointer",
                                            }}
                                        >
                                            {id ? "Update" : "Publish"}
                                        </div>
                                    ) : (
                                        <div
                                            className="d-flex justify-content-center align-items-center"
                                            style={{
                                                width: "177px",
                                                height: "48px",
                                                background: "#007AE9",
                                                borderRadius: "8px",
                                                textDecoration: "none",
                                                float: "right",
                                                opacity: "0.3",
                                                color: "white",
                                                fontFamily: "Open Sans",
                                                fontStyle: "normal",
                                                fontWeight: "400",
                                                fontSize: "16px",
                                                lineHeight: "18px",
                                                cursor: "pointer",
                                            }}
                                        >
                                            {id ? "Update" : "Publish"}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <Footer />
                {modal ? (
                    <div
                        style={{
                            position: "fixed",
                            width: "100%",
                            height: "100%",
                            zIndex: "5",
                            top: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <div
                            onClick={() => toggleModal()}
                            style={{
                                width: "100%",
                                height: "100%",
                                backgroundColor: "rgba(0,0,0,0.3)",
                            }}
                        />
                        <div
                            style={{
                                width: "440px",
                                height: "310px",
                                backgroundColor: "white",
                                position: "absolute",
                                boxShadow:
                                    "0px 4px 24px rgba(13, 53, 89, 0.03), 0px 4px 6px rgba(15, 81, 140, 0.06)",
                                borderRadius: "16px",
                                padding: "32px",
                            }}
                        >
                            <p
                                style={{
                                    fontFamily: "Open Sans",
                                    fontSize: "20px",
                                    fontStyle: "normal",
                                    fontWeight: "700",
                                    lineHeight: "40px",
                                    marginBottom: "16px",
                                }}
                            >
                                Material request
                            </p>
                            <input
                                type="text"
                                name="requestMaterial"
                                value={reqMaterial}
                                placeholder="Material name"
                                onChange={(e) => setReqMaterial(e.target.value)}
                                style={{
                                    width: "100%",
                                    height: "56px",
                                    borderRadius: "16px",
                                    backgroundColor: "#F2F3F7",
                                    border: "none",
                                    marginBottom: "16px",
                                    paddingLeft: "24px",
                                    paddingRight: "24px",
                                    fontFamily: "Open Sans",
                                    fontSize: "14px",
                                    fontWeight: "400",
                                    lineHeight: "19px",
                                    letterSpacing: "0em",
                                }}
                            />
                            <ul className="modal-ul">
                                <li className="modal-li">
                                    After our review, we will notify you of the result.
                                </li>
                                <li className="modal-li">
                                    You can either continue the process of adding current materials
                                    list or wait for the material to be approved.
                                </li>
                            </ul>
                            <div style={{ width: "100%", display: "flex" }}>
                                <div
                                    onClick={() => toggleModal()}
                                    className="d-flex justify-content-center align-items-center"
                                    style={{
                                        width: "174px",
                                        height: "48px",
                                        background: "#F2F3F7",
                                        borderRadius: "8px",
                                        textDecoration: "none",
                                        float: "right",
                                        color: "#6E798C",
                                        fontFamily: "Open Sans",
                                        fontStyle: "normal",
                                        fontWeight: "400",
                                        fontSize: "14px",
                                        lineHeight: "18px",
                                        margin: "0 auto",
                                        cursor: "pointer",
                                    }}
                                >
                                    Cancel
                                </div>
                                <div
                                    onClick={() => requestMaterial()}
                                    className="d-flex justify-content-center align-items-center"
                                    style={{
                                        width: "174px",
                                        height: "48px",
                                        background: "#007AE9",
                                        borderRadius: "8px",
                                        textDecoration: "none",
                                        float: "right",
                                        color: "white",
                                        fontFamily: "Open Sans",
                                        fontStyle: "normal",
                                        fontWeight: "400",
                                        fontSize: "14px",
                                        lineHeight: "18px",
                                        margin: "0 auto",
                                        cursor: "pointer",
                                    }}
                                >
                                    Send
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div />
                )}
                {loading ? (
                    <div
                        className="d-flex justify-content-center align-items-center"
                        style={{
                            height: "100vh",
                            width: "100vw",
                            backgroundColor: "rgba(0,0,0,0.4)",
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
                {success ? (
                    <div
                        style={{
                            position: "fixed",
                            width: "100%",
                            height: "100%",
                            zIndex: "5",
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
                            }}
                        />
                        <div
                            style={{
                                width: "440px",
                                backgroundColor: "white",
                                position: "absolute",
                                boxShadow:
                                    "0px 4px 24px rgba(13, 53, 89, 0.03), 0px 4px 6px rgba(15, 81, 140, 0.06)",
                                borderRadius: "16px",
                                padding: "32px",
                            }}
                        >
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
                                Congratulation!
                            </p>
                            <p className="modal-li" style={{ marginBottom: "30px" }}>
                                Your project has been {id ? "updated" : "created"}. You can view
                                this project now or go back to your home page.
                            </p>
                            <div style={{ width: "100%", display: "flex" }}>
                                <Link to="/contHome">
                                    <div
                                        onClick={() => toggleModal()}
                                        className="d-flex justify-content-center align-items-center"
                                        style={{
                                            width: "174px",
                                            height: "48px",
                                            background: "#F2F3F7",
                                            borderRadius: "8px",
                                            textDecoration: "none",
                                            float: "right",
                                            color: "#6E798C",
                                            fontFamily: "Open Sans",
                                            fontStyle: "normal",
                                            fontWeight: "400",
                                            fontSize: "14px",
                                            lineHeight: "18px",
                                            margin: "0 auto",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Go back to home page
                                    </div>
                                </Link>
                                <Link
                                    to="/projectDetail"
                                    state={{
                                        id: projectId,
                                        show: alertText,
                                    }}
                                >
                                    <div
                                        className="d-flex justify-content-center align-items-center"
                                        style={{
                                            width: "174px",
                                            height: "48px",
                                            background: "#007AE9",
                                            borderRadius: "8px",
                                            textDecoration: "none",
                                            float: "right",
                                            color: "white",
                                            fontFamily: "Open Sans",
                                            fontStyle: "normal",
                                            fontWeight: "400",
                                            fontSize: "14px",
                                            lineHeight: "18px",
                                            margin: "0 auto",
                                            cursor: "pointer",
                                        }}
                                    >
                                        View this project
                                    </div>
                                </Link>
                            </div>
                        </div>
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
                    .photo-description {
                        font-family: Open Sans;
                        font-size: 14px;
                        line-height: 19px;
                        color: #858585;
                        opacity: 50%;
                        text-align: center;
                        margin-bottom: 0;
                        margin-top: 17px;
                    }
                    .multiselect-container:focus-within {
                        border: 1px solid #007ae9;
                    }
                    .optionListContainer {
                        backgroun-color: none !important;
                        border-radius: 16px !important;
                        margin-top: 18px !important;
                    }
                    .modal-ul {
                        padding-left: 15px;
                        margin-bottom: 24px;
                    }
                    .modal-li {
                        font-family: Open Sans;
                        font-size: 12px;
                        font-style: normal;
                        font-weight: 400;
                        line-height: 18px;
                        letter-spacing: 0em;
                        text-align: left;
                        color: rgba(0, 0, 0, 0.5);
                    }
                    .remove {
                        font-family: Open Sans;
                        font-size: 14px;
                        text-align: center;
                        color: #007ae9;
                        cursor: pointer;
                        margin-top: 10;
                    }
                `}</style>
        </div>
    );
};

export default AddProject;
