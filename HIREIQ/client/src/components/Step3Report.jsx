import React from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { motion } from "motion/react"
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

function Step3Report({report}) {
  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading Report...</p>
      </div>
    );
  }
  const navigate = useNavigate()
  const {
    finalScore = 0,
    confidence = 0,
    communication = 0,
    correctness = 0,
    questionWiseScore = [],
  } = report;


  const questionScoreData = questionWiseScore.map((score, index) => ({
    name: `Q${index + 1}`,
    score: score.score || 0
  }))

  const skills = [
    { label: "Confidence", value: confidence },
    { label: "Communication", value: communication },
    { label: "Correctness", value: correctness },
  ];

  let performanceText = "";
  let shortTagline = "";

  if (finalScore >= 8) {
    performanceText = "Ready for job opportunities.";
    shortTagline = "Excellent clarity and structured responses.";
  } else if (finalScore >= 5) {
    performanceText = "Needs minor improvement before interviews.";
    shortTagline = "Good foundation, refine articulation.";
  } else {
    performanceText = "Significant improvement required.";
    shortTagline = "Work on clarity and confidence.";
  }

  const score = finalScore;
  const percentage = (score / 10) * 100;

  const downloadPDF = () => {
    const doc = new jsPDF("p", "mm", "a4");

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 16;
    const contentWidth = pageWidth - margin * 2;
    const indigo = [99, 102, 241];
    const indigoLight = [238, 242, 255];
    const slate = [31, 41, 55];
    const muted = [107, 114, 128];

    let currentY = 18;

    const sectionTitle = (title, y) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.setTextColor(...slate);
      doc.text(title, margin, y);
      doc.setDrawColor(...indigo);
      doc.setLineWidth(0.5);
      doc.line(margin, y + 3, margin + 24, y + 3);
    };

    doc.setFillColor(...indigo);
    doc.roundedRect(margin, currentY, contentWidth, 22, 4, 4, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(255, 255, 255);
    doc.text("AI Interview Performance Report", pageWidth / 2, currentY + 9, {
      align: "center",
    });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(`Generated on ${new Date().toLocaleDateString()}`, pageWidth / 2, currentY + 16, {
      align: "center",
    });

    currentY += 34;

    const cardGap = 5;
    const cardWidth = (contentWidth - cardGap * 3) / 4;
    const summaryCards = [
      ["Final Score", `${finalScore}/10`],
      ["Confidence", `${confidence}/10`],
      ["Communication", `${communication}/10`],
      ["Correctness", `${correctness}/10`],
    ];

    summaryCards.forEach(([label, value], index) => {
      const x = margin + index * (cardWidth + cardGap);
      doc.setFillColor(...indigoLight);
      doc.setDrawColor(224, 231, 255);
      doc.roundedRect(x, currentY, cardWidth, 23, 3, 3, "FD");
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(...muted);
      doc.text(label, x + cardWidth / 2, currentY + 8, { align: "center" });
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.setTextColor(...indigo);
      doc.text(value, x + cardWidth / 2, currentY + 17, { align: "center" });
    });

    currentY += 38;

    let advice = "";

    if (finalScore >= 8) {
      advice =
        "Excellent performance. Maintain confidence and structure. Continue refining clarity and supporting answers with strong real-world examples.";
    } else if (finalScore >= 5) {
      advice =
        "Good foundation shown. Improve clarity and structure. Practice delivering concise, confident answers with stronger supporting examples.";
    } else {
      advice =
        "Significant improvement required. Focus on structured thinking, clarity, and confident delivery. Practice answering aloud regularly.";
    }

    sectionTitle("Professional Advice", currentY);
    currentY += 8;

    const splitAdvice = doc.splitTextToSize(advice, contentWidth - 16);
    const adviceHeight = Math.max(25, splitAdvice.length * 5 + 16);

    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(229, 231, 235);
    doc.roundedRect(margin, currentY, contentWidth, adviceHeight, 4, 4, "FD");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    doc.setTextColor(...slate);
    doc.text(splitAdvice, margin + 8, currentY + 12);

    currentY += adviceHeight + 16;

    sectionTitle("Question Breakdown", currentY);
    currentY += 8;

    autoTable(doc, {
      startY: currentY,
      margin: { left: margin, right: margin },
      head: [["#", "Question", "Score", "Feedback"]],
      body: questionWiseScore.map((q, i) => [
        `${i + 1}`,
        q.question || "Question not available",
        `${q.score ?? 0}/10`,
        q.feedback || "No feedback available.",
      ]),
      theme: "plain",
      styles: {
        font: "helvetica",
        fontSize: 9,
        cellPadding: { top: 5, right: 4, bottom: 5, left: 4 },
        lineColor: [229, 231, 235],
        lineWidth: 0.2,
        overflow: "linebreak",
        textColor: [55, 65, 81],
        valign: "middle",
      },
      headStyles: {
        fillColor: indigo,
        textColor: 255,
        fontStyle: "bold",
        fontSize: 9.5,
        halign: "center",
        valign: "middle",
        minCellHeight: 12,
      },
      bodyStyles: {
        minCellHeight: 16,
      },
      columnStyles: {
        0: { cellWidth: 12, halign: "center", valign: "middle" },
        1: { cellWidth: 68, halign: "left", valign: "top" },
        2: { cellWidth: 22, halign: "center", valign: "middle", fontStyle: "bold" },
        3: { cellWidth: contentWidth - 102, halign: "left", valign: "top" },
      },
      alternateRowStyles: {
        fillColor: [249, 250, 251],
      },
      didDrawPage: () => {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(156, 163, 175);
        doc.text(
          `Page ${doc.internal.getNumberOfPages()}`,
          pageWidth / 2,
          pageHeight - 8,
          { align: "center" }
        );
      },
    });

    doc.save("AI_Interview_Report.pdf");
  };

   return (
    <div className='min-h-screen bg-linear-to-br from-gray-50 to-indigo-50 px-4 sm:px-6 lg:px-10 py-8'>
      <div className='mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
          <div className='md:mb-10 w-full flex items-start gap-4 flex-wrap'>
          <button
            onClick={() => navigate("/history")}
            className='mt-1 p-3 rounded-full bg-white shadow hover:shadow-md transition'><FaArrowLeft className='text-gray-600' /></button>

          <div>
            <h1 className='text-3xl font-bold flex-nowrap text-gray-800'>
              Interview Analytics Dashboard
            </h1>
            <p className='text-gray-500 mt-2'>
              AI-powered performance insights
            </p>

          </div>
        </div>

        <button onClick={downloadPDF} className='bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl shadow-md transition-all duration-300 font-semibold text-sm sm:text-base text-nowrap'>Download PDF</button>
      
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8'>
        <div className='space-y-6'>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-6 sm:p-8 text-center">


               <h3 className="text-gray-500 mb-4 sm:mb-6 text-sm sm:text-base">
              Overall Performance
            </h3>

              <div className='relative w-20 h-20 sm:w-25 sm:h-25 mx-auto'>
              <CircularProgressbar
                value={percentage}
                text={`${score}/10`}
                styles={buildStyles({
                  textSize: "18px",
                  pathColor: "#6366f1",
                  textColor: "#ef4444",
                  trailColor: "#e5e7eb",
                })}
              />
            </div>

             <p className="text-gray-400 mt-3 text-xs sm:text-sm">
              Out of 10
            </p>

            <div className="mt-4">
              <p className="font-semibold text-gray-800 text-sm sm:text-base">
                {performanceText}
              </p>
              <p className="text-gray-500 text-xs sm:text-sm mt-1">
                {shortTagline}
              </p>
            </div>
            </motion.div>

             <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='bg-white rounded-2xl sm:rounded-3xl shadow-lg p-6 sm:p-8'>
            <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-6">
              Skill Evaluation
            </h3>

            <div className='space-y-5'>
              {
                skills.map((s, i) => (
                  <div key={i}>
                    <div className='flex justify-between mb-2 text-sm sm:text-base'>

                      <span>{s.label}</span>
                      <span className='font-semibold text-indigo-600'>{s.value}</span>
                    </div>

                    <div className='bg-gray-200 h-2 sm:h-3 rounded-full'>
                      <div className='bg-indigo-500 h-full rounded-full'
                        style={{ width: `${s.value * 10}%` }}>

                        </div>

                    </div>


                  </div>
                ))
              }
            </div>

          </motion.div>

        </div>


        <div className='lg:col-span-2 space-y-6'>
           <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='bg-white rounded-2xl sm:rounded-3xl shadow-lg p-5 sm:p-8'>
            <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-4 sm:mb-6">
              Performance Trend
            </h3>

            <div className='h-64 sm:h-72'>

              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={questionScoreData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 10]} />
                  <Tooltip />
                  <Area type="monotone"
                    dataKey="score"
                    stroke="#6366f1"
                    fill="#c7d2fe"

                    strokeWidth={3} />


                </AreaChart>

              </ResponsiveContainer>


            </div>


          </motion.div>

            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='bg-white rounded-2xl sm:rounded-3xl shadow-lg p-5 sm:p-8'>
            <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-6">
              Question Breakdown
            </h3>
            <div className='space-y-6'>
              {questionWiseScore.map((q, i) => (
                <div key={i} className='bg-gray-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-gray-200'>

                  <div className='flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4'>
                    <div>
                      <p className="text-xs text-gray-400">
                        Question {i + 1}
                      </p>

                      <p className="font-semibold text-gray-800 text-sm sm:text-base leading-relaxed">
                        {q.question || "Question not available"}
                      </p>
                    </div>


                    <div className='bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full font-bold text-xs sm:text-sm w-fit'>
                      {q.score ?? 0}/10
                    </div>
                  </div>

                  <div className='bg-indigo-50 border border-indigo-200 p-4 rounded-lg'>
                    <p className='text-xs text-indigo-600 font-semibold mb-1'>
                      AI Feedback
                    </p>
                    <p className='text-sm text-gray-700 leading-relaxed'>

                      {q.feedback && q.feedback.trim() !== ""
                        ? q.feedback
                        : "No feedback available for this question."}
                    </p>
                  </div>

                </div>
              ))}
            </div>

          </motion.div>



        </div>
      </div>

    </div>

   )


}

export default Step3Report
