import { getAllSizes } from "../../services/sizeService";
import { getAllSauces } from "../../services/sauceService";
import { getAllCheeses } from "../../services/cheeseService";
import { getAllToppings } from "../../services/toppingsService";
import { useEffect, useState } from "react";

export const PizzaForm = ({ currentUser, orderData, setOrderData }) => {
  const [allSizes, setAllSizes] = useState([]);
  const [allSauces, setAllSauces] = useState([]);
  const [allCheeses, setAllCheeses] = useState([]);
  const [allToppings, setAllToppings] = useState([]);
  const [selectedSize, setSelectedSize] = useState({});
  const [selectedSauce, setSelectedSauce] = useState({});
  const [selectedCheese, setSelectedCheese] = useState({});
  const [selectedToppings, setSelectedToppings] = useState([]);

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
    const orderDataCopy = { ...orderData, entrees: [...orderData.entrees] };

    if (orderDataCopy.entrees.length === 0) {
      orderDataCopy.entrees.push({
        sizeId: event.target.value,
      });
    } else {
      orderDataCopy.entrees[0].sizeId = event.target.value;
    }

    setSelectedSize(event.target.value);
    setOrderData(orderDataCopy);
  };

  const handleSauceSelection = (event) => {
    const orderDataCopy = { ...orderData, entrees: [...orderData.entrees] };

    if (orderDataCopy.entrees.length === 0) {
      orderDataCopy.entrees.push({
        sauceId: event.target.value,
      });
    } else {
      orderDataCopy.entrees[0].sauceId = event.target.value;
    }

    setSelectedSauce(event.target.value);
    setOrderData(orderDataCopy);
  };

  const handleCheeseSelection = (event) => {
    const orderDataCopy = { ...orderData, entrees: [...orderData.entrees] };

    if (orderDataCopy.entrees.length === 0) {
      orderDataCopy.entrees.push({
        cheeseId: event.target.value,
      });
    } else {
      orderDataCopy.entrees[0].cheeseId = event.target.value;
    }

    setSelectedCheese(event.target.value);
    setOrderData(orderDataCopy);
  };

  const handleToppingsSelection = (event) => {
    const orderDataCopy = { ...orderData, entrees: [...orderData.entrees] };

    if (event.target.checked) {
      const stateCopy = [...selectedToppings];
      stateCopy.push(event.target.value);
      setSelectedToppings(stateCopy);
      orderDataCopy.entrees[0].toppingIds = stateCopy;
      setOrderData(orderDataCopy);
    } else {
      const stateCopy = [...selectedToppings];
      const uncheckedToppings = stateCopy.filter(
        (topping) => topping !== event.target.value,
      );
      setSelectedToppings(uncheckedToppings);
      orderDataCopy.entrees[0].toppingIds = uncheckedToppings;
      setOrderData(orderDataCopy);
    }
  };

  return (
    <div>
      <div>
        <div>
          <label for="size-options">Pick Your Size: </label>
          <select
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
          <label for="size-options">Pick Your Sauce: </label>
          <select
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
            {allToppings.map((topping) => {
              return (
                <div key={topping.id}>
                  <label for={topping.id}>{topping.name} </label>
                  <input
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
    </div>
  );
};
