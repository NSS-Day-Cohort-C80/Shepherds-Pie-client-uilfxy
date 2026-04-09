import { useEffect, useState } from "react";
import { PizzaForm } from "./PizzaForm";
import { DineInOrDeliveryForm } from "./DineInOrDeliveryForm";

export const Orders = ({ currentUser, orderData, setOrderData }) => {
  return (
    <>
      <div>
        <DineInOrDeliveryForm
          currentUser={currentUser}
          orderData={orderData}
          setOrderData={setOrderData}
        />
      </div>

      <div>
        <PizzaForm
          currentUser={currentUser}
          orderData={orderData}
          setOrderData={setOrderData}
        />
      </div>
    </>
  );
};
