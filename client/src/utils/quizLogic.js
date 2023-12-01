import { finishQuizAction } from '@pages/Map/actions';

const getCompletionMessage = (finalScore, totalQuestions, formatMessage) => {
  const percentageScore = (finalScore / totalQuestions) * 100;
  if (percentageScore >= 90) {
    return formatMessage({ id: 'app_outstanding' });
  }
  if (percentageScore >= 70) {
    return formatMessage({ id: 'app_great' });
  }
  if (percentageScore >= 50) {
    return formatMessage({ id: 'app_nice' });
  }
  return formatMessage({ id: 'app_attempt' });
};

export const resetQuiz = (setScore, setQuizStarted, setCurrentQuestionIndex, setMapPosition, toast) => {
  setScore(0);
  setQuizStarted(false);
  setCurrentQuestionIndex(0);
  setMapPosition({ zoom: 1, center: [0, 0] });
  toast('Quiz reset', {
    icon: '🔄',
  });
};

export const startQuiz = (setQuizStarted, setScore) => {
  setQuizStarted(true);
  setScore(0);
};

export const finishQuiz = (
  setQuizStarted,
  setCurrentQuestionIndex,
  MySwal,
  navigate,
  dispatch,
  quizId,
  finalScore,
  totalQuestions,
  token,
  formatMessage
) => {
  setQuizStarted(false);
  setCurrentQuestionIndex(0);
  MySwal.fire({
    title: formatMessage({ id: 'app_quiz_complete' }),
    text: getCompletionMessage(finalScore, totalQuestions, formatMessage),
    icon: 'success',
    showCancelButton: true,
    confirmButtonText: formatMessage({ id: 'app_back_home' }),
    cancelButtonText: formatMessage({ id: 'app_stay' }),
  }).then((result) => {
    if (result.isConfirmed) {
      navigate('/');
    }
  });
  dispatch(finishQuizAction(quizId, { score: finalScore }, token));
};
