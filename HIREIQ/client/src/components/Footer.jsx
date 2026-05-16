import React from 'react'
import { BsArrowRight, BsClock, BsFileEarmarkText, BsRobot } from 'react-icons/bs'

function Footer() {
  return (
    <footer className='site-footer-shell bg-[#f3f3f3] px-4 pb-10 pt-0 sm:px-6'>
      <div className='site-footer mx-auto w-full max-w-7xl overflow-hidden rounded-[30px] border border-gray-200 bg-white shadow-[0_22px_70px_rgba(15,23,42,0.08)]'>
        <div className='site-footer-top relative grid gap-8 px-6 py-9 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:py-10'>
          <div className='site-footer-glow absolute inset-0'></div>
          <div className='text-center sm:text-left'>
            <div className='mb-4 flex items-center justify-center gap-3 sm:justify-start'>
              <div className='site-footer-logo flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white'>
                <BsRobot size={18} />
              </div>
              <div>
                <h2 className='text-lg font-semibold'>HireIQ</h2>
                <p className='text-xs font-medium uppercase tracking-[0.18em] text-indigo-500'>Interview smarter</p>
              </div>
            </div>
            <p className='mx-auto max-w-xl text-sm leading-6 text-gray-500 sm:mx-0'>
              AI-powered interview preparation platform designed to improve
              communication skills, technical depth and professional confidence.
            </p>
            <div className='mt-6 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-600'>
              <BsClock size={16} />
              Practice, review, improve
            </div>
          </div>

          <div className='grid gap-3 sm:grid-cols-3 lg:max-w-xl lg:justify-self-end lg:self-center'>
            <div className='site-footer-chip flex min-h-24 flex-col items-center justify-center gap-2 rounded-2xl border border-indigo-100 bg-indigo-50 px-4 py-4 text-sm font-semibold text-gray-700'>
              <BsRobot className='text-indigo-600' size={17} />
              Mock AI
            </div>
            <div className='site-footer-chip flex min-h-24 flex-col items-center justify-center gap-2 rounded-2xl border border-indigo-100 bg-indigo-50 px-4 py-4 text-sm font-semibold text-gray-700'>
              <BsFileEarmarkText className='text-indigo-600' size={17} />
              Resume Qs
            </div>
            <div className='site-footer-chip flex min-h-24 flex-col items-center justify-center gap-2 rounded-2xl border border-indigo-100 bg-indigo-50 px-4 py-4 text-sm font-semibold text-gray-700'>
              <BsClock className='text-indigo-600' size={17} />
              Timed Prep
            </div>
          </div>
        </div>

        <div className='site-footer-bottom flex flex-col items-center justify-between gap-3 border-t border-gray-100 px-6 py-5 text-sm text-gray-500 sm:flex-row sm:px-8 lg:px-10'>
          <p>Practice with clarity. Improve with every session.</p>
          <div className='site-footer-cta flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-2 font-semibold text-white'>
            Ready for your next interview
            <BsArrowRight size={16} />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
