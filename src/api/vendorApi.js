import API from "./axios.js";

/**
 * Fetch a specific vendor's dynamic store setup and product catalogue arrays
 */
export const getCatalogData = async (storeSlug) => {
    try {
        const response = await API.get(`/storefront/${storeSlug}`);
        return response.data; // Expected: { success: true, businessName, deliveryFee, products: [] }
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to fetch store details.");
    }
};

/**
 * Dispatch validated transaction payload structures to your live backend engine
 */
export const executeStorefrontCheckout = async (storeSlug, checkoutPayload) => {
    try {
        const response = await API.post(`/storefront/${storeSlug}/checkout`, checkoutPayload);
        return response.data; // Expected: { success: true, trackingId }
    } catch (error) {
        throw new Error(error.response?.data?.message || "Checkout synchronization pipeline failed.");
    }
};