const backendURL =
  window.location.port === "3000" ? "http://localhost" : "http://27.107.7.11";
const backendPORT = window.location.port === "3000" ? "7000" : "8030";

const backendHTTP = `${backendURL}:${backendPORT}`;

export const httpApi = {
  salesData: `${backendHTTP}/api/sales-data`,
  productMixData: `${backendHTTP}/api/product-mix-data`,
  top5SP: `${backendHTTP}/api/top-selling`,
  payables: `${backendHTTP}/api/payables`,
  distributorOrigin: `${backendHTTP}/api/distributor-origin`,
  otp_sender: `${backendHTTP}/api/get/otp`,
  otp_verify: `${backendHTTP}/api/verify/otp`,
  getFile: `${backendHTTP}/api/serve/document`,
};
