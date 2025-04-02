import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Actor, Credits } from '../types/movieCredit';
import { LoadingSpinner } from '../components/LoadingSpinner';
import CastCard from '../components/CastCard';
import { Movie } from '../types/movies';

export default function MovieDetailPage() {
    const { movieId } = useParams();
    const [credit, setCredit] = useState<Actor[]>([]);
    const [movie, setMovie] = useState<Movie>(); 
    const [isPending, setIsPending] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchMovie = async (): Promise<void> => {
            setIsPending(true); 
            try {
                const { data } = await axios.get<Movie>(
                    `https://api.themoviedb.org/3/movie/${movieId}?language=en-EN`,
                    {
                        headers: {
                            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                        },
                    }
                );
                setMovie(data);
            } catch {
                setIsError(true);
            } finally {
                setIsPending(false); 
            }
        };
        
        fetchMovie();
    }, [movieId]);
    
    useEffect(() => {
        const fetchCredits = async () => {
        setIsPending(true);
        setIsError(false);

        try {
            const { data } = await axios.get<{ credits: Credits }>(
                `https://api.themoviedb.org/3/movie/${movieId}?append_to_response=credits`,
                {
                    headers: 
                    {
                        Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                    },
                }
            );


            const castList = data.credits.cast;
            const directorList = data.credits.crew.filter((person) => person.job === 'Director');

            const mergedList: Actor[] = [
            ...directorList.map((dir) => ({
                id: dir.id,
                name: dir.name,
                profile_path: dir.profile_path,
                character: 'Director',
            })),
            ...castList, ];

            setCredit(mergedList);
        } catch {
            setIsError(true);
        } finally {
            setIsPending(false);
        }
    };

    fetchCredits();
    }, [movieId]);

    if (isError) 
    {
        return <div className="text-red-500 text-2xl">에러가 발생했습니다.</div>;
    }

    return (
        <>
            {isPending && (
                <div className="flex items-center justify-center h-dvh">
                <LoadingSpinner />
                </div>
            )}
    
            {!isPending && movie && (
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