
// import React, { createContext, useState, useEffect } from "react";
// import axios from "axios";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // 🔹 Check if user is logged in (runs on mount)
//   useEffect(() => {
//     axios.get("https://resume-template-hoqz.onrender.com/auth/me", { withCredentials: true })  // ✅ Automatically sends cookies
//       .then((res) => {
//         console.log("User data from /auth/me:", res.data);  // Debugging
//         setUser(res.data.user);
//       })
//       .catch((err) => {
//         console.error("Auth check error:", err);
//         setUser(null);
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   // 🔹 Login function
//   const login = async (email, password) => {
//     try {
//       const res = await axios.post(
//         "https://resume-template-hoqz.onrender.com/auth/login",
//         { email, password },
//         { withCredentials: true }  // ✅ Ensures cookies are stored
//       );

//     //   console.log("Login response:", res.data);  // Debugging
//     if (res.data.user) {
//       setUser(res.data.user);
//       return res.data.user;
//     } else {
//         throw new Error("Invalid login response");
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       throw new Error(error.response?.data?.message || "Login failed");
//     }
//   };

//   const signup = async (name, email, password, userType) => {
//     try {
//         console.log("Signup request sent:", { name, email, password, userType });
//         const response = await fetch("https://resume-template-hoqz.onrender.com/auth/signup", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ name, email, password, userType }),
//         });

//         const text = await response.text();  // 🔹 Get raw response (for debugging)
//         console.log("Raw response:", text);

//         const data = JSON.parse(text);
//         console.log("Parsed JSON:", data);
//         if (!response.ok) {
//             throw new Error(data.message || "Signup failed");
//         }
//         return data;
//     } catch (error) {
//         throw new Error(error.message);
//     }
// };
//   // 🔹 Logout function
//   const logout = async () => {
//     try {
//       await axios.get("https://resume-template-hoqz.onrender.com/auth/logout", { withCredentials: true });  // ✅ Logout request with cookies
//       setUser(null);
//     } catch (error) {
//       console.error("Logout error:", error);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

const API_BASE_URL = "http://localhost:5000";  // 🔹 Define API URL once

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Check if user is logged in (runs on mount)
  useEffect(() => {
    axios.get(`${API_BASE_URL}/auth/me`, { withCredentials: true })
      .then((res) => {
        console.log("User data from /auth/me:", res.data);
        setUser(res.data.user);
      })
      .catch((err) => {
        console.error("Auth check error:", err);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  // 🔹 Login function
  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/login`, 
        { email, password }, 
        { withCredentials: true }
      );

      if (res.data.user) {
        setUser(res.data.user);
        return res.data.user;
      } else {
        throw new Error("Invalid login response");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw new Error(error.response?.data?.message || "Login failed");
    }
  };

  // 🔹 Signup function
  const signup = async (name, email, password, userType) => {
    try {
      console.log("Signup request sent:", { name, email, password, userType });
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, userType }),
      });

      const text = await response.text();
      console.log("Raw response:", text);

      const data = JSON.parse(text);
      console.log("Parsed JSON:", data);
      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // 🔹 Logout function
  const logout = async () => {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {method: "POST", credentials: "include"});
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};


