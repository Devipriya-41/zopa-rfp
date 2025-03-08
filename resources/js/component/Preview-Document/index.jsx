import React from "react";

const PreviewDocument = ({ data }) => {
    if (!data.company.name) {
        return (
            <div className="empty-preview">
                Enter information to see preview
            </div>
        );
    }

    return (
        <div className="document-preview">
            <div className="document-header">
                {data.logo && (
                    <img
                        src={URL.createObjectURL(data.logo)}
                        alt="Company Logo"
                        className="company-logo"
                    />
                )}
                <h2>{data.requirement.projectName || "RFP Document"}</h2>
            </div>

            <div className="section">
                <h3>1. Company Introduction</h3>
                <p>
                    {data.company.name} incorporated under Indian Companies Act,
                    1956, having its office at {data.company.address}, herein
                    after referred to as "Company" which expression shall unless
                    repugnant to the context or meaning thereof and include its
                    administrators and successors in interest of the First Part.
                </p>
                <p>Company is in the business of {data.company.businessType}</p>
            </div>

            {data.requirement.projectName && (
                <div className="section">
                    <h3>2. About the Requirement</h3>
                    <p>
                        {data.company.name} is working{" "}
                        {data.requirement.projectName} for the purpose of{" "}
                        {data.requirement.purpose}. As per the{" "}
                        {data.requirement.projectName} requirement, we are
                        inviting the vendor to quote for the same with best
                        matching the requirement. We have listed the requirement
                        in the document and the vendor is expected to quote for
                        items and also mentioned the deviations the changes if
                        any.
                    </p>
                </div>
            )}

            {data.scope.deliverables?.length > 0 && (
                <div className="section">
                    <h3>3. Scope of Work</h3>
                    <ul>
                        {data.scope.deliverables.map((deliverable, index) => (
                            <li key={index}>{deliverable.text}</li>
                        ))}
                    </ul>
                </div>
            )}

            {data.boq.length > 0 && (
                <div className="section">
                    <h3>4. BOQ/BOM</h3>
                    <table className="boq-table">
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
                            {data.boq.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.description}</td>
                                    <td>{item.uom}</td>
                                    <td>{item.qty}</td>
                                    <td>{item.targetPrice}</td>
                                    <td>{item.specification}</td>
                                    <td>{item.remarks}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {data.evaluationCriteria.length > 0 && (
                <div className="section">
                    <h3>5. Evaluation Criteria</h3>
                    <ul>
                        {data.evaluationCriteria.map((criteria, index) => (
                            <li key={index}>{criteria}</li>
                        ))}
                    </ul>
                </div>
            )}

            {data.financials?.budgetType?.length > 0 && (
                <div className="section">
                    <h3>6. Financials</h3>

                    {data.financials.budgetType && (
                        <p>
                            <strong>Budget Type:</strong>
                            {data.financials.budgetType}
                        </p>
                    )}

                    {data.financials.budgetMin && (
                        <p>
                            <strong>Minimum Budget:</strong>
                            {data.financials.currency}{" "}
                            {data.financials.budgetMin}
                        </p>
                    )}

                    {data.financials.budgetMax && (
                        <p>
                            <strong>Maximum Budget:</strong>{" "}
                            {data.financials.currency}{" "}
                            {data.financials.budgetMax}
                        </p>
                    )}

                    {data.financials.currency && (
                        <p>
                            <strong>Currency:</strong>{" "}
                            {data.financials.currency}
                        </p>
                    )}

                    {data.financials.financialNotes && (
                        <p>
                            <strong>Financial Notes:</strong>{" "}
                            {data.financials.financialNotes}
                        </p>
                    )}

                    {data.financials.paymentTerms && (
                        <p>
                            <strong>Payment Terms:</strong>{" "}
                            {data.financials.paymentTerms}
                        </p>
                    )}

                    {data.financials.pbgAmount && (
                        <p>
                            <strong>PBG (Performance Bank Guarantee):</strong>{" "}
                            {data.financials.currency} &nbsp;
                            {data.financials.pbgAmount}
                        </p>
                    )}
                    {data.financials.pricingModel && (
                        <p>
                            <strong>Pricing Model:</strong>{" "}
                            {data.financials.pricingModel}
                        </p>
                    )}
                </div>
            )}

            {data.generalTerms && data.generalTerms.generalTerms && (
                <div className="section">
                    <h3>7. General Terms & Conditions</h3>
                    <p>{data.generalTerms.generalTerms}</p>
                </div>
            )}

            {data.specialTerms && data.specialTerms.specialTerms && (
                <div className="section">
                    <h3>8. Special Terms & Conditions</h3>
                    <p>{data.specialTerms.specialTerms}</p>
                </div>
            )}

            {Array.isArray(data.documentsToShare) &&
                data.documentsToShare.length > 0 && (
                    <div className="section">
                        <h3>9. Documents to Share</h3>
                        <ul>
                            {data.documentsToShare.map((doc, index) => (
                                <li key={index}>
                                    {doc.name || "Unnamed Document"}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

            {(data.contact.contactName ||
                data.contact.contactTitle ||
                data.contact.contactDepartment ||
                data.contact.contactEmail ||
                data.contact.contactPhone ||
                data.contact.contactAddress ||
                data.contact.contactCity) && (
                <div className="section">
                    <h3>10. Contact</h3>
                    {data.contact.contactName && (
                        <p>
                            <strong>Contact Name:</strong>{" "}
                            {data.contact.contactName}
                        </p>
                    )}
                    {data.contact.contactTitle && (
                        <p>
                            <strong>Title:</strong> {data.contact.contactTitle}
                        </p>
                    )}
                    {data.contact.contactDepartment && (
                        <p>
                            <strong>Department:</strong>{" "}
                            {data.contact.contactDepartment}
                        </p>
                    )}
                    {data.contact.contactEmail && (
                        <p>
                            <strong>Email:</strong> {data.contact.contactEmail}
                        </p>
                    )}
                    {data.contact.contactPhone && (
                        <p>
                            <strong>Phone:</strong> {data.contact.contactPhone}
                        </p>
                    )}
                    {(data.contact.contactAddress ||
                        data.contact.contactCity) && (
                        <p>
                            <strong>Address:</strong>{" "}
                            {data.contact.contactAddress &&
                                `${data.contact.contactAddress}, `}
                            {data.contact.contactCity}
                        </p>
                    )}
                </div>
            )}

            {(data.vendors.selectionMethod ||
                data.vendors.vendorRequirements.length > 0 ||
                data.vendors.vendorSelectionProcess) && (
                <div className="section">
                    <h3>11. Vendor Selection</h3>

                    {data.vendors.selectionMethod && (
                        <p>
                            <strong>Selection Method:</strong>{" "}
                            {data.vendors.selectionMethod}
                        </p>
                    )}

                    {data.vendors.vendorRequirements.length > 0 && (
                        <div>
                            <strong>Vendor Requirements:</strong>
                            <ul>
                                {data.vendors.vendorRequirements.map(
                                    (requirement, index) => (
                                        <li key={index}>{requirement}</li>
                                    )
                                )}
                            </ul>
                        </div>
                    )}

                    {data.vendors.vendorSelectionProcess && (
                        <p>
                            <strong>Selection Process:</strong>{" "}
                            {data.vendors.vendorSelectionProcess}
                        </p>
                    )}
                </div>
            )}

            {/* Continue with other sections similarly */}

            {data.contact.name && (
                <div className="section">
                    <h3>10. Contact</h3>
                    <p>Name: {data.contact.name}</p>
                    <p>Email: {data.contact.email}</p>
                    <p>Phone: {data.contact.phone}</p>
                </div>
            )}

            {data.rfpDates.startDate && data.rfpDates.endDate && (
                <div className="section">
                    <h3>RFP Dates</h3>
                    <p>Start Date: {data.rfpDates.startDate}</p>
                    <p>End Date: {data.rfpDates.endDate}</p>
                    <p>
                        <em>
                            Quote link will be valid for vendor only till end
                            date
                        </em>
                    </p>
                </div>
            )}
        </div>
    );
};

export default PreviewDocument;
