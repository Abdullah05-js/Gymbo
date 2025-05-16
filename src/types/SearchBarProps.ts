import React from "react";
import type { JSX } from "react";
export interface SearchBarProps {
  exercises: JSX.Element[] | undefined;
  isPending: boolean;
  isError: boolean;
  error: Error | null;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}
