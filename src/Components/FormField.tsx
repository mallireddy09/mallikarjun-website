import React from "react";

type FieldLabel = { id: string; label: string };
export type FormFieldProps = FieldLabel & (
  | (React.InputHTMLAttributes<HTMLInputElement> & { multiline?: false })
  | (React.TextareaHTMLAttributes<HTMLTextAreaElement> & { multiline: true })
);

function FormField(props: FormFieldProps) {
  const { id, label } = props;
  let control;
  if (props.multiline) {
    const { label, multiline, ...attributes } = props;
    control = <textarea {...attributes} />;
  } else {
    const { label, multiline, ...attributes } = props;
    control = <input {...attributes} />;
  }
  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>
      {control}
    </div>
  );
}

export default FormField;
