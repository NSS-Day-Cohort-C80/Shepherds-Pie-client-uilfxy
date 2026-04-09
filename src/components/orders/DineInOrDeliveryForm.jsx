import { useEffect, useState } from "react";
import { getAllEmployees } from "../../services/userService";
import { useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button" 

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
    <>
      <Form.Label>Place an Order</Form.Label>

      <Form.Group className="form-buttons">
        <Button type="button" onClick={() => setShowDineInOnly(true)}>
          Dine In
        </Button>
        <Button type="button" onClick={() => setShowDineInOnly(false)}>
          Delivery
        </Button>
      </Form.Group>

      <div>
        {showDineInOnly ? (
          <div>
            <Form.Label>Dine In</Form.Label>
            <Form.Group>
              <Form.Label htmlFor="table-number">Enter table # </Form.Label>
              <input
                id="table-number"
                onChange={handleTableInput}
                type="text"
                placeholder="Add table number"
                value={orderData.tableNumber || ""}
                required
              />
            </Form.Group>
          </div>
        ) : (
          <div>
            <Form.Label>Delivery</Form.Label>
            <Form.Group>
              <Form.Label htmlFor="employee-options">Assigned driver: </Form.Label>
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
            </Form.Group>
          </div>
        )}
      </div>
    </>
  );
};