import React, { useState } from "react";

const Contact = ({ data, onChange, errors }) => {
    const [logo, setLogo] = useState(null);
    const handleChange = (e) => {
        const { name, value } = e.target;
        onChange({ ...data, [name]: value });
    };

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setLogo(file);
            onChange({ ...data, logo: file });
        } else {
            setLogo(null);
            onChange({ ...data, logo: null });
        }
    };
    return (
        <div className="component-container">
            <h2 className="font-bold mb-2">10. Contact Information</h2>
            <div className="card">
                <div className="card-body">
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label
                                    htmlFor="contactName"
                                    className="text-sm font-medium"
                                >
                                    Contact Name
                                </label>
                                <input
                                    id="contactName"
                                    name="contactName"
                                    value={data.contactName || ""}
                                    onChange={handleChange}
                                    placeholder="Full name"
                                    className="form-control mt-1"
                                />
                                {errors.contactName && (
                                    <div className="error-message">
                                        {errors.contactName}
                                    </div>
                                )}
                            </div>
                            <div>
                                <label
                                    htmlFor="contactTitle"
                                    className="text-sm font-medium"
                                >
                                    Title/Position
                                </label>
                                <input
                                    id="contactTitle"
                                    name="contactTitle"
                                    value={data.contactTitle || ""}
                                    onChange={handleChange}
                                    placeholder="e.g., Procurement Manager"
                                    className="form-control mt-1"
                                />
                                {errors.contactTitle && (
                                    <div className="error-message">
                                        {errors.contactTitle}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label
                                    htmlFor="contactEmail"
                                    className="text-sm font-medium"
                                >
                                    Email Address
                                </label>
                                <input
                                    id="contactEmail"
                                    name="contactEmail"
                                    type="email"
                                    value={data.contactEmail || ""}
                                    onChange={handleChange}
                                    placeholder="email@example.com"
                                    className="form-control mt-1"
                                />
                                {errors.contactEmail && (
                                    <div className="error-message">
                                        {errors.contactEmail}
                                    </div>
                                )}
                            </div>
                            <div>
                                <label
                                    htmlFor="contactPhone"
                                    className="text-sm font-medium"
                                >
                                    Phone Number
                                </label>
                                <input
                                    id="contactPhone"
                                    name="contactPhone"
                                    value={data.contactPhone || ""}
                                    onChange={handleChange}
                                    placeholder="+1 (555) 123-4567"
                                    className="form-control mt-1"
                                />
                                {errors.contactPhone && (
                                    <div className="error-message">
                                        {errors.contactPhone}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="contactDepartment"
                                className="text-sm font-medium"
                            >
                                Department
                            </label>
                            <input
                                id="contactDepartment"
                                name="contactDepartment"
                                value={data.contactDepartment || ""}
                                onChange={handleChange}
                                placeholder="e.g., Procurement, IT, HR"
                                className="form-control mt-1"
                            />
                            {errors.contactDepartment && (
                                <div className="error-message">
                                    {errors.contactDepartment}
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label
                                    htmlFor="contactAddress"
                                    className="text-sm font-medium"
                                >
                                    Address
                                </label>
                                <input
                                    id="contactAddress"
                                    name="contactAddress"
                                    value={data.contactAddress || ""}
                                    onChange={handleChange}
                                    placeholder="Street address"
                                    className="form-control mt-1"
                                />
                                {errors.contactAddress && (
                                    <div className="error-message">
                                        {errors.contactAddress}
                                    </div>
                                )}
                            </div>
                            <div>
                                <label
                                    htmlFor="contactCity"
                                    className="text-sm font-medium"
                                >
                                    City, State, ZIP
                                </label>
                                <input
                                    id="contactCity"
                                    name="contactCity"
                                    value={data.contactCity || ""}
                                    onChange={handleChange}
                                    placeholder="City, State ZIP"
                                    className="form-control mt-1"
                                />
                                {errors.contactCity && (
                                    <div className="error-message">
                                        {errors.contactCity}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         
                            <div>
                                <label
                                    htmlFor="logoUpload"
                                    className="text-sm font-medium"
                                >
                                    Upload Logo
                                </label>
                                <input
                                    type="file"
                                    id="logoUpload"
                                    accept="image/*"
                                    onChange={handleLogoChange}
                                    className="form-control mt-1"
                                />
                                {logo && (
                                    <div>
                                        <p>Selected Logo: {logo.name}</p>
                                        <img
                                            src={URL.createObjectURL(logo)}
                                            alt="Logo Preview"
                                            style={{
                                                maxWidth: "100px",
                                                maxHeight: "100px",
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        </div> */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label
                                    htmlFor="logoUpload"
                                    className="text-sm font-medium"
                                >
                                    Upload Logo
                                </label>
                                <input
                                    type="file"
                                    id="logoUpload"
                                    accept="image/*"
                                    onChange={handleLogoChange}
                                    className="form-control mt-1"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    Allowed formats: JPG, JPEG, PNG
                                </p>
                                {logo && (
                                    <div>
                                        <p>Selected Logo: {logo.name}</p>

                                        <img
                                            src={URL.createObjectURL(logo)}
                                            alt="Logo Preview"
                                            style={{
                                                maxWidth: "100px",
                                                maxHeight: "100px",
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="btn-group">
                <button
                    className="next-btn"
                    onClick={() =>
                        document
                            .querySelector(".sidebar-nav li:nth-child(9)")
                            .click()
                    }
                >
                    Previous: Documents to Share
                </button>
                <button
                    className="next-btn"
                    onClick={() =>
                        document
                            .querySelector(".sidebar-nav li:nth-child(11)")
                            .click()
                    }
                >
                    Next: Add Vendors
                </button>
            </div>
        </div>
    );
};

export default Contact;
