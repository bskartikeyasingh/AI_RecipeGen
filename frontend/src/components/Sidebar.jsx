import {

  Home,

  History,

  User,

  LogOut

} from "lucide-react";

import {

  useAuth

} from "../context/AuthContext";

function Sidebar() {

  const { logout } =
    useAuth();

  return (

    <div className="
      w-72
      min-h-screen
      bg-black/30
      backdrop-blur-lg
      border-r
      border-white/10
      text-white
      p-6
      hidden
      md:flex
      flex-col
      justify-between
    ">

      {/* TOP */}

      <div>

        <h1 className="
          text-4xl
          font-bold
          text-orange-400
          mb-12
        ">

          Recipe AI

        </h1>

        <div className="
          space-y-4
        ">

          <button className="
            flex
            items-center
            gap-4
            w-full
            p-4
            rounded-2xl
            hover:bg-white/10
            transition-all
          ">

            <Home />

            Dashboard

          </button>

          <button className="
            flex
            items-center
            gap-4
            w-full
            p-4
            rounded-2xl
            hover:bg-white/10
            transition-all
          ">

            <History />

            History

          </button>

          <button className="
            flex
            items-center
            gap-4
            w-full
            p-4
            rounded-2xl
            hover:bg-white/10
            transition-all
          ">

            <User />

            Profile

          </button>

        </div>

      </div>

      {/* LOGOUT */}

      <button

        onClick={logout}

        className="
          flex
          items-center
          gap-4
          bg-red-500
          hover:bg-red-600
          transition-all
          p-4
          rounded-2xl
        "
      >

        <LogOut />

        Logout

      </button>

    </div>
  );
}

export default Sidebar;