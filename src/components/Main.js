import { Outlet } from "react-router";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export const Main = () => {
    return (
        <div className="flex flex-row justify-center w-full h-screen">
            <div className="flex flex-col h-full w-3/5">
                <div className="rounded-sm w-full">
                    <Navbar />
                    
                    <div className="w-full border-b-2 border-gray-400 mb-2" />

                    <div>
                        <Outlet />
                    </div>
                    
                    <div>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    )
}