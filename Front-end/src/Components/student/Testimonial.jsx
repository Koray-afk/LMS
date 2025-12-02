import React from 'react'
import { dummyTestimonial } from '../../assets/assets'

function Testimonial() {
  return (
    <div className="pb-14 px-6 md:px-35">  

      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mt-3">
        Testimonials
      </h1>

      <p className="text-gray-600 text-center max-w-2xl mx-auto mt-3 md:text-base">
        Hear from our learners as they share their journeys of transformation, 
        success, and how our platform made a difference in their lives.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">

        {dummyTestimonial.map((value, index) => (
          <div 
            key={index}
            className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition-all duration-300 border border-gray-200"
          >
            <div className="flex items-center gap-4 bg-gray-200 w-full rounded-2xl p-3">
              <img 
                src={value.image}
                alt={value.name}
                className="w-16 h-16 rounded-full object-cover border"
              />

              <div>
                <h1 className="text-lg font-semibold text-gray-800">
                  {value.name}
                </h1>
                <p className="text-sm text-gray-500">{value.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-yellow-500 text-xl mt-4">
              ⭐⭐⭐⭐⭐
            </div>

            <p className="text-gray-600 mt-4 leading-relaxed">
              {value.feedback}
            </p>
          </div>
        ))}

      </div>
    </div>
  )
}

export default Testimonial