export const HomeBody = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to Our Website</h1>
        <p className="text-xl mb-2">Your journey starts here.</p>
        <img
        src="welcome.png"
        alt="Welcome Image"
        className="mb-4 rounded-full shadow-lg"
        />
      <p className="text-lg mb-6">This is the home page content.</p>
      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Get Started
      </button>
    </div>
  );
}