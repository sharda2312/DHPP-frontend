"use client";
// my code

import { useState } from 'react'
import Navbar from '../Navbar';
import Link from 'next/link';
import Predict from '../predict/page';

export default function Dashboard() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>

      <div className="homeback relative isolate h-screen pt-0 mt-0 lg:px-8 bg-black pl-2 pr-2 w-full flex-1 ">

        <div className="flex justify-center items-center h-full">

          <div className="text-left w-4/5 md:w-3/5 ">

            <div className="text-3xl sm:text-3xl md:text-4xl lg:text-6xl font-extrabold flex flex-col md:flex-row">

              <h1 className='pb-28 bg-gradient-to-r from-[#8e5cf1]  to-[#dc0f94] inline-block text-transparent bg-clip-text justify-center'>Delhi House Price Prediction</h1>

            </div>

            <div >

              <div className="pb-32 flex flex-col md:flex-row justify-center  md:gap-x-6 ">
                <Link
                  href="./predict"
                  className=" bg-blue-500 shadow-lg  rounded-md  px-3.5 py-2.5 text-sm font-semibold text-white  hover:bg-purple-500  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Predict Price
                </Link>

              </div>
            </div>

          </div>

        </div>

      </div>
    </>
  )
}
