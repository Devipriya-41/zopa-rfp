import React, { useState, useEffect, useRef, useCallback } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RFPDocument from "./rfp_documents";
import TermsAndConditionsPopup from "./terms_condition";

const Preview = ({ data, onSubmit, isSubmitting }) => {
    // console.log(isSubmitting, "isSubmitting");
    const [sendTo, setSendTo] = useState("");
    const [sendMethod, setSendMethod] = useState("email");
    const [emailError, setEmailError] = useState("");
    const [logoBase64, setLogoBase64] = useState(null);
    const [showDownload, setShowDownload] = useState(null);
    const [incompleteSections, setIncompleteSections] = useState([]);
    const [formComplete, setFormComplete] = useState(false);
    const [showTermsPopup, setShowTermsPopup] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const safeDataRef = useRef(null);

    const prepareLogoForPdf = useCallback((logoFile) => {
        return new Promise((resolve) => {
            if (!logoFile) {
                resolve(null);
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                resolve(reader.result);
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

    // const handleSendClick = useCallback(() => {
    //     if (!formComplete) {
    //         toast.error(
    //             "Please fill in all required sections before submitting."
    //         );
    //         return;
    //     }

    //     if (sendMethod === "email") {
    //         if (!sendTo) {
    //             setEmailError("Email is required");
    //             return;
    //         }

    //         if (!validateEmail(sendTo)) {
    //             setEmailError("Please enter a valid email address");
    //             return;
    //         }

    //         setEmailError("");
    //     }

    //     // Show terms and conditions popup instead of submitting immediately
    //     setShowTermsPopup(true);
    // }, [formComplete, sendMethod, sendTo, validateEmail]);

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

        setShowTermsPopup(true);
    }, [formComplete, sendMethod, sendTo, validateEmail]);

    const handleConfirmSubmit = () => {
        if (!termsAccepted) {
            toast.error("Please accept the terms and conditions to proceed");
            return;
        }

        // Ensure sendTo and sendMethod have values
        if (!sendTo || !sendMethod) {
            toast.error("Please select a valid recipient and sending method.");
            return;
        }

        // Close the popup
        setShowTermsPopup(false);

        // Submit the form
        onSubmit({
            ...data,
            sendTo,
            sendMethod,
        });

        // Show success toast
        toast.success("RFP submitted successfully!");
    };

    const getIncompleteSections = useCallback(() => {
        const safeData = safeDataRef.current;

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

    // Terms and Conditions Popup Component
    // const TermsAndConditionsPopup = () => {
    //     if (!showTermsPopup) return null;

    //     return (
    //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    //             <div className="bg-white rounded-lg p-6 w-11/12 max-w-2xl max-h-[90vh] overflow-y-auto">
    //                 <h2 className="text-xl font-bold mb-4">
    //                     Terms and Conditions
    //                 </h2>
    //                 <div className="mb-4 border border-gray-200 p-4 rounded-lg bg-gray-50 h-64 overflow-y-auto">
    //                     <h3 className="font-semibold mb-2">1. General Terms</h3>
    //                     <p className="mb-3">
    //                         By submitting this RFP, you agree that all
    //                         information provided is accurate and complete. The
    //                         RFP will be sent to the specified recipient(s) and
    //                         you take responsibility for ensuring the correct
    //                         contact details have been provided.
    //                     </p>

    //                     <h3 className="font-semibold mb-2">
    //                         2. Confidentiality
    //                     </h3>
    //                     <p className="mb-3">
    //                         All information contained in this RFP is
    //                         confidential and proprietary. Recipients are
    //                         obligated to maintain confidentiality and use the
    //                         information solely for the purpose of responding to
    //                         this RFP.
    //                     </p>

    //                     <h3 className="font-semibold mb-2">
    //                         3. Intellectual Property
    //                     </h3>
    //                     <p className="mb-3">
    //                         All intellectual property rights associated with
    //                         this RFP and its contents remain with the issuing
    //                         organization. No rights are transferred to
    //                         recipients except for the purpose of preparing a
    //                         response.
    //                     </p>

    //                     <h3 className="font-semibold mb-2">4. No Obligation</h3>
    //                     <p className="mb-3">
    //                         Issuance of this RFP does not obligate the
    //                         organization to award a contract or pay any costs
    //                         incurred in the preparation of a proposal in
    //                         response to this request.
    //                     </p>

    //                     <h3 className="font-semibold mb-2">
    //                         5. Accuracy of Information
    //                     </h3>
    //                     <p>
    //                         While efforts have been made to ensure the accuracy
    //                         of information in this RFP, the organization makes
    //                         no warranty regarding the accuracy or completeness
    //                         of the information provided.
    //                     </p>
    //                 </div>

    //                 <div className="mb-4">
    //                     <label className="flex items-center">
    //                         <input
    //                             type="checkbox"
    //                             checked={termsAccepted}
    //                             onChange={() =>
    //                                 setTermsAccepted(!termsAccepted)
    //                             }
    //                             className="mr-2 h-5 w-5"
    //                         />
    //                         <span>I accept the terms and conditions</span>
    //                     </label>
    //                 </div>

    //                 <div className="flex justify-end space-x-3">
    //                     <button
    //                         className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
    //                         onClick={() => setShowTermsPopup(false)}
    //                     >
    //                         Cancel
    //                     </button>
    //                     <button
    //                         className={`px-4 py-2 rounded-md text-white transition-colors ${
    //                             termsAccepted
    //                                 ? "bg-blue-500 hover:bg-blue-600"
    //                                 : "bg-gray-400 cursor-not-allowed"
    //                         }`}
    //                         onClick={handleConfirmSubmit}
    //                         disabled={!termsAccepted}
    //                     >
    //                         Confirm & Submit
    //                     </button>
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // };

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
                        <div className="send-method-options">
                            <div>
                                <p className="mb-2">
                                    Do you want to download the PDF?
                                </p>
                                <div className="flex space-x-2 mb-2">
                                    <button
                                        className="hover:bg-blue-600 hover:text-white border border-blue-300 text-black font-semibold px-4 py-2 rounded"
                                        onClick={() => {
                                            setShowDownload(true);
                                            // setSendMethod("download");
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
                                    <div className="mt-5 download-pdf-btn">
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
                    className="next-btn"
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

            {/* Terms and Conditions Popup */}
            <TermsAndConditionsPopup
                showTermsPopup={showTermsPopup}
                setShowTermsPopup={setShowTermsPopup}
                termsAccepted={termsAccepted}
                setTermsAccepted={setTermsAccepted}
                handleConfirmSubmit={handleConfirmSubmit}
            />
        </div>
    );
};

export default Preview;
