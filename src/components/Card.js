import React from "react";
import LinesEllipsis from "react-lines-ellipsis";
import { Link } from "react-router-dom";

import { capitalize } from "modules/capitalize";

import "bootstrap/dist/css/bootstrap.min.css";

const Card = (props) => {
    return (
        <div>
            <Link to={props.path} state={{ id: props.id }}>
                <div
                    style={{
                        float: "",
                        marginBottom: "32px",
                        marginTop: "0px",
                        marginRight: "32px",
                    }}
                >
                    <div
                        className="card"
                        style={{
                            margin: "",
                            borderRadius: "16px",
                            border: 0,
                            filter: "drop-shadow(0px 24px 64px rgba(0, 0, 0, 0.06))",
                            paddingBottom: "16px",
                            width: "280px",
                            height: "330px",
                            cursor: "pointer",
                            // display: "inline-block",
                            flexDirection: "",
                        }}
                    >
                        <img
                            alt="preview-image"
                            className="card-img-top"
                            src={props.image1}
                            title="card image"
                            style={{
                                width: "280px",
                                height: "200px",
                            }}
                        />
                        <div
                            className="card-body d-flex"
                            style={{ flexFlow: "column", padding: 0 }}
                        >
                            <div style={{ height: 42, overflow: "hidden" }}>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        flexWrap: "wrap",
                                        alignContent: "flex-start",
                                        //gridTemplateColumns: "auto auto auto auto",
                                        padding: "4px 24px 8px 24px",
                                        width: "auto",
                                        height: "auto",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {props.categories.map((category, index) => {
                                        return (
                                            <div
                                                key={`${category}${index}`}
                                                className="d-flex justify-content-center align-items-center"
                                                style={{
                                                    border: "1px solid #007AE9",
                                                    borderRadius: "8px",
                                                    width: "auto",
                                                    height: "20px",
                                                    fontFamily: "Open Sans",
                                                    fontSize: "11px",
                                                    fontWeight: "600",
                                                    lineHeight: "15px",
                                                    color: "#007AE9",
                                                    margin: "12px 8px 0px 0px",
                                                    padding: "8px 8px 8px 8px",
                                                    //whiteSpace: "nowrap",
                                                    //overflow: "auto",
                                                    //textOverflow: "ellipsis"
                                                }}
                                            >
                                                {capitalize(category)}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <p
                                className="card-title"
                                width={350}
                                style={{
                                    fontFamily: "Poppins",
                                    fontWeight: "600",
                                    fontSize: "14px",
                                    lineHeight: "25px",
                                    color: "081F32",
                                    padding: "12px 24px 4px 24px",
                                    marginBottom: 0,
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                }}
                            >
                                {props.name}
                            </p>
                            <div
                                className="card-text"
                                style={{
                                    color: "#374A59",
                                    fontWeight: 400,
                                    fontFamily: "Open Sans",
                                    fontSize: "13px",
                                    lineHeight: "19px",
                                    padding: "0 24px 0 24px",
                                }}
                            >
                                <LinesEllipsis
                                    text={props.detail}
                                    maxLine="1"
                                    ellipsis="..."
                                    trimRight
                                    basedOn="letters"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
            <style>{`
                .card-img-top {
                    border-top-left-radius: 16px;
                    border-top-right-radius: 16px;
                }
            `}</style>
        </div>
    );
};

export default Card;
