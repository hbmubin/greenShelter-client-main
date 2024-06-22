import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0D263C] text-white py-6">
      <div className="container mx-auto text-center">
        <div className="mb-4">
          <h2 className="text-3xl font-semibold py-4">
            <span className="text-green-500">Green</span> Shelter
          </h2>
          <p>Eco-Friendly Living, Modern Comfort</p>
        </div>
        <div className="mb-4">
          <a href="#" className="mx-2 hover:underline">
            About Us
          </a>
          <a href="#" className="mx-2 hover:underline">
            Contact
          </a>
          <a href="#" className="mx-2 hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="mx-2 hover:underline">
            Terms of Service
          </a>
        </div>
        <div className="mb-8 flex justify-center items-center">
          <div className="flex items-center">
            <a
              href="#"
              //   target="_blank"
              className="mx-2"
            >
              <FaFacebook size={22}></FaFacebook>{" "}
            </a>
            <a
              href="#"
              //   target="_blank"
              className="mx-2"
            >
              <FaTwitter size={22}></FaTwitter>
            </a>
            <a
              href="#"
              //  target="_blank"
              className="mx-2"
            >
              <FaInstagram size={22}></FaInstagram>
            </a>
          </div>
        </div>
        <div>
          <p>
            &copy; {new Date().getFullYear()} Green Shelter. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
