import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input);
      setInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex mb-6 w-full max-w-md">
      <input
        type="text"
        placeholder="Enter city name"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-grow p-2 rounded-l-lg text-black"
      />
      <button
        type="submit"
        className="bg-yellow-400 p-2 rounded-r-lg font-semibold"
      >
        Search
      </button>
    </form>
  );
}
