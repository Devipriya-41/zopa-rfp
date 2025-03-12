import React from "react";
import logo from "../../../../public/assets/zopa-logo.jpg";
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Image,
} from "@react-pdf/renderer";
import "react-toastify/dist/ReactToastify.css";

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
        width: 50,
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
    headerFooter: {
        position: "absolute",
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 30,
    },
    headerFooterTop: {
        position: "absolute",
        fontSize: 12,
        top: 30,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 30,
    },
    footerText: {
        textAlign: "center",
        width: "80%",
        fontSize: 10,
        marginVertical: 2,
    },
    headerLogo: {
        width: 60,
        height: 60,
    },
    footer: {
        borderTopWidth: 1,
        borderTopColor: "#ccc",
        marginTop: 10,
        paddingTop: 10,
        alignItems: "center",
        textAlign: "center",
        fontSize: 10,
    },
    footerHeader: {
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 6,
    },
    footerContent: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 3, // Spacing between elements
    },

    content: {
        flexGrow: 1,
    },
});
// import RFPDocument from "./rfp_documents";
const RFPDocument = ({ data, logoBase64 }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.headerFooterTop}>
                <View style={styles.headerLogo}>
                    {logoBase64 ? (
                        <Image src={logoBase64} style={styles.logo} />
                    ) : (
                        <Image src={logo} style={styles.logo} />
                    )}
                </View>
            </View>
            <View style={styles.section}>
                <Text style={styles.header}>
                    {data.requirement.projectName || "RFP Document"}
                </Text>
            </View>

            {/* Company Introduction */}
            <View style={styles.section}>
                <Text style={styles.subheader}>1. Company Introduction</Text>
                <Text style={styles.text}>
                    {data.company.name || "[Company Name]"} incorporated under
                    Indian Companies Act, 1956, having its office at{" "}
                    {data.company.address || "[Address]"}, herein after referred
                    to as "Company" which expression shall unless repugnant to
                    the context or meaning thereof and include its
                    administrators and successors in interest of the First Part.
                </Text>
                <Text style={styles.text}>
                    Company is in the business of{" "}
                    {data.company.businessType || "[Business Type]"}
                </Text>
            </View>

            {/* About the Requirement */}
            {data.requirement.projectName?.length > 0 && (
                <View style={styles.section}>
                    <Text style={styles.subheader}>
                        2. About the Requirement
                    </Text>
                    <Text style={styles.text}>
                        {data.company.name || "[Company Name]"} is working{" "}
                        {data.requirement.projectName}
                        for the purpose of{" "}
                        {data.requirement.purpose || "[Purpose]"}. As per the{" "}
                        {data.requirement.projectName} requirement, we are
                        inviting the vendor to quote for the same with best
                        matching the requirement.
                    </Text>
                </View>
            )}

            {/* Scope of Work */}
            {data.scopeOfWork?.length > 0 && (
                <View style={styles.section}>
                    <Text style={styles.subheader}>3. Scope of Work</Text>
                    {data.scopeOfWork.map((item, index) => (
                        <Text key={index} style={styles.text}>
                            {item.text}
                        </Text>
                    ))}
                </View>
            )}

            {/* BOQ (Bill of Quantities) */}
            {data.boq?.length > 0 && (
                <View style={styles.section}>
                    <Text style={styles.subheader}>
                        4. Bill of Quantities (BOQ)
                    </Text>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <Text
                                style={[
                                    styles.tableHeaderCell,
                                    { width: "25%" },
                                ]}
                            >
                                Description
                            </Text>
                            <Text
                                style={[
                                    styles.tableHeaderCell,
                                    { width: "10%" },
                                ]}
                            >
                                UOM
                            </Text>
                            <Text
                                style={[
                                    styles.tableHeaderCell,
                                    { width: "10%" },
                                ]}
                            >
                                Qty
                            </Text>
                            <Text
                                style={[
                                    styles.tableHeaderCell,
                                    { width: "15%" },
                                ]}
                            >
                                Target Price
                            </Text>
                            <Text
                                style={[
                                    styles.tableHeaderCell,
                                    { width: "20%" },
                                ]}
                            >
                                Specification
                            </Text>
                            <Text
                                style={[
                                    styles.tableHeaderCell,
                                    { width: "20%" },
                                ]}
                            >
                                Remarks
                            </Text>
                        </View>
                        {data.boq.map((item, index) => (
                            <View style={styles.tableRow} key={index}>
                                <Text
                                    style={[styles.tableCell, { width: "25%" }]}
                                >
                                    {item.description || ""}
                                </Text>
                                <Text
                                    style={[styles.tableCell, { width: "10%" }]}
                                >
                                    {item.uom || ""}
                                </Text>
                                <Text
                                    style={[styles.tableCell, { width: "10%" }]}
                                >
                                    {item.quantity || ""}
                                </Text>
                                <Text
                                    style={[styles.tableCell, { width: "15%" }]}
                                >
                                    {item.targetPrice || ""}
                                </Text>
                                <Text
                                    style={[styles.tableCell, { width: "20%" }]}
                                >
                                    {item.specification || ""}
                                </Text>
                                <Text
                                    style={[styles.tableCell, { width: "20%" }]}
                                >
                                    {item.remarks || ""}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>
            )}

            {/* Evaluation Criteria */}
            {data.evaluationCriteria?.length > 0 && (
                <View style={styles.section}>
                    <Text style={styles.subheader}>5. Evaluation Criteria</Text>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <Text
                                style={[
                                    styles.tableHeaderCell,
                                    { width: "25%" },
                                ]}
                            >
                                Criteria
                            </Text>
                            <Text
                                style={[
                                    styles.tableHeaderCell,
                                    { width: "75%" },
                                ]}
                            >
                                Description
                            </Text>
                        </View>
                        {data.evaluationCriteria.map((item, index) => (
                            <View style={styles.tableRow} key={index}>
                                <Text
                                    style={[styles.tableCell, { width: "25%" }]}
                                >
                                    {typeof item === "string"
                                        ? `Criteria ${index + 1}`
                                        : item.criteria || ""}
                                </Text>
                                <Text
                                    style={[styles.tableCell, { width: "75%" }]}
                                >
                                    {typeof item === "string"
                                        ? item
                                        : item.description || ""}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>
            )}

            {/* Financial Information */}
            {data.financials && (
                <View style={styles.section}>
                    <Text style={styles.subheader}>
                        6. Financial Information
                    </Text>

                    {data.financials.budgetType && (
                        <Text style={styles.text}>
                            Budget Type: {data.financials.budgetType}
                        </Text>
                    )}

                    {data.financials.budgetMin && data.financials.budgetMax && (
                        <Text style={styles.text}>
                            Budget Range: {data.financials.budgetMin} -{" "}
                            {data.financials.budgetMax}{" "}
                            {data.financials.currency}
                        </Text>
                    )}

                    {data.financials.currency && (
                        <Text style={styles.text}>
                            Currency: {data.financials.currency}
                        </Text>
                    )}

                    {data.financials.financialNotes && (
                        <Text style={styles.text}>
                            Financial Notes: {data.financials.financialNotes}
                        </Text>
                    )}

                    {data.financials.paymentTerms && (
                        <Text style={styles.text}>
                            Payment Terms: {data.financials.paymentTerms}
                        </Text>
                    )}

                    {data.financials.pbgAmount && (
                        <Text style={styles.text}>
                            PBG Amount: {data.financials.pbgAmount}{" "}
                            {data.financials.currency}
                        </Text>
                    )}

                    {data.financials.pbgNotes && (
                        <Text style={styles.text}>
                            PBG Notes: {data.financials.pbgNotes}
                        </Text>
                    )}
                </View>
            )}

            {/* generat Terms and COnditions */}
            {data.generalTerms && (
                <View style={styles.section}>
                    <Text style={styles.subheader}>
                        7. General Terms and Conditions
                    </Text>
                    <Text style={styles.text}>{data.generalTerms || ""}</Text>
                </View>
            )}

            {/* Special terms and conditions */}
            {data.specialTerms && (
                <View style={styles.section}>
                    <Text style={styles.subheader}>
                        8. Special Terms and Conditions
                    </Text>
                    <Text style={styles.text}>{data.specialTerms}</Text>
                </View>
            )}

            {/* Documents to Share */}
            {data.documents && data.documents.length > 0 && (
                <View style={styles.section}>
                    <Text style={styles.subheader}>9. Documents to Share</Text>
                    {data.documents.map((doc, index) => (
                        <Text key={index} style={styles.text}>
                            {doc.name}
                        </Text>
                    ))}
                </View>
            )}
            {/* Contact Information */}
            {data.contact && (
                <View style={styles.section}>
                    <Text style={styles.subheader}>10. Contact</Text>
                    <Text style={styles.text}>
                        Name: {data.contact.contactName}
                    </Text>
                    <Text style={styles.text}>
                        Email:{" "}
                        {data.contact.contactEmail || "[Email not provided]"}
                    </Text>
                    <Text style={styles.text}>
                        Phone:{" "}
                        {data.contact.contactPhone || "[Phone not provided]"}
                    </Text>
                    <Text style={styles.text}>
                        Address:{" "}
                        {data.contact.contactAddress ||
                            "[Address not provided]"}
                    </Text>
                    <Text style={styles.text}>
                        City:{" "}
                        {data.contact.contactCity || "[City not provided]"}
                    </Text>
                    <Text style={styles.text}>
                        Department:{" "}
                        {data.contact.contactDepartment ||
                            "[Department not provided]"}
                    </Text>
                    <Text style={styles.text}>
                        Title:{" "}
                        {data.contact.contactTitle || "[Title not provided]"}
                    </Text>
                </View>
            )}

            {/* Vendor Information */}
            {data?.vendors?.length > 0 && (
                <View style={styles.section}>
                    <Text style={styles.subheader}>11. Vendor Information</Text>

                    {data.vendors.selectionMethod && (
                        <Text style={styles.text}>
                            Selection Method: {data.vendors.selectionMethod}
                        </Text>
                    )}

                    {data.vendors.vendorRequirements &&
                        data.vendors.vendorRequirements.length > 0 && (
                            <View>
                                <Text style={styles.text}>
                                    Vendor Requirements:
                                </Text>
                                {data.vendors.vendorRequirements.map(
                                    (requirement, index) => (
                                        <Text key={index} style={styles.text}>
                                            - {requirement}
                                        </Text>
                                    )
                                )}
                            </View>
                        )}

                    {data.vendors.vendorSelectionProcess && (
                        <Text style={styles.text}>
                            Vendor Selection Process:{" "}
                            {data.vendors.vendorSelectionProcess}
                        </Text>
                    )}
                </View>
            )}

            {/* RFP Timeline */}
            {(data.rfpDates.startDate || data.rfpDates.endDate) && (
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

            {/* Footer  */}
            <View style={styles.footer}>
                <Text style={styles.footerHeader}>Contact Information</Text>

                {data.contact &&
                (data.contact.contactName ||
                    data.contact.contactTitle ||
                    data.contact.contactDepartment ||
                    data.contact.contactEmail ||
                    data.contact.contactPhone ||
                    data.contact.contactAddress ||
                    data.contact.contactCity) ? (
                    <View style={styles.footerContent}>
                        {data.contact.contactName && (
                            <Text style={styles.footerText}>
                                {data.contact.contactName}
                            </Text>
                        )}
                        {data.contact.contactTitle && (
                            <Text style={styles.footerText}>
                                {data.contact.contactTitle}
                            </Text>
                        )}
                        {data.contact.contactDepartment && (
                            <Text style={styles.footerText}>
                                {data.contact.contactDepartment}
                            </Text>
                        )}
                        {data.contact.contactEmail && (
                            <Text style={styles.footerText}>
                                {data.contact.contactEmail}
                            </Text>
                        )}
                        {data.contact.contactPhone && (
                            <Text style={styles.footerText}>
                                {data.contact.contactPhone}
                            </Text>
                        )}
                        {(data.contact.contactAddress ||
                            data.contact.contactCity) && (
                            <Text style={styles.footerText}>
                                {data.contact.contactAddress},{" "}
                                {data.contact.contactCity}
                            </Text>
                        )}
                    </View>
                ) : (
                    <View style={styles.footerContent}>
                        <Text style={styles.footerText}>
                            For more details, please contact:
                        </Text>
                        <Text style={styles.footerText}>Support Team</Text>
                        <Text style={styles.footerText}>
                            support@example.com
                        </Text>
                        <Text style={styles.footerText}>+123 456 7890</Text>
                        <Text style={styles.footerText}>
                            123 Business St, City, Country
                        </Text>
                    </View>
                )}
            </View>
        </Page>
    </Document>
);

export default RFPDocument;
