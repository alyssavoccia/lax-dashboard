import React, { useState } from "react";

function LandingPage() {
  const [show, setShow] = useState(false);
  return (
    <>
    <section className="py-6 bg-gray-100 overflow-y-hidden">
      <nav className="w-full">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center" aria-label="Home" role="img">
            <img className="cursor-pointer w-8" src="https://images.emojiterra.com/twitter/v13.1/512px/1f94d.png" alt="logo" />
            <p className="ml-2 lg:ml-4 text-base lg:text-2xl font-bold text-gray-800">Lax Dashboard</p>
          </div>
          <div>
            <button onClick={() => setShow(!show)} className="sm:block md:hidden lg:hidden text-gray-500 hover:text-gray-700 focus:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500">
              <img className="h-8 w-8" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/center_aligned_with_image-svg4.svg" alt="show" />
            </button>
            <div id="menu" className={`md:block lg:block ${show ? '' : 'hidden'}`}>
              <button onClick={() => setShow(!show)} className="block md:hidden lg:hidden text-gray-500 hover:text-gray-700 focus:text-gray-700 fixed focus:outline-none focus:ring-2 focus:ring-gray-500 bg-white md:bg-transparent z-30 top-0 mt-3">
                <img className="h-8 w-8" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/center_aligned_with_image-svg5.svg" alt="hide" />
              </button>
              <ul className="flex text-3xl md:text-base items-center py-8 md:flex flex-col md:flex-row justify-center fixed md:relative top-0 bottom-0 left-0 right-0 bg-white md:bg-transparent  z-20">
                <li className="text-gray-600 text-lg hover:text-violet-800 cursor-pointer md:ml-10 pt-10 md:pt-0">
                  <a href="#!">Features</a>
                </li>
                <li className="text-gray-600 text-lg hover:text-violet-800 cursor-pointer md:ml-10 pt-10 md:pt-0">
                  <a href="#!">High School Players</a>
                </li>
                <li className="text-gray-600 text-lg hover:text-violet-800 cursor-pointer md:ml-10 pt-10 md:pt-0">
                  <a href="#!">Login</a>
                </li>
                <li className="text-white text-lg cursor-pointer md:ml-10 pt-10 md:pt-0">
                  <a href="#!" className="bg-violet-600 hover:bg-violet-700 p-2 rounded-md">Sign Up</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <div className="w-full px-6">
        <div className="mt-8 relative rounded-lg bg-violet-700 container mx-auto flex flex-col items-center pt-12 sm:pt-24 pb-24 sm:pb-32 md:pb-48 xl:pb-56">
            <img className="mr-2 lg:mr-12 mt-2 lg:mt-12 absolute right-0 top-0" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/center_aligned_with_image-svg2.svg" alt="bg" />
            <img className="ml-2 lg:ml-12 mb-2 lg:mb-12 absolute bottom-0 left-0" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/center_aligned_with_image-svg3.svg" alt="bg" />
            <div className="w-11/12 sm:w-2/3 mb-5 sm:mb-10">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center text-white font-bold leading-tight">See how you stack up against the competition</h1>
            </div>
            <div className="flex justify-center items-center mb-10 sm:mb-20">
              <button className="hover:text-white hover:bg-transparent lg:text-xl hover:border-white border bg-white transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 ring-offset-violet-700	focus:ring-white rounded text-violet-700 px-4 sm:px-8 py-1 sm:py-3 text-sm">Sign Up</button>
              <button className="hover:bg-white hover:text-violet-600 lg:text-xl hover:border-violet-600 ml-3 sm:ml-6 bg-transparent transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 ring-offset-violet-700 focus:ring-white hover:bg-indigo-700-800 rounded border border-white text-white px-4 sm:px-8 py-1 sm:py-3 text-sm">Learn More</button>
            </div>
        </div>
        <div className="container mx-auto flex justify-center md:-mt-56 -mt-20 sm:-mt-40">
          <div className="relative sm:w-2/3 w-11/12">
            <img src="https://tuk-cdn.s3.amazonaws.com/assets/components/hero/h_2.png" alt="Sample Page" role="img" />
          </div>
        </div>
      </div>
    </section>

    <section class="pt-6 pb-32 px-8 bg-gray-100 text-gray-800 text-center">
      <h2 class="text-3xl font-bold mb-20">Why is it so great?</h2>
      <div class="grid lg:gap-x-12 lg:grid-cols-3">
        <div class="mb-12 lg:mb-0">
          <div class="rounded-lg shadow-lg h-full block bg-white">
            <div class="flex justify-center">
              <div class="p-4 bg-violet-600 rounded-full shadow-lg inline-block -mt-8">
                <svg class="w-8 h-8 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path fill="currentColor"
                    d="M192 208c0-17.67-14.33-32-32-32h-16c-35.35 0-64 28.65-64 64v48c0 35.35 28.65 64 64 64h16c17.67 0 32-14.33 32-32V208zm176 144c35.35 0 64-28.65 64-64v-48c0-35.35-28.65-64-64-64h-16c-17.67 0-32 14.33-32 32v112c0 17.67 14.33 32 32 32h16zM256 0C113.18 0 4.58 118.83 0 256v16c0 8.84 7.16 16 16 16h16c8.84 0 16-7.16 16-16v-16c0-114.69 93.31-208 208-208s208 93.31 208 208h-.12c.08 2.43.12 165.72.12 165.72 0 23.35-18.93 42.28-42.28 42.28H320c0-26.51-21.49-48-48-48h-32c-26.51 0-48 21.49-48 48s21.49 48 48 48h181.72c49.86 0 90.28-40.42 90.28-90.28V256C507.42 118.83 398.82 0 256 0z">
                  </path>
                </svg>
              </div>
            </div>
            <div class="p-6">
              <h5 class="text-lg font-semibold mb-4">Support 24/7</h5>
              <p>
                Laudantium totam quas cumque pariatur at doloremque hic quos quia eius. Reiciendis
                optio minus mollitia rerum labore facilis inventore voluptatem ad, quae quia sint.
                Ullam.
              </p>
            </div>
          </div>
        </div>    
        <div class="mb-12 lg:mb-0">
          <div class="rounded-lg shadow-lg h-full block bg-white">
            <div class="flex justify-center">
              <div class="p-4 bg-violet-600 rounded-full shadow-lg inline-block -mt-8">
                <svg class="w-8 h-8 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path fill="currentColor"
                    d="M466.5 83.7l-192-80a48.15 48.15 0 0 0-36.9 0l-192 80C27.7 91.1 16 108.6 16 128c0 198.5 114.5 335.7 221.5 380.3 11.8 4.9 25.1 4.9 36.9 0C360.1 472.6 496 349.3 496 128c0-19.4-11.7-36.9-29.5-44.3zM256.1 446.3l-.1-381 175.9 73.3c-3.3 151.4-82.1 261.1-175.8 307.7z">
                  </path>
                </svg>
              </div>
            </div>
            <div class="p-6">
              <h5 class="text-lg font-semibold mb-4">Safe and solid</h5>
              <p>
                Eum nostrum fugit numquam, voluptates veniam neque quibusdam ullam aspernatur odio
                soluta, quisquam dolore animi mollitia a omnis praesentium, expedita nobis!
              </p>
            </div>
          </div>
        </div>    
        <div class="">
          <div class="rounded-lg shadow-lg h-full block bg-white">
            <div class="flex justify-center">
              <div class="p-4 bg-violet-600 rounded-full shadow-lg inline-block -mt-8">
                <svg class="w-8 h-8 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path fill="currentColor"
                    d="M505.12019,19.09375c-1.18945-5.53125-6.65819-11-12.207-12.1875C460.716,0,435.507,0,410.40747,0,307.17523,0,245.26909,55.20312,199.05238,128H94.83772c-16.34763.01562-35.55658,11.875-42.88664,26.48438L2.51562,253.29688A28.4,28.4,0,0,0,0,264a24.00867,24.00867,0,0,0,24.00582,24H127.81618l-22.47457,22.46875c-11.36521,11.36133-12.99607,32.25781,0,45.25L156.24582,406.625c11.15623,11.1875,32.15619,13.15625,45.27726,0l22.47457-22.46875V488a24.00867,24.00867,0,0,0,24.00581,24,28.55934,28.55934,0,0,0,10.707-2.51562l98.72834-49.39063c14.62888-7.29687,26.50776-26.5,26.50776-42.85937V312.79688c72.59753-46.3125,128.03493-108.40626,128.03493-211.09376C512.07526,76.5,512.07526,51.29688,505.12019,19.09375ZM384.04033,168A40,40,0,1,1,424.05,128,40.02322,40.02322,0,0,1,384.04033,168Z" />
                </svg>
              </div>
            </div>
            <div class="p-6">
              <h5 class="text-lg font-semibold mb-4">Extremely fast</h5>
              <p>
                Enim cupiditate, minus nulla dolor cumque iure eveniet facere ullam beatae hic
                voluptatibus dolores exercitationem? Facilis debitis aspernatur amet nisi?
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
    );
}

export default LandingPage;