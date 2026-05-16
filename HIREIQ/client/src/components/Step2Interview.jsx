import React, { useEffect, useRef, useState } from "react";
import maleVideo from "../assets/videos/male-ai.mp4";
import femaleVideo from "../assets/videos/female-ai.mp4";
import Timer from "./Timer";
import { motion } from "motion/react";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import axios from "axios";
import { ServerUrl } from "../App";
import { BsArrowRight, BsClock, BsSoundwave } from "react-icons/bs";

function Step2Interview({ interviewData, onFinish }) {
  const { interviewId, questions, userName } = interviewData;
  const [isIntroPhase, setIsIntroPhase] = useState(true);

  const [isMicOn, setIsMicOn] = useState(true);
  const recognitionRef = useRef(null);
  const [isAIPlaying, setIsAIPlaying] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [timeLeft, setTimeLeft] = useState(questions[0]?.timeLimit || 60);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [voiceGender, setVoiceGender] = useState("female");
  const [subtitle, setSubtitle] = useState("");

  const videoRef = useRef(null);

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const totalTime = currentQuestion?.timeLimit || 60;
  const completedQuestions = Math.max(currentIndex, 0);
  const questionProgress = totalQuestions ? ((currentIndex + 1) / totalQuestions) * 100 : 0;
  const timeUsed = Math.max(totalTime - timeLeft, 0);
  const statusLabel = isIntroPhase ? "Intro" : isAIPlaying ? "AI Speaking" : isMicOn ? "Listening" : "Answering";

  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (!voices.length) return;

      // Try known female voices first
      const femaleVoice = voices.find(
        (v) =>
          v.name.toLowerCase().includes("veena") ||
          v.name.toLowerCase().includes("victoria") ||
          v.name.toLowerCase().includes("serena") ||
          v.name.toLowerCase().includes("female"),
      );

      if (femaleVoice) {
        setSelectedVoice(femaleVoice);
        setVoiceGender("female");
        return;
      }

      // Try known male voices
      const maleVoice = voices.find(
        (v) =>
          v.name.toLowerCase().includes("david") ||
          v.name.toLowerCase().includes("mark") ||
          v.name.toLowerCase().includes("male"),
      );

      if (maleVoice) {
        setSelectedVoice(maleVoice);
        setVoiceGender("male");
        return;
      }

      // Fallback: first voice (assume female)
      setSelectedVoice(voices[0]);
      setVoiceGender("female");
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const videoSource = voiceGender === "male" ? maleVideo : femaleVideo;

  /* ---------------- SPEAK FUNCTION ---------------- */
  const speakText = (text) => {
    return new Promise((resolve) => {
      if (!window.speechSynthesis || !selectedVoice) {
        resolve();
        return;
      }

      window.speechSynthesis.cancel();

      // Add natural pauses after commas and periods
      const humanText = text.replace(/,/g, ", ... ").replace(/\./g, ". ... ");

      const utterance = new SpeechSynthesisUtterance(humanText);

      utterance.voice = selectedVoice;

      // Human-like pacing
      utterance.rate = 0.92; // slightly slower than normal
      utterance.pitch = 1.05; // small warmth
      utterance.volume = 1;

      utterance.onstart = () => {
        setIsAIPlaying(true);
        stopMic();
        videoRef.current?.play();
      };

      utterance.onend = () => {
        videoRef.current?.pause();
        videoRef.current.currentTime = 0;
        setIsAIPlaying(false);

        if (isMicOn) {
          startMic();
        }

        setTimeout(() => {
          setSubtitle("");
          resolve();
        }, 300);
      };

      setSubtitle(text);

      window.speechSynthesis.speak(utterance);
    });
  };

  useEffect(() => {
    if (!selectedVoice) {
      return;
    }
    const runIntro = async () => {
      if (isIntroPhase) {
        await speakText(
          `Hi ${userName}, it's great to meet you today. I hope you're feeling confident and ready.`,
        );

        await speakText(
          "I'll ask you a few questions. Just answer naturally, and take your time. Let's begin.",
        );

        setIsIntroPhase(false);
      } else if (currentQuestion) {
        await new Promise((r) => setTimeout(r, 800));

        // If last question (hard level)
        if (currentIndex === questions.length - 1) {
          await speakText("Alright, this one might be a bit more challenging.");
        }

        await speakText(currentQuestion.question);

        if (isMicOn) {
          startMic();
        }
      }
    };

    runIntro();
  }, [selectedVoice, isIntroPhase, currentIndex]);

  useEffect(() => {
    if (isIntroPhase) return;
    if (!currentQuestion) return;
    

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isIntroPhase, currentIndex ]);


  useEffect(() => {
  if (!isIntroPhase && currentQuestion) {
    setTimeLeft(currentQuestion.timeLimit || 60);
  }
}, [currentIndex]);




  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) return;

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript;

      setAnswer((prev) => prev + " " + transcript);
    };

    recognitionRef.current = recognition;
  }, []);

  const startMic = () => {
    if (recognitionRef.current && !isAIPlaying) {
      try {
        recognitionRef.current.start();
      } catch {}
    }
  };

  const stopMic = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const toggleMic = () => {
    if (isMicOn) {
      stopMic();
    } else {
      startMic();
    }
    setIsMicOn(!isMicOn);
  };

  const submitAnswer = async () => {
    if (isSubmitting) return;
    stopMic();
    setIsSubmitting(true);

    try {
      const result = await axios.post(
        ServerUrl + "/api/interview/submit-answer",
        {
          interviewId,
          questionIndex: currentIndex,
          answer,
          timeTaken: currentQuestion.timeLimit - timeLeft,
        },
        { withCredentials: true },
      );

      setFeedback(result.data.feedback);
      speakText(result.data.feedback);
      setIsSubmitting(false);
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  }



   const handleNext =async () => {
    setAnswer("");
    setFeedback("");

    if (currentIndex + 1 >= questions.length) {
      finishInterview();
      return;
    }

    await speakText("Alright, let's move to the next question.");

    setCurrentIndex(currentIndex + 1);
    setTimeout(() => {
      if (isMicOn) startMic();
    }, 500);
   
  }


   const finishInterview = async () => {
    stopMic()
    setIsMicOn(false)
    try {
      const result = await axios.post(ServerUrl+ "/api/interview/finish" , { interviewId} , {withCredentials:true})

      console.log(result.data)
      onFinish(result.data)
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    if (isIntroPhase) return;
    if (!currentQuestion) return;

    if (timeLeft === 0 && !isSubmitting && !feedback) {
      submitAnswer()
    }
  }, [timeLeft]);


   useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current.abort();
      }

      window.speechSynthesis.cancel();
    };
  }, []);

  

  return (
    <div className="step2-interview-page min-h-screen bg-gradient-to-br from-indigo-200 via-violet-100 to-purple-200 flex items-center justify-center p-4 sm:p-6">
      <div className="step2-interview-shell w-full max-w-350 min-h-[80vh] lg:h-[80vh] lg:min-h-[720px] lg:max-h-[860px] bg-white rounded-3xl shadow-2xl border border-gray-200 flex flex-col lg:flex-row overflow-hidden">
        {/* video section */}
        <div className="step2-side-panel w-full lg:w-[35%] bg-white flex flex-col items-center p-6 space-y-6 border-r border-gray-200 lg:overflow-y-auto">
          <div className="step2-video-frame flex w-full max-w-md items-center justify-center overflow-hidden rounded-2xl bg-slate-100 shadow-xl">
            <video
              src={videoSource}
              key={videoSource}
              ref={videoRef}
              muted
              playsInline
              preload="auto"
              className="h-full w-full object-contain object-center"
            />
          </div>

          {/* subtitle */}
          <div className="step2-subtitle-card flex min-h-[88px] w-full max-w-md items-center justify-center bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm">
            <p className="line-clamp-3 text-gray-700 text-sm sm:text-base font-medium text-center leading-relaxed">
              {subtitle || "Your interview prompt will appear here."}
            </p>
          </div>

          {/* timer Area */}
          <div className="step2-status-card w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-md p-6 space-y-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-sm font-semibold text-gray-800">Interview Status</span>
                <p className="mt-1 text-xs leading-5 text-gray-400">
                  Stay concise and answer before the timer ends.
                </p>
              </div>
              <span className={`step2-status-pill ${isAIPlaying ? "step2-status-pill-speaking" : ""} inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold text-indigo-600`}>
                {isAIPlaying ? <BsSoundwave size={14} /> : <BsClock size={13} />}
                {statusLabel}
              </span>
            </div>
            <div className="step2-divider h-px bg-gray-200"></div>

            <div className="step2-timer-wrap flex flex-col items-center rounded-2xl bg-indigo-50/60 px-4 py-5">
              <Timer
                timeLeft={timeLeft}
                totalTime={totalTime}
              />
              <div className="mt-3 flex w-full items-center justify-between text-xs font-medium text-gray-500">
                <span>{timeUsed}s used</span>
                <span>{totalTime}s limit</span>
              </div>
            </div>

            <div className="step2-divider h-px bg-gray-200"></div>

            <div>
              <div className="mb-3 flex items-center justify-between text-xs font-semibold text-gray-500">
                <span>Question progress</span>
                <span>{completedQuestions}/{totalQuestions} completed</span>
              </div>
              <div className="step2-progress-track h-2 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="step2-progress-fill h-full rounded-full bg-gradient-to-r from-indigo-600 to-purple-500"
                  style={{ width: `${questionProgress}%` }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="step2-status-stat rounded-2xl bg-gray-50 px-3 py-4">
                <span className="block text-2xl font-bold text-indigo-600">
                  {currentIndex + 1}
                </span>
                <span className="text-xs text-gray-400">Current Question</span>
              </div>

              <div className="step2-status-stat rounded-2xl bg-gray-50 px-3 py-4">
                <span className="block text-2xl font-bold text-indigo-600">
                  {totalQuestions}
                </span>
                <span className="text-xs text-gray-400">Total Questions</span>
              </div>
            </div>
          </div>
        </div>

        {/* Text section */}

        <div className="step2-main-panel min-h-0 flex-1 flex flex-col p-4 sm:p-6 md:p-8 relative">
          <h2 className="text-xl sm:text-2xl font-bold text-indigo-600 mb-6">
            AI Smart Interview
          </h2>

          <div className="step2-question-card relative mb-6 flex min-h-[122px] flex-col justify-center bg-gray-50 p-4 sm:p-6 rounded-2xl border border-gray-200 shadow-sm">
            <p className="text-xs sm:text-sm text-gray-400 mb-2">
              {!isIntroPhase ? `Question ${currentIndex + 1} of ${questions.length}` : "Interview intro"}
            </p>

            <div className="line-clamp-3 text-base sm:text-lg font-semibold text-gray-800 leading-relaxed">
              {!isIntroPhase ? currentQuestion?.question : "The first question will appear here after the AI introduction."}
            </div>
          </div>

          <textarea
            placeholder="Type your answer here..."
            onChange={(e) => setAnswer(e.target.value)}
            value={answer}
            className="step2-answer-box min-h-0 flex-1 bg-gray-100 p-4 sm:p-6 rounded-2xl resize-none outline-none border border-gray-200 focus:ring-2 focus:ring-indigo-500 transition text-gray-800"
          />

          {!feedback ? ( <div className='flex items-center gap-4 mt-6'>
            <motion.button
              onClick={toggleMic}
              whileTap={{ scale: 0.9 }}
              className='step2-mic-button w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-black text-white shadow-lg'>
              {isMicOn ? <FaMicrophone size={20} /> : <FaMicrophoneSlash size={20}/>}
            </motion.button>

            <motion.button
            onClick={submitAnswer}
            disabled={isSubmitting}
              whileTap={{ scale: 0.95 }}
              className="step2-submit-button flex-1 bg-gradient-to-r from-indigo-700 to-purple-600 text-white py-3 sm:py-4 rounded-2xl shadow-lg hover:opacity-90 transition font-semibold disabled:bg-gray-500"
            >
              {isSubmitting?"Submitting...":"Submit Answer"}
            </motion.button>


    </div>):(
            <motion.div 
             initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            className='step2-feedback-card mt-6 bg-indigo-50 border border-indigo-200 p-5 rounded-2xl shadow-sm'>
              <p className='text-indigo-700 font-medium mb-4'>{feedback}</p>

              <button
              onClick={handleNext}

               className='w-full bg-gradient-to-r from-indigo-600 to-purple-500 text-white py-3 rounded-xl shadow-md hover:opacity-90 transition flex items-center justify-center gap-1'>
                Next Question <BsArrowRight size={18}/>
              </button>

            </motion.div>
          )}
        </div>
      </div>

    </div>
  )
}

export default Step2Interview
