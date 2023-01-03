const backendURL = window.location.port === "3000" ? "http://localhost" : "http://14.143.203.75";
const backendPORT = window.location.port === "3000" ? "7000" : "3030";

const backendHTTP = `${backendURL}:${backendPORT}`;

export const httpApi = {
    salesData: `${backendHTTP}/api/sales-data`,
    productMixData: `${backendHTTP}/api/product-mix-data`,
    top5SP: `${backendHTTP}/api/top-selling`,
    payables: `${backendHTTP}/api/payables`,
    distributorOrigin: `${backendHTTP}/api/distributor-origin`,
    otp_sender: `${backendHTTP}/api/get/otp`,
    otp_verify: `${backendHTTP}/api/verify/otp`,
};


