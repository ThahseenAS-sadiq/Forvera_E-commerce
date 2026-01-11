import React from "react";

const NewsLetter = () => {

  const onSubmitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <section className="py-12 px-4 bg-gray-100 text-black text-center">
      <div className="max-w-2xl mx-auto">
        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
          Join Our Newsletter
        </h1>

        {/* Description */}
        <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-8">
          Subscribe to get updates on new arrivals, special offers and fashion tips.
        </p>

        {/* Form */}
        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col sm:flex-row items-center max-w-md mx-auto gap-3 sm:gap-0"
        >
          <input
            type="email"
            placeholder="Your email address"
            required
            className="
              w-full flex-1 px-6 py-3 text-base
              border border-gray-300
              rounded-full sm:rounded-l-full sm:rounded-r-none
              focus:outline-none focus:ring-2 focus:ring-pink-950
            "
          />

          <button
            type="submit"
            className="
              w-full sm:w-auto px-6 py-3
              bg-pink-950 text-white font-semibold
              rounded-full sm:rounded-r-full sm:rounded-l-none
              hover:bg-pink-900 transition
            "
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsLetter;
