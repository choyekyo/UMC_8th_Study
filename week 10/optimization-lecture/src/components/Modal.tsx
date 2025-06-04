import type { Movie } from "../types/movie";
import { renderStars } from "./renderStars";

interface ModalProps {
    movie: Movie;
    onClose: () => void;
}

const Modal = ({movie, onClose}:ModalProps) => {
    const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
    const fallbackImage = "fallbackImage.png"; 
    return (
<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="relative bg-white p-8 rounded-xl w-full max-w-5xl shadow-2xl ">
        <button
        onClick={onClose}
        className="absolute top-4 right-5 text-black text-2xl font-bold cursor-pointer">
        X
        </button>

        <div className="flex gap-8">
            <div className="relative w-[280px]">
                <div className={`absolute top-2 right-2 px-2 py-1 text-xs rounded text-white font-bold shadow-md ${movie.adult ? 'bg-red-500' : 'bg-blue-500'}`}>
                    {movie.adult ? '성인만 관람 가능' : '미성년자 관람 가능'}
                </div>
                <img
                    src={movie.poster_path ? `${imageBaseUrl}${movie.poster_path}` : fallbackImage}
                    alt={movie.title}
                    className="rounded-lg shadow-md"
                />
            </div>
            <div className="flex-1 flex flex-col gap-4 text-gray-800">
                <h2 className="text-3xl font-extrabold">{movie.title}</h2>
                <div className={`flex items-center justify-center gap-2 text-xl ${movie.adult ? 'text-red-500' : 'text-blue-500'}`}>
                {renderStars(movie.vote_average)}
                <span className="text-sm text-gray-600 ml-1">
                    {movie.vote_average.toFixed(1)} | {movie.vote_count}명 참여
                </span>
                </div>
                <div className="text-sm text-gray-500">
                {(() => {
                    const [y, m, d] = movie.release_date.split("-");
                    return `개봉일: ${y}년 ${parseInt(m)}월 ${parseInt(d)}일`;
                })()}
                </div>
                <p className="text-sm leading-relaxed whitespace-pre-line">{movie.overview}</p>
            </div>
        </div>
    </div>
</div>
    )
}

export default Modal
