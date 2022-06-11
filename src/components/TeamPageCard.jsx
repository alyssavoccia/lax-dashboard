function TeamPageCard({ name, position, grad, agility, broad, three, wb}) {
  return (
    <div className="flex justify-center">
      <div className="block rounded-lg shadow-md bg-cyan-500 max-w-sm text-center w-72">
        <div className="py-3 px-6 border-b border-gray-300">
          <p className='text-lg text-white'>{name}</p>
          <p className='text-sm text-slate-200 font-light'>{position ? position : 'POS'} &bull; {grad ? grad : 'GRAD'}</p>
        </div>
        <div className='grid grid-cols-2 gap-5 p-6 bg-white text-gray-800 rounded-b-lg'>
          <div className="flex flex-col">
            <p className='text-slate-500'>50's Wall Ball</p>
            <p className='text-lg font-bold'>{wb ? wb : 'N/A'}</p>
          </div>
          <div className="flex flex-col">
            <p className='text-slate-500'>Broad Jump</p>
            <p className='text-lg font-bold'>{broad ? broad : 'N/A'}</p>
          </div>
          <div className="flex flex-col">
            <p className='text-slate-500'>300's</p>
            <p className='text-lg font-bold'>{three ? three : 'N/A'}</p>
          </div>
          <div className="flex flex-col">
            <p className='text-slate-500'>5-10-5</p>
            <p className='text-lg font-bold'>{agility ? agility : 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeamPageCard;