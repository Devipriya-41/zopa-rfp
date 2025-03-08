import React from "react";

const RFPDates = ({ data, onChange, errors }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        onChange({
            ...data,
            [name]: value,
        });
    };

    // Calculate minimum date (today's date)
    const today = new Date().toISOString().split("T")[0];

    return (
        <div className="component-container">
            <h2>12. RFP Dates</h2>
            {/* <p className="section-description">
        Set the start and end dates for your RFP. The quote link will be valid for vendors only until the end date.
      </p>
       */}
            <div className="alert alert-info text-red-500 mb-2">
                <i className="fas fa-info-circle "></i> Quote link will be valid
                for vendors only until the end date.
            </div>

            <div className="card">
                {/* <div className="card-header">
                    <h4>RFP Timeline</h4>
                </div> */}
                <div className="card-body">
                    <div className="form-group">
                        <label htmlFor="startDate">
                            RFP Start Date <span className="required">*</span>
                        </label>
                        <input
                            type="date"
                            id="startDate"
                            name="startDate"
                            className={`form-control ${
                                errors.startDate ? "error" : ""
                            }`}
                            value={data.startDate || today}
                            onChange={handleChange}
                            min={today}
                        />
                        {errors.startDate && (
                            <div className="error-message">
                                {errors.startDate}
                            </div>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="endDate">
                            RFP End Date <span className="required">*</span>
                        </label>
                        <input
                            type="date"
                            id="endDate"
                            name="endDate"
                            className={`form-control ${
                                errors.endDate ? "error" : ""
                            }`}
                            value={data.endDate || ""}
                            onChange={handleChange}
                            min={data.startDate || today}
                        />
                        {errors.endDate && (
                            <div className="error-message">
                                {errors.endDate}
                            </div>
                        )}
                    </div>

                    {data.evaluationEnabled && (
                        <>
                            <div className="form-group">
                                <label htmlFor="evaluationStartDate">
                                    Evaluation Start Date
                                </label>
                                <input
                                    type="date"
                                    id="evaluationStartDate"
                                    name="evaluationStartDate"
                                    className="form-control"
                                    value={data.evaluationStartDate || ""}
                                    onChange={handleChange}
                                    min={
                                        data.endDate || data.startDate || today
                                    }
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="evaluationEndDate">
                                    Evaluation End Date
                                </label>
                                <input
                                    type="date"
                                    id="evaluationEndDate"
                                    name="evaluationEndDate"
                                    className="form-control"
                                    value={data.evaluationEndDate || ""}
                                    onChange={handleChange}
                                    min={
                                        data.evaluationStartDate ||
                                        data.endDate ||
                                        data.startDate ||
                                        today
                                    }
                                />
                            </div>
                        </>
                    )}

                    <div className="form-check mt-3">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="evaluationEnabled"
                            name="evaluationEnabled"
                            checked={data.evaluationEnabled || false}
                            onChange={(e) =>
                                onChange({
                                    ...data,
                                    evaluationEnabled: e.target.checked,
                                })
                            }
                        />
                        <label
                            className="form-check-label"
                            htmlFor="evaluationEnabled"
                        >
                            Enable evaluation period
                        </label>
                    </div>
                </div>
            </div>

            {/* Preview of dates in timeline format */}
            {(data.startDate || data.endDate) && (
                <div className="timeline-preview mt-4">
                    <h4>Timeline Preview</h4>
                    <div className="timeline">
                        {data.startDate && (
                            <div className="timeline-item">
                                <div className="timeline-point"></div>
                                <div className="timeline-content">
                                    <h5>RFP Start</h5>
                                    <p>
                                        {new Date(
                                            data.startDate
                                        ).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        )}

                        {data.endDate && (
                            <div className="timeline-item">
                                <div className="timeline-point"></div>
                                <div className="timeline-content">
                                    <h5>RFP End</h5>
                                    <p>
                                        {new Date(
                                            data.endDate
                                        ).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        )}

                        {data.evaluationEnabled && data.evaluationStartDate && (
                            <div className="timeline-item">
                                <div className="timeline-point"></div>
                                <div className="timeline-content">
                                    <h5>Evaluation Start</h5>
                                    <p>
                                        {new Date(
                                            data.evaluationStartDate
                                        ).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        )}

                        {data.evaluationEnabled && data.evaluationEndDate && (
                            <div className="timeline-item">
                                <div className="timeline-point"></div>
                                <div className="timeline-content">
                                    <h5>Evaluation End</h5>
                                    <p>
                                        {new Date(
                                            data.evaluationEndDate
                                        ).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <div className="btn-group">
                <button
                    className="btn btn-secondary"
                    onClick={() =>
                        document
                            .querySelector(".sidebar-nav li:nth-child(11)")
                            .click()
                    }
                >
                    Previous: Add Vendors
                </button>
                <button
                    className="btn btn-primary"
                    onClick={() =>
                        document
                            .querySelector(".sidebar-nav li:nth-child(13)")
                            .click()
                    }
                >
                    Next: Preview
                </button>
            </div>
        </div>
    );
};

export default RFPDates;
