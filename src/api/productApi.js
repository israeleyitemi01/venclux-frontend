import API from "./axios.js";

export const fetchVendorProductsApi = async () => {
  const response = await API.get("/products/list");
  return response.data;
};

// productData here will pass as FormData object containing files
export const createProductApi = async (formData) => {
  const response = await API.post("/products/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateProductApi = async (id, formData) => {
  const response = await API.put(`/products/update/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteProductApi = async (id) => {
  const response = await API.delete(`/products/delete/${id}`);
  return response.data;
};