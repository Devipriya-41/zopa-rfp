import React, { useState, useRef } from "react";
import * as XLSX from "xlsx";

const BOQ = ({ data, onChange, errors }) => {
    const [item, setItem] = useState({
        description: "",
        uom: "",
        qty: "",
        targetPrice: "",
        specification: "",
        remarks: "",
    });

    const [itemErrors, setItemErrors] = useState({});
    const [uploadedFile, setUploadedFile] = useState(null);
    const fileInputRef = useRef(null);

    const uomOptions = [
        "Each",
        "Pair",
        "Dozen",
        "Box",
        "Pack",
        "Set",
        "Kit",
        "Unit",
        "Meter",
        "Foot",
        "Inch",
        "Kilogram",
        "Gram",
        "Liter",
        "Gallon",
        "Hour",
        "Day",
        "Week",
        "Month",
        "Year",
    ];

    const handleItemChange = (e) => {
        const { name, value } = e.target;
        setItem({
            ...item,
            [name]: value,
        });
    };

    const validateItem = () => {
        const errors = {};
        if (!item.description) errors.description = "Description is required";
        if (!item.uom) errors.uom = "UOM is required";
        if (!item.qty) errors.qty = "Quantity is required";
        if (item.qty && isNaN(item.qty))
            errors.qty = "Quantity must be a number";
        if (item.targetPrice && isNaN(item.targetPrice))
            errors.targetPrice = "Target price must be a number";

        setItemErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const addItem = () => {
        if (validateItem()) {
            const newData = [...data, { ...item }];
            onChange(newData);
            setItem({
                description: "",
                uom: "",
                qty: "",
                targetPrice: "",
                specification: "",
                remarks: "",
            });
            setItemErrors({});
        }
    };

    const removeItem = (index) => {
        const newData = data.filter((_, i) => i !== index);
        onChange(newData);
    };

    const handleBulkUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const workbook = XLSX.read(event.target.result, {
                        type: "binary",
                    });
                    const sheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[sheetName];
                    const jsonData = XLSX.utils.sheet_to_json(worksheet, {
                        header: 1,
                    });

                    // Convert JSON data to BOQ items
                    const items = jsonData.slice(1).map((row) => ({
                        description: row[0] || "",
                        uom: row[1] || "",
                        qty: row[2] || "",
                        targetPrice: row[3] || "",
                        specification: row[4] || "",
                        remarks: row[5] || "",
                    }));

                    onChange([...data, ...items]);
                    setUploadedFile(file.name); // Track uploaded file
                } catch (error) {
                    alert(
                        "Error parsing file. Please make sure it's in the correct format."
                    );
                }
            };
            reader.readAsBinaryString(file);
        }
    };

    const removeUploadedFile = () => {
        setUploadedFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };
    return (
        <div className="component-container">
            <h2>4. BOQ/BOM (Bill of Quantities)</h2>
            <p className="section-description text-[#666] mb-2">
                Add items or services required for this RFP. You can add items
                individually or upload a bulk list.
            </p>
            <div className="card mb-4">
                <div className="card-header font-bold">
                    <h4>Add New Item</h4>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="description">
                                    Description{" "}
                                    <span className="required">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="description"
                                    name="description"
                                    className={`form-control ${
                                        itemErrors.description ? "error" : ""
                                    }`}
                                    value={item.description}
                                    onChange={handleItemChange}
                                    placeholder="Item or service description"
                                />
                                {itemErrors.description && (
                                    <div className="error-message">
                                        {itemErrors.description}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="uom">
                                    Unit of Measurement{" "}
                                    <span className="required">*</span>
                                </label>
                                <select
                                    id="uom"
                                    name="uom"
                                    className={`form-control ${
                                        itemErrors.uom ? "error" : ""
                                    }`}
                                    value={item.uom}
                                    onChange={handleItemChange}
                                >
                                    <option value="">-- Select UOM --</option>
                                    {uomOptions.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                                {itemErrors.uom && (
                                    <div className="error-message">
                                        {itemErrors.uom}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4">
                            <div className="form-group">
                                <label htmlFor="qty">
                                    Quantity <span className="required">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="qty"
                                    name="qty"
                                    className={`form-control ${
                                        itemErrors.qty ? "error" : ""
                                    }`}
                                    value={item.qty}
                                    onChange={handleItemChange}
                                    placeholder="Required quantity"
                                />
                                {itemErrors.qty && (
                                    <div className="error-message">
                                        {itemErrors.qty}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <label htmlFor="targetPrice">
                                    Target Price
                                </label>
                                <input
                                    type="text"
                                    id="targetPrice"
                                    name="targetPrice"
                                    className={`form-control ${
                                        itemErrors.targetPrice ? "error" : ""
                                    }`}
                                    value={item.targetPrice}
                                    onChange={handleItemChange}
                                    placeholder="Expected price (optional)"
                                />
                                {itemErrors.targetPrice && (
                                    <div className="error-message">
                                        {itemErrors.targetPrice}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <label htmlFor="specification">
                                    Specification
                                </label>
                                <input
                                    type="text"
                                    id="specification"
                                    name="specification"
                                    className="form-control"
                                    value={item.specification}
                                    onChange={handleItemChange}
                                    placeholder="Item specifications"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="remarks">Remarks</label>
                        <textarea
                            id="remarks"
                            name="remarks"
                            className="form-control"
                            value={item.remarks}
                            onChange={handleItemChange}
                            placeholder="Any additional information about this item"
                        />
                    </div>

                    <button className="btn btn-success" onClick={addItem}>
                        <i className="fas fa-plus-circle"></i> Add Item
                    </button>
                </div>
            </div>

            {/* <div className="bulk-upload-section mb-4">
                <h4>Bulk Upload</h4>
                <p>Upload a CSV or Excel file with your items list.</p>
                <div className="custom-file mb-3 btn btn-primary">
                    <input
                        type="file"
                        className="custom-file-input"
                        id="bulkUpload"
                        accept=".csv,.xlsx"
                        onChange={handleBulkUpload}
                        placeholder="Upload file"
                    />
                    <label className="custom-file-label" htmlFor="bulkUpload">
                        {uploadedFile ? uploadedFile : "Choose file"}
                    </label>
                </div>
                {uploadedFile && (
                    <button
                        className="btn btn-danger btn-sm"
                        onClick={removeUploadedFile}
                    >
                        <i className="fas fa-trash"></i> Remove File
                    </button>
                )}
                <div>
                    <small className="form-text text-muted">
                        Download a{" "}
                        <a
                            href="/sample-boq.xlsx" // Path to the sample file in the public folder
                            download="sample-boq.xlsx"
                        >
                            template file
                        </a>{" "}
                        to see the required format.
                    </small>
                </div>
            </div> */}
            <div className="bulk-upload-section mb-4">
                <h4>Bulk Upload</h4>
                <p>Upload a CSV or Excel file with your items list.</p>
                <div className="custom-file mb-3">
                    <label className="btn btn-primary">
                        <input
                            type="file"
                            className="custom-file-input"
                            id="bulkUpload"
                            accept=".csv,.xlsx"
                            onChange={handleBulkUpload}
                            style={{ display: "none" }}
                            ref={fileInputRef}
                        />
                        {uploadedFile ? uploadedFile : "Choose file"}
                    </label>
                </div>
                {uploadedFile && (
                    <button
                        className="btn btn-danger btn-sm"
                        onClick={removeUploadedFile}
                    >
                        <i className="fas fa-trash"></i> Remove File
                    </button>
                )}
                <div>
                    <small className="form-text text-muted">
                        Download a{" "}
                        <a href="/sample-boq.xlsx" download="sample-boq.xlsx">
                            template file
                        </a>{" "}
                        to see the required format.
                    </small>
                </div>
            </div>

            {data.length > 0 && (
                <div className="table-responsive">
                    <h4>Added Items</h4>
                    <table className="table table-bordered table-hover">
                        <thead className="thead-light">
                            <tr>
                                <th>Description</th>
                                <th>UOM</th>
                                <th>Qty</th>
                                <th>Target Price</th>
                                <th>Specification</th>
                                <th>Remarks</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.description}</td>
                                    <td>{item.uom}</td>
                                    <td>{item.qty}</td>
                                    <td>{item.targetPrice}</td>
                                    <td>{item.specification}</td>
                                    <td>{item.remarks}</td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => removeItem(index)}
                                            title="Remove Item"
                                        >
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <div className="btn-group">
                <button
                    className="btn btn-secondary"
                    onClick={() =>
                        document
                            .querySelector(".sidebar-nav li:nth-child(3)")
                            .click()
                    }
                >
                    Previous: Scope of Work
                </button>
                <button
                    className="btn btn-primary"
                    onClick={() =>
                        document
                            .querySelector(".sidebar-nav li:nth-child(5)")
                            .click()
                    }
                >
                    Next: Evaluation Criteria
                </button>
            </div>
        </div>
    );
};

export default BOQ;
