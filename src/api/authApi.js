import API from "./axios.js";

const toApiError = (error, fallbackMessage) => {
    const apiError = new Error(error.response?.data?.message || fallbackMessage);
    apiError.status = error.response?.status;
    apiError.data = error.response?.data;
    return apiError;
};

/**
 * 1. Register a fresh Vendor Multi-Tenant Account
 * Payload expectations: { name, email, password, businessName, storeSlug }
 */
export const registerVendor = async (vendorData) => {
    try {
        const response = await API.post("/auth/register", vendorData);
        return response.data; // Expected: { success: true, token, user }
    } catch (error) {
        throw toApiError(error, "Registration pipeline aborted by security gate.");
    }
};

/**
 * 2. Authenticate existing Vendor Credentials
 * Payload expectations: { email, password }
 */
export const loginVendor = async (credentials) => {
    try {
        const response = await API.post("/auth/login", credentials);
        return response.data; // Expected: { success: true, token, user }
    } catch (error) {
        throw toApiError(error, "Authentication rejected: Invalid credentials.");
    }
};

/**
 * 3. Verify Account Ownership via 6-Digit OTP Token
 * Payload expectations: { email, otp }
 */
export const verifyOtp = async (verificationData) => {
    try {
        const response = await API.post("/auth/verify-otp", verificationData);
        return response.data; // Expected: { success: true, message }
    } catch (error) {
        throw toApiError(error, "Verification token rejected or expired.");
    }
};

/**
 * 4. Redistribute a Fresh Verification Token via SMTP Gateway
 * Payload expectations: { email }
 */
export const resendOtp = async (emailData) => {
    try {
        const response = await API.post("/auth/resend-otp", emailData);
        return response.data; // Expected: { success: true, message }
    } catch (error) {
        throw toApiError(error, "Failed to redistribute fresh security tokens.");
    }
};