import React from "react";

const EvaluationCriteria = ({ data, onChange, errors }) => {
    const criteriaOptions = [
        { id: "oem", label: "OEM Only" },
        { id: "distributor", label: "Authorized distributor" },
        { id: "businessValue", label: "Comparable business value" },
        { id: "location", label: "Specific location" },
        { id: "delivery", label: "Earliest delivery" },
        { id: "iso", label: "ISO certified" },
        { id: "gst", label: "GST registered only" },
        {
            id: "weightedScore",
            label: "Weighted Score (Quality, Cost, Delivery, Technical expertise, etc.)",
        },
        { id: "serviceExp", label: "Service experience" },
        { id: "turnover", label: "Turnover" },
    ];

    const handleCriteriaChange = (e) => {
        const { value, checked } = e.target;

        if (checked) {
            onChange([...data, value]);
        } else {
            onChange(data.filter((item) => item !== value));
        }
    };

    return (
        <div className="component-container">
            <h2 className="font-bold mb-2">5. Evaluation Criteria</h2>
            <div className="card ">
                <div className="card-header font-medium mb-3">
                    <h4>Select Evaluation Criteria</h4>
                </div>
                <div className="card-body">
                    <div className="criteria-grid">
                        {criteriaOptions.map((option) => (
                            <div className="checkbox-group" key={option.id}>
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        value={option.label}
                                        checked={data.includes(option.label)}
                                        onChange={handleCriteriaChange}
                                    />
                                    {option.label}
                                </label>
                            </div>
                        ))}
                    </div>

                    {errors.evaluationCriteria && (
                        <div className="error-message mt-3">
                            {errors.evaluationCriteria}
                        </div>
                    )}

                    <div className="selected-criteria mt-4">
                        <h5 className="font-medium">Selected Criteria:</h5>
                        {data.length === 0 ? (
                            <p className="text-muted">
                                No criteria selected yet
                            </p>
                        ) : (
                            <ul className="list-group">
                                {data.map((criteria, index) => (
                                    <li
                                        className="list-group-item d-flex justify-content-between align-items-center"
                                        key={index}
                                    >
                                        {criteria}
                                        <button
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() =>
                                                onChange(
                                                    data.filter(
                                                        (_, i) => i !== index
                                                    )
                                                )
                                            }
                                        >
                                            <i className="fas fa-times"></i>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>

            <div className="info-box mt-4">
                <div className="info-icon">
                    <i className="fas fa-info-circle"></i>
                </div>
                {/* <div className="info-content">
          <h5>Why evaluation criteria matter</h5>
          <p>Well-defined evaluation criteria help ensure that you select the best vendor for your needs. They provide a structured framework for comparing different proposals and making an objective decision.</p>
        </div> */}
            </div>

            <div className="btn-group">
                <button
                    className="next-btn"
                    onClick={() =>
                        document
                            .querySelector(".sidebar-nav li:nth-child(4)")
                            .click()
                    }
                >
                    Previous: BOQ/BOM
                </button>
                <button
                    className="next-btn"
                    onClick={() =>
                        document
                            .querySelector(".sidebar-nav li:nth-child(6)")
                            .click()
                    }
                >
                    Next: Financials
                </button>
            </div>
        </div>
    );
};

export default EvaluationCriteria;
