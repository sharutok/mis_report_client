import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { IconDownload } from "@tabler/icons";
import { useParams } from "react-router-dom";
import "../Styles/AppBar.css";
import moment from "moment";
export default function BarApp() {
  const { date_time_string } = useParams();
  const convertStringToDate = new Date(Number(date_time_string))
    .toISOString()
    .substring(0, 10);

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
      return require(`../../../../../ADMIS_PDF/${val + cust_id}.pdf`);
    }
    if ((window.location.port = "3030")) {
      return require(`../../../../../ADMIS_PDF/${val + cust_id}.pdf`);
    }
  };

  const { cust_id } = useParams();
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
              href={require(`../../../../../ADMIS_PDF/${val + cust_id}.pdf`)}
              download
            >
              <Button
                className="button-download-ledger btn-download"
                endIcon={<IconDownload />}
                variant="contained"
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
