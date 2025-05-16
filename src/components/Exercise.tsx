import type { ExerciseProps } from "../types/ExerciseProps";
import Button from "./Button";
function Exercise({
  gif,
  alt,
  name,
  content,
  instructions,
  target,
  isButtonVisble,
}: ExerciseProps) {
  return (
    <div className="flex flex-row justify-center items-start w-full max-md:flex-col bg-white rounded-xl">
      <div className="flex flex-row gap-0 max-md:flex-col items-start">
        {isButtonVisble && (
          <Button
            type="button"
            color="text-blue-400"
            content="Like"
            onClick={() => {
              const stringFavorite = localStorage.getItem("favorites");
              const newFavorite = {
                gif,
                alt,
                name,
                content,
                instructions,
                target,
              };

              if (stringFavorite) {
                const Favorites = JSON.parse(stringFavorite);

                const alreadyExists = Favorites.some(
                  (fav: typeof newFavorite) => fav.name === newFavorite.name
                );

                if (!alreadyExists) {
                  localStorage.setItem(
                    "favorites",
                    JSON.stringify([...Favorites, newFavorite])
                  );
                } else {
                  alert("this exercise aleardy in favorites");
                }
              } else {
                localStorage.setItem(
                  "favorites",
                  JSON.stringify([newFavorite])
                );
              }
            }}
          />
        )}
        <img src={gif} alt={alt} className="object-cover  p-2" />
      </div>
      <div className="flex flex-col p-2">
        <div className="flex flex-col  w-full">
          <h1 className="font-bold text-xl text-black text-center">{name}</h1>
          <p className="font-bold text-lg text-black  text-wrap text-center">
            {content},{target}
          </p>
        </div>
        <ul className="list-disc list-inside pl-5 text-black overflow-auto">
          {instructions.map((instruction, index) => (
            <li key={index} className="font-semibold text-start">
              {instruction}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Exercise;
