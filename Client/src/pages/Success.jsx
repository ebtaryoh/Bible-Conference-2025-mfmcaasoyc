import { Link } from "react-router-dom";

function Success() {
  return (
    <div className="text-center py-10">
      <h2 className="text-3xl font-bold text-green-600">Registration Successful!</h2>
      <p className="mt-4">Check your email for confirmation.</p>
      <Link to="/" className="mt-6 inline-block text-purple-700 underline">
        Go Home
      </Link>
    </div>
  );
}

export default Success;
