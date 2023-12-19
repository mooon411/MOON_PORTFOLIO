// 스크롤 부드럽게
function smoothScroll() {
  const lenis = new Lenis({
    duration: 1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  lenis.on("scroll", (e) => {
    console.log(e);
    // 스크롤 이벤트 처리
  });
}

smoothScroll(); // 스크롤 부드럽게 만드는 함수 호출
