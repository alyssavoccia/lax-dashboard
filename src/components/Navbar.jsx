import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import storage from 'redux-persist/lib/storage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChartArea, faUserLarge, faPeopleGroup, faTable, faLink, faArrowRightToBracket} from '@fortawesome/free-solid-svg-icons'

function Navbar() {
  const currentUser = useSelector((state) => state.user.user);
  const auth = getAuth();

  return (
    <div className="w-16 min-h-full shadow-lg bg-gray-200 fixed rounded-br-lg rounded-tr-lg">
      <div className="py-4 mb-2 bg-cyan-600 rounded-tr-lg">
        <div className="flex items-center">
          <div className="flex justify-around grow">
            <span>🥍</span>
            <p className="text-md font-semibold text-gray-50">LD</p>
          </div>
        </div>
      </div>
      <ul className="relative px-1">
        <li className="relative">
          <Link className="flex items-center text-sm py-4 px-5 h-12 overflow-hidden text-gray-700 whitespace-nowrap rounded hover:bg-gray-300 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="primary" to='/dashboard'>
            <FontAwesomeIcon className="w-4 h-4 mr-3" icon={faChartArea} />
            {/* <span>Dashboard</span> */}
          </Link>
        </li>
        <li className="relative">
          <Link className="flex items-center text-sm py-4 px-5 h-12 overflow-hidden text-gray-700 whitespace-nowrap rounded hover:bg-gray-300 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="primary" to='/profile'>
            <FontAwesomeIcon className="w-4 h-4 mr-3" icon={faUserLarge} />
            {/* <span>Profile</span> */}
          </Link>
        </li>
        {currentUser && currentUser.isAdmin &&
          <>
            <li className="relative">
              <Link className="flex items-center text-sm py-4 px-5 h-12 overflow-hidden text-gray-700 whitespace-nowrap rounded hover:bg-gray-300 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="primary" to='/team'>
                <FontAwesomeIcon className="w-4 h-4 mr-3" icon={faPeopleGroup} />
                {/* <span>Team</span> */}
              </Link>
            </li>
            <li className="relative">
              <Link className="flex items-center text-sm py-4 px-5 h-12 overflow-hidden text-gray-700 whitespace-nowrap rounded hover:bg-gray-300 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="primary" to='/player-data'>
                <FontAwesomeIcon className="w-4 h-4 mr-3" icon={faTable} />
                {/* <span>Player Data</span> */}
              </Link>
            </li>
          </>
        }
        {currentUser && currentUser.isAdmin && currentUser.team === 'highschool' &&
          <>
            <li className="relative">
              <Link className="flex items-center text-sm py-4 px-5 h-12 overflow-hidden text-gray-700 whitespace-nowrap rounded hover:bg-gray-300 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="primary" to='/hs-link-submissions'>
                <FontAwesomeIcon className="w-4 h-4 mr-3" icon={faLink} />
                {/* <span>Player Submissions</span> */}
              </Link>
            </li>
          </>
        }
      </ul>
      <div className="text-center bottom-0 absolute w-full h-10 hover:bg-gray-300 transition duration-300 ease-in-out rounded-br-lg">
        <hr className="mb-2 border-gray-400" />
        <Link to='/sign-in-sign-up' className="text-sm px-5 text-gray-700 flex items-center justify-center" onClick={() => {
          storage.removeItem('persist:root');
          auth.signOut();
        }}>
          <FontAwesomeIcon className="w-4 h-4 mr-3" icon={faArrowRightToBracket} />
          {/* <span>Sign Out</span> */}
        </Link>
      </div>
    </div>
  )
}

export default Navbar;