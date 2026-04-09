import { useEffect, useState } from "react";
import { PizzaForm } from "./PizzaForm";
import { DineInOrDeliveryForm } from "./DineInOrDeliveryForm";
import Form from 'react-bootstrap/Form';
export const Orders = ({ currentUser, orderData, setOrderData }) => {
  return (
    <Form>
    
    <Form.Group className="mb-3">
        <DineInOrDeliveryForm
          currentUser={currentUser}
          orderData={orderData}
          setOrderData={setOrderData}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <PizzaForm
          currentUser={currentUser}
          orderData={orderData}
          setOrderData={setOrderData}
        />
      </Form.Group>
    </Form>
  );
  };


{/* function BasicExample() {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default BasicExample; */}