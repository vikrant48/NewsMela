function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-12 mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-blue-400">NewsMela</h3>
                        <p className="text-gray-300 leading-relaxed">Your trusted source for the latest news and updates from around the world.</p>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-white">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><a href="#home" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">Home</a></li>
                            <li><a href="#news" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">News</a></li>
                            <li><a href="#weather" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">Weather</a></li>
                            <li><a href="#currency" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">Currency</a></li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-white">Categories</h4>
                        <ul className="space-y-2">
                            <li><a href="#business" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">Business</a></li>
                            <li><a href="#technology" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">Technology</a></li>
                            <li><a href="#sports" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">Sports</a></li>
                            <li><a href="#entertainment" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">Entertainment</a></li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-white">Contact</h4>
                        <div className="space-y-2 text-gray-300">
                            <p>Email: vikrantchauhan9794@gmail.com</p>
                            <p>Phone: +91-6386696764</p>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-700 mt-8 pt-8 text-center">
                    <p className="text-gray-400">&copy; 2025 NewsMela. All rights reserved.</p>
                </div>
            </div>
        </footer>

    )
}

export default Footer