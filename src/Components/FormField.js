import React from "react";

function FormField({ id, label, multiline = false, ...props }) {
  const Input = multiline ? "textarea" : "input";
  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>
      <Input id={id} {...props} />
    </div>
  );
}

export default FormField;
