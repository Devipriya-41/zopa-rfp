import React from "react";

const VendorSelection = ({ data, onChange, errors }) => {
    const handleTextChange = (e) => {
        const { name, value } = e.target;
        onChange({ ...data, [name]: value });
    };

    const handleSelectionMethodChange = (e) => {
        onChange({ ...data, selectionMethod: e.target.value });
    };

    const handleRequirementToggle = (requirement) => {
        const currentRequirements = data.vendorRequirements || [];
        const isSelected = currentRequirements.includes(requirement);

        let updatedRequirements;
        if (isSelected) {
            updatedRequirements = currentRequirements.filter(
                (r) => r !== requirement
            );
        } else {
            updatedRequirements = [...currentRequirements, requirement];
        }

        onChange({ ...data, vendorRequirements: updatedRequirements });
    };

    const commonRequirements = [
        "Previous experience in similar projects",
        "Financial stability",
        "Certified professionals",
        "Local presence",
        "Insurance coverage",
        "References from similar clients",
        "Compliance with industry standards",
    ];

    return (
        <div className="component-container">
            <h2 className="mb-2">Vendor Selection Process</h2>
            <div className="card">
                <div className="card-header font-bold mb-3">
                    <h4>Vendor Selection Details</h4>
                </div>
                <div className="card-body">
                    <div className="space-y-4">
                        <div>
                            <label
                                htmlFor="selectionMethod"
                                className="text-sm font-medium"
                            >
                                Selection Method
                            </label>
                            <select
                                id="selectionMethod"
                                value={data.selectionMethod || "competitive"}
                                onChange={handleSelectionMethodChange}
                                className="form-control mt-1"
                            >
                                <option value="Competitive Bidding">
                                    Competitive Bidding
                                </option>
                                <option value="Quality-Based Selection">
                                    Quality-Based Selection
                                </option>
                                <option value="Quality and Cost-Based Selection">
                                    Quality and Cost-Based Selection
                                </option>
                                <option value="Invited Bidders Only">
                                    Invited Bidders Only
                                </option>
                                <option value="Sole Source">Sole Source</option>
                            </select>
                        </div>

                        <div>
                            <label
                                htmlFor="vendorSelectionProcess"
                                className="text-sm font-medium"
                            >
                                Selection Process Description
                            </label>
                            <textarea
                                id="vendorSelectionProcess"
                                name="vendorSelectionProcess"
                                value={data.vendorSelectionProcess || ""}
                                onChange={handleTextChange}
                                placeholder="Describe the process for selecting a vendor from submission through final selection..."
                                rows={6}
                                className="form-control mt-1"
                            />
                            {errors.vendorSelectionProcess && (
                                <div className="error-message">
                                    {errors.vendorSelectionProcess}
                                </div>
                            )}
                        </div>

                        <div>
                            <span className="text-sm font-medium">
                                Vendor Requirements
                            </span>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                                {commonRequirements.map((requirement) => (
                                    <div
                                        key={requirement}
                                        className="flex items-center space-x-2"
                                    >
                                        <input
                                            type="checkbox"
                                            id={`requirement-${requirement}`}
                                            checked={(
                                                data.vendorRequirements || []
                                            ).includes(requirement)}
                                            onChange={() =>
                                                handleRequirementToggle(
                                                    requirement
                                                )
                                            }
                                            className="form-checkbox"
                                        />
                                        <label
                                            htmlFor={`requirement-${requirement}`}
                                            className="text-sm font-normal cursor-pointer"
                                        >
                                            {requirement}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="additionalRequirements"
                                className="text-sm font-medium"
                            >
                                Additional Vendor Requirements
                            </label>
                            <textarea
                                id="additionalRequirements"
                                name="additionalRequirements"
                                value={data.additionalRequirements || ""}
                                onChange={handleTextChange}
                                placeholder="List any other specific requirements for vendors..."
                                rows={3}
                                className="form-control mt-1"
                            />
                            {errors.additionalRequirements && (
                                <div className="error-message">
                                    {errors.additionalRequirements}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="btn-group">
                <button
                    className="btn btn-secondary"
                    onClick={() =>
                        document
                            .querySelector(".sidebar-nav li:nth-child(10)")
                            .click()
                    }
                >
                    Previous: Contact Information
                </button>
                <button
                    className="btn btn-primary"
                    onClick={() =>
                        document
                            .querySelector(".sidebar-nav li:nth-child(12)")
                            .click()
                    }
                >
                    Next: Review & Submit
                </button>
            </div>
        </div>
    );
};

export default VendorSelection;
