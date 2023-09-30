import { useState } from "react";
import { Row, Container, Col, Form, Button } from "react-bootstrap";
import { getDatabase, push, ref, set } from "firebase/database";
import CustomButton from "../utils/CustomButton";
const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const db = getDatabase();

  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangeMessage = (e) => {
    setMessage(e.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const contactRef = ref(db, "contacts/");
    const data = {
      name,
      email,
      message,
    };
    push(contactRef, data);
    setName("")
    setEmail("")
    setMessage("")
  };

  return (
    <Container>
      <Row>
        <Col md={6}>
          <header className="headerPink">
            <h1>Let's make something awesome together!</h1>
          </header>
          <p>
            Pop Nosh is here to provide you with more information, answer any
            questions you may have left about our Premium Gourmet Popcorn and
            Nuts. Drop us a line, or give us a heads up if you’re interested in
            visiting us.
          </p>
        </Col>
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Your name"
                value={name}
                onChange={handleChangeName}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Your email"
                value={email}
                onChange={handleChangeEmail}
              />
            </Form.Group>
            <Form.Group controlId="message">
              <Form.Label>Message</Form.Label>
              <Form.Control
                type="textarea"
                name="message"
                placeholder="Your message"
                value={message}
                onChange={handleChangeMessage}
              />
            </Form.Group>
            <span className="width-all-sides">
              <CustomButton
                className="btnW"
                title={"Submit"}
                color={"#FFF"}
                background={"#f01130"}
                width={"200px"}
              />
            </span>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactUs;
