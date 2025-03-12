import React from "react";

const GeneralTerms = ({ data, onChange, errors }) => {
    const handleChange = (e) => {
        onChange({ ...data, generalTerms: e.target.value });
    };

    return (
        <div className="component-container">
            <h2 className="font-bold mb-2">7. General Terms & Conditions</h2>
            <div className="card">
                {/* <div className="card-header font-bold mb-3">
                    <h4>Specify General Terms</h4>
                </div> */}
                <div className="card-body">
                    <textarea
                        value={data.generalTerms || ""}
                        onChange={handleChange}
                        placeholder="Specify general terms and conditions that apply to this RFP and subsequent contract..."
                        rows={8}
                        className="form-control"
                    />
                    {errors.generalTerms && (
                        <div className="error-message mt-3">
                            {errors.generalTerms}
                        </div>
                    )}
                </div>
            </div>
            <div className="info-box mt-4">
                <div className="info-icon">
                    <i className="fas fa-info-circle"></i>
                </div>
                <div className="info-content">
                    <h5>Common topics to address in general terms:</h5>
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                        <li>Confidentiality requirements</li>
                        <li>Intellectual property rights</li>
                        <li>Compliance with laws and regulations</li>
                        <li>Insurance requirements</li>
                        <li>Termination clauses</li>
                        <li>Dispute resolution process</li>
                    </ul>
                </div>
            </div>
            <div className="btn-group">
                <button
                    className="next-btn"
                    onClick={() =>
                        document
                            .querySelector(".sidebar-nav li:nth-child(6)")
                            .click()
                    }
                >
                    Previous: Financials
                </button>
                <button
                    className="next-btn"
                    onClick={() =>
                        document
                            .querySelector(".sidebar-nav li:nth-child(8)")
                            .click()
                    }
                >
                    Next: Special Terms & Conditions
                </button>
            </div>
        </div>
    );
};

export default GeneralTerms;
