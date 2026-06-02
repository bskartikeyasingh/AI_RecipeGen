import { ChefHat, Heart, History, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <div style={{
      position: "sticky", top: 0, zIndex: 50,
      backgroundColor: "rgba(0, 0, 0, 0.5)", 
      backdropFilter: "blur(16px)",
      borderBottom: "1px solid rgba(255,255,255,0.1)", 
      width: "100%", 
      fontFamily: "'Inter', sans-serif"
    }}>
      <div style={{
        maxWidth: "1280px", margin: "0 auto", padding: "16px 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        
        {/* LOGO */}
        <div 
          onClick={() => navigate("/")} 
          style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}
        >
          <div style={{
            width: "44px", height: "44px", borderRadius: "14px",
            background: "linear-gradient(to right, #a855f7, #ec4899)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 14px rgba(236,72,153,0.4)"
          }}>
            <ChefHat color="white" />
          </div>
          <h1 style={{ fontSize: "28px", fontWeight: "900", color: "white", margin: 0, letterSpacing: "-1px" }}>
            Recipe<span style={{ color: "#c084fc" }}>Gen</span>
          </h1>
        </div>

        {/* NAV LINKS */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          
          <button 
            onClick={() => navigate("/")} 
            style={{
              display: "flex", alignItems: "center", gap: "8px", padding: "10px 16px",
              borderRadius: "12px", color: "white", background: "transparent",
              border: "1px solid transparent", cursor: "pointer", fontSize: "15px", fontWeight: "500"
            }}>
            <ChefHat size={18} /> Cook
          </button>

          <button 
            onClick={() => navigate("/favorites")} 
            style={{
              display: "flex", alignItems: "center", gap: "8px", padding: "10px 16px",
              borderRadius: "12px", color: "white", background: "transparent",
              border: "1px solid transparent", cursor: "pointer", fontSize: "15px", fontWeight: "500"
            }}>
            <Heart size={18} /> Favorites
          </button>

          <button 
            onClick={() => navigate("/history")} 
            style={{
              display: "flex", alignItems: "center", gap: "8px", padding: "10px 16px",
              borderRadius: "12px", color: "white", background: "transparent",
              border: "1px solid transparent", cursor: "pointer", fontSize: "15px", fontWeight: "500"
            }}>
            <History size={18} /> History
          </button>
          
          {/* LOGOUT BUTTON */}
          <button 
            onClick={logout} 
            style={{
              display: "flex", alignItems: "center", gap: "8px", padding: "10px 20px",
              borderRadius: "12px", color: "white", fontWeight: "600",
              background: "linear-gradient(to right, #ec4899, #a855f7)",
              border: "none", cursor: "pointer", fontSize: "15px",
              boxShadow: "0 4px 14px rgba(236,72,153,0.3)", marginLeft: "10px"
            }}>
            <LogOut size={18} /> Logout
          </button>

        </div>
      </div>
    </div>
  );
}

export default Navbar;