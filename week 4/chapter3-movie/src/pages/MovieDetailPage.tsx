import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Actor, Credits } from '../types/movieCredit';
import { LoadingSpinner } from '../components/LoadingSpinner';
import CastCard from '../components/CastCard';
import { Movie } from '../types/movies';
import useCustomFetch from '../hooks/useCustomFetch';

export default function MovieDetailPage() {
    const { movieId } = useParams(); // 구조 분해 할당

    const movieURL = `https://api.themoviedb.org/3/movie/${movieId}?language=en-EN`; 
    const {data:movie, isPending:isMoviePending, isError:isMovieError} = useCustomFetch<Movie>(movieURL); 

    const creditURL = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`;
    const {data:credits, isPending:isCreditPending, isError:isCreditError} = useCustomFetch<Credits>(creditURL);
    
    // 출연진 중 감독과 배우 리스트트 구분 
    const [credit, setCredit] = useState<Actor[]>([]);
    useEffect(() => {
        if (!credits) return;
        
        const castList = credits.cast; 
        const directorList = credits.crew.filter((person) => person.job === 'Director'); 

        const mergedList: Actor[] = [
            ...directorList.map((dir) => ({
                id:dir.id, 
                name:dir.name,
                profile_path: dir.profile_path, 
                character: 'Director', 
            })),
            ...castList,
        ];

        setCredit(mergedList); 
    }, [credits]); 

    if (isMovieError || isCreditError) 
    {
        return <div className="text-red-500 text-2xl">에러가 발생했습니다.</div>;
    }

    return (
        <>
            {(isMoviePending || isCreditPending) && (
                <div className="flex items-center justify-center h-dvh">
                <LoadingSpinner />
                </div>
            )}
    
            {!isMoviePending && !isCreditPending && movie && (
                <div className="p-8">
                    <div className="flex flex-col lg:flex-row gap-8">
                        <img
                            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                            className='w-80'
                        />

                        <div className="flex flex-col justify-centerr">
                            <h1 className="text-5xl font-bold mb-4">{movie.title}</h1>
                            <p className='text-lg '>{movie.release_date} Release</p> 
                            <p className='text-lg '>Rated {movie.vote_average} ★ </p>
                            <p className='text-lg '>{movie.overview}</p>
                        </div>
                    </div>

                    <span className="block mt-12 text-xl font-bold">Cast & Crew</span>
                    <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 p-8">
                        {credit.slice(0, 20).map((person) => (
                            <CastCard key={person.id} person={person} />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}