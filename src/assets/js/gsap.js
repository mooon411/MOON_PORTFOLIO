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

// 링크 이동 부드러운 효과
document.addEventListener("DOMContentLoaded", function () {
  let links = document.querySelectorAll("a[href^='#']");

  links.forEach((link) => {
    let targetId = link.getAttribute("href").substring(1);
    let element = document.getElementById(targetId);

    if (element) {
      let linkST = ScrollTrigger.create({
        trigger: element,
        start: "top top",
      });

      ScrollTrigger.create({
        trigger: element,
        start: "top center",
        end: "bottom center",
        onToggle: (self) => setActive(link),
      });

      link.addEventListener("click", (e) => {
        e.preventDefault();
        gsap.to(window, {
          duration: 0.5,
          scrollTo: { y: linkST.start },
          overwrite: "auto",
        });
      });
    }
  });

  function setActive(activeLink) {
    links.forEach((link) => {
      if (link !== activeLink) {
        link.classList.remove("active");
      }
    });
    activeLink.classList.add("active");
  }
});

// 나타나기 플러그인
const hide = (item) => {
  gsap.set(item, { autoAlpha: 0 });
};

const animate = (item) => {
  let x = 0;
  let y = 0;
  let delay = item.dataset.delay;

  if (item.classList.contains("reveal_LTR")) {
    x = -300;
    y = 0;
  } else if (item.classList.contains("reveal_BTT")) {
    x = 0;
    y = 100;
  } else if (item.classList.contains("reveal_TTB")) {
    x = 0;
    y = -100;
  } else {
    x = 300;
    y = 0;
  }

  // 전 위치 현 위치 두가지 작성
  gsap.fromTo(
    item,
    {
      autoAlpha: 0,
      x: x,
      y: y,
    },
    {
      autoAlpha: 1,
      x: 0,
      y: 0,
      delay: delay,
      duration: 2,
      overwrite: "auto",
      ease: "expo",
    }
  );
};

gsap.utils.toArray(".reveal").forEach((item) => {
  hide(item);

  ScrollTrigger.create({
    trigger: item,
    // markers: "true",
    start: "top bottom",
    end: "bottom top",
    onEnter: () => {
      animate(item);
    },
  });
});

// 포트폴리오 움직임 효과

// gsap.registerPlugin(ScrollTrigger);

const portSection = document.getElementById("port");
const portUl2 = portSection.querySelectorAll(".port_wrap ul")[1];
const portUl4 = portSection.querySelectorAll(".port_wrap ul")[3];

gsap.to(portUl2, {
  marginTop: "0",
  scrollTrigger: {
    trigger: "#port",
    start: "top top",
    end: "bottom bottom",
    scrub: true,
    onUpdate: ({ progress }) => {
      const offset = 25 - progress * 13;
      portUl2.style.marginTop = `${offset}%`;
    },
  },
});

gsap.to(portUl4, {
  marginTop: "0",
  scrollTrigger: {
    trigger: "#port",
    start: "top top",
    end: "bottom bottom",
    scrub: true,
    onUpdate: ({ progress }) => {
      const offset = 10 - progress * 15;
      portUl4.style.marginTop = `${offset}%`;
    },
  },
});

gsap.to(".circle_link", {
  rotation: 30, // 회전 각도 설정 (원하는 각도로 변경)
  yoyo: true, // 왔다 갔다 반복
  transformOrigin: "50% 50%", // 회전 중심점 설정
  ease: "sine.inOut", // 좀 더 자연스러운 움직임을 위한 이징 설정
  duration: 0.2, // 애니메이션 기간 설정 (초단위, 원하는 값으로 조정)
  scrollTrigger: {
    trigger: "#port",
    start: "top top",
    end: "bottom bottom",
    scrub: true,
  },
});
