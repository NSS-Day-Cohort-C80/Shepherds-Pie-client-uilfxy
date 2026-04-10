import { useEffect, useState } from "react";
import { getAllEmployees } from "../../services/userService";
import { useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "./DineInOrDeliveryForm.css"

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
    <Container>
      <Row>
        <Col>
          <Button className="ddd-buttons" type="button" onClick={() => setShowDineInOnly(true)}>
            Dine In
          </Button>
          <Button className="ddd-buttons" type="button" onClick={() => setShowDineInOnly(false)}>
            Delivery
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <div>
            {showDineInOnly ? (
              <div>
                <h3>Dine In</h3>
                <div>
                  <label htmlFor="table-number">Table</label>
                  <input
                    id="table-number"
                    onChange={handleTableInput}
                    type="text"
                    placeholder="Add table number"
                    value={orderData.tableNumber || ""}
                    required
                  />
                </div>
              </div>
            ) : (
              <div>
                <h3>Delivery</h3>
                <div>
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
                </div>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};
