function ProfileDataCard({dataTitle, data}) {
  return (
    <div className="flex justify-center text-center">
      <div className="block p-6 rounded-lg bg-white grow text-center">
        <h5 className="text-slate-600 text-md leading-tight font-light mb-2">{dataTitle.toUpperCase()}</h5>
        <p className="text-cyan-500 text-xl font-bold my-4">
          {data ? data : 'N/A'}
        </p>
      </div>
    </div>
  )
}

export default ProfileDataCard;