import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

function formatTimeAgo(dateString?: Date) {
  // dayjs는 new Date를 감싼는 래퍼객체 역할
  const now = dayjs();
  // dayjs 객체로 변환 - dayjs로 변환된 객체를 통해 dayjs api 사용
  const date = dayjs(dateString);

  const diffInSeconds = now.diff(date, 'second'); // 초 단위 차이 계산
  const diffInMinutes = now.diff(date, 'minute'); // 분 단위 차이 계산
  const diffInHours = now.diff(date, 'hour'); // 시간 단위 차이 계산
  const diffInDays = now.diff(date, 'day'); // 일 단위 차이 계산
  const diffInMonths = now.diff(date, 'month');

  if (diffInSeconds < 60) {
    return '방금 전';
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`;
  } else if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  } else if (diffInDays < 30) {
    return `${diffInDays}일 전`;
  } else if (diffInMonths < 12) {
    return `${diffInMonths}개월 전`;
  } else {
    return date.format('YYYY-MM-DD');
  }
}

export { formatTimeAgo };
