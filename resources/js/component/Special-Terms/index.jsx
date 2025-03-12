import React from "react";

const SpecialTerms = ({ data, onChange, errors }) => {
    const handleChange = (e) => {
        onChange({ ...data, specialTerms: e.target.value });
    };

    return (
        <div className="component-container">
            <h2 className="font-bold mb-2">8. Special Terms & Conditions</h2>
            <div className="card">
                {/* <div className="card-header font-bold mb-3">
                    <h4>Specify Special Terms</h4>
                </div> */}
                <div className="card-body">
                    <textarea
                        value={data.specialTerms || ""}
                        onChange={handleChange}
                        placeholder="Specify any special terms, conditions, or requirements specific to this RFP..."
                        rows={6}
                        className="form-control"
                    />
                    {errors.specialTerms && (
                        <div className="error-message mt-3">
                            {errors.specialTerms}
                        </div>
                    )}
                </div>
            </div>
            <div className="info-box mt-4">
                <div className="info-icon">
                    <i className="fas fa-info-circle"></i>
                </div>
                <div className="info-content">
                    <h5>Examples of special terms to consider:</h5>
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                        <li>Non-disclosure agreements</li>
                        <li>Specific security requirements</li>
                        <li>Performance guarantees</li>
                        <li>Warranty terms</li>
                        <li>Licensing requirements</li>
                        <li>Specific compliance requirements</li>
                        <li>Geographic or location requirements</li>
                    </ul>
                </div>
            </div>
            <div className="btn-group">
                <button
                    className="next-btn"
                    onClick={() =>
                        document
                            .querySelector(".sidebar-nav li:nth-child(7)")
                            .click()
                    }
                >
                    Previous: General Terms
                </button>
                <button
                    className="next-btn"
                    onClick={() =>
                        document
                            .querySelector(".sidebar-nav li:nth-child(9)")
                            .click()
                    }
                >
                    Next: Attachments
                </button>
            </div>
        </div>
    );
};

export default SpecialTerms;
