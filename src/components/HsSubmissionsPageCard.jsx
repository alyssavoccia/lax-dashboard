import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function HsSubmissionsPageCard({ name, playerId, wbLink, threeLink, broadLink, agilityLink, handleDelete }) {
  return (
    <div className="flex justify-center">
      <div className="block rounded-lg shadow-md bg-violet-500 max-w-sm text-center w-72">
        <div className="py-3 px-6 border-b border-gray-300">
          <p className='text-lg text-white'>{name}</p>
        </div>
        <div className='gap-5 p-6 bg-white text-gray-800 rounded-b-lg'>
          <ul className="bg-white rounded-lg text-gray-900">
            {wbLink &&
              <li id={playerId} className="flex justify-between px-2 py-2 border-b border-gray-200 min-w-full rounded-t-lg">
                <a href={wbLink} target='_blank' rel="noreferrer">Wall Ball Test</a>
                <FontAwesomeIcon className="w-4 h-4 self-center text-red-500 hover:text-red-600 hover:cursor-pointer" icon={faTrash} id='wbLink' onClick={handleDelete} />
              </li>
            }
            {threeLink &&
              <li id={playerId} className="flex justify-between px-2 py-2 border-b border-gray-200 min-w-full rounded-t-lg">
                <a href={threeLink} target='_blank' rel="noreferrer">300's Test</a>
                <FontAwesomeIcon className="w-4 h-4 self-center text-red-500 hover:text-red-600 hover:cursor-pointer" icon={faTrash} id='threeLink' onClick={handleDelete} />
              </li>
            }
            {broadLink &&
              <li id={playerId} className="flex justify-between px-2 py-2 border-b border-gray-200 min-w-full rounded-t-lg">
                <a href={broadLink} target='_blank' rel="noreferrer">Broad Jump Test Test</a>
                <FontAwesomeIcon className="w-4 h-4 self-center text-red-500 hover:text-red-600 hover:cursor-pointer" icon={faTrash} id='broadLink' onClick={handleDelete} />
              </li>
            }
            {agilityLink &&
              <li id={playerId} className="flex justify-between px-2 py-2 border-b border-gray-200 min-w-full rounded-t-lg">
                <a href={agilityLink} target='_blank' rel="noreferrer">5-10-5 Test</a>
                <FontAwesomeIcon className="w-4 h-4 self-center text-red-500 hover:text-red-600 hover:cursor-pointer" icon={faTrash} id='agilityLink' onClick={handleDelete} />
              </li>
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default HsSubmissionsPageCard;