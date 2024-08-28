"use client";
import React, { useState, useEffect } from "react";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-600 mt-4">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600 mt-4">{error}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
        User List
      </h2>
      <ul className="space-y-4">
        {users.map((user) => (
          <li
            key={user.id}
            className="p-4 bg-gray-100 rounded-md shadow-sm text-gray-800"
          >
            <h3 className="text-xl font-semibold mb-2 text-blue-500">
              {user.name}
            </h3>
            <p className="mb-1">
              <span className="font-bold">Username:</span> {user.username}
            </p>
            <p className="mb-1">
              <span className="font-bold">Email:</span> {user.email}
            </p>
            <p className="mb-1">
              <span className="font-bold">Phone:</span> {user.phone}
            </p>
            <p className="mb-1">
              <span className="font-bold">Website:</span>{" "}
              <a
                href={`https://${user.website}`}
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {user.website}
              </a>
            </p>

            <p className="mb-1">
              <span className="font-bold">Address:</span>
              {user.address.suite}, {user.address.street}, {user.address.city},{" "}
              {user.address.zipcode}
            </p>
            <p className="mb-1">
              <span className="font-bold">Company:</span>
              {user.company.name} - {user.company.catchPhrase}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
