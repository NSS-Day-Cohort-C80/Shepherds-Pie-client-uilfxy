import { useEffect, useState } from "react";
import { getAllEmployees } from "../../services/userService";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Card from "react-bootstrap/Card";
import "./DineInOrDeliveryForm.css";

export const DineInOrDeliveryForm = ({
  currentUser,
  orderData,
  setOrderData,
}) => {
  const [showDineInOnly, setShowDineInOnly] = useState(true);
  const [allEmployees, setAllEmployees] = useState([]);

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
    <Card className="dine-card-shell mb-4">
      <Card.Body className="dine-card-body">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
          <div>
            <h4 className="dine-card-title mb-1">Order Type</h4>
            <p className="dine-card-subtitle mb-0">
              Select how this order will be fulfilled
            </p>
          </div>

          <ButtonGroup className="dine-toggle-group">
            <Button
              type="button"
              variant={showDineInOnly ? "success" : "outline-success"}
              onClick={() => setShowDineInOnly(true)}
            >
              Dine In
            </Button>
            <Button
              type="button"
              variant={!showDineInOnly ? "success" : "outline-success"}
              onClick={() => setShowDineInOnly(false)}
            >
              Delivery
            </Button>
          </ButtonGroup>
        </div>

        {showDineInOnly ? (
          <Card className="dine-mode-panel dine-mode-in border-0">
            <Card.Body className="dine-mode-body">
              <h5 className="dine-mode-title">Dine In</h5>
              <Form.Group>
                <Form.Label className="dine-label" htmlFor="table-number">
                  Enter table number
                </Form.Label>
                <Form.Control
                  className="dine-input"
                  id="table-number"
                  type="text"
                  placeholder="Add table number"
                  value={orderData.tableNumber || ""}
                  onChange={handleTableInput}
                />
              </Form.Group>
            </Card.Body>
          </Card>
        ) : (
          <Card className="dine-mode-panel dine-mode-delivery border-0">
            <Card.Body className="dine-mode-body">
              <h5 className="dine-mode-title">Delivery</h5>
              <Form.Group>
                <Form.Label className="dine-label" htmlFor="employee-options">
                  Assigned driver
                </Form.Label>
                <Form.Select
                  className="dine-select"
                  id="employee-options"
                  value={orderData.deliveredBy || ""}
                  onChange={handleDriverSelection}
                >
                  <option value="">Select driver</option>
                  {allEmployees.map((employee) => (
                    <option value={employee.id} key={employee.id}>
                      {employee.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Card.Body>
          </Card>
        )}
      </Card.Body>
    </Card>
  );
};