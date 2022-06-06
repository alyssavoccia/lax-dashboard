function ProfileDataCard({dataTitle, data}) {
  return (
    <div class="flex justify-center">
      <div class="block p-6 rounded-lg shadow-sm bg-white w-80 text-center">
        <h5 class="text-indigo-700 text-lg leading-tight font-light mb-2">{dataTitle.toUpperCase()}</h5>
        <p class="text-gray-700 text-xl font-bold my-4">
          {data ? data : 'N/A'}
        </p>
      </div>
    </div>
  )
}

export default ProfileDataCard;