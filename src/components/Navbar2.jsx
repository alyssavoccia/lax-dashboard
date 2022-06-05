import { useSelector } from 'react-redux';

function Navbar2() {
  const currentUser = useSelector((state) => state.user.user);

  return (
    <div className="w-60 h-full shadow-md bg-slate-50 absolute">
      <div className="py-4 px-4 mb-2 bg-slate-600">
        <div className="flex items-center">
          <div className="grow ml-3">
            <p className="text-md font-semibold text-slate-50">Lax Dashboard</p>
          </div>
        </div>
      </div>
      <ul className="relative px-1">
        <li className="relative">
          <a className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 whitespace-nowrap rounded hover:text-slate-700 hover:bg-slate-200 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="primary">
            <span>Dashboard</span>
          </a>
        </li>
        <li className="relative">
          <a className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 whitespace-nowrap rounded hover:text-slate-700 hover:bg-slate-200 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="primary">
            <span>Profile</span>
          </a>
        </li>
        {currentUser.isAdmin &&
          <>
            <li className="relative">
              <a className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 whitespace-nowrap rounded hover:text-slate-700 hover:bg-slate-200 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="primary">
                <span>Team</span>
              </a>
            </li>
            <li className="relative">
              <a className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 whitespace-nowrap rounded hover:text-slate-700 hover:bg-slate-200 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="primary">
                <span>Player Data</span>
              </a>
            </li>
          </>
        }
        {currentUser.isAdmin && currentUser.team === 'highschool' &&
          <>
            <li className="relative">
              <a className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 whitespace-nowrap rounded hover:text-slate-700 hover:bg-slate-200 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="primary">
                <span>Player Submissions</span>
              </a>
            </li>
          </>
        }
      </ul>
      <div className="text-center bottom-0 absolute w-full h-10">
        <hr className="mb-2" />
        <a href="#!" className="text-sm text-gray-700">Sign Out</a>
      </div>
    </div>
  )
}

export default Navbar2;