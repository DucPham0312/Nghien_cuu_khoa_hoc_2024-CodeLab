import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import AudioPlayer from "../../components/AudioPlayer";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
export const QuestionFlashCard = () => {
  const location = useLocation();

  const [arrayQuestion, setArrayQuestion] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);
  const [BreadCrumb, setBreadCrumb] = useState({
    name: "FlashCard HTML CSS",
    link: "/studyplant/frontEnd/flashcard_htmlcss",
  });
  useEffect(() => {
    NProgress.start();
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`${process.env.PUBLIC_URL}/json/db.json`); // Thay URL của bạn
        const data = await response.json();
        if (location.pathname === "/studyplant/frontEnd/flashcard_htmlcss") {
          setArrayQuestion(data.questions_html);
        } else if (
          location.pathname === "/studyplant/frontEnd/flashcard_javascript"
        ) {
          setBreadCrumb({
            name: "FlashCard JavScript",
            link: "/studyplant/frontEnd/flashcard_javascript",
          });
          setArrayQuestion(data.questions_javaScript);
        } else if (
          location.pathname === "/studyplant/frontEnd/flashcard_reactjs"
        ) {
          setBreadCrumb({
            name: "FlashCard React JS",
            link: "/studyplant/frontEnd/flashcard_reactjs",
          });
          setArrayQuestion(data.questions_reactJS);
        }
        setLoading(false); // Khi fetch xong, set loading về false
      } catch (error) {
        console.error("Error fetching questions:", error);
        setLoading(false); // Dù lỗi vẫn tắt loading
      }
    };
    fetchQuestions(); // Gọi hàm fetch khi component mount
    NProgress.done();
  }, [location.pathname]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [showCongratulations, setShowCongratulations] = useState(false);
  const handleClickNextQuestion = () => {
    if (currentQuestion < arrayQuestion.length - 1) {
      setAgain();
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowCongratulations(true);
    }
  };
  const [playAudio, setplayAudio] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [Score, setScore] = useState(0);
  const [wrongSentence, setWrongSentence] = useState(0);
  const checkAnswerQuestion = (value) => {
    const correctAnswer = arrayQuestion[currentQuestion].correct_answer
      .toLowerCase()
      .trim();
    const currentAnswer = value;
    if (currentAnswer === null) {
      alert("Bạn chưa trả lời câu hỏi");
    } else {
      if (correctAnswer === currentAnswer.toLowerCase().trim()) {
        setScore(Score + 1);
        setSuccess(true);
      } else {
        setWrongSentence(wrongSentence + 1);
        setError(true);
      }
    }
  };
  const setCoreAgain = () => {
    setScore(null);
    setWrongSentence(0);
    setCurrentQuestion(0);
  };
  const setAgain = () => {
    setError(null);
    setSelectedAnswer(null);
    setSuccess(null);
  };
  return (
    <>
      <div className="container">
        {loading === true ? (
          <div className="loading">
            <h1 className="loading__heading">Loading.......</h1>
          </div>
        ) : (
          <>
            <div className="breadcrumb">
              <div className="breadcrumb__wrap">
                <NavLink to="/home" className="breadcrumb__item">
                  <p className="breadcrumb__name">Trang chủ</p>
                  <img
                    src={`${process.env.PUBLIC_URL}/images/icon/iconbread.svg`}
                    alt=""
                    className="breadcrumb__icon-arrow"
                  />
                </NavLink>
                <NavLink to="/flashcard" className="breadcrumb__item">
                  <p className="breadcrumb__name">FlashCard</p>
                  <img
                    src={`${process.env.PUBLIC_URL}/images/icon/iconbread.svg`}
                    alt=""
                    className="breadcrumb__icon-arrow"
                  />
                </NavLink>
                <NavLink to={BreadCrumb.link} className="breadcrumb__item">
                  <p className="breadcrumb__name  breadcrumb__active ">
                    {BreadCrumb.name}
                  </p>
                </NavLink>
              </div>
            </div>
            <div className="row flashcard__wrap">
              <div className="col-12">
                <div className="flashcard__title">
                  <h1 className="flashcard__heading">FLASH CARD HTML CSS</h1>
                  <p className="flashcard__desc">
                    Học đi đôi với hành , hãy cùng luyện tập nhiều hơn với chế
                    độ FlashCard để ôn luyện lại kiến thức một cách chỉnh chu
                    nhất
                  </p>
                  <span className="flashcard__number">
                    {currentQuestion + 1}/{arrayQuestion.length}
                  </span>
                  <div className="flashcard__progress-wrapper">
                    <progress
                      className="flashcard__progress"
                      value={currentQuestion + 1}
                      max={arrayQuestion.length}
                    ></progress>
                  </div>
                  <div className="flashcard__question">
                    <h2
                      className="flashcard__question--heading"
                      data-id={arrayQuestion[currentQuestion].id}
                    >
                      {arrayQuestion[currentQuestion].question}
                    </h2>
                    <p className="flashcard__question--desc">
                      Chỉ chọn 1 đáp án đúng
                    </p>
                    <div className="flashcard__answer--list">
                      {arrayQuestion[currentQuestion].options.map(
                        (item, index) => {
                          return (
                            <div
                              key={index}
                              onClick={() => setSelectedAnswer(item)}
                              className={`flashcard__answer--item ${
                                selectedAnswer === item && "flashcard__active"
                              } ${
                                selectedAnswer === item && success === true
                                  ? "flashcard__success"
                                  : selectedAnswer === item && error === true
                                  ? "flashcard__error"
                                  : ""
                              }`}
                            >
                              <p
                                className={`flashcard__answer ${
                                  selectedAnswer === item && success === true
                                    ? "flashcard__colorText"
                                    : selectedAnswer === item && error === true
                                    ? "flashcard__colorText"
                                    : ""
                                }`}
                              >
                                {item}
                              </p>
                            </div>
                          );
                        }
                      )}
                    </div>
                    <div className="flashcard__submit--answer">
                      {success === true ? (
                        <>
                          <div className="flashcard__result">
                            <img
                              src={`${process.env.PUBLIC_URL}/images/icon/result.svg`}
                              alt=""
                              className="flashcard__icon--result"
                            />
                            <p className="flashcard__result--answer">
                              {arrayQuestion[currentQuestion].explanation}
                            </p>
                          </div>
                          <button
                            className="flashcard__submit"
                            onClick={() => {
                              handleClickNextQuestion();
                            }}
                          >
                            CÂU HỎI TIẾP THEO
                          </button>
                        </>
                      ) : error === true ? (
                        <>
                          <div className="flashcard__result">
                            <img
                              src={`${process.env.PUBLIC_URL}/images/icon/wrong.svg`}
                              alt=""
                              className="flashcard__icon--result"
                            />
                            <p className="flashcard__result--answer">
                              Câu trả lời chưa chính xác !
                            </p>
                          </div>
                          <button
                            className="flashcard__submit"
                            onClick={() => {
                              handleClickNextQuestion();
                            }}
                          >
                            CÂU HỎI TIẾP THEO
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => checkAnswerQuestion(selectedAnswer)}
                          className={`flashcard__submit ${
                            selectedAnswer ? "" : "flashcard__submit--default"
                          }`}
                          disabled={!selectedAnswer} // Vô hiệu hóa nút khi chưa có đáp án được chọn
                        >
                          TRẢ LỜI
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {showWelcome && (
              <div className="welcome">
                <div className="welcome__wrap">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/icon/iconbackground.svg`}
                    alt=""
                    className="welcome__icon"
                  />
                  <div className="welcome__content">
                    <h1 className="welcome__heading">
                      Chào mừng tất cả các bạn với chế độ FlashCard
                    </h1>
                    <p className="welcome__desc">
                      Học trên máy tính sẽ đem lại trải nghiệm tốt nhất{" "}
                    </p>
                    <div className="welcome__rules">
                      <h2 className="welcome__rules--heading">#Luật chơi</h2>
                      <ul className="welcome__rules--list">
                        <li>Mỗi lượt chơi có 10 câu hỏi.</li>
                        <li>
                          Người chơi cần trả lời mỗi câu hỏi trong 30 giây.
                        </li>
                        <li>Câu trả lời đúng sẽ cộng thêm điểm.</li>
                        <li>Không được phép quay lại câu hỏi trước.</li>
                        <li>
                          Kết thúc trò chơi khi hết câu hỏi hoặc hết thời gian.
                        </li>
                      </ul>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowWelcome(!showWelcome)}
                    className="welcome__cancel"
                  >
                    <img
                      src={`${process.env.PUBLIC_URL}/images/icon/cancel.svg`}
                      alt=""
                      className="welcome__icon--cancel"
                    />
                  </button>
                </div>
                <button
                  onClick={() => {
                    setShowWelcome(!showWelcome);
                    setplayAudio(true);
                  }}
                  className="btn welcome__button"
                >
                  Bắt đầu ngay
                </button>
              </div>
            )}
            {showCongratulations && (
              <div className="congratulation">
                <div className="congratulation__wrap">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/gif/gif.gif`}
                    alt=""
                    className="congratulation__icon"
                  />
                  <div className="congratulation__content">
                    <h1 className="congratulation__heading">
                      Chúc mừng bạn đã hoàn thành xong FlashCard của phần HTML
                      CSS này 🎊🎊🎊
                    </h1>

                    <div className="congratulation__rules">
                      <h2 className="congratulation__rules--heading">
                        #Thống kê điểm số
                      </h2>
                      <ul className="congratulation__rules--list">
                        <li>
                          Điểm số :{" "}
                          <span className="congratulation__score">
                            {Score}/{arrayQuestion.length}
                          </span>
                        </li>
                        <li>
                          Số câu sai :{" "}
                          <span className="congratulation__wrong">
                            {wrongSentence}
                          </span>
                        </li>
                        <li>
                          Số câu đúng :{" "}
                          <span className="congratulation__correct">
                            {Score}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowCongratulations(!showCongratulations)}
                    className="congratulation__cancel"
                  >
                    <img
                      src={`${process.env.PUBLIC_URL}/images/icon/cancel.svg`}
                      alt=""
                      className="congratulation__icon--cancel"
                    />
                  </button>
                </div>
                <div className="congratulation__action">
                  <button
                    onClick={() => {
                      setCoreAgain();
                      setAgain();
                      setShowCongratulations(!showCongratulations);
                    }}
                    className="btn congratulation__button"
                  >
                    Làm lại
                  </button>
                  <NavLink
                    to="/flashcard"
                    className="btn congratulation__button"
                  >
                    Tiếp tục
                  </NavLink>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      {playAudio === true && showCongratulations === false ? (
        <AudioPlayer></AudioPlayer>
      ) : (
        ""
      )}

      {showWelcome || showCongratulations ? (
        <div className="welcome__overlay"></div>
      ) : (
        <></>
      )}
    </>
  );
};
