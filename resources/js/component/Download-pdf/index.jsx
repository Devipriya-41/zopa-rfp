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
import "react-toastify/dist/ReactToastify.css";



const RFPDocument = ({ data }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                {data.logo && (
                    <Image
                        style={styles.logo}
                        src={URL.createObjectURL(data.logo)}
                    />
                )}
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
            {data.requirement.projectName && (
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
            {data.scopeOfWork.description && (
                <View style={styles.section}>
                    <Text style={styles.subheader}>3. Scope of Work</Text>
                    <Text style={styles.text}>
                        {data.scopeOfWork.description}
                    </Text>
                </View>
            )}

            {/* BOQ (Bill of Quantities) */}
            {data.boq.length > 0 && (
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

            {data.evaluationCriteria.length > 0 && (
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
                                    {item.criteria || ""}
                                </Text>
                                <Text
                                    style={[styles.tableCell, { width: "75%" }]}
                                >
                                    {item.description || ""}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>
            )}

            {/* Contact Information */}
            {data.contact.name && (
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
        </Page>
    </Document>
);
