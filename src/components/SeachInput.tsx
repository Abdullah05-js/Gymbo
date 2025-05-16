import { useState, useEffect } from "react";
import type { SearchInputProps } from "../types/SearchInputProps";

function SeachInput({ setQuery }: SearchInputProps) {
  const [placeholderText, setPlaceholderText] = useState<string>("");
  const [timeoutId, setTimeoutId] = useState<number>();

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
    //Debouncing
    if (timeoutId) clearTimeout(timeoutId);

    const value = event.target.value;

    const newTimeout = setTimeout(() => {
      setQuery(value);
    }, 1000 * 1);

    setTimeoutId(newTimeout);
  };

  return (
    <input
      type="text"
      className="outline-none border-2 p-2 w-1/2 text-white font-bold border-white rounded-2xl text-center"
      placeholder={placeholderText}
      onChange={handleChange}
    />
  );
}

export default SeachInput;
