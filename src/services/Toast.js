import React from "react";
import { Alert } from "reactstrap";

export function Toast(color, message, isOpen, onDismiss) {
  return (
    <Alert
      color={color}
      isOpen={isOpen}
      toggle={onDismiss}
      fade={true}
      style={{ borderRadius: 0 }}
    >
      {message}
    </Alert>
  );
}
