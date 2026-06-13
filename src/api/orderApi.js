import API from "./axios";

export const orderApi = {
  /**
   * Fetches all live backend orders
   */
  getAllOrders: async () => {
    const response = await API.get("/orders/all");
    return response.data;
  },

  /**
   * Updates an order's status by tracking ID
   * @param {string} trackingId 
   * @param {string} status 
   */
  updateStatus: async (trackingId, status) => {
    const response = await API.put(`/orders/update/${trackingId}`, { status });
    return response.data;
  }
};