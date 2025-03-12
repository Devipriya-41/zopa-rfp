import React from "react";
import logo from "../../../../public/assets/zopa-logo.svg";

const PreviewDocument = ({ data }) => {
    console.log(data?.contact?.logo, "ddadda");
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
                <img
                    src={
                        data?.contact?.logo
                            ? URL.createObjectURL(data.contact.logo)
                            : logo
                    }
                    alt="Logo Preview"
                    className="max-w-[60px] max-h-[60px] rounded-lg shadow-md"
                />
                <h2>{data.requirement.projectName || "RFP Document"}</h2>
            </div>

            <div className="section">
                <h3>1. Company Introduction</h3>
                <p>
                    <span className="font-bold capitalize">
                        {data.company.name}
                    </span>{" "}
                    incorporated under Indian Companies Act, 1956, having its
                    office at{" "}
                    <span className="font-bold capitalize">
                        {data.company.address}
                    </span>
                    , herein after referred to as "Company" which expression
                    shall unless repugnant to the context or meaning thereof and
                    include its administrators and successors in interest of the
                    First Part.
                </p>
                <p>
                    Company is in the business of{" "}
                    <span className="font-bold capitalize">
                        {data.company.businessType}
                    </span>
                </p>
            </div>

            {data.requirement.projectName && (
                <div className="section">
                    <h3>2. About the Requirement</h3>
                    <p>
                        <span className="font-bold capitalize">
                            {" "}
                            {data.company.name}
                        </span>
                        is working{" "}
                        <span className="font-bold capitalize">
                            {data.requirement.projectName}
                        </span>{" "}
                        for the purpose of{" "}
                        <span className="font-semibold capitalize">
                            {data.requirement.purpose}
                        </span>{" "}
                        . As per the{" "}
                        <span className="font-bold capitalize">
                            {data.requirement.projectName}
                        </span>{" "}
                        requirement, we are inviting the vendor to quote for the
                        same with best matching the requirement. We have listed
                        the requirement in the document and the vendor is
                        expected to quote for items and also mentioned the
                        deviations the changes if any.
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
                        <p className="capitalize">
                            <strong>Budget Type:&nbsp; </strong>
                            {data.financials.budgetType}
                        </p>
                    )}

                    {data.financials.budgetMin && (
                        <p>
                            <strong>Minimum Budget:&nbsp; </strong>
                            {data.financials.currency}{" "}
                            {data.financials.budgetMin}
                        </p>
                    )}

                    {data.financials.budgetMax && (
                        <p>
                            <strong>Maximum Budget:&nbsp; </strong>{" "}
                            {data.financials.currency}{" "}
                            {data.financials.budgetMax}
                        </p>
                    )}

                    {data.financials.currency && (
                        <p>
                            <strong>Currency:&nbsp; </strong>{" "}
                            {data.financials.currency}
                        </p>
                    )}

                    {data.financials.financialNotes && (
                        <p className="capitalize">
                            <strong>Financial Notes:&nbsp; </strong>{" "}
                            {data.financials.financialNotes}
                        </p>
                    )}

                    {data.financials.paymentTerms && (
                        <p className="capitalize">
                            <strong>Payment Terms:&nbsp; </strong>{" "}
                            {data.financials.paymentTerms}
                        </p>
                    )}

                    {data.financials.pbgAmount && (
                        <p>
                            <strong>
                                PBG (Performance Bank Guarantee):&nbsp;{" "}
                            </strong>{" "}
                            {data.financials.currency} &nbsp;
                            {data.financials.pbgAmount}
                        </p>
                    )}
                    {data.financials.pricingModel && (
                        <p className="capitalize">
                            <strong>Pricing Model:&nbsp; </strong>{" "}
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

            {/* Contact Section (Footer) */}
            <footer className="bg-gray-100 py-6 mt-10 border-t border-gray-300 shadow-md">
                <div className="max-w-5xl mx-auto px-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                        📞 Contact Information
                    </h3>

                    {data.contact.contactName ||
                    data.contact.contactTitle ||
                    data.contact.contactDepartment ||
                    data.contact.contactEmail ||
                    data.contact.contactPhone ||
                    data.contact.contactAddress ||
                    data.contact.contactCity ? (
                        <div className="grid sm:grid-cols-2 gap-4 text-gray-700">
                            {data.contact.contactName && (
                                <p>
                                    <strong className="text-gray-900">
                                        👤 Contact Name:
                                    </strong>{" "}
                                    {data.contact.contactName}
                                </p>
                            )}
                            {data.contact.contactTitle && (
                                <p>
                                    <strong className="text-gray-900">
                                        🏢 Title:
                                    </strong>{" "}
                                    {data.contact.contactTitle}
                                </p>
                            )}
                            {data.contact.contactDepartment && (
                                <p>
                                    <strong className="text-gray-900">
                                        📂 Department:
                                    </strong>{" "}
                                    {data.contact.contactDepartment}
                                </p>
                            )}
                            {data.contact.contactEmail && (
                                <p>
                                    <strong className="text-gray-900">
                                        📧 Email:
                                    </strong>{" "}
                                    <a
                                        href={`mailto:${data.contact.contactEmail}`}
                                        className="text-blue-600 hover:underline"
                                    >
                                        {data.contact.contactEmail}
                                    </a>
                                </p>
                            )}
                            {data.contact.contactPhone && (
                                <p>
                                    <strong className="text-gray-900">
                                        📞 Phone:
                                    </strong>{" "}
                                    <a
                                        href={`tel:${data.contact.contactPhone}`}
                                        className="text-blue-600 hover:underline"
                                    >
                                        {data.contact.contactPhone}
                                    </a>
                                </p>
                            )}
                            {(data.contact.contactAddress ||
                                data.contact.contactCity) && (
                                <p>
                                    <strong className="text-gray-900">
                                        📍 Address:
                                    </strong>{" "}
                                    {data.contact.contactAddress},{" "}
                                    {data.contact.contactCity}
                                </p>
                            )}
                        </div>
                    ) : (
                        <div className="text-center text-gray-600">
                            <p>For more details, please contact:</p>
                            <p className="font-semibold text-gray-800">
                                Support Team
                            </p>
                            <p className="text-gray-700">
                                📧{" "}
                                <a
                                    href="mailto:support@example.com"
                                    className="text-blue-600 hover:underline"
                                >
                                    support@example.com
                                </a>
                            </p>
                            <p className="text-gray-700">
                                📞{" "}
                                <a
                                    href="tel:+1234567890"
                                    className="text-blue-600 hover:underline"
                                >
                                    +123 456 7890
                                </a>
                            </p>
                            <p className="text-gray-700">
                                📍 123 Business St, City, Country
                            </p>
                        </div>
                    )}
                </div>
            </footer>
        </div>
    );
};

export default PreviewDocument;
