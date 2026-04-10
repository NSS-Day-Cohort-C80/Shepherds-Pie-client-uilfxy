import { useNavigate } from "react-router-dom";
import { createOrder } from "../../services/orderService";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./Welcome.css";

export const Welcome = ({ currentUser }) => {
  const navigate = useNavigate();

  const handleCreateOrder = async () => {
    const newOrder = await createOrder({
      createdBy: currentUser.id,
      tableNumber: 0,
      deliveredBy: 0,
      timeStamp: new Date(),
      tip: 0,
    });

    localStorage.setItem(
      "shepherd_user",
      JSON.stringify({
        id: currentUser.id,
        activeOrderId: newOrder.id,
      })
    );

    navigate("/order");
  };

  return (
    <div className="welcome-page">
      <Container className="py-5">
        <Card className="welcome-card border-0 shadow-lg">
          <Card.Body className="text-center">
            <h1 className="welcome-title">Welcome to</h1>

            <img
              src="/PizzaLogo.png"
              alt="Shepherds Pie Logo"
              className="welcome-logo"
            />

            <Button
              variant="success"
              className="welcome-btn"
              onClick={handleCreateOrder}
            >
              Start Order
            </Button>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};