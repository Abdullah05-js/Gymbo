import SeachInput from "./SeachInput";
import type { SearchBarProps } from "../types/SearchBarProps";
function SearchBar({
  exercises,
  isPending,
  isError,
  error,
  setQuery,
}: SearchBarProps) {
  return (
    <div className="flex flex-col justify-start items-center h-[80vh] p-2 w-1/2 border-t-2 border-b-2 backdrop-blur-xs border-white rounded-2xl drop-shadow-2xl shadow-2xl gap-2">
      <div className="backdrop-blur-3xl w-full">
        <SeachInput setQuery={setQuery} />
      </div>

      <div className="flex flex-col justify-start items-center gap-2 overflow-auto w-full">
        {isPending && <p>Loading...</p>}
        {isError && (
          <p className="text-red-600">
            {error?.message
              ? "Parameter must be a body part or muscle"
              : "Failed to load exercises."}
          </p>
        )}
        {!isPending && !isError && exercises}
      </div>
    </div>
  );
}

export default SearchBar;
