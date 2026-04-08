import { useEffect, useState } from "react";
import { getAllEmployees } from "../../services/userService";
import { PizzaForm } from "./PizzaForm";

export const Orders = ({ currentUser, orderData, setOrderData }) => {
  const [allEmployees, setAllEmployees] = useState([]);
  const [showDineInOnly, setShowDineInOnly] = useState(true);
  const [tableInput, setTableInput] = useState(0);

  const handleTableInput = (event) => {
    const orderDataCopy = { ...orderData };

    orderDataCopy.tableNumber = event.target.value;

    setTableInput(event.target.value);
    setOrderData(orderDataCopy);
  };

  useEffect(() => {
    getAllEmployees().then((employeesArray) => {
      setAllEmployees(employeesArray);
      console.log("Employees set");
    });
  }, []);

  const handleDriverSelection = (event) => {
    event.preventDefault();

    const orderDataCopy = { ...orderData };

    orderDataCopy.deliveredBy = event.target.value;

    setTableInput(event.target.value);
    setOrderData(orderDataCopy);
  };

  return (
    <>
      <h2>Place an Order</h2>
      <div>
        {/* Dine In form */}
        <div>
          <button onClick={() => setShowDineInOnly(true)}>Dine In</button>
          <button onClick={() => setShowDineInOnly(false)}>Delivery</button>
        </div>
        <div>
          {showDineInOnly ? (
            <div>
              <h4>Dine In</h4>
              <section>
                <label>Enter table # </label>
                <input
                  onChange={handleTableInput}
                  type="text"
                  placeholder="Add table number"
                  value={tableInput}
                  required
                />
              </section>
            </div>
          ) : (
            <div>
              <h4>Delivery</h4>

              <section>
                <label for="employee-options">Assigned driver: </label>
                <select
                  id="employee-options"
                  onChange={(event) => handleDriverSelection(event)}
                >
                  <option value="0">Select driver</option>
                  {allEmployees.map((employee) => {
                    return (
                      <option value={employee.id} key={employee.id} required>
                        {employee.name}
                      </option>
                    );
                  })}
                </select>
              </section>
            </div>
          )}
        </div>

        <div>
          <PizzaForm
            currentUser={currentUser}
            orderData={orderData}
            setOrderData={setOrderData}
          />
        </div>
      </div>
    </>
  );
};
