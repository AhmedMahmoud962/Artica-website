// Initialize a new Lenis instance for smooth scrolling
const lenis = new Lenis();

// Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
lenis.on("scroll", ScrollTrigger.update);

// Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

// Disable lag smoothing in GSAP to prevent any delay in scroll animations
gsap.ticker.lagSmoothing(0);

// Media Query for animations
const mm = gsap.matchMedia();

mm.add("(min-width: 769px)", () => {
  // Desktop animations only
  const heroTitle = document.querySelectorAll(".hero-title span");
  const heroSubtitle = document.querySelector(".hero-subtitle");
  const heroAction = document.querySelector(".hero-action");
  const sliderListItem = document.querySelectorAll(".slider-list-item");
  const sliderProgress = document.querySelector(".slider-progress");

  gsap.fromTo(
    [heroSubtitle, heroTitle, heroAction, sliderListItem],
    { autoAlpha: 0, y: 100, stagger: 0.2, immediateRender: false },
    { autoAlpha: 1, y: 0, stagger: 0.2 }
  );

  gsap.fromTo(
    sliderProgress,
    { autoAlpha: 0, y: "100" },
    { autoAlpha: 1, y: "0", delay: 1 }
  );

  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: 0.2,
        invalidateOnRefresh: true,
      },
    })
    .to(".sky", { y: 1000 }, "0")
    .to(".mountains", { y: -300 }, "0")
    .to(".hero-content-our-story", { y: 450, autoAlpha: 0 }, "0");

  const contentWrapper = document.querySelectorAll(".content-row");

  contentWrapper.forEach((contentWrapper) => {
    const imageWrapper = contentWrapper.querySelector(".content-image");
    const image = imageWrapper.querySelector("img");
    const counter = contentWrapper.querySelector(".counter");
    const subtitle = contentWrapper.querySelectorAll(".content-subtitle");
    const title = contentWrapper.querySelectorAll(".content-title span");
    const description = contentWrapper.querySelectorAll(".content-copy");
    const action = contentWrapper.querySelectorAll(".content-action");

    gsap
      .timeline({
        scrollTrigger: {
          trigger: contentWrapper,
          start: "center-=100 center",
          end: "center top",
          scrub: 0.05,
          pin: contentWrapper,
          invalidateOnRefresh: true,
        },
      })
      .fromTo(
        [subtitle, title, description, action],
        { autoAlpha: 0, y: 100, stagger: 0.2, immediateRender: false },
        { autoAlpha: 1, y: 0, stagger: 0.2 },
        "0"
      )
      .fromTo(counter, { autoAlpha: 0 }, { autoAlpha: 1 }, "0")
      .fromTo(
        image,
        { autoAlpha: 0, scale: 0.2 },
        { autoAlpha: 1, scale: 1, onComplete: () => ScrollTrigger.refresh() },
        "0"
      );
  });

  gsap.to(".slider-progress-bar", {
    height: "100%",
    ease: "none",
    scrollTrigger: { scrub: 0 },
  });
});

// تحديث الـ ScrollTrigger عند تحميل الصفحة بالكامل
window.addEventListener("load", () => {
  ScrollTrigger.refresh();
});
