import { useState } from "react";
import { motion } from "framer-motion";
import API from "../services/api";
import Navbar from "../layout/Navbar";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { user } = useAuth();

  const [ingredients, setIngredients] = useState("");
  const [cuisine, setCuisine] = useState("Indian");
  const [diet, setDiet] = useState("Vegetarian");
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateRecipe = async () => {
    try {
      setLoading(true);
      const response = await API.post("/generate-recipe", {
        ingredients: ingredients.split(",").map((i) => i.trim()),
        cuisine,
        diet,
        user_email: user?.email || "guest",
      });
      setRecipe(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const saveFavorite = async () => {
    try {
      await API.post("/save-favorite", {
        user_email: user?.email || "guest",
        dish: recipe.dish,
        description: recipe.description,
        steps: recipe.steps,
      });
      alert("Recipe Saved ❤️");
    } catch (error) {
      console.log(error);
    }
  };

  const speakText = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#07070a", color: "#e5e7eb", fontFamily: "'Inter', sans-serif" }}>
      
      <Navbar />

      {/* HERO SECTION */}
      <div style={{ 
        maxWidth: "1200px", margin: "0 auto", padding: "80px 24px", 
        display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" 
      }}>
        
        <div style={{ 
          display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 16px", 
          borderRadius: "30px", backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", 
          fontSize: "13px", fontWeight: "600", color: "#d8b4fe", marginBottom: "30px" 
        }}>
          <span>✨</span> Next-Gen AI Recipe Engine
        </div>

        <h1 style={{ 
          fontSize: "65px", fontWeight: "900", margin: "0 0 20px 0", lineHeight: "1.1", color: "white", letterSpacing: "-1.5px" 
        }}>
          Imagine Any Dish. <br />
          <span style={{ 
            background: "linear-gradient(to right, #c084fc, #f472b6, #fb923c)", 
            WebkitBackgroundClip: "text", 
            WebkitTextFillColor: "transparent" 
          }}>We'll Create the Recipe.</span>
        </h1>

        <p style={{ fontSize: "20px", color: "#9ca3af", maxWidth: "700px", margin: "0 auto 40px auto", lineHeight: "1.6" }}>
          Enter ingredients, dietary preferences, or a wild culinary idea. Our AI will generate a complete, step-by-step recipe in seconds.
        </p>

        {/* SEARCH BAR */}
        <div style={{ 
          width: "100%", maxWidth: "800px", display: "flex", alignItems: "center", 
          backgroundColor: "#11131e", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "50px", 
          padding: "8px", boxShadow: "0 20px 40px rgba(0,0,0,0.6)", marginBottom: "50px" 
        }}>
          <input
            type="text"
            placeholder="e.g. high protein vegan meal with tofu and spinach"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && generateRecipe()}
            style={{ 
              flex: 1, backgroundColor: "transparent", border: "none", color: "white", 
              fontSize: "18px", padding: "16px 24px", outline: "none" 
            }}
          />
          <button
            onClick={generateRecipe}
            disabled={loading || !ingredients.trim()}
            style={{ 
              padding: "16px 32px", borderRadius: "40px", 
              background: "linear-gradient(to right, #a855f7, #ec4899)", color: "white", fontWeight: "bold", 
              border: "none", cursor: (loading || !ingredients.trim()) ? "not-allowed" : "pointer", 
              fontSize: "16px", opacity: (loading || !ingredients.trim()) ? 0.6 : 1
            }}
          >
            {loading ? "Generating..." : "Generate ✨"}
          </button>
        </div>

        {/* FILTERS */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "40px" }}>
          
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "12px", color: "#6b7280", textTransform: "uppercase", letterSpacing: "1px", fontWeight: "bold" }}>Cuisine</span>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
              {["Indian", "Italian", "Chinese", "Mexican", "Global"].map((item) => (
                <button
                  key={item}
                  onClick={() => setCuisine(item)}
                  style={{
                    padding: "8px 20px", borderRadius: "30px", fontSize: "14px", fontWeight: "600", cursor: "pointer",
                    backgroundColor: cuisine === item ? "rgba(168,85,247,0.2)" : "rgba(255,255,255,0.05)",
                    border: cuisine === item ? "1px solid #a855f7" : "1px solid rgba(255,255,255,0.1)",
                    color: cuisine === item ? "#d8b4fe" : "#9ca3af"
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "12px", color: "#6b7280", textTransform: "uppercase", letterSpacing: "1px", fontWeight: "bold" }}>Dietary</span>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
              {["Vegetarian", "Vegan", "Non-Vegetarian", "Keto"].map((item) => (
                <button
                  key={item}
                  onClick={() => setDiet(item)}
                  style={{
                    padding: "8px 20px", borderRadius: "30px", fontSize: "14px", fontWeight: "600", cursor: "pointer",
                    backgroundColor: diet === item ? "rgba(236,72,153,0.2)" : "rgba(255,255,255,0.05)",
                    border: diet === item ? "1px solid #ec4899" : "1px solid rgba(255,255,255,0.1)",
                    color: diet === item ? "#f9a8d4" : "#9ca3af"
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* RECIPE OUTPUT */}
      {recipe && (
        <div style={{ backgroundColor: "rgba(0,0,0,0.4)", borderTop: "1px solid rgba(255,255,255,0.05)", padding: "80px 24px" }}>
          
          <div style={{ maxWidth: "800px", margin: "0 auto 60px auto", textAlign: "center" }}>
            <h2 style={{ fontSize: "40px", fontWeight: "900", color: "white", marginBottom: "20px" }}>
              {recipe.dish}
            </h2>
            <p style={{ fontSize: "20px", color: "#d8b4fe", lineHeight: "1.6" }}>
              {recipe.description}
            </p>
          </div>

          <div style={{ 
            maxWidth: "1400px", margin: "0 auto", 
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" 
          }}>
            {recipe.steps.map((step) => (
              <div key={step.step} style={{ 
                backgroundColor: "#11131e", borderRadius: "24px", overflow: "hidden", 
                border: "1px solid rgba(255,255,255,0.1)", display: "flex", flexDirection: "column" 
              }}>
                
                <div style={{ height: "220px", position: "relative", backgroundColor: "#222" }}>
                  <img src={step.image} alt={`Step ${step.step}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ 
                    position: "absolute", bottom: "16px", left: "16px", 
                    backgroundColor: "rgba(168,85,247,0.9)", padding: "6px 16px", borderRadius: "20px", 
                    color: "white", fontWeight: "bold", fontSize: "14px" 
                  }}>
                    Step {step.step}
                  </div>
                </div>

                <div style={{ padding: "24px", display: "flex", flexDirection: "column", flex: 1 }}>
                  <p style={{ color: "#d1d5db", lineHeight: "1.6", marginBottom: "30px", flex: 1 }}>
                    {step.instruction}
                  </p>
                  
                  <div style={{ display: "flex", gap: "12px" }}>
                    <button 
                      onClick={() => speakText(step.instruction)} 
                      style={{ 
                        flex: 1, padding: "12px", borderRadius: "12px", backgroundColor: "rgba(255,255,255,0.05)", 
                        border: "1px solid rgba(255,255,255,0.1)", color: "#d1d5db", fontWeight: "600", 
                        cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" 
                      }}>
                      🔊 Narrate
                    </button>
                    <button 
                      onClick={saveFavorite} 
                      style={{ 
                        flex: 1, padding: "12px", borderRadius: "12px", 
                        background: "linear-gradient(to right, #a855f7, #ec4899)", border: "none", color: "white", 
                        fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" 
                      }}>
                      ❤️ Save
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;