function HsProfileLink({ dataTitle, dataId, handleSubmit }) {
  return (
    <div class="container flex items-center mt-4">
      <div class="relative"> 
        <input type="text" class="bg-slate-100  h-14 w-96 pl-10 pr-20 rounded-lg z-0 focus:outline-none" id={dataId} placeholder={dataTitle} />
          <div class="absolute top-2 right-2">           
            <button class="h-10 w-20 text-white rounded-lg bg-cyan-500 hover:bg-cyan-600" onClick={handleSubmit}>Search</button>
          </div>
      </div>
    </div>
  )
}

export default HsProfileLink;