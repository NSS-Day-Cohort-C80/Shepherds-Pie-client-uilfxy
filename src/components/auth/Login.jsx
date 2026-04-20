import { useState } from "react";
import { getEmployeeByEmail } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    getEmployeeByEmail(email).then((foundUsers) => {
      if (foundUsers.length === 1) {
        const user = foundUsers[0];

        localStorage.setItem(
          "shepherd_user",
          JSON.stringify({
            id: user.id,
          })
        );

        navigate("/");
      } else {
        window.alert("Invalid login");
      }
    });
  };

  return (
    <div className="login-page">
      <Container className="py-5">
        <Card className="login-card shadow-lg border-0">
          <Card.Body className="login-card-body">
            <div className="text-center mb-4">
              <h1 className="login-title">Welcome to Shepherd's Pie Pizza</h1>
              <p className="login-subtitle">Please sign in to start your order.</p>
            </div>

            <Form className="login-form" onSubmit={handleLogin}>
              <Form.Group className="mb-4">
                <Form.Label className="login-label" htmlFor="email-input">
                  Login
                </Form.Label>
                <Form.Control
                  id="email-input"
                  type="email"
                  value={email}
                  onChange={(evt) => setEmail(evt.target.value)}
                  className="login-input"
                  placeholder="Email address"
                  required
                  autoFocus
                />
              </Form.Group>

              <div className="login-button-row">
                <Button className="login-btn" variant="success" type="submit">
                  Sign In
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};