import { useEffect, useState } from "react";
import { getAllEmployees } from "../../services/userService";
import { useParams } from "react-router-dom";

export const DineInOrDeliveryForm = ({
  currentUser,
  orderData,
  setOrderData,
}) => {
  const [showDineInOnly, setShowDineInOnly] = useState(true);
  const [allEmployees, setAllEmployees] = useState([]);
  const { index } = useParams();

  useEffect(() => {
    getAllEmployees().then((employeesArray) => {
      setAllEmployees(employeesArray);
    });
  }, []);

  useEffect(() => {
    if (orderData.deliveredBy) {
      setShowDineInOnly(false);
    } else {
      setShowDineInOnly(true);
    }
  }, [orderData]);

  const handleTableInput = (event) => {
    setOrderData({
      ...orderData,
      tableNumber: event.target.value,
      deliveredBy: null,
    });
  };

  const handleDriverSelection = (event) => {
    setOrderData({
      ...orderData,
      deliveredBy: parseInt(event.target.value),
      tableNumber: "",
    });
  };

  return (
    <div>
      <h2>Place an Order</h2>

      <div>
        <button type="button" onClick={() => setShowDineInOnly(true)}>
          Dine In
        </button>
        <button type="button" onClick={() => setShowDineInOnly(false)}>
          Delivery
        </button>
      </div>

      <div>
        {showDineInOnly ? (
          <div>
            <h4>Dine In</h4>
            <section>
              <label htmlFor="table-number">Enter table # </label>
              <input
                id="table-number"
                onChange={handleTableInput}
                type="text"
                placeholder="Add table number"
                value={orderData.tableNumber || ""}
                required
              />
            </section>
          </div>
        ) : (
          <div>
            <h4>Delivery</h4>
            <section>
              <label htmlFor="employee-options">Assigned driver: </label>
              <select
                id="employee-options"
                onChange={handleDriverSelection}
                value={orderData.deliveredBy || ""}
                required
              >
                <option value="">Select driver</option>
                {allEmployees.map((employee) => {
                  return (
                    <option value={employee.id} key={employee.id}>
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
