import { getAllSizes } from "../../services/sizeService";
import { getAllSauces } from "../../services/sauceService";
import { getAllCheeses } from "../../services/cheeseService";
import { getAllToppings } from "../../services/toppingsService";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./PizzaForm.css"

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
    <div>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="size-options">Pick Your Size:</Form.Label>
        <Form.Select
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

      <Form.Group className="mb-3">
        <Form.Label htmlFor="sauce-options">Pick Your Sauce:</Form.Label>
        <Form.Select
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

      <Form.Group className="mb-3">
        <Form.Label htmlFor="cheese-options">Pick Your Cheese:</Form.Label>
        <Form.Select
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

      <Form.Group className="mb-4">
        <Form.Label>Choose Your Toppings</Form.Label>
        {allToppings.map((topping) => (
          <Form.Check
            key={topping.id}
            type="checkbox"
            id={`topping-${topping.id}`}
            label={topping.name}
            value={topping.id}
            checked={currentPizza.toppingIds.includes(topping.id)}
            onChange={handleToppingsSelection}
          />
        ))}
      </Form.Group>

      <div className="d-flex gap-2 form-button">
        <Button
          variant="secondary"
          type="button"
          onClick={() => {
            navigate("/review");
          }}
        >
          Review Order
        </Button>

        {index ? (
          <Button variant="primary" type="button" onClick={handleUpdateOrder}>
            Update Order
          </Button>
        ) : (
          <Button variant="success" type="button" onClick={handleAddEntree}>
            Add Entree
          </Button>
        )}
      </div>
    </div>
  );
};