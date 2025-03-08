import React from "react";

const Financials = ({ data, onChange, errors }) => {
    const budgetTypeOptions = [
        { id: "fixed", label: "Fixed Budget" },
        { id: "range", label: "Budget Range" },
        { id: "timeAndMaterial", label: "Time & Material" },
        { id: "notSpecified", label: "Not Specified" },
    ];

    const currencyOptions = [
        { id: "USD", label: "USD ($)" },
        { id: "EUR", label: "EUR (€)" },
        { id: "GBP", label: "GBP (£)" },
        { id: "CAD", label: "CAD (C$)" },
        { id: "AUD", label: "AUD (A$)" },
        { id: "JPY", label: "JPY (¥)" },
        { id: "INR", label: "INR (₹)" },
        { id: "CNY", label: "CNY (¥)" },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        onChange({ ...data, [name]: value });
    };

    const handleCurrencyChange = (e) => {
        const { value } = e.target;
        onChange({ ...data, currency: value });
    };

    const handleBudgetTypeChange = (e) => {
        const { value } = e.target;
        onChange({ ...data, budgetType: value });
    };

    return (
        <div className="component-container">
            <h2 className="mb-2">6. Financial Information</h2>

            <div className="card">
                <div className="card-header font-bold mb-3">
                    <h4>Enter Financial Details</h4>
                </div>
                <div className="card-body">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-group">
                            <label
                                htmlFor="budgetType"
                                className="text-sm font-medium"
                            >
                                Budget Type
                            </label>
                            <select
                                id="budgetType"
                                name="budgetType"
                                value={data.budgetType || "fixed"}
                                onChange={handleBudgetTypeChange}
                                className="form-control mt-1"
                            >
                                {budgetTypeOptions.map((option) => (
                                    <option key={option.id} value={option.id}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label
                                htmlFor="currency"
                                className="text-sm font-medium"
                            >
                                Currency
                            </label>
                            <select
                                id="currency"
                                name="currency"
                                value={data.currency || "USD"}
                                onChange={handleCurrencyChange}
                                className="form-control mt-1"
                            >
                                {currencyOptions.map((option) => (
                                    <option key={option.id} value={option.id}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {data.budgetType === "fixed" && (
                        <div className="form-group">
                            <label
                                htmlFor="budget"
                                className="text-sm font-medium"
                            >
                                Budget Amount
                            </label>
                            <input
                                id="budget"
                                name="budget"
                                type="text"
                                value={data.budget || ""}
                                onChange={handleChange}
                                placeholder="e.g., 50,000"
                                className="form-control mt-1"
                            />
                        </div>
                    )}

                    {data.budgetType === "range" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="form-group">
                                <label
                                    htmlFor="budgetMin"
                                    className="text-sm font-medium"
                                >
                                    Minimum Budget
                                </label>
                                <input
                                    id="budgetMin"
                                    name="budgetMin"
                                    type="text"
                                    value={data.budgetMin || ""}
                                    onChange={handleChange}
                                    placeholder="e.g., 40,000"
                                    className="form-control mt-1"
                                />
                            </div>
                            <div className="form-group">
                                <label
                                    htmlFor="budgetMax"
                                    className="text-sm font-medium"
                                >
                                    Maximum Budget
                                </label>
                                <input
                                    id="budgetMax"
                                    name="budgetMax"
                                    type="text"
                                    value={data.budgetMax || ""}
                                    onChange={handleChange}
                                    placeholder="e.g., 60,000"
                                    className="form-control mt-1"
                                />
                            </div>
                        </div>
                    )}

                    <div className="form-group">
                        <label
                            htmlFor="paymentTerms"
                            className="text-sm font-medium"
                        >
                            Payment Terms
                        </label>
                        <textarea
                            id="paymentTerms"
                            name="paymentTerms"
                            value={data.paymentTerms || ""}
                            onChange={handleChange}
                            placeholder="Describe payment schedule, milestones, invoicing requirements..."
                            rows={4}
                            className="form-control mt-1"
                        />
                    </div>

                    <div className="form-group">
                        <label
                            htmlFor="pbgAmount"
                            className="text-sm font-medium"
                        >
                            PBG (Performance Bank Guarantee)
                        </label>
                        <input
                            id="pbgAmount"
                            name="pbgAmount"
                            type="text"
                            value={data.pbgAmount || ""}
                            onChange={handleChange}
                            placeholder="Enter PBG amount (e.g., 10,000)"
                            className="form-control mt-1"
                        />
                    </div>

                    <div className="form-group mt-4">
                        <label
                            htmlFor="pbgNotes"
                            className="text-sm font-medium"
                        >
                            PBG Notes
                        </label>
                        <textarea
                            id="pbgNotes"
                            name="pbgNotes"
                            value={data.pbgNotes || ""}
                            onChange={handleChange}
                            placeholder="Any additional details about the PBG..."
                            rows={3}
                            className="form-control mt-1"
                        />
                    </div>

                    <div className="form-group">
                        <label
                            htmlFor="financialNotes"
                            className="text-sm font-medium"
                        >
                            Additional Financial Notes
                        </label>
                        <textarea
                            id="financialNotes"
                            name="financialNotes"
                            value={data.financialNotes || ""}
                            onChange={handleChange}
                            placeholder="Any additional financial information, constraints, or requirements..."
                            rows={3}
                            className="form-control mt-1"
                        />
                    </div>

                    {errors.financials && (
                        <div className="error-message mt-3">
                            {errors.financials}
                        </div>
                    )}
                </div>
            </div>

            <div className="info-box mt-4">
                <div className="info-icon">
                    <i className="fas fa-info-circle"></i>
                </div>
                {/* <div className="info-content">
          <h5>Why clear financial information matters</h5>
          <p>Providing clear and complete financial information can help vendors understand your budget and payment expectations, leading to more accurate and competitive proposals.</p>
        </div> */}
            </div>

            <div className="btn-group">
                <button
                    className="btn btn-secondary"
                    onClick={() =>
                        document
                            .querySelector(".sidebar-nav li:nth-child(5)")
                            .click()
                    }
                >
                    Previous: Evaluation Criteria
                </button>
                <button
                    className="btn btn-primary"
                    onClick={() =>
                        document
                            .querySelector(".sidebar-nav li:nth-child(7)")
                            .click()
                    }
                >
                    Next: General Terms
                </button>
            </div>
        </div>
    );
};

export default Financials;
