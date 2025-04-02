import { Actor } from "../types/movieCredit";

export default function CastCard({ person }: { person: Actor }) {
    return (
    <div className="text-center">
        <img
            src={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
            className="w-32 h-32 object-cover rounded-full shadow mx-auto border-1"
        />
        <div className="mt-2 font-bold">{person.name}</div>
        <div className="text-sm text-gray-500">{person.character}</div>
    </div>
    );
}
