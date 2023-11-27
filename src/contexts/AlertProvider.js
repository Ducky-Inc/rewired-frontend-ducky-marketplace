import React, { createContext, useContext, useState, useCallback } from "react";
import { Alert } from "../Components/Alert/Alert";
const AlertContext = createContext({ updateMessage: () => null });

export default function AlertProvider({ children }) {
  const [message, setMessage] = useState("Default Message");
  const [open, setOpen] = useState(false);
  const [type, setType] = useState();

  const updateMessage = useCallback((message, alertType) => {
    setType(alertType);
    setMessage(message);
    setOpen(true);
  }, []);

  return (
    <AlertContext.Provider value={{ updateMessage }}>
      {children}
      <Alert type={type} open={open} message={message} setOpen={setOpen} />
    </AlertContext.Provider>
  );
}

export const useAlert = () => useContext(AlertContext);
