import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllSizes } from "../../services/sizeService";
import { getAllCheeses } from "../../services/cheeseService";
import { getAllSauces } from "../../services/sauceService";
import { getAllToppings } from "../../services/toppingsService";
import { createOrder } from "../../services/orderService";
import { createEntree } from "../../services/entreeService";
import { createEntreeTopping } from "../../services/entreeToppingsService";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Review.css";

export const Review = ({ currentUser, orderData, setOrderData }) => {
  const [sizes, setSizes] = useState([]);
  const [cheeses, setCheeses] = useState([]);
  const [sauces, setSauces] = useState([]);
  const [toppings, setToppings] = useState([]);
  const [tip, setTip] = useState(1);

  const navigate = useNavigate();

  const fetchAllSizesCheesesSaucesAndToppings = async () => {
    setSizes(await getAllSizes());
    setCheeses(await getAllCheeses());
    setSauces(await getAllSauces());
    setToppings(await getAllToppings());
  };

  useEffect(() => {
    fetchAllSizesCheesesSaucesAndToppings();
  }, []);

  if (!sizes.length || !cheeses.length || !sauces.length || !toppings.length) {
    return <p>Loading...</p>;
  }

  const findById = (array, id) => array.find((item) => item.id === id);

  const getBaseCostPrice = (entree) => {
    const size = findById(sizes, parseInt(entree.sizeId));
    return size.baseCost;
  };

  const getToppingCost = (toppingId) => {
    const topping = findById(toppings, parseInt(toppingId));
    return topping.cost;
  };

  const getTotalToppingCost = (toppingIds) => {
    return toppingIds.reduce((sumOfToppings, toppingId) => {
      return sumOfToppings + getToppingCost(toppingId);
    }, 0);
  };

  const getEntreeCost = (entree) => {
    const basePrice = getBaseCostPrice(entree);
    const toppingsPrice = getTotalToppingCost(entree.toppingIds);
    return basePrice + toppingsPrice;
  };

  const formatEntreeDescription = (entree) => {
    const sizeName = findById(sizes, parseInt(entree.sizeId)).name;
    const sauceName = findById(sauces, parseInt(entree.sauceId)).name;
    const cheeseName = findById(cheeses, parseInt(entree.cheeseId)).name;

    const hasToppings = entree.toppingIds.length > 0;
    const toppingNames = hasToppings
      ? entree.toppingIds
          .map((toppingId) => findById(toppings, parseInt(toppingId)).name)
          .join(", ")
      : "no toppings";

    return `${sizeName} pizza with ${sauceName} sauce, ${cheeseName} cheese, and ${toppingNames}.`;
  };

  const subtotal = orderData.entrees.reduce((sumOfEntrees, entree) => {
    return sumOfEntrees + getEntreeCost(entree);
  }, 0);

  const subtotalPrice = subtotal.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  const deliveryCharge = orderData.deliveredBy ? 5.0 : 0;
  const total = subtotal + parseFloat(tip || 0) + deliveryCharge;

  const totalPrice = total.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  const handlePlaceOrder = async () => {
    if (!orderData.entrees.length) {
      window.alert("Please add at least one pizza before placing an order.");
      return;
    }

    const newOrder = await createOrder({
      tableNumber: orderData.tableNumber,
      createdBy: currentUser.id,
      deliveredBy: orderData.deliveredBy,
      timeStamp: new Date(),
      tipAmount: parseFloat(tip || 0),
    });

    for (const entree of orderData.entrees) {
      const newEntree = await createEntree({
        orderId: newOrder.id,
        sizeId: entree.sizeId,
        cheeseId: entree.cheeseId,
        sauceId: entree.sauceId,
      });

      for (const toppingId of entree.toppingIds) {
        await createEntreeTopping({
          entreeId: newEntree.id,
          toppingId: toppingId,
        });
      }
    }

    setOrderData({ entrees: [] });
    navigate("/");
  };

  return (
    <div className="review-page">
      <Container className="py-5">
        <Card className="review-main-card shadow-lg border-0">
          <Card.Body className="review-main-body">
            <div className="text-center mb-4">
              <h1 className="review-page-title">Review Order</h1>
            </div>

            <Card className="review-list-card mb-4">
              <Card.Body className="review-list-body">
                {!orderData.entrees.length ? (
                  <p className="review-empty-msg mb-0">No pizzas added yet.</p>
                ) : (
                  orderData.entrees.map((entree, index) => (
                    <div key={index} className="review-pizza-item">
                      <div className="review-pizza-copy">
                        <p className="review-pizza-description mb-1">
                          {formatEntreeDescription(entree)}
                        </p>
                        <p className="review-pizza-cost mb-0">
                          ${getEntreeCost(entree).toFixed(2)}
                        </p>
                      </div>

                      <Button
                        className="review-edit-btn"
                        variant="outline-success"
                        type="button"
                        onClick={() => navigate(`/order/${index}`)}
                      >
                        Edit
                      </Button>
                    </div>
                  ))
                )}
              </Card.Body>
            </Card>

            {orderData.entrees.length > 0 && (
              <Card className="review-totals-card mb-4">
                <Card.Body className="review-totals-body">
                  <p>Subtotal: {subtotalPrice}</p>
                  {orderData.deliveredBy && <p>Delivery charge: $5.00</p>}
                  {tip && <p>Tip: ${parseFloat(tip).toFixed(2)}</p>}
                  <p className="review-total-line mb-0">Total: {totalPrice}</p>
                </Card.Body>
              </Card>
            )}

            <Card className="review-actions-card">
              <Card.Body className="review-actions-body">
                <div className="review-actions-layout">
                  <Button
                    className="review-add-btn"
                    variant="success"
                    type="button"
                    onClick={() => navigate("/order")}
                  >
                    Add New Entree
                  </Button>

                  <div className="review-right-actions">
                    <Form.Group className="review-tip-group">
                      <Form.Label className="review-tip-label">
                        Add Tip
                      </Form.Label>
                      <div className="review-tip-input-wrap">
                        <span className="review-tip-dollar">$</span>
                        <Form.Control
                          type="number"
                          min="0"
                          step="0.01"
                          value={tip}
                          onChange={(evt) => setTip(evt.target.value)}
                          className="review-tip-input"
                          placeholder="1.00"
                        />
                      </div>
                    </Form.Group>

                    <Button
                      className="review-place-btn"
                      variant="success"
                      type="button"
                      onClick={handlePlaceOrder}
                    >
                      Place Order
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};