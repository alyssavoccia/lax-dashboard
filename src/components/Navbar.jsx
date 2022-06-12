import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import storage from 'redux-persist/lib/storage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChartArea, faUserLarge, faPeopleGroup, faTable, faLink, faArrowRightToBracket} from '@fortawesome/free-solid-svg-icons'

function Navbar() {
  const currentUser = useSelector((state) => state.user.user);
  const auth = getAuth();
  const location = useLocation();

  return (
    <div className="w-16 min-h-full bg-slate-600 shadow-md shadow-black fixed">
      <div className="py-4 mb-2 bg-slate-600">
        <div className="flex items-center">
          <div className="flex justify-around grow">
            <img className='w-7' src="https://hotemoji.com/images/dl/5/lacrosse-emoji-by-twitter.png" alt="Lacrosse Stick Logo" />
          </div>
        </div>
      </div>
      <ul className="relative px-1">
        <li className="relative mb-2">
          <Link className={`${location.pathname === '/dashboard' && 'bg-slate-400 text-slate-500'} flex items-center py-4 px-5 h-12 overflow-hidden text-gray-50 whitespace-nowrap rounded hover:bg-slate-400 hover:text-slate-500 transition duration-300 ease-in-out cursor-pointer`} href="#!" data-mdb-ripple="true" data-mdb-ripple-color="primary" to='/dashboard'>
            <FontAwesomeIcon className="w-4 h-4 mr-3" icon={faChartArea} />
          </Link>
        </li>
        <li className="relative mb-2">
          <Link className={`${location.pathname === '/profile' && 'text-slate-500 bg-slate-400'} flex items-center text-sm py-4 px-5 h-12 overflow-hidden text-gray-50 whitespace-nowrap rounded hover:bg-slate-400 hover:text-slate-500 transition duration-300 ease-in-out`} href="#!" data-mdb-ripple="true" data-mdb-ripple-color="primary" to='/profile'>
            <FontAwesomeIcon className="w-4 h-4 mr-3" icon={faUserLarge} />
          </Link>
        </li>
        {currentUser && currentUser.isAdmin &&
          <>
            <li className="relative mb-2">
              <Link className={`${location.pathname === '/team' && 'text-slate-500 bg-slate-400'} flex items-center text-sm py-4 px-5 h-12 overflow-hidden text-gray-50 whitespace-nowrap rounded hover:bg-slate-400 hover:text-slate-500 transition duration-300 ease-in-out`} href="#!" data-mdb-ripple="true" data-mdb-ripple-color="primary" to='/team'>
                <FontAwesomeIcon className="w-4 h-4 mr-3" icon={faPeopleGroup} />
              </Link>
            </li>
            <li className="relative mb-2">
              <Link className={`${location.pathname === '/player-data' && 'text-slate-500 bg-slate-400'} flex items-center text-sm py-4 px-5 h-12 overflow-hidden text-gray-50 whitespace-nowrap rounded hover:bg-slate-400 hover:text-slate-500 transition duration-300 ease-in-out`} href="#!" data-mdb-ripple="true" data-mdb-ripple-color="primary" to='/player-data'>
                <FontAwesomeIcon className="w-4 h-4 mr-3" icon={faTable} />
              </Link>
            </li>
          </>
        }
        {currentUser && currentUser.isAdmin && currentUser.team === 'highschool' &&
          <li className="relative mb-2">
            <Link className={`${location.pathname === '/hs-link-submissions' && 'text-slate-500 bg-slate-400'} flex relative items-center text-sm py-4 px-5 h-12 overflow-hidden text-gray-50 whitespace-nowrap rounded hover:bg-slate-400 hover:text-slate-500 transition duration-300 ease-in-out`} href="#!" data-mdb-ripple="true" data-mdb-ripple-color="primary" to='/hs-link-submissions'>
              <FontAwesomeIcon className="w-4 h-4 mr-3" icon={faLink} />
            </Link>
          </li>
        }
      </ul>
      <div className="text-center bottom-0 absolute w-full h-10 hover:bg-slate-400 hover:text-slate-500 transition duration-300 ease-in-out">
        <Link to='/' className="text-sm pl-2 h-full text-gray-50 flex items-center justify-center" onClick={() => {
          storage.removeItem('persist:root');
          auth.signOut();
        }}>
          <FontAwesomeIcon className="w-4 h-4 mr-2" icon={faArrowRightToBracket} />
        </Link>
      </div>
    </div>
  )
}

export default Navbar;