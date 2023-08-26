import ContactImage from '../utils/contact-book.png';
import BarChartImage from '../utils/bar-chart.png';

import { Link } from "react-router-dom";

export default function Sidebar() {
    return (
        <div className="flex border-r-2">
            <div className="flex pt-16 flex-col h-screen p-3 bg-white shadow w-60">
                <div className="space-y-3">
                    <div className="flex items-center">
                        <h2 className="text-xl mt-4 font-bold">Dashboard</h2>
                    </div>
                    <div className="flex-1">
                        <ul className="pt-2 pb-4 space-y-1 text-sm">
                            <li className="rounded-sm">
                                <Link
                                    to="/"
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >
                                    <img 
                                        src={ContactImage} 
                                        alt="Contacts" 
                                        className="w-8 h-8 rounded-full border-2 border-blue-500"
                                    />
                                    <span className="text-lg font-semibold text-gray-700">Contacts</span>
                                </Link>
                            </li>
                            <li className="rounded-sm">
                                <Link
                                    to="/dashboard"
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >
                                    <img 
                                        src={BarChartImage} 
                                        alt="Charts and Maps" 
                                        className="w-8 h-8 rounded-full border-2 border-blue-500"
                                    />
                                    <span className="text-lg font-semibold text-gray-700">Charts And Maps</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
