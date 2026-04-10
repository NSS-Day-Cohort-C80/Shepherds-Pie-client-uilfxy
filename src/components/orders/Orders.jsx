import { useEffect, useState } from "react";
import { PizzaForm } from "./PizzaForm";
import { DineInOrDeliveryForm } from "./DineInOrDeliveryForm";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Orders.css";

export const Orders = ({ currentUser, orderData, setOrderData }) => {
  return (
    <Container className="form-container">
      <Row>
        <Col>
          <h2>Place an Order</h2>
        </Col>
      </Row>
      <Row>
        <Col className="mb-3 order-forms">
          <DineInOrDeliveryForm
            currentUser={currentUser}
            orderData={orderData}
            setOrderData={setOrderData}
          />
        </Col>
        <Col className="mb-3 order-forms">
          <PizzaForm
            currentUser={currentUser}
            orderData={orderData}
            setOrderData={setOrderData}
          />
        </Col>
      </Row>
    </Container>
  );
};
