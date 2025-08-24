export default function ErrorMessage({ message }) {
  return (
    <div className="bg-red-400 text-white p-3 rounded mb-4 max-w-md w-full">
      {message}
    </div>
  );
}
