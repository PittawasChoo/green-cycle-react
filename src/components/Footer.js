import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => (
    <div>
        <div
            style={{
                width: "100%",
            }}
        />
        <div
            className="d-flex justify-content-center align-items-center"
            style={{ width: "100%", height: "60px", backgroundColor: "#2B2B2B", color: "white" }}
        >
            <p
                className="col d-flex justify-content-center align-items-center "
                style={{
                    fontFamily: "Open Sans",
                    fontSize: "10px",
                    fontStyle: "normal",
                    fontWeight: "400",
                    lineHeight: "24px",
                    paddingTop: "12px",
                    alignItems: "center",
                }}
            >
                &copy; Copyright 2020 GreenCycle
            </p>
        </div>
    </div>
);

export default Footer;
