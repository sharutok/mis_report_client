import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { IconDownload } from "@tabler/icons";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import "../Styles/AppBar.css";
import { httpApi } from "./Http";

export default function BarApp() {
  const { date_time_string, cust_id } = useParams();
  const convertStringToDate = new Date(Number(date_time_string))
    .toISOString()
    .substring(0, 10);
  /*
  function getFinancialYear(_month) {
    let prev_month = moment().subtract(1, "months").format("MMMM");
    if (["January", "February", "March"].includes(prev_month)) {
      const current_year = moment().subtract(1, "years").format("YYYY");
      const last_year = moment(new Date(current_year))
        .subtract(1, "years")
        .format("YYYY");
      return [last_year, current_year];
    }
    return [
      moment().subtract(1, "y").calendar().substring(6, 10),
      moment().format("YYYY"),
    ];
  }

  const f = getFinancialYear(moment().format("MMMM"));

  const a = "ADMIS_LEDGER";
  const b = moment(convertStringToDate).format("MMM").toUpperCase();
  const c = moment(f[1]).format("YY");
  const d = moment(f[1]).add(1, "years").format("YY");
  const val = `${a}_${b}-${c}-${d}_`;

  console.log(val);

  const _ledger_pdf_ = () => {
    console.log(window.location.port);
    if ((window.location.port = "3000")) {
      return require(`  /${val + cust_id}.pdf`);
    }
    if ((window.location.port = "3030")) {
      return require(`../../../../../ADMIS_PDF/${val + cust_id}.pdf`);
    }
  };
*/
  async function getFile() {
    try {
      const response = await axios.get(
        httpApi.getFile + `/${cust_id}/${date_time_string}`
      );
      const { data, filename } = response.data;
      const blobData = base64ToBlob(data, "application/pdf");
      const url = window.URL.createObjectURL(blobData);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  }

  const base64ToBlob = (base64Data, contentType) => {
    const sliceSize = 512;
    const byteCharacters = atob(base64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);

      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          style={{
            backgroundColor: "#edede9",
            borderBottomLeftRadius: "20px",
            borderBottomRightRadius: "20px",
          }}
          position="static"
        >
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, mt: 1 }}
            >
              <img
                src={require("../Images/AWL_logo_new.png")}
                alt="ADOR"
                width={100}
              />
            </Typography>
            <Typography
              className="header"
              variant="h5"
              component="div"
              sx={{ flexGrow: 1, mt: 1 }}
            >
              Domestic Welding MIS Report – Distributor Dashboard
            </Typography>

            <a
              style={{ textDecoration: "none" }}
              className="Download"
              target="_blank"
              rel="noreferrer"
              download
            >
              <Button
                className="button-download-ledger btn-download"
                endIcon={<IconDownload />}
                variant="contained"
                onClick={() => getFile()}
              >
                Download Ledger
              </Button>
            </a>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
