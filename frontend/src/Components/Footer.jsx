import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-6 md:py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
        
        <div>
          <h2 className="text-3xl font-bold text-white">ZazBlog</h2>
          <p className="text-sm mt-4 leading-relaxed">
            Weekly posts on web dev and tech tips.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4 text-white">Quick Links</h3>
          <ul className="space-y-3 text-sm">
            <li><Link to="/" className="hover:underline hover:text-white">Home</Link></li>
            <li><Link to="/saved-posts" className="hover:underline hover:text-white">Saved Posts</Link></li>
            <li><Link to="/about" className="hover:underline hover:text-white">About</Link></li>
            <li><Link to="/contact" className="hover:underline hover:text-white">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4 text-white">Connect</h3>
          <p className="text-sm mb-4">
            Follow me for updates and side projects.
          </p>
          <div className="flex space-x-5 text-2xl">
            <a href="https://github.com/aitezazdev" target="_blank" rel="noopener noreferrer">
              <FaGithub className="hover:text-white transition" />
            </a>
            <a href="https://linkedin.com/in/aitezaz-sikandar" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="hover:text-white transition" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="hover:text-white transition" />
            </a>
          </div>
        </div>

      </div>

      <div className="text-center text-xs py-4 border-t border-gray-800 mt-4">
        &copy; {new Date().getFullYear()} ZazBlog. No rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
