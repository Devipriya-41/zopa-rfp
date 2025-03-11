import React, { useState, useEffect } from "react";
import CompanyIntroduction from "./Company-Details/index";
import AboutRequirement from "./About-Requirement/index";
import ScopeOfWork from "./Scope-Of-Work/index";
import BOQ from "./BOQ/index";
import EvaluationCriteria from "./evaluation-criteria";
import Financials from "./Financial/index";
import GeneralTerms from "./General-Terms/index";
import SpecialTerms from "./Special-terms/index";
import DocumentsToShare from "./Document-Share/index";
import Contact from "./Contact/index";
import VendorSelection from "./Vendor-Selection/index";
import RFPDates from "./RFP-Dates/index";
import Preview from "./RFP-Preview/index";
import PreviewDocument from "./Preview-Document/index";
import "./style.css";
import { ToastContainer, toast } from "react-toastify";

const RFPCreator = () => {
    const [activeSection, setActiveSection] = useState("company");
    const [formData, setFormData] = useState({
        company: {
            name: "",
            address: "",
            businessType: "",
        },
        requirement: {
            projectName: "",
            purpose: "",
        },
        scope: {
            description: "",
            deliverables: [],
        },
        boq: [],
        evaluationCriteria: [],
        financials: {
            budgetMin: "",
            budgetMax: "",
            budgetType: "",
            currency: "",
            financialNotes: "",
            paymentTerm: "",
            paymentTerms: "",
            pbg: "",
            pricingModel: "",
            pbgAmount: "",
            pbgNotes: "",
        },
        generalTerms: {
            generalTerms: "",
        },
        specialTerms: {
            specialTerms: "",
        },
        documentsToShare: [],
        contact: {
            contactName: "",
            contactTitle: "",
            contactAddress: "",
            contactCity: "",
            contactDepartment: "",
            contactEmail: "",
            contactPhone: "",
        },
        vendors: {
            selectionMethod: "",
            vendorRequirements: [],
            vendorSelectionProcess: "",
        },
        rfpDates: {
            startDate: "",
            endDate: "",
        },
        organizationName: "",
        logo: null,
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (section, data) => {
        setFormData({
            ...formData,
            [section]: data,
        });
    };

    // console.log(formData, "formData");

    const validateForm = () => {
        const newErrors = {};

        // Company validation
        if (!formData.company.name)
            newErrors.companyName = "Company name is required";
        if (!formData.company.address)
            newErrors.companyAddress = "Address is required";
        if (!formData.company.businessType)
            newErrors.businessType = "Business type is required";

        // Requirement validation
        if (!formData.requirement.projectName)
            newErrors.projectName = "Project name is required";
        if (!formData.requirement.purpose)
            newErrors.purpose = "Purpose is required";

        // Contact validation
        if (!formData.contact.name)
            newErrors.contactName = "Contact name is required";
        if (!formData.contact.email)
            newErrors.contactEmail = "Email is required";
        if (
            formData.contact.email &&
            !/\S+@\S+\.\S+/.test(formData.contact.email)
        )
            newErrors.contactEmail = "Email is invalid";
        if (!formData.contact.phone)
            newErrors.contactPhone = "Phone number is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            setIsSubmitting(true);
            try {
                const response = await fetch("/api/rfp", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    alert(
                        "RFP created successfully and sent to the specified email."
                    );
                    // Reset form or redirect
                } else {
                    const data = await response.json();
                    alert(`Error: ${data.message}`);
                }
            } catch (error) {
                alert(`Error: ${error.message}`);
            } finally {
                setIsSubmitting(false);
            }
        } else {
            // alert("Please fix the errors before submitting.");
        }
    };

    const navigateTo = (section) => {
        setActiveSection(section);
    };

    return (
        <div className="rfp-creator-container">
            <div className="rfp-sidebar">
                <div className="logo-container">
                    <h2>RFP Creator</h2>
                </div>
                <nav className="sidebar-nav">
                    <ul>
                        <li
                            className={
                                activeSection === "company" ? "active" : ""
                            }
                            onClick={() => navigateTo("company")}
                        >
                            1. Company Introduction
                        </li>
                        <li
                            className={
                                activeSection === "requirement" ? "active" : ""
                            }
                            onClick={() => navigateTo("requirement")}
                        >
                            2. About the Requirement
                        </li>
                        <li
                            className={
                                activeSection === "scope" ? "active" : ""
                            }
                            onClick={() => navigateTo("scope")}
                        >
                            3. Scope of Work
                        </li>
                        <li
                            className={activeSection === "boq" ? "active" : ""}
                            onClick={() => navigateTo("boq")}
                        >
                            4. BOQ/BOM
                        </li>
                        <li
                            className={
                                activeSection === "evaluation" ? "active" : ""
                            }
                            onClick={() => navigateTo("evaluation")}
                        >
                            5. Evaluation Criteria
                        </li>
                        <li
                            className={
                                activeSection === "financials" ? "active" : ""
                            }
                            onClick={() => navigateTo("financials")}
                        >
                            6. Financials
                        </li>
                        <li
                            className={
                                activeSection === "generalTerms" ? "active" : ""
                            }
                            onClick={() => navigateTo("generalTerms")}
                        >
                            7. General Terms & Conditions
                        </li>
                        <li
                            className={
                                activeSection === "specialTerms" ? "active" : ""
                            }
                            onClick={() => navigateTo("specialTerms")}
                        >
                            8. Special Terms & Conditions
                        </li>
                        <li
                            className={
                                activeSection === "documents" ? "active" : ""
                            }
                            onClick={() => navigateTo("documents")}
                        >
                            9. Documents to Share
                        </li>
                        <li
                            className={
                                activeSection === "contact" ? "active" : ""
                            }
                            onClick={() => navigateTo("contact")}
                        >
                            10. Contact
                        </li>
                        <li
                            className={
                                activeSection === "vendors" ? "active" : ""
                            }
                            onClick={() => navigateTo("vendors")}
                        >
                            11. Add Vendors
                        </li>
                        <li
                            className={
                                activeSection === "dates" ? "active" : ""
                            }
                            onClick={() => navigateTo("dates")}
                        >
                            12. RFP Start and End Date
                        </li>
                        <li
                            className={
                                activeSection === "preview" ? "active" : ""
                            }
                            onClick={() => navigateTo("preview")}
                        >
                            Preview & Submit
                        </li>
                    </ul>
                </nav>
            </div>

            <div className="rfp-content">
                <div className="form-section overflow-y-auto max-h-[600px] p-4 border border-gray-300 rounded-lg bg-white shadow-md">
                    {activeSection === "company" && (
                        <CompanyIntroduction
                            data={formData.company}
                            onChange={(data) =>
                                handleInputChange("company", data)
                            }
                            errors={errors}
                        />
                    )}
                    {activeSection === "requirement" && (
                        <AboutRequirement
                            data={formData.requirement}
                            onChange={(data) =>
                                handleInputChange("requirement", data)
                            }
                            errors={errors}
                        />
                    )}
                    {activeSection === "scope" && (
                        <ScopeOfWork
                            data={formData.scope}
                            onChange={(data) =>
                                handleInputChange("scope", data)
                            }
                            errors={errors}
                        />
                    )}
                    {activeSection === "boq" && (
                        <BOQ
                            data={formData.boq}
                            onChange={(data) => handleInputChange("boq", data)}
                            errors={errors}
                        />
                    )}
                    {activeSection === "evaluation" && (
                        <EvaluationCriteria
                            data={formData.evaluationCriteria}
                            onChange={(data) =>
                                handleInputChange("evaluationCriteria", data)
                            }
                            errors={errors}
                        />
                    )}
                    {activeSection === "financials" && (
                        <Financials
                            data={formData.financials}
                            onChange={(data) =>
                                handleInputChange("financials", data)
                            }
                            errors={errors}
                        />
                    )}
                    {activeSection === "generalTerms" && (
                        <GeneralTerms
                            data={formData.generalTerms}
                            onChange={(data) =>
                                handleInputChange("generalTerms", data)
                            }
                            errors={errors}
                        />
                    )}
                    {activeSection === "specialTerms" && (
                        <SpecialTerms
                            data={formData.specialTerms}
                            onChange={(data) =>
                                handleInputChange("specialTerms", data)
                            }
                            errors={errors}
                        />
                    )}
                    {activeSection === "documents" && (
                        <DocumentsToShare
                            data={formData.documentsToShare}
                            onChange={(data) =>
                                handleInputChange("documentsToShare", data)
                            }
                            errors={errors}
                        />
                    )}
                    {activeSection === "contact" && (
                        <Contact
                            data={formData.contact}
                            onChange={(data) =>
                                handleInputChange("contact", data)
                            }
                            errors={errors}
                        />
                    )}
                    {activeSection === "vendors" && (
                        <VendorSelection
                            data={formData.vendors}
                            onChange={(data) =>
                                handleInputChange("vendors", data)
                            }
                            errors={errors}
                        />
                    )}
                    {activeSection === "dates" && (
                        <RFPDates
                            data={formData.rfpDates}
                            onChange={(data) =>
                                handleInputChange("rfpDates", data)
                            }
                            organizationName={formData.organizationName}
                            onOrgNameChange={(name) =>
                                setFormData({
                                    ...formData,
                                    organizationName: name,
                                })
                            }
                            logo={formData.logo}
                            onLogoChange={(logo) =>
                                setFormData({ ...formData, logo })
                            }
                            errors={errors}
                        />
                    )}
                    {activeSection === "preview" && (
                        <Preview
                            data={formData}
                            onSubmit={handleSubmit}
                            isSubmitting={isSubmitting}
                        />
                    )}
                </div>

                <div className="preview-section">
                    <h3 className="text-lg font-semibold text-gray-800">
                        Live Preview
                    </h3>

                    <div className="preview-document overflow-y-auto max-h-[550px] p-4 border border-gray-300 rounded-lg bg-gray-100 shadow-md">
                        <PreviewDocument data={formData} />
                    </div>
                </div>
            </div>

            <ToastContainer />
        </div>
    );
};

export default RFPCreator;
