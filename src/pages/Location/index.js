import React, { useEffect, useState } from "react";
import axios from "axios";
import LinesEllipsis from "react-lines-ellipsis";
import ReactLoading from "react-loading";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { Link } from "react-router-dom";

import Navbar from "components/Navbar";
import Layout from "components/Layout";

const Location = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [currentPosition, setCurrentPosition] = useState(null);
    const [allProject, setAllProject] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            await axios.get(`http://localhost:3003/contributor/allProject`).then((res) => {
                const filterProject = res.data.filter((project) => {
                    return project.status !== "Hidden";
                });
                setAllProject(filterProject);
            });

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    setCurrentPosition(pos);
                });
            }
            setIsLoading(false);
        };

        fetchData();
    }, []);

    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: "AIzaSyAwCKypKnxGHWLG0tPV33iFUrD5cYx5SF0",
    });

    return (
        <div style={{ maxWidth: "100vw", overflowX: "hidden" }}>
            <Layout title="GreenCycle: A community-base forwarding system">
                {allProject ? (
                    <div>
                        <Navbar />
                        <div style={{ display: "flex" }}>
                            <div
                                style={{
                                    width: "25vw",
                                    height: "100vh",
                                    backgroundColor: "white",
                                    zIndex: 4,
                                    paddingTop: "80px",
                                }}
                            >
                                {selectedProject ? (
                                    <div
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            overflow: "scroll",
                                        }}
                                    >
                                        <img
                                            alt="image1"
                                            src={selectedProject.image1}
                                            style={{
                                                width: "100%",
                                                height: "270px",
                                                border: 0,
                                                objectFit: "cover",
                                            }}
                                        />
                                        <p
                                            className="project-name"
                                            style={{ marginTop: "16px", marginLeft: "26px" }}
                                        >
                                            {selectedProject.name}
                                        </p>
                                        <hr style={{ marginBottom: "26px" }} />
                                        <div
                                            style={{
                                                paddingLeft: "26px",
                                                paddingRight: "26px",
                                                display: "flex",
                                                marginBottom: "10px",
                                            }}
                                        >
                                            <img
                                                alt="tooltip"
                                                src="/icons/tooltip.png"
                                                style={{ width: "20px", height: "20px" }}
                                            />
                                            <div className="detail">
                                                <LinesEllipsis
                                                    text={selectedProject.projectDetail}
                                                    maxLine="1"
                                                    ellipsis="..."
                                                    trimRight
                                                    basedOn="letters"
                                                />
                                            </div>
                                        </div>
                                        <div
                                            style={{
                                                paddingLeft: "26px",
                                                paddingRight: "26px",
                                                display: "flex",
                                                marginBottom: "40px",
                                            }}
                                        >
                                            <img
                                                alt="location"
                                                src="/icons/location.png"
                                                style={{ width: "20px", height: "20px" }}
                                            />
                                            <span className="detail">
                                                {selectedProject.address}
                                            </span>
                                        </div>
                                        <div
                                            className="d-flex justify-content-center align-items-center"
                                            style={{ marginBottom: "15px" }}
                                        >
                                            <Link
                                                to="/projectDetail"
                                                state={{
                                                    id: selectedProject.id,
                                                }}
                                            >
                                                <div
                                                    className="d-flex justify-content-center align-items-center"
                                                    style={{
                                                        width: "130px",
                                                        height: "29px",
                                                        background: "white",
                                                        borderRadius: "20px",
                                                        textDecoration: "none",
                                                        border: "1px solid #007AE9",
                                                        cursor: "pointer",
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            color: "#007AE9",
                                                            fontFamily: "Open Sans",
                                                            fontStyle: "normal",
                                                            fontWeight: "400",
                                                            fontSize: "14px",
                                                        }}
                                                    >
                                                        Read more
                                                    </span>
                                                    <img
                                                        alt="arrow-right"
                                                        src="/icons/arrow_next.svg"
                                                        style={{
                                                            width: "15px",
                                                            height: "15px",
                                                            marginLeft: "5px",
                                                            filter: "invert(44%) sepia(56%) saturate(7318%) hue-rotate(194deg) brightness(97%) contrast(100%)",
                                                        }}
                                                    />
                                                </div>
                                            </Link>
                                        </div>
                                        <hr style={{ marginTop: "20px" }} />
                                    </div>
                                ) : (
                                    <div
                                        className="d-flex align-items-center"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            overflow: "scroll",
                                            padding: "0 40px",
                                        }}
                                    >
                                        <div style={{ width: "100%", textAlign: "center" }}>
                                            <p className="no-result">
                                                Please select a location marker on the map to show
                                                the detail.
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div style={{ width: "75vw" }}>
                                {isLoaded && !isLoading && (
                                    <GoogleMap
                                        mapContainerStyle={{ width: "80vw", height: "100vh" }}
                                        center={
                                            currentPosition || {
                                                lat: 13.7563,
                                                lng: 100.5018,
                                            }
                                        }
                                        zoom={10}
                                        options={{
                                            streetViewControl: false,
                                            mapTypeControl: false,
                                        }}
                                        defaultStreetView={false}
                                    >
                                        {allProject.map((project, index) => {
                                            return (
                                                <Marker
                                                    key={`project-${index}`}
                                                    position={project.location}
                                                    onClick={() => setSelectedProject(project)}
                                                    style={{ border: "1px solid red" }}
                                                />
                                            );
                                        })}
                                    </GoogleMap>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
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
                )}
            </Layout>
            <style>{`
                    .detail {
                        margin-left: 20px;
                        font-family: Open Sans;
                        font-size: 15px;
                        font-weight: 400;
                        font-style: normal;
                        opacity: 0.7;
                    }
                    .project-name {
                        font-family: Open Sans;
                        font-size: 18px;
                        font-style: normal;
                        font-weight: 600;
                        line-height: 25px;
                    }
                    .no-result {
                        margin-left: 20px;
                        font-family: Open Sans;
                        font-size: 15px;
                        font-weight: 400;
                        font-style: normal;
                        opacity: 0.7;
                    }
                `}</style>
        </div>
    );
};

export default Location;
