import Exercise from "./Exercise";
import type { ExerciseType } from "../types/ExerciseType";

type ModalProps = {
  onClose: () => void;
};

type exerciseFavorite = {
  gif: string;
  alt: string;
  name: string;
  target: string;
  content: string;
  instructions: string[];
  id: string;
};

const Modal = ({ onClose }: ModalProps) => {
  const FavoriteList = JSON.parse(localStorage.getItem("favorites") || "[]");

  const ReturnExercies = FavoriteList?.map(
    (exercise: exerciseFavorite, index: number) => (
      <Exercise
        key={index}
        gif={exercise.gif}
        alt={exercise.alt}
        name={exercise.name}
        target={exercise.target}
        content={exercise.content}
        instructions={exercise.instructions}
        isButtonVisble={false}
      />
    )
  );

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 w-screen h-screen bg-black/50 z-[9999] flex justify-center items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex flex-col justify-start items-center gap-4 overflow-auto scrollbar-hide w-9/12 max-h-[90vh] bg-white p-6 rounded-xl"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white bg-red-500 rounded-xl w-8 h-8 flex items-center justify-center hover:bg-red-600"
        >
          X
        </button>

        {ReturnExercies.length ? ReturnExercies : <p>No favorites found.</p>}
      </div>
    </div>
  );
};

export default Modal;
