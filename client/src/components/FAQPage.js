import React from "react";
import Footer from "./Footer";
import { Questions } from "../constants/faqs";
import "./style.css";

import { Collapse } from "antd";
const { Panel } = Collapse;
const FAQs = () => (
  <>
    <div className="faq-main">
      {Questions.map((items) => {
        return (
          <Collapse accordion key={items.Q}>
            <Panel header={items.Q} key="1">
              <p>{items.Ans}</p>
            </Panel>
          </Collapse>
        );
      })}
    </div>
    <Footer />
  </>
);
export default FAQs;
// export default function FAQs() {

//     return (

//     );
// }
