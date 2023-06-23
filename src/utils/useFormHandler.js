import { useState } from "react";

export function useFormHandler() {
  const [inputValues, setInputValues] = useState('');
  const [inputErrors, setInputErrors] = useState({});

  const handleChange = (evt) => {
    const { name, value } = evt.target;

    setInputValues({
      ...inputValues,
      [name]: value
    })

    setInputErrors({
      ...inputErrors,
      [name]: evt.target.validationMessage,
    });
  }

  return { inputValues, inputErrors, setInputValues, setInputErrors, handleChange }
}