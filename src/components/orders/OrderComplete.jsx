import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./OrderComplete.css";

export const OrderComplete = () => {
  const navigate = useNavigate();

  return (
    <div className="order-complete-page">
      <Container className="py-5">
        <Card className="order-complete-card shadow-lg border-0">
          <Card.Body className="order-complete-body text-center">
            <h1 className="order-complete-title">Order Complete!</h1>
            <p className="order-complete-subtitle">
              Your order has been placed successfully.
            </p>
    <div className="order-complete-actions">
    <Button
    variant="outline-success"
    className="order-complete-btn"
    type="button"
    onClick={() => navigate("/order")}
     >
    Start New Order
    </Button>

    <Button
    variant="success"
    className="order-complete-btn"
    type="button"
    onClick={() => navigate("/")}
    >
    Back Home
    </Button>
    </div>
            
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};