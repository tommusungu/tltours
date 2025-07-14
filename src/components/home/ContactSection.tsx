import useAddContact from "@/hooks/useAddContact";
import { motion } from "framer-motion";
import { useState } from "react";

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const { isAdding, addContact } = useAddContact();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await addContact(formData);

    // Clear the form after successful submission
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <section className="py-4 bg-white">
      <div className="container mx-auto px-4 sm:px-24">
        <div className="flex flex-col sm:flex-row gap-8">
          <div className="w-full sm:w-1/2 sm:p-6">
            <span className="text-primary-orange italic">Get in Touch</span>
            <h2 className="text-3xl font-bold mt-2 mb-4">
              Redefining Your Travel Experience, One Journey at a Time.
            </h2>
            <p className="text-gray-600 mb-4">
              We’re here to make your travel dreams a reality. Reach out to us using the contact details below, or simply fill out the form to send us a message directly.
            </p>
            <p className="text-gray-600 mb-4">
              Whether you have a question, need assistance, or want to start planning your next adventure, we’d love to hear from you.
            </p>

            <ul className="space-y-4">
              <li>
                <strong>Email:</strong>{" "}
                <a href="mailto:tltraveltours@gmail.com" className="text-primary-orange hover:underline">
                  tltraveltours@gmail.com
                </a>
              </li>
              <li>
                <strong>Phone:</strong>{" "}
                <a href="tel:+33753164595" className="text-primary-orange hover:underline">
                  +33753164595
                </a>
              </li>
              <li>
                <strong>Address:</strong> Paris, France
              </li>
            </ul>
          </div>

          {/* Contact Form */}
          <div className="w-full sm:w-1/2 sm:p-6">
            <h2 className="text-3xl font-bold mt-2 mb-4">Send Us a Message</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="w-full sm:flex sm:gap-3">
              <div className="w-full sm:w-1/2">
                <label className="block text-sm font-medium text-gray-600 mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Your First Name"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-orange"
                />
              </div>
              <div className="w-full sm:w-1/2">
                <label className="block text-sm font-medium text-gray-600 mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Your Last Name"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-orange"
                />
              </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-orange"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Message</label>
                <textarea
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-orange"
                />
              </div>
              <motion.button
                type="submit"
                className="w-full bg-primary-orange text-white py-2 px-4 rounded-md font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isAdding} // Disable button during form submission
              >
                {isAdding ? "Sending..." : "Send Message"}
              </motion.button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
