import { SlArrowUp } from "react-icons/sl";

export const GoToTop = () => {

    const handleGoToTop = () => {
        window.scrollTo({
            top: 0, 
            behavior: "smooth",
        });
    }

    return (
        <>
            <button onClick={handleGoToTop} className="fixed bottom-40 right-6 bg-pink-500 flex items-center justify-center px-4 py-2 rounded-full shadow-lg hover:bg-pink-700 z-50 w-15 h-15 cursor-pointer">
                <span className="text-white font-bold text-2xl"><SlArrowUp className="scale-80"/></span>
            </button>
        </>
    )

}
