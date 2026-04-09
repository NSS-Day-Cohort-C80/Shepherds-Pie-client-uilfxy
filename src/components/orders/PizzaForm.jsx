import { getAllSizes } from "../../services/sizeService";
import { getAllSauces } from "../../services/sauceService";
import { getAllCheeses } from "../../services/cheeseService";
import { getAllToppings } from "../../services/toppingsService";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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

  // Will give me the /order/index value from editing an order
  const { index } = useParams();

  useEffect(() => {
    getAllSizes().then((sizesArray) => {
      console.log("Sizes data:", sizesArray);
      setAllSizes(sizesArray);
      console.log("Sizes set");
    });
    getAllSauces().then((saucesArray) => {
      setAllSauces(saucesArray);
      console.log("Sauces set");
    });
    getAllCheeses().then((cheesesArray) => {
      setAllCheeses(cheesesArray);
      console.log("Cheeses set");
    });
    getAllToppings().then((toppingsArray) => {
      setAllToppings(toppingsArray);
      console.log("Toppings set");
    });
  }, []);

  const handleSizeSelection = (event) => {
    const currentPizzaCopy = { ...currentPizza };
    currentPizzaCopy.sizeId = event.target.value;
    setCurrentPizza(currentPizzaCopy);
  };

  const handleSauceSelection = (event) => {
    const currentPizzaCopy = { ...currentPizza };
    currentPizzaCopy.sauceId = event.target.value;
    setCurrentPizza(currentPizzaCopy);
  };

  const handleCheeseSelection = (event) => {
    const currentPizzaCopy = { ...currentPizza };
    currentPizzaCopy.cheeseId = event.target.value;
    setCurrentPizza(currentPizzaCopy);
  };

  const handleToppingsSelection = (event) => {
    const currentPizzaCopy = { ...currentPizza };

    if (event.target.checked) {
      const stateCopy = [...selectedToppings];
      stateCopy.push(event.target.value);
      setSelectedToppings(stateCopy);
      currentPizzaCopy.toppingIds = stateCopy;
      setCurrentPizza(currentPizzaCopy);
    } else {
      const stateCopy = [...selectedToppings];
      const uncheckedToppings = stateCopy.filter(
        (topping) => topping !== event.target.value,
      );
      setSelectedToppings(uncheckedToppings);
      currentPizzaCopy.toppingIds = uncheckedToppings;
      setCurrentPizza(currentPizzaCopy);
    }
  };

  const handleAddEntree = (event) => {
    const orderDataCopy = { ...orderData, entrees: [...orderData.entrees] };
    orderDataCopy.entrees.push(currentPizza);
    setOrderData(orderDataCopy);
    setCurrentPizza({ sizeId: 0, sauceId: 0, cheeseId: 0, toppingIds: [] });
    setSelectedToppings([]);
  };

  // Replace the existing entree at position index in orderData.entrees with the updated currentPizza
  const handleUpdateOrder = (event) => {
    const orderDataCopy = { ...orderData, entrees: [...orderData.entrees] };
    orderDataCopy.entrees[index] = currentPizza;
    setOrderData(orderDataCopy);
  };

  const navigate = useNavigate();

  return (
    <div>
      <div>
        <div>
          <label for="size-options">Pick Your Size: </label>
          <select
            value={currentPizza.sizeId}
            id="size-options"
            onChange={(event) => handleSizeSelection(event)}
          >
            <option value="0">Select size</option>
            {allSizes.map((size) => {
              return (
                <option value={size.id} key={size.id} required>
                  {size.name}
                </option>
              );
            })}
          </select>
        </div>

        <div>
          <label for="sauce-options">Pick Your Sauce: </label>
          <select
            value={currentPizza.sauceId}
            id="sauce-options"
            onChange={(event) => handleSauceSelection(event)}
          >
            <option value="0">Select sauce</option>
            {allSauces.map((sauce) => {
              return (
                <option value={sauce.id} key={sauce.id} required>
                  {sauce.name}
                </option>
              );
            })}
          </select>
        </div>

        <div>
          <label for="cheese-options">Pick Your Cheese: </label>
          <select
            value={currentPizza.cheeseId}
            id="cheese-options"
            onChange={(event) => handleCheeseSelection(event)}
          >
            <option value="0">Select cheese</option>
            {allCheeses.map((cheese) => {
              return (
                <option value={cheese.id} key={cheese.id} required>
                  {cheese.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div>
        <h4>Choose Your Toppings</h4>
        <section>
          <div>
            {/* Map over all toppings to render a labeled checkbox for each one. */}
            {allToppings.map((topping) => {
              return (
                <div key={topping.id}>
                  <label for={topping.id}>{topping.name} </label>
                  {/* A checkbox is checked if its id matches one already in currentPizza.toppingIds */}
                  <input
                    checked={currentPizza.toppingIds.some(
                      (id) => parseInt(id) === topping.id,
                    )}
                    type="checkbox"
                    name="topping"
                    id={topping.id}
                    value={topping.id}
                    onChange={(event) => handleToppingsSelection(event)}
                  />
                </div>
              );
            })}
          </div>
        </section>
      </div>

      <div>
        <button
          onClick={() => {
            navigate("/review");
          }}
        >
          Review Order
        </button>
        {/* Use index to determine whether the user came from the Edit button on /review or not. 
        If index has a value, the user is editing and updating an order */}
        {index ? (
          <button onClick={handleUpdateOrder}>Update Order</button>
        ) : (
          <button onClick={handleAddEntree}>Add Entree</button>
        )}
      </div>
    </div>
  );
};
