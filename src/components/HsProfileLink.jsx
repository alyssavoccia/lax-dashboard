function HsProfileLink({ dataTitle, dataId, handleSubmit }) {
  return (
    <div className="container flex items-center mt-4">
      <div className="flex relative"> 
        <input type="text" className="bg-slate-100 h-14 grow pl-5 pr-20 rounded-lg z-0 focus:outline-none" id={dataId} placeholder={dataTitle} />
          <div className="absolute top-2 right-2">           
            <button className="h-10 w-16 text-white rounded-lg bg-cyan-500 hover:bg-cyan-600" onClick={handleSubmit}>Submit</button>
          </div>
      </div>
    </div>
  )
}

export default HsProfileLink;