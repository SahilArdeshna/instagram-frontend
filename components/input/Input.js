import React, { Fragment } from "react";
import { Form, InputGroup } from "react-bootstrap";

const Input = ({
  label,
  inputClass,
  labelClass,
  errorClass,
  formGroupClass,
  error,
  help,
  append,
  prepend,
  ...props
}) => {
  let controlProps = { ...props };

  if (typeof error !== "undefined" && error !== null) {
    const valid = !(error.length > 0);
    controlProps = { ...controlProps, isValid: valid, isInvalid: !valid };
  }

  const control = <Form.Control {...controlProps} />;
  const feedback = error ? (
    <Form.Control.Feedback className={errorClass} type="invalid">
      {error}
    </Form.Control.Feedback>
  ) : (
    ""
  );
  const hint = help ? <Form.Text className="text-muted">{help}</Form.Text> : "";

  return (
    <Form.Group className={formGroupClass}>
      <Form.Label className={labelClass}>{label}</Form.Label>

      {(append || prepend) && (
        <InputGroup>
          {prepend && (
            <InputGroup.Prepend>
              <InputGroup.Text>{prepend}</InputGroup.Text>
            </InputGroup.Prepend>
          )}
          {control}
          {append && (
            <InputGroup.Append>
              <InputGroup.Text>{append}</InputGroup.Text>
            </InputGroup.Append>
          )}
          {hint}
          {feedback}
        </InputGroup>
      )}

      {!append && !prepend && (
        <Fragment>
          {control}
          {hint}
          {feedback}
        </Fragment>
      )}
    </Form.Group>
  );
};

export default Input;
