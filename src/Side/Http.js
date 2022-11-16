
const backendURL = "http://localhost";
const backendPORT = "7000";

const backendHTTP = `${backendURL}:${backendPORT}`;

export const httpApi = {
    salesData: `${backendHTTP}/api/sales-data`,
    productMixData: `${backendHTTP}/api/product-mix-data`,
    top5SP: `${backendHTTP}/api/top-selling`,
    payables: `${backendHTTP}/api/payables`,
    distributorOrigin: `${backendHTTP}/api/distributor-origin`

};

