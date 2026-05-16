import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { ServerUrl } from '../App'
import { FaArrowLeft, FaCalendarAlt, FaChartLine, FaClipboardCheck, FaRegClock } from 'react-icons/fa'

function InterviewHistory() {
    const [interviews, setInterviews] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const getMyInterviews = async () => {
            try {
                const result = await axios.get(ServerUrl + "/api/interview/get-interview", { withCredentials: true })
                setInterviews(result.data)
            } catch (error) {
                console.log(error)
            }
        }
        getMyInterviews()
    }, [])

    const totalInterviews = interviews.length
    const completedInterviews = interviews.filter((item) => item.status === "completed").length
    const averageScore = totalInterviews
        ? (interviews.reduce((sum, item) => sum + (item.finalScore || 0), 0) / totalInterviews).toFixed(1)
        : "0.0"
    const latestDate = interviews[0]?.createdAt
        ? new Date(interviews[0].createdAt).toLocaleDateString()
        : "No sessions yet"


  return (
    <div className='interview-history-page min-h-screen bg-linear-to-br from-gray-50 to-indigo-50 py-10' >
            <div className='w-[90vw] lg:w-[70vw] max-w-[90%] mx-auto'>

                <div className='interview-history-header mb-8 w-full flex items-start justify-between gap-4 flex-wrap'>
                    <div className='flex items-start gap-4'>
                    <button
                        onClick={() => navigate("/")}
                        className='interview-history-back mt-1 p-3 rounded-full bg-white shadow hover:shadow-md transition'><FaArrowLeft className='text-gray-600' /></button>

                    <div>
                        <p className='mb-2 text-xs font-bold uppercase tracking-[0.18em] text-indigo-600'>Practice archive</p>
                        <h1 className='text-3xl font-bold flex-nowrap text-gray-800'>
                            Interview History
                        </h1>
                        <p className='text-gray-500 mt-2'>
                            Track attempts, compare outcomes and reopen detailed performance reports.
                        </p>

                    </div>
                    </div>
                </div>

                <div className='interview-history-summary mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
                    {[
                        { label: "Total sessions", value: totalInterviews, icon: <FaClipboardCheck /> },
                        { label: "Completed", value: completedInterviews, icon: <FaChartLine /> },
                        { label: "Average score", value: `${averageScore}/10`, icon: <FaRegClock /> },
                        { label: "Latest session", value: latestDate, icon: <FaCalendarAlt /> },
                    ].map((stat) => (
                        <div key={stat.label} className='interview-history-stat rounded-2xl border border-indigo-100 bg-white p-5 shadow-sm'>
                            <div className='mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600'>
                                {stat.icon}
                            </div>
                            <p className='text-xl font-bold text-gray-800'>{stat.value}</p>
                            <p className='mt-1 text-xs font-semibold uppercase tracking-wide text-gray-400'>{stat.label}</p>
                        </div>
                    ))}
                </div>

                {interviews.length === 0 ?
                    <div className='interview-history-empty bg-white p-10 rounded-2xl shadow text-center'>
                        <div className='mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600'>
                            <FaClipboardCheck size={22} />
                        </div>
                        <h2 className='text-xl font-bold text-gray-800'>No interviews yet</h2>
                        <p className='mx-auto mt-2 max-w-md text-gray-500'>
                            No interviews found. Start your first interview.
                        </p>
                        <button onClick={() => navigate("/interview")} className='mt-6 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-indigo-700'>
                            Start Interview
                        </button>

                    </div>

                    :

                    <div className='grid gap-6'>
                        {interviews.map((item, index) => (
                            <div key={index}
                            onClick={()=>navigate(`/report/${item._id}`)}
                             className='interview-history-card bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100'>
                                <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                                    <div className='flex items-start gap-4'>
                                        <div className='interview-history-avatar flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-lg font-bold text-indigo-600'>
                                            {(item.role || "I").slice(0, 1).toUpperCase()}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold capitalize text-gray-800">
                                                {item.role}
                                            </h3>

                                            <div className='mt-2 flex flex-wrap gap-2'>
                                                <span className="interview-history-chip rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-500">
                                                    {item.experience || 0} years
                                                </span>
                                                <span className="interview-history-chip rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
                                                    {item.mode}
                                                </span>
                                                <span className="interview-history-chip rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-500">
                                                    {new Date(item.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex items-center gap-6'>

                                        {/* SCORE */}
                                        <div className="interview-history-score text-right">
                                            <p className="text-xl font-bold text-emerald-600">
                                                {item.finalScore || 0}/10
                                            </p>
                                            <p className="text-xs text-gray-400">
                                                Overall Score
                                            </p>
                                        </div>

                                        {/* STATUS BADGE */}
                                        <span
                                            className={`history-status-badge px-4 py-1 rounded-full text-xs font-medium ${item.status === "completed"
                                                    ? "history-status-completed bg-emerald-100 text-emerald-700"
                                                    : "history-status-incompleted bg-yellow-100 text-yellow-700"
                                                }`}
                                        >
                                            {item.status}
                                        </span>


                                    </div>
                                </div>

                            </div>

                        ))
                        }

                    </div>
                }
            </div>

        </div>
  )
}

export default InterviewHistory
