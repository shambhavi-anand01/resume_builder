
import React, { useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

const Navbar = () => {
  const { user, setUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/auth/me", { credentials: "include" }) // ✅ Fetch user from backend
      .then((res) => res.json())
      .then((data) => setUser(data.user || null))
      .catch((err) => console.error("Error fetching user:", err));
  }, [setUser]); // ✅ Only runs when `setUser` changes

  const handleLogout = async () => {
    try {
      await logout();
    //   setUser(null);
      navigate("/");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

//   return (
//     <nav style={{ padding: "10px", background: "#007BFF", color: "white" }}>
//       <h2>Resume Builder</h2>
//       <div>
//         {!user ? (
//           <>
//             <Link to="/login" style={{ color: "white", marginRight: "10px" }}>Login</Link>
//             <Link to="/signup" style={{ color: "white" }}>Signup</Link>
//           </>
//         ) : (
//           <>
//             <span style={{ marginRight: "10px" }}>Welcome, {user.name}</span>
//             <button onClick={handleLogout} style={{ background: "red", color: "white", padding: "5px", border: "none", cursor: "pointer" }}>
//               Logout
//             </button>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;



return (
    <nav style={styles.navbar}>
      <h2 style={styles.logo}>Resume Builder</h2>
      <div style={styles.navLinks}>
        {!user ? (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/signup" style={styles.link}>Signup</Link>
          </>
        ) : (
          <div style={styles.userContainer}>
            <span style={styles.username}>Welcome, {user.name}</span>
            <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    backgroundColor: "#008080", // Teal Green
    color: "white",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  logo: {
    fontSize: "24px",
    fontWeight: "bold",
    letterSpacing: "1px",
  },
  navLinks: {
    display: "flex",
    alignItems: "center",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "18px",
    marginRight: "20px",
    padding: "8px 12px",
    borderRadius: "5px",
    transition: "background 0.3s",
  },
  userContainer: {
    display: "flex",
    alignItems: "center",
  },
  username: {
    marginRight: "15px",
    fontSize: "18px",
    fontWeight: "bold",
  },
  logoutButton: {
    background: "#E74C3C", // Red color
    color: "white",
    border: "none",
    padding: "8px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background 0.3s",
  },
};

export default Navbar;
