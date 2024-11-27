import axios from "axios";

export const getAllImportHistory = async (search, limit) => {
  let res = {};
  if (search?.length > 0) {
    res = await axios.get(
      `${process.env.REACT_APP_API_URL}/importHistory/get-all?filter=name&filter=${search}&limit=${limit}`
    );
  } else {
    res = await axios.get(
      `${process.env.REACT_APP_API_URL}/importHistory/get-all?limit=${limit}`
    );
  }
  return res.data;
};

export const getDetailsImportHistory = async (id) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/importHistory/get-details/${id}`
  );
  return res.data;
};

export const getAllTypeImportHistory = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/importHistory/get-all-type`
  );
  return res.data;
};

export const addProductStock = async (
  productId,
  importedQuantity,
  importedAt
) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/importHistory/add-stock`,
      {
        productId,
        importedQuantity,
        importedAt,
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error adding product stock:", error);
    return { status: "ERR", message: error.message };
  }
};
