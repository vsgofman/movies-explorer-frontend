import { useState } from "react";

export function FormHandler() {
  const [inputValues, setInputValues] = useState('');

  const handleChange = (evt) => {
    const { name, value } = evt.target;

    setInputValues({
      ...inputValues,
      [name]: value
    })
  }

  return { inputValues, handleChange }
}