function ProfileDataCard({dataTitle, data}) {
  return (
    <div class="flex justify-center text-center">
      <div class="block p-6 rounded-lg bg-white grow text-center">
        <h5 class="text-cyan-500 text-md leading-tight font-light mb-2">{dataTitle.toUpperCase()}</h5>
        <p class="text-gray-600 text-xl font-bold my-4">
          {data ? data : 'N/A'}
        </p>
      </div>
    </div>
  )
}

export default ProfileDataCard;