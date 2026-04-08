import { useEffect, useState } from "react";
import { getAllEmployees } from "../../services/userService";

export const DineInOrDeliveryForm = ({
  currentUser,
  orderData,
  setOrderData,
}) => {
  const [showDineInOnly, setShowDineInOnly] = useState(true);
  const [allEmployees, setAllEmployees] = useState([]);
  const [tableInput, setTableInput] = useState(0);

  useEffect(() => {
    getAllEmployees().then((employeesArray) => {
      setAllEmployees(employeesArray);
      console.log("Employees set");
    });
  }, []);

  const handleTableInput = (event) => {
    const orderDataCopy = { ...orderData };

    orderDataCopy.tableNumber = event.target.value;

    setTableInput(event.target.value);
    setOrderData(orderDataCopy);
  };

  const handleDriverSelection = (event) => {
    event.preventDefault();

    const orderDataCopy = { ...orderData };

    orderDataCopy.deliveredBy = event.target.value;

    setTableInput(event.target.value);
    setOrderData(orderDataCopy);
  };

  return (
    <div>
      <h2>Place an Order</h2>

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
    </div>
  );
};
