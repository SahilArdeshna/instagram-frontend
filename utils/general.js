export const capitalizeFirstLetter = (letter) => {
  return letter.replace(/(^\w{1})/g, (match) => match.toUpperCase());
};

export const yupValidator = async (values, schema) => {
  let errors = {};
  try {
    await schema.validate(values, { abortEarly: false });
  } catch (err) {
    err.inner.forEach(
      (e) =>
        (errors = { ...errors, [e.path]: capitalizeFirstLetter(e.message) })
    );
  }
  return errors;
};

export const storeToken = (token) => {
  window.localStorage.setItem(process.env.NEXT_PUBLIC_TOKEN_KEY, token);
};

export const getToken = (key) => {
  return window.localStorage.getItem(key);
};

export const removeStorage = (key) => {
  window.localStorage.removeItem(key);
};

export const copyToClipboard = (data) => {
  const textarea = document.createElement("textarea");

  textarea.value = data;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);

  textarea.select();
  document.execCommand("copy");

  document.body.removeChild(textarea);
};

export const mergeClassNames = (defaultClasses, extraClasses) => {
  return [defaultClasses, extraClasses || ""].join(" ").trim();
};
