import React, { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router";
import axios from "axios";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const verifyToken = async (token: string): Promise<boolean> => {
    try {
      const response = await axios.get("http://localhost:3000/auth/verify", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200) {
        return false;
      }

      return true


    } catch (error) {
      console.error("Error verifying token:", error);
      return false;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsValid(false);
    } else {
      verifyToken(token).then((valid) => setIsValid(valid));
    }
  }, []);

  if (isValid === null) {
    return <div>Loading...</div>;
  }

  if (!isValid) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;