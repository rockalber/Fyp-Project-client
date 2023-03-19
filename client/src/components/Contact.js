import React from "react";
import Footer from "./Footer";
import { Button, Col, Form, Input, Row } from "antd";
import {
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
const { TextArea } = Input;
const MyFormItemContext = React.createContext([]);
function toArr(str) {
  return Array.isArray(str) ? str : [str];
}
const MyFormItemGroup = ({ prefix, children }) => {
  const prefixPath = React.useContext(MyFormItemContext);
  const concatPath = React.useMemo(
    () => [...prefixPath, ...toArr(prefix)],
    [prefixPath, prefix]
  );
  return (
    <MyFormItemContext.Provider value={concatPath}>
      {children}
    </MyFormItemContext.Provider>
  );
};
const MyFormItem = ({ name, ...props }) => {
  const prefixPath = React.useContext(MyFormItemContext);
  const concatName =
    name !== undefined ? [...prefixPath, ...toArr(name)] : undefined;
  return <Form.Item name={concatName} {...props} />;
};
const Contact = () => {
  const onFinish = (value) => {
    console.log(value);
  };
  return (
    <div className="">
      <div className="map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26969.895635347682!2d74.33903696085255!3d32.33234775304562!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391edba8a5016cab%3A0x951996f0e900144f!2sDaska%2C%20Sialkot%2C%20Punjab%2051010%2C%20Pakistan!5e0!3m2!1sen!2s!4v1678825095258!5m2!1sen!2s"
          width="100%"
          height="450"
          loading="lazy"
        ></iframe>
      </div>
      <div className="contact">
        <Row>
          <Col sm={24} md={12} lg={12} xl={12}>
            <Form name="form_item_path" layout="vertical" onFinish={onFinish}>
              <MyFormItem name="firstName" label="Full Name">
                <Input />
              </MyFormItem>
              <MyFormItem name="lastName" label="Email">
                <Input type="email" />
              </MyFormItem>

              <MyFormItem name="age" label="Message">
                <TextArea rows={4} />
              </MyFormItem>

              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form>
          </Col>
          <Col sm={24} md={12} lg={12} xl={12}>
            <div className="right">
              <h2>Contact Us</h2>
              <p>
                Claritas est etiam processus dynamicus, qui sequitur mutationem
                consuetudium lectorum. Mirum est notare quam littera gothica,
                quam nunc putamus parum claram anteposuerit litterarum formas
                human.
              </p>
              <ul>
                <li>
                  <EnvironmentOutlined />
                  <span>Daska, Sialkot</span>
                  Daska - 51010
                </li>
                <li>
                  <PhoneOutlined />
                  <span>0123456789</span>
                </li>
                <li>
                  <MailOutlined />
                  <span>test@test.com</span>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
