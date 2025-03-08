import React, { useState } from "react";
import {
    PDFDownloadLink,
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Image,
} from "@react-pdf/renderer";

// Create styles for PDF
const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontFamily: "Helvetica",
    },
    section: {
        margin: 10,
        padding: 10,
    },
    header: {
        fontSize: 24,
        textAlign: "center",
        marginBottom: 20,
    },
    subheader: {
        fontSize: 18,
        marginBottom: 10,
        borderBottom: "1 solid #cccccc",
        paddingBottom: 5,
    },
    text: {
        fontSize: 12,
        marginBottom: 5,
    },
    logo: {
        width: 100,
        height: "auto",
        marginBottom: 10,
        alignSelf: "center",
    },
    table: {
        display: "table",
        width: "auto",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#bfbfbf",
        marginBottom: 10,
    },
    tableRow: {
        flexDirection: "row",
    },
    tableHeaderCell: {
        backgroundColor: "#f2f2f2",
        padding: 5,
        fontSize: 12,
        fontWeight: "bold",
        borderWidth: 1,
        borderColor: "#bfbfbf",
    },
    tableCell: {
        padding: 5,
        fontSize: 12,
        borderWidth: 1,
        borderColor: "#bfbfbf",
    },
});

// Create PDF Document with proper checks
const RFPDocument = ({ data }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            {data.logo && (
                <Image
                    src={URL.createObjectURL(data.logo)}
                    style={styles.logo}
                />
            )}

            <Text style={styles.header}>
                {data.requirement && data.requirement.projectName
                    ? data.requirement.projectName
                    : "RFP Document"}
            </Text>

            {/* Company Introduction Section */}
            {data.company && (
                <View style={styles.section}>
                    <Text style={styles.subheader}>
                        1. Company Introduction
                    </Text>
                    <Text style={styles.text}>
                        {data.company.name || "[Company Name]"} incorporated
                        under Indian Companies Act, 1956, having its office at{" "}
                        {data.company.address || "[Address]"}, herein after
                        referred to as "Company" which expression shall unless
                        repugnant to the context or meaning thereof and include
                        its administrators and successors in interest of the
                        First Part.
                    </Text>
                    <Text style={styles.text}>
                        Company is in the business of{" "}
                        {data.company.businessType || "[Business Type]"}
                    </Text>
                </View>
            )}

            {/* About Requirement Section */}
            {data.requirement && data.requirement.projectName && (
                <View style={styles.section}>
                    <Text style={styles.subheader}>
                        2. About the Requirement
                    </Text>
                    <Text style={styles.text}>
                        {data.company && data.company.name
                            ? data.company.name
                            : "[Company Name]"}{" "}
                        is working {data.requirement.projectName} for the
                        purpose of {data.requirement.purpose || "[Purpose]"}. As
                        per the {data.requirement.projectName} requirement, we
                        are inviting the vendor to quote for the same with best
                        matching the requirement. We have listed the requirement
                        in the document and the vendor is expected to quote for
                        items and also mentioned the deviations the changes if
                        any.
                    </Text>
                </View>
            )}

            {/* Scope of Work Section */}
            {/* {data.scopeOfWork && (
        <View style={styles.section}>
          <Text style={styles.subheader}>3. Scope of Work</Text>
          <Text style={styles.text}>{data.scopeOfWork.description || "[Scope description not provided]"}</Text>
        </View>
      )} */}

            {safeData.scopeOfWork.description && (
                <div className="section">
                    <h3>3. Scope of Work</h3>
                    <p>{safeData.scopeOfWork.description}</p>
                </div>
            )}

            {/* BOQ Section */}
            {data.boq && data.boq.length > 0 && (
                <View style={styles.section}>
                    <Text style={styles.subheader}>
                        4. Bill of Quantities (BOQ)
                    </Text>

                    <View style={styles.table}>
                        {/* Table Header */}
                        <View style={styles.tableRow}>
                            <View style={[styles.tableHeaderCell, { flex: 2 }]}>
                                <Text>Description</Text>
                            </View>
                            <View style={[styles.tableHeaderCell, { flex: 1 }]}>
                                <Text>UOM</Text>
                            </View>
                            <View style={[styles.tableHeaderCell, { flex: 1 }]}>
                                <Text>Qty</Text>
                            </View>
                            <View style={[styles.tableHeaderCell, { flex: 1 }]}>
                                <Text>Target Price</Text>
                            </View>
                            <View style={[styles.tableHeaderCell, { flex: 2 }]}>
                                <Text>Specification</Text>
                            </View>
                            <View style={[styles.tableHeaderCell, { flex: 1 }]}>
                                <Text>Remarks</Text>
                            </View>
                        </View>

                        {/* Table Rows */}
                        {data.boq.map((item, index) => (
                            <View style={styles.tableRow} key={index}>
                                <View style={[styles.tableCell, { flex: 2 }]}>
                                    <Text>{item.description || ""}</Text>
                                </View>
                                <View style={[styles.tableCell, { flex: 1 }]}>
                                    <Text>{item.uom || ""}</Text>
                                </View>
                                <View style={[styles.tableCell, { flex: 1 }]}>
                                    <Text>{item.quantity || ""}</Text>
                                </View>
                                <View style={[styles.tableCell, { flex: 1 }]}>
                                    <Text>{item.targetPrice || ""}</Text>
                                </View>
                                <View style={[styles.tableCell, { flex: 2 }]}>
                                    <Text>{item.specification || ""}</Text>
                                </View>
                                <View style={[styles.tableCell, { flex: 1 }]}>
                                    <Text>{item.remarks || ""}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            )}

            {/* Continue with other sections */}

            {/* Contact Section */}
            {data.contact && data.contact.name && (
                <View style={styles.section}>
                    <Text style={styles.subheader}>10. Contact</Text>
                    <Text style={styles.text}>Name: {data.contact.name}</Text>
                    <Text style={styles.text}>
                        Email: {data.contact.email || "[Email not provided]"}
                    </Text>
                    <Text style={styles.text}>
                        Phone: {data.contact.phone || "[Phone not provided]"}
                    </Text>
                </View>
            )}

            {/* RFP Dates Section */}
            {data.rfpDates &&
                (data.rfpDates.startDate || data.rfpDates.endDate) && (
                    <View style={styles.section}>
                        <Text style={styles.subheader}>RFP Timeline</Text>
                        {data.rfpDates.startDate && (
                            <Text style={styles.text}>
                                Start Date: {data.rfpDates.startDate}
                            </Text>
                        )}
                        {data.rfpDates.endDate && (
                            <Text style={styles.text}>
                                End Date: {data.rfpDates.endDate}
                            </Text>
                        )}
                    </View>
                )}
        </Page>
    </Document>
);

const Preview = ({ data, onSubmit, isSubmitting }) => {
    const [sendTo, setSendTo] = useState("");
    const [sendMethod, setSendMethod] = useState("email");
    const [emailError, setEmailError] = useState("");

    // Safeguard against undefined data
    const safeData = {
        company: data.company || {},
        requirement: data.requirement || {},
        scopeOfWork: data.scopeOfWork || {},
        boq: data.boq || [],
        evaluationCriteria: data.evaluationCriteria || [],
        financials: data.financials || {},
        generalTerms: data.generalTerms || [],
        specialTerms: data.specialTerms || {},
        documents: data.documents || [],
        contact: data.contact || {},
        vendors: data.vendors || [],
        rfpDates: data.rfpDates || {},
        logo: data.logo || null,
    };

    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const handleSendClick = () => {
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
    };

    // Check if essential data is present
    const isFormComplete = () => {
        const requiredSections = [
            safeData.company.name,
            safeData.company.address,
            safeData.company.businessType,
            safeData.requirement.projectName,
            safeData.requirement.purpose,
            safeData.scopeOfWork.description,
            safeData.contact.name,
            safeData.contact.email,
            safeData.rfpDates.startDate,
            safeData.rfpDates.endDate,
        ];

        return requiredSections.every((item) => Boolean(item));
    };

    return (
        <div className="component-container">
            <h2 class="font-bold mb-4">Preview & Submit</h2>
            <p className="section-description mb-4">
                Review your RFP before submitting it. You can download a PDF
                copy, send it via email, or share a WhatsApp link.
            </p>

            {!isFormComplete() && (
                <div className="alert alert-warning mb-4">
                    <i className="fas fa-exclamation-triangle"></i> Some
                    sections are not complete. It's recommended to fill all
                    sections before submitting.
                </div>
            )}

            <div className="card mb-4">
                <div className="card-header">
                    <h4>RFP Summary</h4>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="summary-item mb-2">
                                <label>Company Name: &nbsp;</label>
                                <span>
                                    {safeData.company.name || "Not set"}
                                </span>
                            </div>
                            <div className="summary-item mb-2">
                                <label>Project: &nbsp;</label>
                                <span>
                                    {safeData.requirement.projectName ||
                                        "Not set"}
                                </span>
                            </div>
                            <div className="summary-item mb-2">
                                <label>Items:</label>
                                <span>{safeData.boq.length} items</span>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="summary-item">
                                <label>RFP Start Date:</label>
                                <span>
                                    {safeData.rfpDates.startDate || "Not set"}
                                </span>
                            </div>
                            <div className="summary-item">
                                <label>RFP End Date:</label>
                                <span>
                                    {safeData.rfpDates.endDate || "Not set"}
                                </span>
                            </div>
                            <div className="summary-item mb-2">
                                <label>Vendors:  </label>
                                <span>{safeData.vendors?.length} vendors</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="document-preview-container">
                <h4>Document Preview</h4>
                <div className="preview-scroll">
                    <div className="document-preview">
                        <div className="document-header">
                            {safeData.logo && (
                                <img
                                    src={URL.createObjectURL(safeData.logo)}
                                    alt="Company Logo"
                                    className="company-logo"
                                />
                            )}
                            <h2>
                                {safeData.requirement.projectName ||
                                    "RFP Document"}
                            </h2>
                        </div>

                        {/* Company Introduction Section */}
                        <div className="section">
                            <h3>1. Company Introduction</h3>
                            <p>
                                {safeData.company.name || "[Company Name]"}{" "}
                                incorporated under Indian Companies Act, 1956,
                                having its office at{" "}
                                {safeData.company.address || "[Address]"},
                                herein after referred to as "Company" which
                                expression shall unless repugnant to the context
                                or meaning thereof and include its
                                administrators and successors in interest of the
                                First Part.
                            </p>
                            <p>
                                Company is in the business of{" "}
                                {safeData.company.businessType ||
                                    "[Business Type]"}
                            </p>
                        </div>

                        {/* About Requirement Section */}
                        {safeData.requirement.projectName && (
                            <div className="section">
                                <h3>2. About the Requirement</h3>
                                <p>
                                    {safeData.company.name || "[Company Name]"}{" "}
                                    is working{" "}
                                    {safeData.requirement.projectName} for the
                                    purpose of{" "}
                                    {safeData.requirement.purpose ||
                                        "[Purpose]"}
                                    . As per the{" "}
                                    {safeData.requirement.projectName}{" "}
                                    requirement, we are inviting the vendor to
                                    quote for the same with best matching the
                                    requirement. We have listed the requirement
                                    in the document and the vendor is expected
                                    to quote for items and also mentioned the
                                    deviations the changes if any.
                                </p>
                            </div>
                        )}

                        {/* Scope of Work Section */}
                        {safeData.scopeOfWork.description && (
                            <div className="section">
                                <h3>3. Scope of Work</h3>
                                <p>{safeData.scopeOfWork.description}</p>
                            </div>
                        )}

                        {/* BOQ Section */}
                        {safeData.boq.length > 0 && (
                            <div className="section">
                                <h3>4. Bill of Quantities (BOQ)</h3>
                                <div className="table-responsive">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Description</th>
                                                <th>UOM</th>
                                                <th>Qty</th>
                                                <th>Target Price</th>
                                                <th>Specification</th>
                                                <th>Remarks</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {safeData.boq.map((item, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        {item.description || ""}
                                                    </td>
                                                    <td>{item.uom || ""}</td>
                                                    <td>
                                                        {item.quantity || ""}
                                                    </td>
                                                    <td>
                                                        {item.targetPrice || ""}
                                                    </td>
                                                    <td>
                                                        {item.specification ||
                                                            ""}
                                                    </td>
                                                    <td>
                                                        {item.remarks || ""}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* Continue with other sections */}

                        {/* Display more sections as needed */}

                        {/* Contact Section */}
                        {safeData.contact.name && (
                            <div className="section">
                                <h3>10. Contact</h3>
                                <p>Name: {safeData.contact.name}</p>
                                <p>
                                    Email:{" "}
                                    {safeData.contact.email ||
                                        "[Email not provided]"}
                                </p>
                                <p>
                                    Phone:{" "}
                                    {safeData.contact.phone ||
                                        "[Phone not provided]"}
                                </p>
                            </div>
                        )}

                        {/* RFP Dates Section */}
                        {(safeData.rfpDates.startDate ||
                            safeData.rfpDates.endDate) && (
                            <div className="section">
                                <h3>RFP Timeline</h3>
                                {safeData.rfpDates.startDate && (
                                    <p>
                                        Start Date:{" "}
                                        {safeData.rfpDates.startDate}
                                    </p>
                                )}
                                {safeData.rfpDates.endDate && (
                                    <p>End Date: {safeData.rfpDates.endDate}</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="card mt-4">
                <div className="card-header">
                    <h4>Send RFP</h4>
                </div>
                <div className="card-body">
                    <div className="form-group">
                        <label>Delivery Method</label>
                        <div className="send-method-options">
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="sendMethod"
                                    id="sendEmail"
                                    value="email"
                                    checked={sendMethod === "email"}
                                    onChange={() => setSendMethod("email")}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="sendEmail"
                                >
                                    <i className="fas fa-envelope"></i> Send via
                                    Email
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="sendMethod"
                                    id="sendWhatsApp"
                                    value="whatsapp"
                                    checked={sendMethod === "whatsapp"}
                                    onChange={() => setSendMethod("whatsapp")}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="sendWhatsApp"
                                >
                                    <i className="fab fa-whatsapp"></i> Share
                                    via WhatsApp
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="sendMethod"
                                    id="downloadPdf"
                                    value="download"
                                    checked={sendMethod === "download"}
                                    onChange={() => setSendMethod("download")}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="downloadPdf"
                                >
                                    <i className="fas fa-file-pdf"></i> Download
                                    PDF
                                </label>
                            </div>
                        </div>
                    </div>

                    {sendMethod === "email" && (
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
                                <div className="invalid-feedback">
                                    {emailError}
                                </div>
                            )}
                        </div>
                    )}

                    {sendMethod === "whatsapp" && (
                        <div className="form-group">
                            <label htmlFor="phoneNumber">WhatsApp Number</label>
                            <input
                                type="text"
                                id="phoneNumber"
                                className="form-control"
                                value={sendTo}
                                onChange={(e) => setSendTo(e.target.value)}
                                placeholder="Enter WhatsApp number with country code"
                            />
                        </div>
                    )}

                    {sendMethod === "download" && (
                        <div className="download-pdf-btn">
                            <PDFDownloadLink
                                document={<RFPDocument data={safeData} />}
                                fileName={`${
                                    safeData.requirement.projectName || "RFP"
                                }_Document.pdf`}
                                className="btn btn-primary"
                            >
                                {({ blob, url, loading, error }) =>
                                    loading
                                        ? "Generating PDF..."
                                        : "Download PDF"
                                }
                            </PDFDownloadLink>
                        </div>
                    )}
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
                {(sendMethod === "email" || sendMethod === "whatsapp") && (
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
