import React from "react";

const AboutRequirement = ({ data, onChange, errors }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        onChange({
            ...data,
            [name]: value,
        });
    };

    return (
        <div className="component-container">
            <h2 className="font-bold mb-2">2. About the Requirement</h2>
            {/* <p className="section-description">
        Provide details about your project requirements that vendors need to understand.
      </p> */}

            <div className="form-group mt-3">
                <label htmlFor="projectName">
                    Project name <span className="required">*</span>
                </label>
                <input
                    type="text"
                    id="projectName"
                    name="projectName"
                    className={`form-control ${
                        errors.projectName ? "error" : ""
                    }`}
                    value={data.projectName || ""}
                    onChange={handleChange}
                    placeholder="e.g., Office Network Upgrade Project"
                />
                {errors.projectName && (
                    <div className="error-message">{errors.projectName}</div>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="purpose">
                    Purpose <span className="required">*</span>
                </label>
                <textarea
                    id="purpose"
                    name="purpose"
                    className={`form-control ${errors.purpose ? "error" : ""}`}
                    value={data.purpose || ""}
                    onChange={handleChange}
                    placeholder="e.g., Upgrading existing network infrastructure to support remote work capabilities"
                    rows={4}
                />
                {errors.purpose && (
                    <div className="error-message">{errors.purpose}</div>
                )}
            </div>

            {/* <div className="preview-output">
                <h4>Preview:</h4>
                <div className="preview-text">
                    {data.companyName && data.projectName && data.purpose && (
                        <p>
                            <strong>{data.companyName}</strong> is working{" "}
                            <strong>{data.projectName}</strong> for the purpose
                            of <strong>{data.purpose}</strong>. As per the{" "}
                            <strong>{data.projectName}</strong> requirement, we
                            are inviting the vendor to quote for the same with
                            best matching the requirement. We have listed the
                            requirement in the document and the vendor is
                            expected to quote for items and also mentioned the
                            deviations the changes if any.
                        </p>
                    )}
                </div>
            </div> */}

            <div className="btn-group">
                <button
                    className="next-btn"
                    onClick={() =>
                        document
                            .querySelector(".sidebar-nav li:nth-child(1)")
                            .click()
                    }
                >
                    Previous: Company Introduction
                </button>
                <button
                    className="next-btn"
                    onClick={() =>
                        document
                            .querySelector(".sidebar-nav li:nth-child(3)")
                            .click()
                    }
                >
                    Next: Scope of Work
                </button>
            </div>
        </div>
    );
};

export default AboutRequirement;
