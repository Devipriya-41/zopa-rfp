import React, { useState } from "react";

const DocumentsToShare = ({ data, onChange, errors }) => {
    const [newDocument, setNewDocument] = useState("");

    // Predefined document options
    const predefinedDocuments = [
        { id: "quote", label: "Quote" },
        { id: "gst_certificate", label: "GST Certificate" },
        { id: "msme_declaration", label: "MSME Declaration" },
        { id: "serviceable_location", label: "List of Serviceable Location" },
        { id: "installation_base", label: "Total Installation Base" },
        { id: "license", label: "License for Supply/Performing the Work" },
        { id: "vas", label: "VAS" },
        { id: "escalation_matrix", label: "Escalation Matrix" },
        {
            id: "experience_document",
            label: "Experience Document – Client Details",
        },
    ];

    // Initialize documents if not exist
    const documents = data.documentsToShare || [];

    // Handle predefined document selection
    const handlePredefinedChange = (e) => {
        const { value, checked } = e.target;
        let updatedDocuments = [...documents];

        if (checked) {
            updatedDocuments = [
                ...updatedDocuments,
                { id: value, name: value },
            ];
        } else {
            updatedDocuments = updatedDocuments.filter(
                (doc) => doc.id !== value
            );
        }

        onChange({ ...data, documentsToShare: updatedDocuments });
    };

    // Handle adding a custom document
    const handleAddDocument = () => {
        if (newDocument.trim()) {
            const updatedDocuments = [
                ...documents,
                { id: Date.now(), name: newDocument },
            ];
            onChange({ ...data, documentsToShare: updatedDocuments });
            setNewDocument("");
        }
    };

    // Handle removing a document
    const handleRemoveDocument = (id) => {
        const updatedDocuments = documents.filter((doc) => doc.id !== id);
        onChange({ ...data, documentsToShare: updatedDocuments });
    };

    return (
        <div className="component-container">
            <h2 className="mb-2">Documents to Share</h2>
            <div className="card">
                <div className="card-header font-bold mb-3">
                    <h4>Add Documents</h4>
                </div>
                <div className="card-body">
                    <div className="text-sm mb-4">
                        Add documents that will be shared with vendors as part
                        of this RFP.
                    </div>

                    {/* Predefined Document Selection */}
                    <div>
                        <label className="text-sm font-medium">
                            Predefined Documents
                        </label>
                        <div className="mt-1 space-y-2">
                            {predefinedDocuments.map((doc) => (
                                <div key={doc.id} className="checkbox-group">
                                    <label className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            value={doc.label}
                                            checked={documents.some(
                                                (d) => d.name === doc.label
                                            )}
                                            onChange={handlePredefinedChange}
                                        />
                                        {doc.label}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Custom Document Addition */}
                    <div className="mt-4">
                        <label className="text-sm font-medium">
                            Custom Documents
                        </label>
                        <div className="flex gap-2 mt-1">
                            <input
                                type="text"
                                value={newDocument}
                                onChange={(e) => setNewDocument(e.target.value)}
                                placeholder="Add a custom document"
                                className="form-control flex-1"
                            />
                            <button
                                type="button"
                                onClick={handleAddDocument}
                                className="btn btn-primary"
                            >
                                <span>Add</span>
                            </button>
                        </div>
                    </div>

                    {/* Display Selected Documents */}
                    {documents.length > 0 ? (
                        <ul className="mt-3 space-y-2">
                            {documents.map((doc) => (
                                <li
                                    key={doc.id}
                                    className="flex items-center justify-between p-2 border rounded-md"
                                >
                                    <span>{doc.name}</span>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleRemoveDocument(doc.id)
                                        }
                                        className="btn btn-sm btn-outline-danger"
                                    >
                                        <span>Remove</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-muted mt-2">
                            No documents added yet. Select predefined options or
                            add custom documents.
                        </p>
                    )}
                </div>
            </div>

            <div className="btn-group">
                <button
                    className="btn btn-secondary"
                    onClick={() =>
                        document
                            .querySelector(".sidebar-nav li:nth-child(8)")
                            .click()
                    }
                >
                    Previous: Special Terms
                </button>
                <button
                    className="btn btn-primary"
                    onClick={() =>
                        document
                            .querySelector(".sidebar-nav li:nth-child(10)")
                            .click()
                    }
                >
                    Next: Contact
                </button>
            </div>
        </div>
    );
};

export default DocumentsToShare;
