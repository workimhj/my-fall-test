import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import mainBackground from "./assets/background.png";
import questionBackground from "./assets/background2.png";

const questions = [
  {
    question: "가을에는 어떤 활동을 가장 즐기나요?",
    options: [
      { text: "낙엽 밟기 산책", type: "활동적인 주민" },
      { text: "책 읽으며 차 마시기", type: "차분한 주민" },
      { text: "사진 찍기", type: "감성적인 주민" },
      { text: "맛있는 요리 만들기", type: "요리사 주민" },
    ],
  },
  {
    question: "가을 분위기 하면 떠오르는 색은?",
    options: [
      { text: "주황색", type: "활동적인 주민" },
      { text: "갈색", type: "차분한 주민" },
      { text: "붉은색", type: "감성적인 주민" },
      { text: "노란색", type: "요리사 주민" },
    ],
  },
  {
    question: "가을에 친구를 초대한다면?",
    options: [
      { text: "산책 같이 하기", type: "활동적인 주민" },
      { text: "책 읽고 이야기 나누기", type: "차분한 주민" },
      { text: "가을 사진 찍기", type: "감성적인 주민" },
      { text: "가을 음식 같이 만들기", type: "요리사 주민" },
    ],
  },
];

// 낙엽 컴포넌트
const Leaf = ({ width, height }) => {
  const size = 12 + Math.random() * 20;
  const startX = Math.random() * width;
  const endX = startX + (Math.random() * 100 - 50); // 좌우 흔들림

  return (
    <motion.div
      initial={{ y: -50, x: startX, opacity: 0 }}
      animate={{ y: height + 50, x: endX, opacity: 1 }}
      transition={{
        duration: 6 + Math.random() * 3,
        delay: Math.random() * 5,
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear",
      }}
      style={{
        position: "absolute",
        fontSize: `${size}px`,
        color: `hsl(${25 + Math.random() * 20}, 80%, 60%)`,
        zIndex: 1,
      }}
    >
      🍂
    </motion.div>
  );
};

export default function App() {
  const [step, setStep] = useState(-1);
  const [answers, setAnswers] = useState([]);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleStart = () => setStep(0);
  const handleClick = (type) => {
    setAnswers([...answers, type]);
    setStep(step + 1);
  };
  const getResult = () => {
    const count = {};
    answers.forEach((a) => (count[a] = (count[a] || 0) + 1));
    return Object.keys(count).reduce((a, b) => (count[a] > count[b] ? a : b));
  };

  const globalFont = {
    fontFamily: "맑은 고딕, 'Malgun Gothic', sans-serif",
  };

  const mainButtonStyle = {
    borderRadius: "16px",
    border: "none",
    padding: "16px 32px",
    fontSize: "1.2rem",
    fontWeight: 600,
    cursor: "pointer",
    backgroundColor: "#ffa500",
    color: "#4b2b00",
    boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
    transition: "all 0.2s",
    ...globalFont,
  };

  const optionButtonStyle = {
    width: "100%",
    padding: "16px",
    borderRadius: "12px",
    border: "none",
    fontSize: "1rem",
    fontWeight: 600,
    cursor: "pointer",
    backgroundColor: "#ffa500",
    color: "#4b2b00",
    boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
    ...globalFont,
  };

  const questionBoxStyle = {
    padding: "20px",
    width: "90%",
    maxWidth: "500px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    textAlign: "center",
    boxSizing: "border-box",
    background: "transparent",
    zIndex: 2,
    ...globalFont,
  };

  const wrapperStyle = (bgImage) => ({
    width: "100vw",
    height: "100vh",
    position: "relative",
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "40% 100%",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  });

  // 메인 화면
  if (step === -1) {
    return (
      <div style={{ ...wrapperStyle(mainBackground), ...globalFont }}>
        {[...Array(15)].map((_, i) => (
          <Leaf key={i} width={windowSize.width} height={windowSize.height} />
        ))}

        <div
          style={{
            position: "absolute",
            bottom: "60px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 2,
          }}
        >
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "#ffb84d" }}
            whileTap={{ scale: 0.95 }}
            style={mainButtonStyle}
            onClick={handleStart}
          >
            테스트 시작
          </motion.button>
        </div>
      </div>
    );
  }

  const current = questions[step];

  // 결과 화면
  if (step === questions.length) {
    const result = getResult();
    return (
      <div style={{ ...wrapperStyle(questionBackground), ...globalFont }}>
        {[...Array(15)].map((_, i) => (
          <Leaf key={i} width={windowSize.width} height={windowSize.height} />
        ))}

        <div style={questionBoxStyle}>
          <motion.h2 style={{ fontSize: "2rem", marginBottom: "20px", color: "#ffb74d" }}>
            🍁 당신의 모동숲 가을 타입은…?
          </motion.h2>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              fontSize: "1.5rem",
              padding: "20px",
              borderRadius: "16px",
              backgroundColor: "transparent",
              color: "#4b2b00",
              fontWeight: "600",
              minWidth: "250px",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            {result}!
          </motion.div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "16px",
              marginTop: "20px",
              width: "100%",
              maxWidth: "400px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#ffb84d" }}
              whileTap={{ scale: 0.95 }}
              style={{ ...optionButtonStyle, flex: 1 }}
              onClick={() => {
                setStep(0);
                setAnswers([]);
              }}
            >
              다시하기
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#ffb84d" }}
              whileTap={{ scale: 0.95 }}
              style={{ ...optionButtonStyle, flex: 1, backgroundColor: "#ffa" }}
              onClick={() => setStep(-1)}
            >
              홈으로 가기
            </motion.button>
          </div>
        </div>
      </div>
    );
  }

  // 질문 화면
  return (
    <div style={{ ...wrapperStyle(questionBackground), ...globalFont }}>
      {[...Array(15)].map((_, i) => (
        <Leaf key={i} width={windowSize.width} height={windowSize.height} />
      ))}

      <div style={questionBoxStyle}>
        <motion.h2
          key={step}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ fontSize: "1.8rem", marginBottom: "20px", color: "#ffb74d" }}
        >
          Q. {current.question}
        </motion.h2>
        {current.options.map((opt, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.05, backgroundColor: "#ffb84d" }}
            whileTap={{ scale: 0.95 }}
            style={optionButtonStyle}
            onClick={() => handleClick(opt.type)}
          >
            {opt.text}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
