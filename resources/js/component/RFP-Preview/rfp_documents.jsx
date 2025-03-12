import React from "react";
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Image,
} from "@react-pdf/renderer";
import { Svg, Path } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
    page: {
        fontFamily: "Helvetica",
        position: "relative",
        paddingTop: 80,
        paddingBottom: 70,
        paddingHorizontal: 30,
    },
    contentContainer: {
        width: "100%",
    },
    section: {
        marginVertical: 10,
        paddingHorizontal: 10,
    },
    header: {
        fontSize: 18,
        textAlign: "center",
        marginBottom: 20,
        color: "#0056b3",
    },
    subheader: {
        fontSize: 16,
        marginBottom: 10,
        borderBottom: "1 solid #cccccc",
        paddingBottom: 5,
        color: "#0056b3",
    },
    text: {
        fontSize: 12,
        marginBottom: 5,
    },
    letterheadHeader: {
        position: "absolute",
        top: 20,
        left: 30,
        right: 30,
        height: 50,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1 solid #2B69A9",
        paddingBottom: 10,
    },
    headerLogoSection: {
        width: "60%",
        flexDirection: "row",
        alignItems: "center",
    },
    headerRightSection: {
        width: "40%",
        textAlign: "right",
    },
    companyLogo: {
        width: 50,
        height: 40,
        marginRight: 10,
    },
    companyName: {
        color: "#2B69A9",
        fontSize: 16,
        fontWeight: "bold",
    },
    companySlogan: {
        color: "#666666",
        fontSize: 10,
        marginTop: 3,
    },
    letterheadFooter: {
        position: "absolute",
        bottom: 30,
        left: 30,
        right: 30,
        height: 30,
        borderTopWidth: 1,
        borderTopColor: "#2B69A9",
        paddingTop: 10,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    footerItem: {
        flexDirection: "row",
        alignItems: "center",
    },
    footerText: {
        fontSize: 9,
        color: "#666666",
    },
    pageNumber: {
        position: "absolute",
        fontSize: 9,
        bottom: 20,
        left: 0,
        right: 0,
        textAlign: "center",
        color: "#666666",
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
    divider: {
        borderTopWidth: 1,
        borderTopColor: "#cccccc",
        marginVertical: 5,
    },
});

// Phone icon SVG
const PhoneIcon = () => (
    <Svg width={14} height={14} viewBox="0 0 24 24" fill="#2B69A9">
        <Path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.59l2.2-2.21c.28-.26.36-.65.25-1C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z" />
    </Svg>
);

const AddressIcon = () => (
    <Svg width={14} height={14} viewBox="0 0 24 24" fill="#2B69A9">
        <Path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    </Svg>
);

const EmailIcon = () => (
    <Svg width={14} height={14} viewBox="0 0 24 24" fill="#2B69A9">
        <Path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </Svg>
);

const LetterheadHeader = ({ logoBase64, companyName, docTitle }) => (
    console.log(docTitle, "docTitle"),
    (
        <View style={styles.letterheadHeader} fixed>
            <View style={styles.headerLogoSection}>
                {logoBase64 ? (
                    <Image src={logoBase64} style={styles.companyLogo} />
                ) : (
                    <View>
                        <Text style={styles.companyName}>
                            {companyName || "COMPANY NAME"}
                        </Text>
                    </View>
                )}

                <View>
                    <Text style={styles.companyName}>
                        {companyName || "COMPANY NAME"}
                    </Text>
                </View>
            </View>
            {/* <View style={styles.headerRightSection}>
                <Text style={{ fontSize: 10, color: "#2B69A9" }}>
                    Doc: {docTitle || "RFP Document"}
                </Text>
            </View> */}
        </View>
    )
);

const LetterheadFooter = ({ contact }) => (
    <View style={styles.letterheadFooter} fixed>
        <View style={styles.footerItem}>
            <PhoneIcon />
            <Text style={styles.footerText}>
                {contact?.contactPhone || "1234 5678 9XXX"}
            </Text>
        </View>
        <View style={styles.footerItem}>
            <AddressIcon />
            <Text style={styles.footerText}>
                {contact?.contactAddress || "Address Here"} &nbsp;
                {contact?.contactCity}
            </Text>
        </View>
        <View style={styles.footerItem}>
            <EmailIcon />
            <Text style={styles.footerText}>
                {contact?.contactEmail || "Mail Here"}
            </Text>
        </View>
        <Text
            style={styles.pageNumber}
            render={({ pageNumber, totalPages }) =>
                `Page ${pageNumber} of ${totalPages}`
            }
            fixed
        />
    </View>
);

const RFPDocument = ({ data, logoBase64 }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            {/* Fixed Header */}
            <LetterheadHeader
                logoBase64={logoBase64}
                companyName={data.company?.name}
                docTitle={data.requirement.projectName}
            />

            {/* Content Container */}
            <View style={styles.contentContainer}>
                {/* Company Introduction */}
                <View style={styles.section}>
                    <Text style={styles.subheader}>
                        1. Company Introduction
                    </Text>
                    <Text style={styles.text}>
                        {data.company?.name || "[Company Name]"} incorporated
                        under Indian Companies Act, 1956, having its office at{" "}
                        {data.company?.address || "[Address]"}, herein after
                        referred to as "Company" which expression shall unless
                        repugnant to the context or meaning thereof and include
                        its administrators and successors in interest of the
                        First Part.
                    </Text>
                    <Text style={styles.text}>
                        Company is in the business of{" "}
                        {data.company?.businessType || "[Business Type]"}
                    </Text>
                </View>

                {/* About the Requirement */}
                {data.requirement?.projectName && (
                    <View style={styles.section}>
                        <Text style={styles.subheader}>
                            2. About the Requirement
                        </Text>
                        <Text style={styles.text}>
                            {data.company?.name || "[Company Name]"} is working{" "}
                            {data.requirement.projectName}
                            for the purpose of{" "}
                            {data.requirement.purpose || "[Purpose]"}. As per
                            the {data.requirement.projectName} requirement, we
                            are inviting the vendor to quote for the same with
                            best matching the requirement.
                        </Text>
                    </View>
                )}

                {/* Scope of Work */}
                {data.scopeOfWork && data.scopeOfWork.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.subheader}>3. Scope of Work</Text>
                        {data.scopeOfWork.map((item, index) => (
                            <Text key={index} style={styles.text}>
                                {item.text}
                            </Text>
                        ))}
                    </View>
                )}

                {/* BOQ */}
                {data.boq && data.boq.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.subheader}>
                            4. Bill of Quantities (BOQ)
                        </Text>
                        <View style={styles.table}>
                            <View style={styles.tableRow} fixed>
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
                                        style={[
                                            styles.tableCell,
                                            { width: "25%" },
                                        ]}
                                    >
                                        {item.description || ""}
                                    </Text>
                                    <Text
                                        style={[
                                            styles.tableCell,
                                            { width: "10%" },
                                        ]}
                                    >
                                        {item.uom || ""}
                                    </Text>
                                    <Text
                                        style={[
                                            styles.tableCell,
                                            { width: "10%" },
                                        ]}
                                    >
                                        {item.quantity || ""}
                                    </Text>
                                    <Text
                                        style={[
                                            styles.tableCell,
                                            { width: "15%" },
                                        ]}
                                    >
                                        {item.targetPrice || ""}
                                    </Text>
                                    <Text
                                        style={[
                                            styles.tableCell,
                                            { width: "20%" },
                                        ]}
                                    >
                                        {item.specification || ""}
                                    </Text>
                                    <Text
                                        style={[
                                            styles.tableCell,
                                            { width: "20%" },
                                        ]}
                                    >
                                        {item.remarks || ""}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </View>
                )}

                {/* Evaluation Criteria */}
                {data.evaluationCriteria &&
                    data.evaluationCriteria.length > 0 && (
                        <View style={styles.section} break>
                            <Text style={styles.subheader}>
                                5. Evaluation Criteria
                            </Text>
                            <View style={styles.table}>
                                <View style={styles.tableRow} fixed>
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
                                            style={[
                                                styles.tableCell,
                                                { width: "25%" },
                                            ]}
                                        >
                                            {typeof item === "string"
                                                ? `Criteria ${index + 1}`
                                                : item.criteria || ""}
                                        </Text>
                                        <Text
                                            style={[
                                                styles.tableCell,
                                                { width: "75%" },
                                            ]}
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

                        {data.financials.budgetMin &&
                            data.financials.budgetMax && (
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
                    </View>
                )}

                {/* General Terms and Conditions */}
                {data.generalTerms && (
                    <View style={styles.section} break>
                        <Text style={styles.subheader}>
                            7. General Terms and Conditions
                        </Text>
                        <Text style={styles.text}>
                            {data.generalTerms || ""}
                        </Text>
                    </View>
                )}

                {/* Special Terms and Conditions */}
                {data.specialTerms && (
                    <View style={styles.section}>
                        <Text style={styles.subheader}>
                            8. Special Terms and Conditions
                        </Text>
                        <Text style={styles.text}>{data.specialTerms}</Text>
                    </View>
                )}

                {/* Documents */}
                {data.documents && data.documents.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.subheader}>
                            9. Documents to Share
                        </Text>
                        {data.documents.map((doc, index) => (
                            <Text key={index} style={styles.text}>
                                {doc.name}
                            </Text>
                        ))}
                    </View>
                )}

                {/* Contact */}
                {data.contact && (
                    <View style={styles.section}>
                        <Text style={styles.subheader}>10. Contact</Text>
                        <Text style={styles.text}>
                            Name: {data.contact.contactName}
                        </Text>
                        <Text style={styles.text}>
                            Email:{" "}
                            {data.contact.contactEmail ||
                                "[Email not provided]"}
                        </Text>
                        <Text style={styles.text}>
                            Phone:{" "}
                            {data.contact.contactPhone ||
                                "[Phone not provided]"}
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
                            {data.contact.contactTitle ||
                                "[Title not provided]"}
                        </Text>
                    </View>
                )}

                {/* RFP Timeline */}
                {(data.rfpDates?.startDate || data.rfpDates?.endDate) && (
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
            </View>

            {/* Fixed Footer */}
            <LetterheadFooter contact={data.contact} />
        </Page>
    </Document>
);

export default RFPDocument;
