import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchUser } from "../utility/api";
import { User } from "../types/User";

const ProfilePage: React.FC = () => {
  const { token, isAdmin } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        if (!token) {
          throw new Error("You must be logged in to view this page.");
        }

        const userData = await fetchUser(token);
        setUser(userData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-gray-200">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-gray-200">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-gray-200 py-12 px-4">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-bold text-white mb-6">Your Profile</h1>
        <p className="text-gray-300 mb-4">
          <strong>Name:</strong> {user?.name}
        </p>
        <p className="text-gray-300 mb-4">
          <strong>Email:</strong> {user?.email}
        </p>
        <p className="text-gray-300">
          <strong>ID:</strong> {user?.id}
        </p>
        {isAdmin && (
          <p className="text-gray-300">
            <strong>Admin Status: True</strong>
          </p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
