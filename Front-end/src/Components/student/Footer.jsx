import React from 'react'

function Footer() {
  return (
    <footer className="bg-[#0f172a] text-gray-300 pt-14 pb-8 px-8 md:px-20">

    
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">


        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
              
            </div>
            <h2 className="text-xl font-semibold text-white">SkillSphere</h2>
          </div>

          <p className="mt-4 text-gray-400 text-sm leading-relaxed max-w-sm">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text.
          </p>
        </div>

       
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Company</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition">Home</a></li>
            <li><a href="#" className="hover:text-white transition">About us</a></li>
            <li><a href="#" className="hover:text-white transition">Contact us</a></li>
            <li><a href="#" className="hover:text-white transition">Privacy policy</a></li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white mb-4">
            Subscribe to our newsletter
          </h2>

          <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
            The latest news, articles, and resources, sent to your inbox weekly.
          </p>


          <div className="flex items-center gap-2 mt-5">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-lg bg-[#1e293b] border border-gray-700 text-gray-300 text-sm focus:outline-none focus:border-blue-500"
            />

            <button className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm hover:bg-blue-700 transition">
              Subscribe
            </button>
          </div>
        </div>

      </div>

      {/* DIVIDER LINE */}
      <div className="border-t border-gray-700 w-full mt-12"></div>

      {/* COPYRIGHT */}
      <p className="text-center text-gray-500 text-sm mt-6">
        Copyright 2025 © SkillSphere. All Rights Reserved.
      </p>

    </footer>
  )
}

export default Footer