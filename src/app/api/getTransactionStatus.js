const axios = require("axios");

export async function getTransactionStatus(transactionId) {
  const options = {
    method: "GET",
    url: `https://withpaper.com/api/v1/transaction-status/${transactionId}`,
    headers: {
      accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_PAPER_ID,
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
