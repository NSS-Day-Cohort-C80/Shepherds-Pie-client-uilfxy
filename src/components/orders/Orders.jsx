import { PizzaForm } from "./PizzaForm";
import { DineInOrDeliveryForm } from "./DineInOrDeliveryForm";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import "./Orders.css";

export const Orders = ({ currentUser, orderData, setOrderData }) => {
  return (
    <div className="orders-page">
      <Container className="py-5">
        <Card className="orders-card shadow-lg border-0">
          <Card.Body className="orders-card-body">
            <div className="text-center mb-4">
              <h1>Build Your Order</h1>
              <p className="orders-subtitle">
                Choose dine in or delivery, then customize your pizza.
              </p>
            </div>

            <Form>
              <DineInOrDeliveryForm
                currentUser={currentUser}
                orderData={orderData}
                setOrderData={setOrderData}
              />

              <PizzaForm
                currentUser={currentUser}
                orderData={orderData}
                setOrderData={setOrderData}
              />
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};