import "./App.css";
import BodyMapFront from "./components/BodyMapFront";
import BodyMapBack from "./components/BodyMapBack";
import SearchBar from "./components/SearchBar";
import Header from "./components/Header";
import { useState } from "react";
import Exercise from "./components/Exercise";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { ExerciseType } from "./types/ExerciseType";
import Footer from "./components/Footer";
import Modal from "./components/Modal";

function App() {
  const [Query, setQuery] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchExercise = async (query: string): Promise<ExerciseType[]> => {
    let url = "https://exercisedb.p.rapidapi.com/exercises/target/";
    if (
      [
        "back",
        "cardio",
        "chest",
        "lower arms",
        "lower legs",
        "neck",
        "shoulders",
        "upper arms",
        "upper legs",
        "waist",
      ].includes(Query)
    ) {
      url = "https://exercisedb.p.rapidapi.com/exercises/bodyPart/";
    }
    const response = await axios.get(url + query, {
      headers: {
        "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
      },
    });
    return response.data;
  };

  const { isError, data, error, isLoading } = useQuery<ExerciseType[], Error>({
    queryKey: ["exercise", Query],
    staleTime: 1000 * 60 * 5,
    enabled: Query == "" ? false : true,
    queryFn: ({ queryKey }: any) => fetchExercise(queryKey[1] as string),
  });

  const ReturnExercies = data?.map((exercise: ExerciseType) => {
    return (
      <Exercise
        gif={exercise.gifUrl}
        alt={exercise.target}
        name={exercise.name}
        target={exercise.target}
        content={exercise.equipment}
        instructions={exercise.instructions}
        isButtonVisble={true}
      />
    );
  });

  return (
    <div className="flex flex-col justify-start items-center  p-2  gap-5 w-full min-h-screen">
      <Header setIsModalOpen={setIsModalOpen} />

      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}

      <div className="flex flex-row justify-between items-start w-full max-md:flex-col-reverse max-md:items-center max-md:justify-center gap-4">
        <div className="flex flex-row justify-center max-md:flex-col  items-start max-md:items-center w-1/2 ">
          <BodyMapFront
            onClick={(event) => {
              setQuery(event.currentTarget.id);
            }}
          />
          <BodyMapBack
            onClick={(event) => {
              setQuery(event.currentTarget.id);
            }}
          />
        </div>
        <SearchBar
          exercises={ReturnExercies}
          isPending={isLoading}
          isError={isError}
          error={error}
          setQuery={setQuery}
        />
      </div>

      <Footer />
    </div>
  );
}

export default App;
