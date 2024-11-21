import { FaFacebook, FaInstagramSquare } from "react-icons/fa";
import footerLogo from "../assets/footer-logo.png";
import { FaXTwitter } from "react-icons/fa6";
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-4">
      {/* top secsion */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="md:w-1/2 w-full">
          <img src={footerLogo} alt="footer Logo" className="w-36 mb-5" />
          <ul className="flex flex-col md:flex-row gap-4">
            <li>
              <a href="#home" className="hover:text-primary">
                Home
              </a>
            </li>
            <li>
              <a href="#service" className="hover:text-primary">
                Service
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-primary">
                About us
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-primary">
                Contact
              </a>
            </li>
          </ul>
        </div>
        {/* right side -Newsletter */}
        <div className="md:w-1/2 w-full">
          <p className=" mb-4">
            Subscribe to our newsletter to receive the lastest updates, news,
            and offers!
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-6 py-2 rounded-l-md text-black"
            />
            <button className="bg-primary px-6 py-2 rounded-r-md  hover:bg-primary-dark ">
              Subscribe
            </button>
          </div>
        </div>{" "}
      </div>

      {/* Bottom Section */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center mt-10 border-t border-gray-700 pt-6">
        <ul className="flex gap-6 mb-4 md:mb-0">
          <li>
            <a href="#privacy" className="hover:text-primary">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#terms" className="hover:text-primary">
              Terms of Service
            </a>
          </li>
        </ul>
        {/* right side -Social Icons */}
        <div className="flex gap-6">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer "
            className=" hover:text-primary"
          >
            <FaFacebook size={24} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer "
            className=" hover:text-primary"
          >
            <FaXTwitter size={24} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer "
            className=" hover:text-primary"
          >
            <FaInstagramSquare size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;