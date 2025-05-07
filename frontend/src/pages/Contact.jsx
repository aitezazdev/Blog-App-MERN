import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.message) newErrors.message = "Message is required";
    if (Object.keys(newErrors).length) return setErrors(newErrors);
    console.log("Form submitted:", formData);
    alert("Thanks for reaching out! We’ll be in touch.");
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-200">
        Get in Touch
      </h1>

      <p className="text-base  md:text-lg text-gray-300 leading-relaxed mb-8">
        Have a feature idea? Want to suggest improvements? Found a bug? Or maybe
        you're just here to say something nice — we'd love to hear from you.
        <br />
        <br />
        Whether it's collaboration opportunities, feedback on existing content,
        or just a suggestion to make ZazBlog better, your message is always
        welcome.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col space-y-1">
          <input
            autoComplete="off"
            type="text"
            name="name"
            placeholder="Your Name"
            autoCorrect="off"
            onChange={handleChange}
            className="w-full placeholder:text-gray-500 text-gray-200 p-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            
          />
          {errors.name && <span className="text-red-600">{errors.name}</span>}
        </div>
        <div className="flex flex-col space-y-1">
        <input
          autoComplete="off"
          type="email"
          name="email"
          placeholder="Your Email"
          autoCorrect="off"
          onChange={handleChange}
          className="w-full placeholder:text-gray-500 text-gray-200 p-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          
        />
          {errors.email && <span className="text-red-600">{errors.email}</span>}
        </div>
        <div className="flex flex-col space-y-1">
        <textarea
          name="message"
          placeholder="Your Message — feedback, ideas, bugs, or anything else"
          rows="6"
          autoCorrect="off"
          onChange={handleChange}
          className="w-full placeholder:text-gray-500 text-gray-200 p-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          
        />
          {errors.message && <span className="text-red-600">{errors.message}</span>}
        </div>
        <button
          type="submit"
          className="bg-emerald-600 hover:bg-emerald-700 cursor-pointer text-white py-3 px-6 rounded-lg transition">
          Send Message
        </button>
      </form>
    </div>
  );
}
