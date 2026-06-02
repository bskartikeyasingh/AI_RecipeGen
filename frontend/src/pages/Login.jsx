import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { googleLogin, emailLogin, register, user } = useAuth();
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ====================================
  // REDIRECT
  // ====================================
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  // ====================================
  // SUBMIT
  // ====================================
  const handleSubmit = async () => {
    try {
      if (isRegister) {
        await register(email, password);
      } else {
        await emailLogin(email, password);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div 
      style={{
        /* HARDCODED LAYOUT TO BYPASS BROKEN TAILWIND */
        minHeight: "100vh", 
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1600')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "'Inter', sans-serif"
      }}
    >
      
      {/* Dark overlay */}
      <div 
        style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(0,0,0,0.6)",
          zIndex: 0
        }}
      ></div>

      {/* THE LOGIN BOX */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          /* HARDCODED BOX STYLES */
          backgroundColor: "#ffffff",
          padding: "40px",
          borderRadius: "20px",
          width: "90%",
          maxWidth: "420px",
          position: "relative",
          zIndex: 10,
          boxShadow: "0 20px 40px rgba(0,0,0,0.5)"
        }}
      >
        <h2 
          style={{ 
            color: "#111", 
            fontSize: "32px", 
            fontWeight: "900", 
            textAlign: "center", 
            marginBottom: "30px", 
            textTransform: "uppercase",
            letterSpacing: "1px"
          }}
        >
          {isRegister ? "Register" : "Login"}
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          
          {/* EMAIL */}
          <div>
            <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#444" }}>
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%", 
                padding: "14px 16px", 
                backgroundColor: "#f9fafb", 
                border: "1px solid #d1d5db", 
                borderRadius: "10px", 
                color: "#111", 
                boxSizing: "border-box",
                outline: "none"
              }}
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#444" }}>
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%", 
                padding: "14px 16px", 
                backgroundColor: "#f9fafb", 
                border: "1px solid #d1d5db", 
                borderRadius: "10px", 
                color: "#111", 
                boxSizing: "border-box",
                outline: "none"
              }}
            />
          </div>

          {/* ACTION BUTTON */}
          <button
            onClick={handleSubmit}
            style={{
              width: "100%", 
              padding: "16px", 
              backgroundColor: "#f97316", 
              color: "white", 
              fontWeight: "bold", 
              border: "none", 
              borderRadius: "10px", 
              cursor: "pointer", 
              marginTop: "10px",
              fontSize: "16px",
              boxShadow: "0 4px 14px rgba(249, 115, 22, 0.4)"
            }}
          >
            {isRegister ? "REGISTER" : "LOGIN"}
          </button>

          {/* OR DIVIDER */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "10px 0" }}>
            <div style={{ flex: 1, height: "1px", backgroundColor: "#e5e7eb" }}></div>
            <span style={{ fontSize: "12px", color: "#9ca3af", textTransform: "uppercase", fontWeight: "bold" }}>Or</span>
            <div style={{ flex: 1, height: "1px", backgroundColor: "#e5e7eb" }}></div>
          </div>

          {/* GOOGLE BUTTON */}
          <button
            onClick={googleLogin}
            style={{
              width: "100%", 
              padding: "14px", 
              backgroundColor: "white", 
              color: "#374151", 
              fontWeight: "600", 
              border: "1px solid #d1d5db", 
              borderRadius: "10px", 
              cursor: "pointer", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center", 
              gap: "12px"
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continue with Google
          </button>

          {/* TOGGLE */}
          <p style={{ textAlign: "center", color: "#6b7280", fontSize: "14px", marginTop: "15px" }}>
            {isRegister ? "Already have an account?" : "Don't have an account?"}
            <button
              onClick={() => setIsRegister(!isRegister)}
              style={{ background: "none", border: "none", color: "#f97316", fontWeight: "bold", marginLeft: "6px", cursor: "pointer" }}
            >
              {isRegister ? "Login" : "Register"}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;