import React, { useState, useEffect, useRef, useCallback } from "react";
import {
    PDFDownloadLink,
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Image,
} from "@react-pdf/renderer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RFPDocument from "./rfp_documents";

const Preview = ({ data, onSubmit, isSubmitting }) => {
    const [sendTo, setSendTo] = useState("");
    const [sendMethod, setSendMethod] = useState("email");
    const [emailError, setEmailError] = useState("");
    const [logoBase64, setLogoBase64] = useState(null);
    const [showDownload, setShowDownload] = useState(null);
    const [incompleteSections, setIncompleteSections] = useState([]);
    const [formComplete, setFormComplete] = useState(false);
    const safeDataRef = useRef(null);

    const prepareLogoForPdf = useCallback((logoFile) => {
        return new Promise((resolve) => {
            if (!logoFile) {
                resolve(null);
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                resolve(reader.result); // Base64 string
            };
            reader.readAsDataURL(logoFile);
        });
    }, []);

    useEffect(() => {
        if (data.contact?.logo) {
            prepareLogoForPdf(data.contact.logo).then((base64Logo) => {
                setLogoBase64(base64Logo);
            });
        }
    }, [data.contact?.logo, prepareLogoForPdf]);

    // Safeguard against undefined data
    const safeData = {
        company: data.company || {},
        requirement: data.requirement || {},
        scopeOfWork: data?.scope?.deliverables || [],
        boq: data.boq || [],
        evaluationCriteria: data.evaluationCriteria || [],
        financials: data.financials || {},
        generalTerms: data.generalTerms?.generalTerms || "",
        specialTerms: data.specialTerms?.specialTerms || "",
        documents: data.documentsToShare?.documentsToShare || [],
        contact: data.contact || {},
        vendors: data.vendors || {},
        rfpDates: data.rfpDates || {},
        logo: data.contact?.logo || {},
    };
    safeDataRef.current = safeData;

    const validateEmail = useCallback((email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }, []);

    const handleSendClick = useCallback(() => {
        if (!formComplete) {
            toast.error(
                "Please fill in all required sections before submitting."
            );
            return;
        }

        if (sendMethod === "email") {
            if (!sendTo) {
                setEmailError("Email is required");
                return;
            }

            if (!validateEmail(sendTo)) {
                setEmailError("Please enter a valid email address");
                return;
            }

            setEmailError("");
        }

        onSubmit({
            ...data,
            sendTo,
            sendMethod,
        });
    }, [formComplete, sendMethod, sendTo, validateEmail, onSubmit, data]);

    const getIncompleteSections = useCallback(() => {
        const safeData = safeDataRef.current; // Access the latest safeData

        const requiredSections = [
            { name: "1. Company Introduction", value: safeData.company?.name },
            {
                name: "2. About the Requirement",
                value: safeData.requirement?.projectName,
            },
            {
                name: "3. Scope of Work",
                value:
                    safeData.scopeOfWork?.length > 0
                        ? safeData.scopeOfWork
                        : null,
            },
            {
                name: "4. BOQ/BOM",
                value: safeData.boq?.length > 0 ? safeData.boq : null,
            },
            {
                name: "5. Evaluation Criteria",
                value:
                    safeData.evaluationCriteria?.length > 0
                        ? safeData.evaluationCriteria
                        : null,
            },
            {
                name: "6. Financials",
                value:
                    Object.keys(safeData.financials || {}).length > 0
                        ? safeData.financials
                        : null,
            },
            {
                name: "7. General Terms & Conditions",
                value:
                    safeData.generalTerms?.trim() !== ""
                        ? safeData.generalTerms
                        : null,
            },
            {
                name: "8. Special Terms & Conditions",
                value:
                    safeData.specialTerms?.trim() !== ""
                        ? safeData.specialTerms
                        : null,
            },
            {
                name: "9. Documents to Share",
                value:
                    safeData.documents?.length > 0 ? safeData.documents : null,
            },
            {
                name: "10. Contact",
                value:
                    safeData.contact?.contactName &&
                    safeData.contact?.contactEmail
                        ? safeData.contact
                        : null,
            },
            {
                name: "11. Add Vendors",
                value:
                    Object.keys(safeData.vendors || {}).length > 0
                        ? safeData.vendors
                        : null,
            },
            {
                name: "12. RFP Start and End Date",
                value:
                    safeData.rfpDates?.startDate && safeData.rfpDates?.endDate
                        ? safeData.rfpDates
                        : null,
            },
        ];

        return requiredSections
            .filter((section) => !Boolean(section.value))
            .map((section) => section.name);
    }, [safeDataRef]);

    const isFormComplete = useCallback(() => {
        return getIncompleteSections().length === 0;
    }, [getIncompleteSections]);

    useEffect(() => {
        const incomplete = getIncompleteSections();
        setIncompleteSections(incomplete);
        setFormComplete(incomplete.length === 0);
    }, [getIncompleteSections]);

    console.log(incompleteSections, "incompleteSections");

    return (
        <div className="component-container">
            <h2 className="font-bold mb-4">Preview & Submit</h2>
            <p className="section-description mb-4">
                Review your RFP before submitting it. You can download a PDF
                copy, send it via email.
            </p>

            {!formComplete && (
                <div className="p-4 border border-yellow-400 bg-yellow-100 rounded-lg shadow-md mb-4">
                    <div className="flex items-center mb-2">
                        {/* <FontAwesomeIcon icon={faExclamationTriangle} className="text-yellow-600 mr-2" /> */}
                        <h2 className="text-yellow-700 font-semibold text-lg">
                            Incomplete Sections
                        </h2>
                    </div>
                    <p className="text-yellow-800 mb-2">
                        The following sections are incomplete. Please provide
                        the required information
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {incompleteSections.map((sectionName, index) => (
                            <div
                                key={index}
                                className="p-3 bg-white border border-yellow-300 rounded-md shadow-sm"
                            >
                                <span className="text-yellow-900 font-medium">
                                    {sectionName}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="card mt-4">
                <div className="card-body">
                    <div className="form-group">
                        {/* <label>Delivery Method</label>   */}
                        <div className="send-method-options">
                            <div>
                                <p className="mb-2">
                                    Do you want to download the PDF?
                                </p>
                                <div className="flex space-x-2 mb-2">
                                    <button
                                        className="hover:bg-blue-600 hover:text-white  border border-blue-300 text-black font-semibold px-4 py-2 rounded"
                                        onClick={() => {
                                            setShowDownload(true);
                                            setSendMethod("download");
                                        }}
                                    >
                                        Yes
                                    </button>
                                    <button
                                        className="hover:bg-blue-600 hover:text-white border border-blue-300 text-black font-semibold px-4 py-2 rounded"
                                        onClick={() => setShowDownload(false)}
                                    >
                                        No
                                    </button>
                                </div>

                                {showDownload && (
                                    <div className="mt-5  download-pdf-btn">
                                        <PDFDownloadLink
                                            document={
                                                <RFPDocument
                                                    data={safeData}
                                                    logoBase64={logoBase64}
                                                />
                                            }
                                            fileName={`${
                                                safeData.requirement
                                                    .projectName || "RFP"
                                            }_Document.pdf`}
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
                                        >
                                            {({ loading }) =>
                                                loading
                                                    ? "Generating PDF..."
                                                    : "Download PDF"
                                            }
                                        </PDFDownloadLink>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* {sendMethod === "email" && ( */}
                    <div className="form-group">
                        <label htmlFor="sendTo">Email Address</label>
                        <input
                            type="email"
                            id="sendTo"
                            className={`form-control ${
                                emailError ? "is-invalid" : ""
                            }`}
                            value={sendTo}
                            onChange={(e) => setSendTo(e.target.value)}
                            placeholder="Enter recipient email address"
                        />
                        {emailError && (
                            <div className="invalid-feedback">{emailError}</div>
                        )}
                    </div>
                </div>
            </div>

            <div className="btn-group mt-4">
                <button
                    className="btn btn-secondary"
                    onClick={() =>
                        document
                            .querySelector(".sidebar-nav li:nth-child(12)")
                            .click()
                    }
                >
                    Previous: RFP Dates
                </button>
                {sendMethod === "email" && (
                    <button
                        className="btn btn-success"
                        onClick={handleSendClick}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <span
                                    className="spinner-border spinner-border-sm"
                                    role="status"
                                    aria-hidden="true"
                                ></span>
                                <span className="ml-2">Sending...</span>
                            </>
                        ) : (
                            <>
                                <i className="fas fa-paper-plane"></i> Send RFP
                            </>
                        )}
                    </button>
                )}
            </div>
        </div>
    );
};

export default Preview;
