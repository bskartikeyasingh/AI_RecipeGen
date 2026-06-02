import {

  Routes,

  Route,

  Navigate

} from "react-router-dom";

import Dashboard
from "./pages/Dashboard";

import Login
from "./pages/Login";

import History
from "./pages/History";

import Favorites
from "./pages/Favorites";

import ProtectedRoute
from "./routes/ProtectedRoute";

import { useAuth }
from "./context/AuthContext";

function App() {

  const { user } =
    useAuth();

  return (

    <Routes>

      <Route

        path="/login"

        element={

          !user
          ? <Login />
          : <Navigate to="/" />
        }
      />

      <Route

        path="/"

        element={

          <ProtectedRoute>

            <Dashboard />

          </ProtectedRoute>
        }
      />

      <Route

        path="/history"

        element={

          <ProtectedRoute>

            <History />

          </ProtectedRoute>
        }
      />

      <Route

        path="/favorites"

        element={

          <ProtectedRoute>

            <Favorites />

          </ProtectedRoute>
        }
      />

      <Route

        path="*"

        element={

          <Navigate
            to={
              user
              ? "/"
              : "/login"
            }
          />
        }
      />

    </Routes>
  );
}

export default App;