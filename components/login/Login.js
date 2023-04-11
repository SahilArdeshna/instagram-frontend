import * as yup from "yup";
import React, { useState } from "react";
import { Form } from "react-final-form";
import { Button, Card, Spinner } from "react-bootstrap";

import FormInput from "../../components/Form/Input";
import { loginSchema } from "../../validation/schema";
import { mergeClassNames, yupValidator } from "../../utils/general";
// import { ReactComponent as EyeIcon } from "../assets/icons/eye.svg";
// import { ReactComponent as EyeSlashIcon } from "../assets/icons/eye-slash.svg";

const Login = ({
  className,
  onSubmit,
  schema,
  submitting,
  togglePassword,
  labels,
}) => {
  const [toggle, setToggle] = useState(false);

  const classNames = mergeClassNames("co-login", className);
  //   const ToggleIcon = toggle ? EyeIcon : EyeSlashIcon;

  return (
    <Card className={classNames}>
      <Card.Body>
        <Form
          onSubmit={onSubmit}
          validate={(values) => yupValidator(values, schema || loginSchema)}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <div>
                <FormInput
                  name="username"
                  label={labels?.username || ""}
                  placeholder={
                    labels?.placeholders?.username || labels?.username || ""
                  }
                />
              </div>
              <div className="mt-2">
                <FormInput
                  name="password"
                  type={toggle ? "text" : "password"}
                  label={labels?.password || ""}
                  placeholder={
                    labels?.placeholders?.password || labels?.password || ""
                  }
                  //   append={
                  //     togglePassword ? (
                  //       <ToggleIcon
                  //         className="co-icon"
                  //         width="20"
                  //         height="20"
                  //         onClick={() => setToggle(!toggle)}
                  //       />
                  //     ) : undefined
                  //   }
                />
              </div>
              <div className="submit mt-3">
                <Button type="submit" block={true} disabled={!!submitting}>
                  {!submitting && <span>{labels?.login || "Login"}</span>}
                  {submitting && (
                    <Spinner animation="border" role="status">
                      <span className="sr-only">
                        {labels?.loading || "Logging in..."}
                      </span>
                    </Spinner>
                  )}
                </Button>
              </div>
            </form>
          )}
        </Form>
      </Card.Body>
    </Card>
  );
};

export default Login;
