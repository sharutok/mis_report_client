import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { animated, config, useSpring } from "react-spring";
import { httpApi } from "../../Side/Http";
export default function PayablesDataSet() {
  const [payablesData, setPayablesData] = useState({
    opening: "",
    closing: "",
  });
  const { cust_id, date_time_string } = useParams();
  const getData = async () => {
    try {
      const data = await axios.post(httpApi.payables, {
        cust_id,
        date_time_string,
      });
      const { opening_bal, closing_bal } = data.data;
      setPayablesData({
        opening: opening_bal,
        closing: closing_bal,
      });
    } catch (error) {
      console.log("🧨");
    }
  };

  function payables(value) {
    var val = Math.abs(value);
    //Cr
    if (val >= 10000000) {
      val = (val / 100000).toFixed(1);
    }
    //Lac
    else if (val >= 100000) {
      val = (val / 100000).toFixed(2);
    }
    //10K
    else if (val >= 10000) {
      val = (val / 100000).toFixed(1);
    } //1k
    else if (val >= 10000) {
      val = (val / 1000000).toFixed(2);
    }
    //<1k
    else if (val >= 1000) {
      val = (val / 10000).toFixed(2);
    } else if (val >= 100) {
      val = 0;
    }
    return Number(val);
  }

  useEffect(() => {
    getData();
  }, []);

  const { number } = useSpring({
    from: { number: 0 },
    number: payables(payablesData.opening),
    delay: 100,
    config: config.molasses,
  });
  const { number1 } = useSpring({
    from: { number1: 0 },
    number1: payables(payablesData.closing),
    delay: 100,
    config: config.molasses,
  });

  let thead = ["Opening Balance", "Closing Balance"];
  return (
    <div>
      <h4>Payables (in ₹ Lakhs )*</h4>
      <table>
        <thead>
          <tr>
            {thead.map((x, i) => {
              return <th key={i}>{x}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ fontSize: "5rem" }} className="growth-text">
              <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>
            </td>
            <td style={{ fontSize: "5rem" }} className="growth-text">
              <animated.div>{number1.to((n) => n.toFixed(0))}</animated.div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
