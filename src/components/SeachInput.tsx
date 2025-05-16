import { useState, useEffect } from "react";
import type { SearchInputProps } from "../types/SearchInputProps";
import { useFormik } from "formik";
import * as Yup from "yup";

function SeachInput({ setQuery }: SearchInputProps) {
  const [placeholderText, setPlaceholderText] = useState<string>("");
  const [timeoutId, setTimeoutId] = useState<number>();

  const formik = useFormik({
    initialValues: {
      Query: "",
    },
    onSubmit: () => {},
    validationSchema: Yup.object({
      Query: Yup.string().required(
        "Please write or select a body part or muscle"
      ),
    }),
    validateOnMount: true,
  });

  useEffect(() => {
    const text = "Search exercises";
    let timeout: number;
    [...text].forEach((letter: string, i: number) => {
      timeout = setTimeout(() => {
        setPlaceholderText((e) => e + letter);
      }, (2000 / text.length) * i);
    });

    return () => {
      clearTimeout(timeout);
      setPlaceholderText("");
    };
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(event);
    //Debouncing
    if (timeoutId) clearTimeout(timeoutId);

    const value = event.target.value;

    const newTimeout = setTimeout(() => {
      setQuery(value);
    }, 1000 * 1);

    setTimeoutId(newTimeout);
  };

  return (
    <>
      <input
        name="Query"
        type="text"
        value={formik.values.Query}
        className="outline-none border-2 p-2 w-1/2 text-white font-bold border-white rounded-2xl text-center"
        placeholder={placeholderText}
        onChange={handleChange}
      />
      {formik.errors.Query && formik.touched.Query && (
        <p className="text-red-500 text-sm mt-1">{formik.errors.Query}</p>
      )}
    </>
  );
}

export default SeachInput;
