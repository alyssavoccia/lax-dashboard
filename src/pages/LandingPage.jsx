import { useState } from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartArea, faUser, faUserGear } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo.png';
import preview from '../assets/preview.png';
import dashboard from '../assets/dashboard.png';
import profile from '../assets/profile.png';
import team from '../assets/team.png';
import playerData from '../assets/playerData.png';
import hsLinkSubmissions from '../assets/hsLinkSubmissions.png';
import hsProfile from '../assets/hsProfile.png';

function LandingPage() {
  const [show, setShow] = useState(false);

  return (
    <>
      <section className="bg-gray-100 overflow-y-hidden">
        <nav className="w-full bg-gray-100 mt-6">
          <div className="container mx-auto px-6 flex items-center justify-between">
            <div className="flex items-center" aria-label="Home" role="img">
              <img className="cursor-pointer w-8" src={logo} alt="logo" />
              <p className="ml-2 lg:ml-4 text-base lg:text-2xl font-bold text-slate-700">Lax Dashboard</p>
            </div>
            <div>
              <button onClick={() => setShow(!show)} className="sm:block md:hidden lg:hidden text-slate-500 hover:text-slate-700 focus:text-slate-700 focus:outline-none focus:ring-2 focus:ring-gray-500">
                <img className="h-8 w-8" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/center_aligned_with_image-svg4.svg" alt="show" />
              </button>
              <div id="menu" className={`md:block lg:block ${show ? '' : 'hidden'}`}>
                <button onClick={() => setShow(!show)} className="block md:hidden lg:hidden text-gray-500 hover:text-gray-700 focus:text-gray-700 fixed focus:outline-none focus:ring-2 focus:ring-gray-500 bg-white md:bg-transparent z-30 top-0 mt-3">
                  <img className="h-8 w-8" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/center_aligned_with_image-svg5.svg" alt="hide" />
                </button>
                <ul className="flex text-3xl md:text-base items-center py-6 md:flex flex-col md:flex-row justify-center fixed md:relative top-0 bottom-0 left-0 right-0 bg-white md:bg-transparent  z-20">
                  <li className="text-gray-600 text-lg hover:text-cyan-500 cursor-pointer md:ml-10 pt-10 md:pt-0">
                    <a href="#features">Features</a>
                  </li>
                  <li className="text-gray-600 text-lg hover:text-cyan-500 cursor-pointer md:ml-10 pt-10 md:pt-0">
                    <a href="#in-action">In Action</a>
                  </li>
                  <li className="text-gray-600 text-lg hover:text-cyan-500 cursor-pointer md:ml-10 pt-10 md:pt-0">
                    <Link to='/login'>Login</Link>
                  </li>
                  <li className="text-white text-lg cursor-pointer md:ml-10 pt-10 md:pt-0">
                    <Link to='sign-up' className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded">Sign Up</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
        <div className="w-full mt-4 px-6">
          <div className="mt-8 relative rounded-lg bg-cyan-500 container mx-auto flex flex-col items-center pt-12 sm:pt-24 pb-24 sm:pb-32 md:pb-48 xl:pb-56">
              <img className="mr-2 lg:mr-12 mt-2 lg:mt-12 absolute right-0 top-0" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/center_aligned_with_image-svg2.svg" alt="bg" />
              <img className="ml-2 lg:ml-12 mb-2 lg:mb-12 absolute bottom-0 left-0" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/center_aligned_with_image-svg3.svg" alt="bg" />
              <div className="w-11/12 sm:w-2/3 mb-5 sm:mb-10">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center text-white font-bold leading-tight">See how you stack up against the competition</h1>
              </div>
              <div className="flex justify-center items-center mb-10 sm:mb-20">
                <button className="hover:text-white hover:bg-transparent lg:text-xl hover:border-white border bg-white transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 ring-offset-cyan-700	focus:ring-white rounded text-cyan-700 px-4 sm:px-8 py-1 sm:py-3 text-sm">Sign Up</button>
                <a className="hover:bg-white hover:text-cyan-600 lg:text-xl hover:border-cyan-600 ml-3 sm:ml-6 bg-transparent transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 ring-offset-cyan-700 focus:ring-white hover:bg-indigo-700-800 rounded border border-white text-white px-4 sm:px-8 py-1 sm:py-3 text-sm" href='#features'>Learn More</a>
              </div>
          </div>
          <div className="container mx-auto flex justify-center md:-mt-56 -mt-20 sm:-mt-40">
            <div className="relative sm:w-2/3 w-11/12">
              <img src={preview} alt="Example of Dashboard Page" />
            </div>
          </div>
        </div>
      </section>

      <section id="features" class="pt-12 pb-32 px-8 bg-gray-100 text-gray-700 text-center flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-20">What we Offer</h2>
        <div className="container grid lg:gap-x-12 lg:grid-cols-3">
          <div className="mb-12 lg:mb-0">
            <div className="rounded-lg shadow-lg h-full block bg-white">
              <div className="flex justify-center">
                <div className="p-4 bg-cyan-500 rounded-full shadow-lg inline-block -mt-8">
                  <FontAwesomeIcon className="w-8 h-8 text-white self-center" icon={faChartArea} />
                </div>
              </div>
              <div className="p-6">
                <h5 className="text-lg font-semibold mb-4">Dynamic Dashboard</h5>
                <p>
                  Players will get access to a dashboard that allows them to see how their
                  scores compare to other players on their team, with multiple visuals.
                </p>
              </div>
            </div>
          </div>    
          <div className="mb-12 lg:mb-0">
            <div className="rounded-lg shadow-lg h-full block bg-white">
              <div className="flex justify-center">
                <div className="p-4 bg-cyan-500 rounded-full shadow-lg inline-block -mt-8">
                  <FontAwesomeIcon className="w-8 h-8 text-white self-center" icon={faUser} />
                </div>
              </div>
              <div className="p-6">
                <h5 className="text-lg font-semibold mb-4">User Profiles</h5>
                <p>
                  Players will have access to a profile page where they will be able
                  to see their current scores. In the future, there will be the ability
                  for players to see their score trends.
                </p>
              </div>
            </div>
          </div>    
          <div className="">
            <div className="rounded-lg shadow-lg h-full block bg-white">
              <div className="flex justify-center">
                <div className="p-4 bg-cyan-500 rounded-full shadow-lg inline-block -mt-8">
                  <FontAwesomeIcon className="w-8 h-8 text-white self-center" icon={faUserGear} />
                </div>
              </div>
              <div className="p-6">
                <h5 className="text-lg font-semibold mb-4">Admin Use</h5>
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

      <section className="pb-20 flex flex-col bg-gray-100 text-gray-700 items-center">
        <h2 className="text-3xl font-bold mb-12 text-center">Feature Breakdown</h2>

        <div className="container grid lg:grid-cols-3 gap-6">
          <div className="mb-12">
            <p className="font-bold mb-4 text-cyan-500">Dashboard</p>
            <p className="text-gray-500">
              The Dashboard page shows multiple charts to show how player scores compare
              to other members on the team. Team admins are able to use a dropdown to view
              each players dashboard.
            </p>
          </div>

          <div className="mb-12">
            <p className="font-bold mb-4 text-cyan-500">Profile Page</p>
            <p className="text-gray-500">
              For club & college players the profile page displays their individual scores for each test.
              For highschool players, they will see their current scores. They will also have
              the ability to submit video links for each test.
            </p>
          </div>

          <div className="mb-12">
            <p className="font-bold mb-4 text-cyan-500">Team Page</p>
            <p className="text-gray-500">
              The team page allows admins to see all of their players data on individual player cards.
            </p>
          </div>

          <div className="col-md-12 mb-12">
            <p className="font-bold mb-4 text-cyan-500">Player Data Page</p>
            <p className="text-gray-500">
              The player data page provides a table that team admins are able to easily update. This
              allows them to easily change player scores after each time they test.
            </p>
          </div>

          <div className="mb-12">
            <p className="font-bold mb-4 text-cyan-500">Highschool Link Submisssions Page</p>
            <p className="text-gray-500">
              The highschool link submissions page allows highschool admins to see cards for each
              highschool user that has submitted a test video to be viewed.
            </p>
          </div>

          <div className="mb-12">
            <p className="font-bold mb-4 text-cyan-500">Customer Support</p>
            <p className="text-gray-500">
              Customer support is extremely important and we provide continuous support for any issue
              that users are experiencing. 
            </p>
          </div>
        </div>
      </section>

      <section id="in-action" className="pb-32 flex flex-col items-center bg-gray-100 text-gray-700">
        <h2 className="text-3xl font-bold mb-12 text-center">
          See our product <u className="text-cyan-500">in action</u>
        </h2>

        <div className="container grid lg:grid-cols-3 gap-6">
          <div className="shadow-lg rounded-lg relative overflow-hidden bg-no-repeat bg-cover"
            style={{backgroundPosition: '50%'}} data-mdb-ripple="true" data-mdb-ripple-color="dark">
            <img src={dashboard}
              className="w-full transition duration-300 ease-linear align-middle"
              alt="Dashboard page for players" />
          </div>

          <div className="shadow-lg rounded-lg relative overflow-hidden bg-no-repeat bg-cover"
            style={{backgroundPosition: '50%'}} data-mdb-ripple="true" data-mdb-ripple-color="dark">
            <img src={profile}
              className="w-full transition duration-300 ease-linear align-middle"
              alt="Player profile page" />
          </div>

          <div className="shadow-lg rounded-lg relative overflow-hidden bg-no-repeat bg-cover"
            style={{backgroundPosition: '50%'}} data-mdb-ripple="true" data-mdb-ripple-color="dark">
            <img src={team}
              className="w-full transition duration-300 ease-linear align-middle"
              alt="Team page for admins" />
          </div>

          <div className="shadow-lg rounded-lg relative overflow-hidden bg-no-repeat bg-cover"
            style={{backgroundPosition: '50%'}} data-mdb-ripple="true" data-mdb-ripple-color="dark">
            <img src={playerData}
              className="w-full transition duration-300 ease-linear align-middle"
              alt="Player data page for admins" />
          </div>

          <div className="shadow-lg rounded-lg relative overflow-hidden bg-no-repeat bg-cover"
            style={{backgroundPosition: '50%'}} data-mdb-ripple="true" data-mdb-ripple-color="dark">
            <img src={hsLinkSubmissions}
              className="w-full transition duration-300 ease-linear align-middle"
              alt="Admin page to show all highschool link submissions" />
          </div>

          <div className="shadow-lg rounded-lg relative overflow-hidden bg-no-repeat bg-cover"
            style={{backgroundPosition: '50%'}} data-mdb-ripple="true" data-mdb-ripple-color="dark">
            <img src={hsProfile}
              className="w-full transition duration-300 ease-linear align-middle"
              alt="High school profile that shows upload links" />
          </div>
        </div>
      </section>

      <section className="py-20 bg-cyan-500 rounded-lg text-center text-gray-800">
        <div className="max-w-[700px] mx-auto px-3 lg:px-6">
          <h2 className="text-3xl text-white font-bold mb-12">Contact us</h2>
          <form>
            <div className="form-group mb-6">
              <input type="text" className="form-control block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-white
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-gray-600 focus:outline-none" id="exampleInput7"
                placeholder="Name" />
            </div>
            <div className="form-group mb-6">
              <input type="email" className="form-control block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-gray-600 focus:outline-none" id="exampleInput8"
                placeholder="Email address" />
            </div>
            <div className="form-group mb-6">
              <textarea className="
                form-control
                block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-gray-600 focus:outline-none
              " id="exampleFormControlTextarea13" rows="3" placeholder="Message"></textarea>
            </div>
            <button type="submit" className="
              w-full
              px-6
              py-2.5
              bg-white
              text-cyan-500
              font-medium
              text-xs
              leading-tight
              uppercase
              rounded
              shadow-md
              hover:bg-gray-200 hover:shadow-lg
              focus:bg-gray-200 focus:shadow-lg focus:outline-none focus:ring-0
              active:bg-gray-200 active:shadow-lg
              transition
              duration-150
              ease-in-out">Send</button>
          </form>
        </div>
      </section>
    </>
    );
}

export default LandingPage;