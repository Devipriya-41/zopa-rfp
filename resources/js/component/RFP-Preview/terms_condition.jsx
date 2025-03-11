import React from "react";

const TermsAndConditionsPopup = ({
    showTermsPopup,
    setShowTermsPopup,
    termsAccepted,
    setTermsAccepted,
    handleConfirmSubmit,
}) => {
    if (!showTermsPopup) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-11/12 max-w-2xl max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">Terms and Conditions</h2>
                <div className="mb-4 border border-gray-200 p-4 rounded-lg bg-gray-50 h-64 overflow-y-auto">
                    <h3 className="font-semibold mb-2">1. General Terms</h3>
                    <p className="mb-3">
                        By submitting this RFP, you agree that all information
                        provided is accurate and complete.
                    </p>

                    <h3 className="font-semibold mb-2">2. Confidentiality</h3>
                    <p className="mb-3">
                        You acknowledge that all information provided is
                        accurate and that you have the necessary authorization
                        to submit requests. We store the information for quality
                        and monitoring purposes. We are not responsible for
                        errors, omissions, or any decisions made based on the
                        tool's output. Unauthorized use, modification, or
                        distribution of the tool is prohibited. We reserve the
                        right to update or modify these terms at any time.
                        Continued use of the tool constitutes acceptance of the
                        latest terms.
                    </p>
                </div>

                <div className="mb-4">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={termsAccepted}
                            onChange={() => setTermsAccepted(!termsAccepted)}
                            className="mr-2 h-5 w-5"
                        />
                        <span>I accept the terms and conditions</span>
                    </label>
                </div>

                <div className="flex justify-end space-x-3">
                    <button
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={() => setShowTermsPopup(false)}
                    >
                        Cancel
                    </button>
                    <button
                        className={`px-4 py-2 rounded-md text-white transition-colors ${
                            termsAccepted
                                ? "bg-blue-500 hover:bg-blue-600"
                                : "bg-gray-400 cursor-not-allowed"
                        }`}
                        onClick={handleConfirmSubmit}
                        disabled={!termsAccepted}
                    >
                        Confirm & Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TermsAndConditionsPopup;
