import React from "react";
import { Field } from "react-final-form";

import Input from "../input/Input";

const FormInput = ({ name, type, ...props }) => {
  return (
    <Field name={name || ""} type={type || ""}>
      {({ input, meta }) => (
        <Input
          {...input}
          {...props}
          error={meta.touched && meta.error ? meta.error : undefined}
        />
      )}
    </Field>
  );
};

export default FormInput;
