import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer>
            <div className="container mx-auto text-center text-gray-400 dark:text-gray-400">
                <p>&copy;{new Date().getFullYear()} Spinning Dolimpan. All right reserved.</p>
                <div className="flex justify-center space-x-4 mt-4">
                    <Link to={"#"}>Privacy Policy</Link>
                    <Link to={"#"}>Terms of Service</Link>
                    <Link to={"#"}>Contact</Link>
                </div>
            </div>

        </footer>
    )
}

export default Footer; 
