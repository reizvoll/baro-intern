export function formatTime(createdAt: string, isMobile: boolean) {
  const now = new Date();
  const createdDate = new Date(createdAt);
  const diffInMs = now.getTime() - createdDate.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMinutes / 60);

  // 3시간 이내, "n분 전" 또는 "n시간 전"
  if (diffInMinutes < 1) return "방금 전";
  if (diffInMinutes < 60) return `${diffInMinutes}분 전`;
  if (diffInHours < 3) return `${diffInHours}시간 전`;

  // 당일 작성된 경우, HH:mm 형식
  const isToday = createdDate.toDateString() === now.toDateString();
  if (isToday) {
    return createdDate.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    });
  }

  // 이전 날짜 작성 → M.DD / HH:mm 형식
  return isMobile
    ? `${createdDate.getMonth() + 1}.${createdDate.getDate()}`
    : `${createdDate.getMonth() + 1}.${createdDate.getDate()} ${createdDate.toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })}`;
}
