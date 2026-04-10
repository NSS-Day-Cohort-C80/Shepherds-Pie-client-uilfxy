import { getAllSizes } from "../../services/sizeService";
import { getAllSauces } from "../../services/sauceService";
import { getAllCheeses } from "../../services/cheeseService";
import { getAllToppings } from "../../services/toppingsService";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./PizzaForm.css";

export const PizzaForm = ({ currentUser, orderData, setOrderData }) => {
  const [allSizes, setAllSizes] = useState([]);
  const [allSauces, setAllSauces] = useState([]);
  const [allCheeses, setAllCheeses] = useState([]);
  const [allToppings, setAllToppings] = useState([]);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [currentPizza, setCurrentPizza] = useState({
    sizeId: 0,
    sauceId: 0,
    cheeseId: 0,
    toppingIds: [],
  });

  const { index } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getAllSizes().then(setAllSizes);
    getAllSauces().then(setAllSauces);
    getAllCheeses().then(setAllCheeses);
    getAllToppings().then(setAllToppings);
  }, []);

  const handleSizeSelection = (event) => {
    setCurrentPizza({
      ...currentPizza,
      sizeId: parseInt(event.target.value),
    });
  };

  const handleSauceSelection = (event) => {
    setCurrentPizza({
      ...currentPizza,
      sauceId: parseInt(event.target.value),
    });
  };

  const handleCheeseSelection = (event) => {
    setCurrentPizza({
      ...currentPizza,
      cheeseId: parseInt(event.target.value),
    });
  };

  const handleToppingsSelection = (event) => {
    const toppingId = parseInt(event.target.value);

    let updatedToppings = [];

    if (event.target.checked) {
      updatedToppings = [...selectedToppings, toppingId];
    } else {
      updatedToppings = selectedToppings.filter((id) => id !== toppingId);
    }

    setSelectedToppings(updatedToppings);
    setCurrentPizza({
      ...currentPizza,
      toppingIds: updatedToppings,
    });
  };

  const handleAddEntree = () => {
    const orderDataCopy = { ...orderData, entrees: [...orderData.entrees] };
    orderDataCopy.entrees.push(currentPizza);
    setOrderData(orderDataCopy);
    setCurrentPizza({ sizeId: 0, sauceId: 0, cheeseId: 0, toppingIds: [] });
    setSelectedToppings([]);
  };

  const handleUpdateOrder = () => {
    const orderDataCopy = { ...orderData, entrees: [...orderData.entrees] };
    orderDataCopy.entrees[index] = currentPizza;
    setOrderData(orderDataCopy);
  };

  return (
    <Card className="pizza-section-card">
      <Card.Body className="pizza-section-body">
        <div className="mb-4">
          <h4 className="pizza-section-title mb-1">Pizza Details</h4>
          <p className="pizza-section-subtitle mb-0">
            Build your pizza by choosing size, sauce, cheese, and toppings
          </p>
        </div>

        <Row className="g-3 mb-4">
          <Col md={4}>
            <Form.Group>
              <Form.Label className="pizza-form-label" htmlFor="size-options">
                Pick Your Size
              </Form.Label>
              <Form.Select
                className="pizza-select"
                id="size-options"
                value={currentPizza.sizeId}
                onChange={handleSizeSelection}
              >
                <option value={0}>Select size</option>
                {allSizes.map((size) => (
                  <option value={size.id} key={size.id}>
                    {size.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group>
              <Form.Label className="pizza-form-label" htmlFor="sauce-options">
                Pick Your Sauce
              </Form.Label>
              <Form.Select
                className="pizza-select"
                id="sauce-options"
                value={currentPizza.sauceId}
                onChange={handleSauceSelection}
              >
                <option value={0}>Select sauce</option>
                {allSauces.map((sauce) => (
                  <option value={sauce.id} key={sauce.id}>
                    {sauce.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group>
              <Form.Label className="pizza-form-label" htmlFor="cheese-options">
                Pick Your Cheese
              </Form.Label>
              <Form.Select
                className="pizza-select"
                id="cheese-options"
                value={currentPizza.cheeseId}
                onChange={handleCheeseSelection}
              >
                <option value={0}>Select cheese</option>
                {allCheeses.map((cheese) => (
                  <option value={cheese.id} key={cheese.id}>
                    {cheese.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Card className="pizza-toppings-card border-0 mb-4">
          <Card.Body className="pizza-toppings-body">
            <Form.Label className="pizza-form-label mb-3">
              Choose Your Toppings
            </Form.Label>
            <Row xs={1} sm={2} md={2}>
              {allToppings.map((topping) => (
                <Col key={topping.id} className="mb-2">
                  <Form.Check
                    type="checkbox"
                    id={`topping-${topping.id}`}
                    label={topping.name}
                    value={topping.id}
                    checked={currentPizza.toppingIds.includes(topping.id)}
                    onChange={handleToppingsSelection}
                  />
                </Col>
              ))}
            </Row>
          </Card.Body>
        </Card>

        <div className="pizza-button-row">
          <Button
            variant="success"
            type="button"
            onClick={() => navigate("/review")}
          >
            Review Order
          </Button>

          {index ? (
            <Button variant="success" type="button" onClick={handleUpdateOrder}>
              Update Order
            </Button>
          ) : (
            <Button variant="success" type="button" onClick={handleAddEntree}>
              Add Entree
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};