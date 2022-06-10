import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartArea, faUser, faUserGear } from '@fortawesome/free-solid-svg-icons';

function LandingPage() {
  const [show, setShow] = useState(false);
  return (
    <>
      <section className="bg-gray-100 overflow-y-hidden">
        <nav className="w-full bg-gray-100 fixed z-10">
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
                    <a href="#features">Features</a>
                  </li>
                  <li className="text-gray-600 text-lg hover:text-violet-800 cursor-pointer md:ml-10 pt-10 md:pt-0">
                    <a href="#highschool-players">High School Players</a>
                  </li>
                  <li className="text-gray-600 text-lg hover:text-violet-800 cursor-pointer md:ml-10 pt-10 md:pt-0">
                    <a href="#!">Login</a>
                  </li>
                  <li className="text-white text-lg cursor-pointer md:ml-10 pt-10 md:pt-0">
                    <a href="#!" className="bg-violet-600 hover:bg-violet-700 px-4 py-2 rounded-lg">Sign Up</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
        <div className="w-full mt-28 px-6">
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

      <section id="features" class="pt-12 pb-32 px-8 bg-gray-100 text-gray-700 text-center flex flex-col items-center">
        <h2 class="text-3xl font-bold mb-20">What we Offer</h2>
        <div class="container grid lg:gap-x-12 lg:grid-cols-3">
          <div class="mb-12 lg:mb-0">
            <div class="rounded-lg shadow-lg h-full block bg-white">
              <div class="flex justify-center">
                <div class="p-4 bg-violet-600 rounded-full shadow-lg inline-block -mt-8">
                  <FontAwesomeIcon className="w-8 h-8 text-white self-center" icon={faChartArea} />
                </div>
              </div>
              <div class="p-6">
                <h5 class="text-lg font-semibold mb-4">Dynamic Dashboard</h5>
                <p>
                  Players will get access to a dashboard that allows them to see how their
                  scores compare to other players on their team, with multiple visuals.
                </p>
              </div>
            </div>
          </div>    
          <div class="mb-12 lg:mb-0">
            <div class="rounded-lg shadow-lg h-full block bg-white">
              <div class="flex justify-center">
                <div class="p-4 bg-violet-600 rounded-full shadow-lg inline-block -mt-8">
                  <FontAwesomeIcon className="w-8 h-8 text-white self-center" icon={faUser} />
                </div>
              </div>
              <div class="p-6">
                <h5 class="text-lg font-semibold mb-4">User Profiles</h5>
                <p>
                  Players will have access to a profile page where they will be able
                  to see their current scores. In the future, there will be the ability
                  for players to see their score trends.
                </p>
              </div>
            </div>
          </div>    
          <div class="">
            <div class="rounded-lg shadow-lg h-full block bg-white">
              <div class="flex justify-center">
                <div class="p-4 bg-violet-600 rounded-full shadow-lg inline-block -mt-8">
                  <FontAwesomeIcon className="w-8 h-8 text-white self-center" icon={faUserGear} />
                </div>
              </div>
              <div class="p-6">
                <h5 class="text-lg font-semibold mb-4">Admin Use</h5>
                <p>
                  Team admins are able to easily access and edit team data. There is 
                  a page that allows admins to see all team data, as well as
                  a page that includes a table where they are able to easily edit data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id='highschool-players' class="pb-32 text-white text-center lg:text-left">
        <div class="block rounded-lg shadow-lg bg-violet-600">
          <div class="flex flex-wrap items-center">
            <div class="block w-full lg:flex grow-0 shrink-0 basis-auto lg:w-6/12 xl:w-4/12">
              <img
                src="https://mdbootstrap.com/img/new/ecommerce/vertical/086.jpg"
                alt="Trendy Pants and Shoes"
                class="w-full rounded-t-lg lg:rounded-tr-none lg:rounded-bl-lg"
              />
            </div>
            <div class="container grow-0 shrink-0 basis-auto w-full lg:w-6/12 xl:w-8/12">
              <div class="px-6 py-12 md:px-12">
                <h2 class="text-3xl font-bold mb-4 display-5">High School Players</h2>
                <p class="mb-12">
                  Nunc tincidunt vulputate elit. Mauris varius purus malesuada neque iaculis
                  malesuada. Aenean gravida magna orci, non efficitur est porta id. Donec magna
                  diam.
                </p>

                <div class="grid lg:gap-x-12 md:grid-cols-3">
                  <div class="mb-12 md:mb-0">
                    <h2 class="text-3xl font-bold mb-4">1000</h2>
                    <h5 class="text-lg font-medium tex mb-0">Happy customers</h5>
                  </div>

                  <div class="mb-12 md:mb-0">
                    <h2 class="text-3xl font-bold mb-4">70%</h2>
                    <h5 class="text-lg font-medium mb-0">Growth</h5>
                  </div>

                  <div class="">
                    <h2 class="text-3xl font-bold mb-4">49</h2>
                    <h5 class="text-lg font-medium mb-0">Projects</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
    );
}

export default LandingPage;