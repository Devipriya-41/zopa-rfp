import React, { useState } from "react";

const ScopeOfWork = ({ data, onChange, errors }) => {
    const [newDeliverable, setNewDeliverable] = useState("");

    // Predefined scope of work options
    const predefinedOptions = [
        { id: "supply", label: "Supply of items as per the BOQ" },
        {
            id: "installation",
            label: "Supply, Installation, testing, and commissioning of the item as per the specification and scope",
        },
    ];

    // Initialize deliverables if not exist
    const deliverables = data.deliverables || [];

    // Handle selection of predefined options
    const handlePredefinedChange = (e) => {
        const { value, checked } = e.target;
        let updatedDeliverables = [...deliverables];

        if (checked) {
            // Add the selected option to deliverables
            updatedDeliverables = [
                ...updatedDeliverables,
                { id: value, text: value },
            ];
        } else {
            // Remove the unselected option from deliverables
            updatedDeliverables = updatedDeliverables.filter(
                (item) => item.id !== value
            );
        }

        onChange({ ...data, deliverables: updatedDeliverables });
    };

    // Handle custom deliverable input
    const handleAddDeliverable = () => {
        if (newDeliverable.trim()) {
            const updatedDeliverables = [
                ...deliverables,
                { id: Date.now(), text: newDeliverable },
            ];
            onChange({ ...data, deliverables: updatedDeliverables });
            setNewDeliverable("");
        }
    };

    // Handle removal of a deliverable
    const handleRemoveDeliverable = (id) => {
        const updatedDeliverables = deliverables.filter(
            (item) => item.id !== id
        );
        onChange({
            ...data,
            deliverables: updatedDeliverables,
            description: updatedDeliverables,
        });
    };

    // Handle "Enter" key for custom deliverables
    const handleDeliverableKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleAddDeliverable();
        }
    };

    return (
        <div className="component-container">
            <h2>3. Scope of Work</h2>
            <div className="card">
                <div className="card-body">
                    <div className="space-y-4">
                        {/* Predefined Options */}
                        <div>
                            <label className="text-sm font-medium">
                                Predefined Options
                            </label>
                            <div className="mt-1 space-y-2">
                                {predefinedOptions.map((option) => (
                                    <div
                                        key={option.id}
                                        className="checkbox-group"
                                    >
                                        <label className="checkbox-label">
                                            <input
                                                type="checkbox"
                                                value={option.label}
                                                checked={deliverables.some(
                                                    (item) =>
                                                        item.text ===
                                                        option.label
                                                )}
                                                onChange={
                                                    handlePredefinedChange
                                                }
                                            />
                                            {option.label}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Custom Deliverables */}
                        <div>
                            <label className="text-sm font-medium">
                                Custom Deliverables
                            </label>
                            <div className="flex gap-2 mt-1">
                                <input
                                    type="text"
                                    value={newDeliverable}
                                    onChange={(e) =>
                                        setNewDeliverable(e.target.value)
                                    }
                                    onKeyDown={handleDeliverableKeyDown}
                                    placeholder="Add a custom deliverable"
                                    className="form-control flex-1"
                                />
                                <button
                                    type="button"
                                    onClick={handleAddDeliverable}
                                    className="btn btn-primary"
                                >
                                    <span>Add</span>
                                </button>
                            </div>
                        </div>

                        {/* Display Selected Deliverables */}
                        {deliverables.length > 0 ? (
                            <ul className="mt-3 space-y-2">
                                {deliverables.map((item) => (
                                    <li
                                        key={item.id}
                                        className="flex items-center justify-between p-2 border rounded-md"
                                    >
                                        <span>{item.text}</span>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleRemoveDeliverable(item.id)
                                            }
                                            className="btn btn-sm btn-outline-danger"
                                        >
                                            <span>Remove</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-muted mt-2">
                                No deliverables added yet. Select predefined
                                options or add custom deliverables.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="btn-group">
                <button
                    className="btn btn-secondary"
                    onClick={() =>
                        document
                            .querySelector(".sidebar-nav li:nth-child(2)")
                            .click()
                    }
                >
                    Previous: About the Requirement
                </button>
                <button
                    className="btn btn-primary"
                    onClick={() =>
                        document
                            .querySelector(".sidebar-nav li:nth-child(4)")
                            .click()
                    }
                >
                    Next: BOQ/BOM
                </button>
            </div>
        </div>
    );
};

export default ScopeOfWork;
