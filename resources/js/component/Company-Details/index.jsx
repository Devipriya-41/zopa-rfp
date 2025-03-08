import React from 'react';

const CompanyIntroduction = ({ data, onChange, errors }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({
      ...data,
      [name]: value
    });
  };

  return (
    <div className="component-container">
      <h2>1. Company Introduction</h2>
      <p className="section-description">
        This information will be used to introduce your company in the RFP document.
      </p>
      
      <div className="form-group">
        <label htmlFor="companyName">Enter company name <span className="required">*</span></label>
        <input
          type="text"
          id="companyName"
          name="name"
          className={`form-control ${errors.companyName ? 'error' : ''}`}
          value={data.name}
          onChange={handleChange}
          placeholder="e.g., Acme Corporation"
        />
        {errors.companyName && <div className="error-message">{errors.companyName}</div>}
      </div>
      
      <div className="form-group">
        <label htmlFor="companyAddress">Enter Address <span className="required">*</span></label>
        <textarea
          id="companyAddress"
          name="address"
          className={`form-control ${errors.companyAddress ? 'error' : ''}`}
          value={data.address}
          onChange={handleChange}
          placeholder="e.g., 123 Business Park, Suite 456, Mumbai, Maharashtra, 400001"
        />
        {errors.companyAddress && <div className="error-message">{errors.companyAddress}</div>}
      </div>
      
      <div className="form-group">
        <label htmlFor="businessType">Business type <span className="required">*</span></label>
        <input
          type="text"
          id="businessType"
          name="businessType"
          className={`form-control ${errors.businessType ? 'error' : ''}`}
          value={data.businessType}
          onChange={handleChange}
          placeholder="e.g., Software Development, Manufacturing, Consulting"
        />
        {errors.businessType && <div className="error-message">{errors.businessType}</div>}
      </div>
      
      <div className="preview-output">
        <h4>Preview:</h4>
        <div className="preview-text">
          {data.name && data.address && (
            <p>
              <strong>{data.name}</strong> incorporated under Indian Companies Act, 1956, having its office at <strong>{data.address}</strong>, 
              herein after referred to as "Company" which expression shall unless repugnant to the context or meaning thereof and include its 
              administrators and successors in interest of the First Part.
            </p>
          )}
          {data.businessType && (
            <p>Company is in the business of <strong>{data.businessType}</strong></p>
          )}
        </div>
      </div>
      
      <div className="btn-group">
        <div></div> {/* Empty div for flex spacing */}
        <button className="btn btn-primary" onClick={() => document.querySelector('.sidebar-nav li:nth-child(2)').click()}>
          Next: About the Requirement
        </button>
      </div>
    </div>
  );
};

export default CompanyIntroduction;