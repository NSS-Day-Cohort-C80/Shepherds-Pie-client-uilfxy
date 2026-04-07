import { useEffect, useState } from "react";
import { getAllEmployees } from "../../services/userService";

export const Orders = ({ currentUser }) => {
  const [allEmployees, setAllEmployees] = useState([]);

  useEffect(() => {
    getAllEmployees().then((employeesArray) => {
      setAllEmployees(employeesArray);
      console.log("Employees set");
    });
  }, []);

  const handleEmployeeSelection = (event) => {
    const stateCopy = { ...allEmployees };
    stateCopy[event.target.name] = event.target.value;
    setAllEmployees(stateCopy);
  };

  return (
    <>
      <h2>Place an Order</h2>
      <div>

        {/* Dine In form */}
        <div>
          <h4>Dine In</h4>
          <section>
            <label>Table number: </label>
            <input type="text" placeholder="" />
            {/* Add value and onChange? I don't have table # in db, so can't add to state yet ?  */}
          </section>
          <section>
            <div><span>Order received by: </span>{currentUser.name}</div>
          </section>
        </div>


        {/* Delivery Form */}
        <div>
          <h4>Delivery</h4>
          
          <section>
            <select
              id="employee-options"
              onChange={(event) => handleEmployeeSelection(event)}
            >
              <label>Assigned driver: </label>
              <option value="0">Select employee</option>
              {allEmployees.map((employee) => {
                return (
                  <option value={employee.name} key={employee.id}>
                    {employee.name}
                  </option>
                );
              })}
            </select>
          </section>

          <section>
            
            <div><span>Order received by: </span>{currentUser.name}</div>
            
          </section>
        </div>
        <div>Pizza form component goes here</div>
      </div>
    </>
  );
};
