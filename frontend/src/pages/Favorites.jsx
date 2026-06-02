import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../layout/Navbar";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

function Favorites() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const response = await API.get(`/favorites/${user.email}`);
      setFavorites(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07070a] text-gray-200 font-sans selection:bg-purple-500/30 relative overflow-hidden">
      
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-[150px] pointer-events-none" />

      <Navbar />
      
      <div className="relative z-10 max-w-[90rem] mx-auto px-6 pt-12 pb-24">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-white">
            Saved Recipes
          </h1>
          <p className="text-gray-400 text-lg">Your curated collection of AI meals</p>
        </div>

        {loading && (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
          </div>
        )}

        {!loading && favorites.length === 0 && (
          <div className="min-h-[300px] flex flex-col items-center justify-center bg-white/5 rounded-3xl border border-white/10 backdrop-blur-md">
            <span className="text-5xl mb-4 opacity-50">🍽️</span>
            <p className="text-xl text-gray-400 font-medium">No saved recipes yet.</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map((recipe, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={index}
              className="group bg-[#11131e]/80 border border-white/10 rounded-3xl overflow-hidden shadow-xl hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-all flex flex-col backdrop-blur-sm"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={recipe.steps?.[0]?.image || 'https://via.placeholder.com/400x300?text=No+Image'}
                  alt={recipe.dish}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#11131e] to-transparent opacity-90" />
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5">
                  <span className="text-red-500 text-xs">❤️</span>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1 relative z-10">
                <h2 className="text-xl font-bold mb-2 text-white line-clamp-2">
                  {recipe.dish}
                </h2>
                <p className="text-gray-400 text-sm line-clamp-3 mb-6 flex-1">
                  {recipe.description}
                </p>
                <button className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-200 font-semibold text-sm transition-colors border border-white/10">
                  View Recipe
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Favorites;