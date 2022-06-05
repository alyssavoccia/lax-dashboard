import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChartArea, faUserLarge, faPeopleGroup, faTable, faLink, faArrowRightToBracket} from '@fortawesome/free-solid-svg-icons'

function Navbar2() {
  const currentUser = useSelector((state) => state.user.user);

  return (
    <div className="w-50 min-h-screen shadow-md bg-slate-50 absolute">
      <div className="py-4 px-4 mb-2 bg-slate-600">
        <div className="flex items-center">
          <div className="grow ml-3">
            <p className="text-md font-semibold text-slate-50">Lax Dashboard</p>
          </div>
        </div>
      </div>
      <ul className="relative px-1">
        <li className="relative">
          <Link className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 whitespace-nowrap rounded hover:text-slate-700 hover:bg-slate-200 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="primary" to='/dashboard'>
            <FontAwesomeIcon className="w-4 h-4 mr-3" icon={faChartArea} />
            <span>Dashboard</span>
          </Link>
        </li>
        <li className="relative">
          <Link className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 whitespace-nowrap rounded hover:text-slate-700 hover:bg-slate-200 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="primary" to='/profile'>
            <FontAwesomeIcon className="w-4 h-4 mr-3" icon={faUserLarge} />
            <span>Profile</span>
          </Link>
        </li>
        {currentUser.isAdmin &&
          <>
            <li className="relative">
              <Link className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 whitespace-nowrap rounded hover:text-slate-700 hover:bg-slate-200 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="primary" to='/team'>
                <FontAwesomeIcon className="w-4 h-4 mr-3" icon={faPeopleGroup} />
                <span>Team</span>
              </Link>
            </li>
            <li className="relative">
              <Link className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 whitespace-nowrap rounded hover:text-slate-700 hover:bg-slate-200 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="primary" to='/player-data'>
                <FontAwesomeIcon className="w-4 h-4 mr-3" icon={faTable} />
                <span>Player Data</span>
              </Link>
            </li>
          </>
        }
        {currentUser.isAdmin && currentUser.team === 'highschool' &&
          <>
            <li className="relative">
              <Link className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 whitespace-nowrap rounded hover:text-slate-700 hover:bg-slate-200 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="primary" to='/hs-link-submissions'>
                <FontAwesomeIcon className="w-4 h-4 mr-3" icon={faLink} />
                <span>Player Submissions</span>
              </Link>
            </li>
          </>
        }
      </ul>
      <div className="text-center bottom-0 absolute w-full h-10 hover:bg-slate-200 transition duration-300 ease-in-out">
        <hr className="mb-2" />
        <a href="#!" className="text-sm text-gray-700 flex items-center justify-center">
          <FontAwesomeIcon className="w-4 h-4 mr-3" icon={faArrowRightToBracket} />
          <span>Sign Out</span>
        </a>
      </div>
    </div>
  )
}

export default Navbar2;