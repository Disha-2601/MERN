import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux'
import { motion } from "motion/react";
import {
  BsMic,
  BsClock,
  BsBarChart,
  BsFileEarmarkText,
  BsStopwatch
} from "react-icons/bs";
import { HiOutlineBriefcase, HiOutlineMicrophone, HiSparkles } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import AuthModel from '../components/AuthModel';
import hrImg from "../assets/HR.png";
import techImg from "../assets/tech.png";
import confidenceImg from "../assets/confi.png";
import creditImg from "../assets/credit.png";
import heroImg from "../assets/img1.png";
import aiCapHomeImg from "../assets/AIcap home.jpg";
import Footer from '../components/Footer';



function Home() {
  const { userData } = useSelector((state) => state.user)
  const [showAuth, setShowAuth] = useState(false);
  const navigate = useNavigate()
  return (
    <div className='home-page relative overflow-hidden min-h-screen bg-[#f3f3f3] flex flex-col'>
      <Navbar/>

      <div className='home-content flex-1 px-4 sm:px-6 py-10 md:py-14'>
        <div className='max-w-7xl mx-auto relative z-10'>
          <section className='home-hero-panel relative overflow-hidden rounded-[28px] border border-indigo-100 bg-white/80 px-5 py-8 shadow-[0_24px_80px_rgba(79,70,229,0.10)] sm:px-9 lg:px-12 lg:py-10 mb-20 lg:mb-24'>
            <div className='home-hero-bg absolute inset-0 bg-[radial-gradient(circle_at_78%_12%,rgba(99,102,241,0.18),transparent_24rem),linear-gradient(120deg,rgba(255,255,255,0.95),rgba(238,242,255,0.78))]'></div>
            <div className='relative grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr]'>
              <div className='text-left'>
                <div className='home-pill mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-wide text-indigo-500 shadow-sm'>
                  <HiSparkles size={15} className="home-pill-icon text-indigo-500" />
                  AI Powered Interview Platform
                </div>
              <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }} 
                  className='max-w-2xl text-4xl font-bold leading-[1.08] text-slate-950 sm:text-5xl lg:text-6xl'>
                  Ace your next interview with
                  <span className='relative mt-1 inline-block'>
                    <span className='home-hero-highlight bg-gradient-to-r from-blue-500 to-violet-600 bg-clip-text text-transparent'>
                  AI Intelligence

                </span>
                    <span className='absolute -bottom-2 left-1 h-1 w-24 rounded-full bg-violet-500'></span>
                    <span className='absolute -bottom-4 left-12 h-1 w-20 rounded-full bg-indigo-300'></span>
              </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className='mt-8 max-w-xl text-base leading-7 text-gray-500 sm:text-lg'>
                Role-based mock interviews with smart follow-ups,
                adaptive difficulty and real-time performance evaluation.
              </motion.p>

                <div className='mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap'>
              <motion.button
                onClick={() => {
                  if (!userData) {
                    setShowAuth(true)
                    return;
                  }
                  navigate("/interview")
                }}
                whileHover={{ opacity: 0.9, scale: 1.03 }}
                whileTap={{ opacity: 1, scale: 0.98 }}
                    className='inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-3 font-semibold text-white shadow-[0_16px_36px_rgba(79,70,229,0.28)] transition hover:opacity-90'>
                    <HiSparkles size={18} />
                    Start Interview

              </motion.button>

              <motion.button
                onClick={() => {
                  if (!userData) {
                    setShowAuth(true)
                    return;
                  }
                  navigate("/history")
                }}
                whileHover={{ opacity: 0.9, scale: 1.03 }}
                whileTap={{ opacity: 1, scale: 0.98 }}
                    className='home-secondary-action inline-flex items-center justify-center gap-3 rounded-xl border border-indigo-100 bg-white px-8 py-3 font-semibold text-gray-700 shadow-sm transition hover:bg-indigo-50'>
                    <BsClock size={18} />
                    View History

              </motion.button>
            </div>
              </div>
              <div className='home-hero-visual relative flex min-h-[240px] items-center justify-center overflow-hidden sm:min-h-[290px] lg:min-h-[340px] lg:justify-end'>
                <div className='home-hero-dot absolute left-[10%] top-8 h-4 w-4 rounded-full bg-indigo-200'></div>
                <div className='home-hero-ring absolute right-[8%] top-6 h-16 w-16 rounded-full border-[8px] border-indigo-100 sm:h-20 sm:w-20 sm:border-[10px]'></div>
                <div className='home-hero-dot absolute bottom-5 left-[18%] h-5 w-5 rounded-full bg-indigo-200'></div>
                <div className='home-hero-orb absolute right-3 top-1/2 h-9 w-9 rounded-full bg-white shadow-lg'></div>
                <div className='home-hero-chat absolute right-0 top-10 hidden rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 px-5 py-3 text-white shadow-xl sm:block'>
                  <span className='block h-2 w-16 rounded-full bg-white/70'></span>
                  <span className='mt-2 block h-2 w-10 rounded-full bg-white/50'></span>
                </div>
                <div className='home-hero-note absolute bottom-8 left-0 hidden rounded-3xl border border-indigo-100 bg-white/90 p-4 shadow-xl sm:block'>
                  <span className='block h-3 w-28 rounded-full bg-indigo-100'></span>
                  <span className='mt-3 block h-3 w-44 rounded-full bg-slate-100'></span>
                  <span className='mt-3 block h-3 w-36 rounded-full bg-slate-100'></span>
                </div>
                <img
                  src={heroImg}
                  alt="AI interview assistant"
                  className='relative z-10 h-auto max-h-[260px] w-full max-w-[520px] object-contain mix-blend-multiply sm:max-h-[320px] lg:max-h-[350px]'
                />
              </div>
            </div>
          </section>

            <div className='home-steps-grid mx-auto mb-28 grid w-full max-w-6xl grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {
              [
                {
                  icon: <HiOutlineBriefcase size={28} />,
                  step: "STEP 1",
                  title: "Set Your Interview Profile",
                  desc: "Choose your target role and experience level so each question starts at the right depth."
                },
                {
                  icon: <HiOutlineMicrophone size={28} />,
                  step: "STEP 2",
                  title: "Practice With Voice AI",
                  desc: "Answer naturally while the interviewer adapts follow-ups to your response quality."
                },
                {
                  icon: <BsStopwatch size={27} />,
                  step: "STEP 3",
                  title: "Simulate Real Timing",
                  desc: "Build pace, clarity and confidence with interview-style time pressure."
                }
              ].map((item, index) => (
                <motion.div key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 + index * 0.2 }}
                whileHover={{ y: -8 }}

                  className={`
                    home-step-card home-step-card-${index + 1} relative flex min-h-[280px] w-full flex-col overflow-visible rounded-3xl border border-indigo-100 bg-white p-7 text-center shadow-sm transition-all duration-300 hover:border-indigo-300 hover:shadow-xl sm:p-8
                    ${index === 2 ? "sm:col-span-2 lg:col-span-1" : ""}
                
                   `}>

                  <div className='home-step-icon absolute -top-8 left-0 right-0 z-20 mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-indigo-100 bg-indigo-50 text-indigo-600 shadow-sm'>
                    {item.icon}
                  </div>

                  <div className='relative z-10 flex h-full flex-col items-center justify-center pt-10'>
                    <div className='mb-4 flex justify-center'>
                      <div className='home-step-number rounded-full border border-indigo-100 bg-white px-3 py-1 text-xs font-bold tracking-wide text-indigo-600'>
                        {item.step}
                      </div>
                    </div>

                    <div className='mx-auto max-w-[18rem]'>
                      <h3 className='mb-4 text-xl font-semibold leading-snug text-slate-950'>{item.title}</h3>
                      <p className='text-sm leading-7 text-gray-500'>{item.desc}</p>
                    </div>
                  </div>
                  

                </motion.div>
              ))
            }
          </div>

          <div className='mb-32'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='ai-capability-heading mx-auto mb-14 max-w-3xl text-center'>
              <div className='home-pill mx-auto mb-5 flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-wide text-indigo-500 shadow-sm'>
                <HiSparkles size={15} className="home-pill-icon text-indigo-500" />
                AI Decision Engine
              </div>
              <h2 className='block text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl'>
                Advanced AI{" "}
                <span className="ai-capability-title-gradient bg-gradient-to-r from-indigo-600 via-violet-600 to-sky-500 bg-clip-text text-transparent">
                  Capabilities
                </span>
              </h2>
              <p className='mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-500 sm:text-lg'>
                A connected interview workspace where evaluation, resume intelligence, reporting and analytics work together in real time.
              </p>
            </motion.div>

            <div className='ai-capability-showcase relative mx-auto grid max-w-7xl items-center gap-6 lg:grid-cols-[1fr_0.82fr_1fr] lg:gap-11 xl:gap-14'>
              <div className='grid gap-5'>
                {
                  [
                    {
                      icon: <BsBarChart size={20} />,
                      title: "AI Answer Evaluation",
                      desc: "Scores communication, technical accuracy and confidence.",
                      stat: "Live scoring"
                    },
                    {
                      icon: <BsFileEarmarkText size={20} />,
                      title: "Resume Based Interview",
                      desc: "Project-specific questions based on uploaded resume.",
                      stat: "Resume aware"
                    }
                  ].map((item, index) => (
                    <motion.div key={item.title}
                      initial={{ opacity: 0, x: -28 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.12 }}
                      whileHover={{ y: -6 }}
                      className='ai-capability-card ai-capability-card-left home-feature-card relative rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-xl'>
                      <div className='ai-capability-card-inner relative z-10'>
                        <div className='home-feature-icon mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600'>
                          {item.icon}
                        </div>
                        <span className='ai-capability-stat mb-3 inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600'>
                          {item.stat}
                        </span>
                        <h3 className='mb-3 text-xl font-semibold text-slate-950'>{item.title}</h3>
                        <p className='text-sm leading-relaxed text-gray-500'>{item.desc}</p>
                      </div>
                    </motion.div>
                  ))
                }
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.65 }}
                className='ai-capability-center relative order-first mx-auto w-full max-w-[410px] overflow-hidden rounded-[26px] border border-indigo-100 bg-white p-3 shadow-[0_28px_90px_rgba(79,70,229,0.18)] lg:order-none lg:max-w-[360px] xl:max-w-[390px]'>
                <div className='ai-capability-center-glow absolute inset-0'></div>
                <div className='ai-capability-screen relative z-10 flex aspect-[4/5] w-full items-start justify-center overflow-hidden rounded-[22px] bg-slate-950/95 p-2 sm:aspect-[3/4] lg:aspect-[4/5]'>
                  <img
                    src={aiCapHomeImg}
                    alt="Advanced AI capabilities website preview"
                    className='h-full w-full rounded-[16px] object-cover object-top'
                  />
                </div>
                <div className='ai-capability-preview-bar relative z-10 mt-3 flex items-center justify-between rounded-2xl bg-slate-950 px-4 py-3 text-white'>
                  <div>
                    <p className='text-xs font-semibold uppercase tracking-wide text-indigo-200'>HireIQ AI Core</p>
                    <p className='text-sm font-semibold'>Interview intelligence dashboard</p>
                  </div>
                  <HiSparkles size={22} className='text-indigo-300' />
                </div>
              </motion.div>

              <div className='grid gap-5'>
                {
                  [
                    {
                      icon: <BsFileEarmarkText size={20} />,
                      title: "Downloadable PDF Report",
                      desc: "Detailed strengths, weaknesses and improvement insights.",
                      stat: "Export ready"
                    },
                    {
                      icon: <BsBarChart size={20} />,
                      title: "History & Analytics",
                      desc: "Track progress with performance graphs and topic analysis.",
                      stat: "Progress trends"
                    }
                  ].map((item, index) => (
                    <motion.div key={item.title}
                      initial={{ opacity: 0, x: 28 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.12 }}
                      whileHover={{ y: -6 }}
                      className='ai-capability-card ai-capability-card-right home-feature-card relative rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-xl'>
                      <div className='ai-capability-card-inner relative z-10'>
                        <div className='home-feature-icon mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600'>
                          {item.icon}
                        </div>
                        <span className='ai-capability-stat mb-3 inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600'>
                          {item.stat}
                        </span>
                        <h3 className='mb-3 text-xl font-semibold text-slate-950'>{item.title}</h3>
                        <p className='text-sm leading-relaxed text-gray-500'>{item.desc}</p>
                      </div>
                    </motion.div>
                  ))
                }
              </div>
            </div>

            
          </div>

          <div className='mb-20'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='interview-modes-heading mx-auto mb-10 max-w-3xl text-center'>
              <div className='home-pill mx-auto mb-5 flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-wide text-indigo-500 shadow-sm'>
                <BsMic size={15} className="home-pill-icon text-indigo-500" />
                Practice paths
              </div>
              <h2 className='text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl'>
                Multiple Interview{" "}
                <span className="ai-capability-title-gradient bg-gradient-to-r from-indigo-600 via-violet-600 to-sky-500 bg-clip-text text-transparent">
                  Modes
                </span>
              </h2>
              <p className='mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-500'>
                Choose a focused mode for every stage of preparation, from HR communication to technical depth, confidence and credits.
              </p>
            </motion.div>

            <div className='interview-mode-tall-grid mx-auto grid w-full max-w-7xl auto-rows-fr grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4'>
              {
                [
                  {
                    img: hrImg,
                    title: "HR Interview Mode",
                    desc: "Behavioral and communication based evaluation."
                  },
                  {
                    img: techImg,
                    title: "Technical Interview Mode",
                    desc: "Deep technical questioning based on selected role."
                  },

                  {
                    img: confidenceImg,
                    title: "Confidence Detection",
                    desc: "Basic tone and voice analysis insights."
                  },
                  {
                    img: creditImg,
                    title: "Credits System",
                    desc: "Unlock premium interview sessions easily."
                  }
                ].map((mode, index) => (
                  <motion.div key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -6 }}
                    className="interview-mode-tall-card home-feature-card relative flex h-full min-h-[340px] overflow-hidden rounded-3xl border border-gray-200 bg-white p-7 shadow-sm transition-all hover:shadow-xl">

                    <div className='relative z-10 grid min-h-[286px] w-full grid-rows-[auto_1fr_auto]'>
                      <div className="interview-mode-copy text-left">
                        <span className='interview-mode-kicker mb-5 inline-flex items-center rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-indigo-600'>
                          Mode 0{index + 1}
                        </span>
                        <h3 className="mb-4 text-xl font-semibold leading-snug text-slate-950">
                          {mode.title}
                        </h3>

                        <p className="text-sm leading-relaxed text-gray-500">
                          {mode.desc}
                        </p>
                      </div>

                      <div className="interview-mode-media flex h-36 w-full items-center justify-center self-end pt-6">
                        <div className='interview-mode-image-frame flex h-32 w-36 items-center justify-center overflow-hidden rounded-2xl'>
                        <img
                          src={mode.img}
                          alt={mode.title}
                          className="h-full w-full object-cover object-center"
                        />
                        </div>
                      </div>
                    </div>


                  </motion.div>
                ))
              }
            </div>


          </div>




          </div>
        </div> 


           
      {showAuth && <AuthModel onClose={()=>setShowAuth(false)}/>}

        <Footer/>
      
      
    </div>
  )
}

export default Home
