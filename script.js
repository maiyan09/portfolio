document.addEventListener('DOMContentLoaded', () => {

  gsap.registerPlugin(ScrollTrigger);

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------
     Wrap each hero wordmark line's text in an inner span so
     the outer .line (overflow:hidden) can mask a translateY reveal
  --------------------------------------------------------- */
  document.querySelectorAll('[data-line]').forEach(line => {
    const text = line.textContent;
    line.innerHTML = `<span>${text}</span>`;
  });

  if (reduceMotion) {
    gsap.set('[data-reveal]', { opacity: 1, y: 0 });
    return;
  }

  /* ---------------------------------------------------------
     HERO LOAD-IN SEQUENCE
  --------------------------------------------------------- */
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

  tl.set('.hero__wordmark .line > span', { yPercent: 110 })
    .set('.hero__figure', { autoAlpha: 0, y: 60, scale: .96 })
    .set('.hero__scroll', { autoAlpha: 0 })
    .set('.nav', { autoAlpha: 0, y: -12 })

    .to('.nav', { autoAlpha: 1, y: 0, duration: .8 }, .1)
    .to('.hero__wordmark .line > span', {
      yPercent: 0,
      duration: 1.1,
      stagger: .12
    }, .15)
    .to('.hero__figure', {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      duration: 1.2,
      ease: 'power3.out'
    }, .55)
    .to('.hero__scroll', { autoAlpha: 1, duration: .6 }, '-=.3');

  /* subtle parallax drift on the figure as user scrolls the hero */
  gsap.to('.hero__figure', {
    y: 70,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });

  /* ---------------------------------------------------------
     SCROLL REVEALS
  --------------------------------------------------------- */
  gsap.utils.toArray('[data-reveal]').forEach(el => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true
      }
    });
  });

  /* stagger the project cards slightly */
  gsap.timeline({
    scrollTrigger: { trigger: '.grid', start: 'top 85%', once: true }
  }).to('.grid .card', {
    opacity: 1,
    y: 0,
    duration: .9,
    ease: 'expo.out',
    stagger: .12
  });

  /* giant sign-off wordmark: subtle scale-in */
  gsap.fromTo('.signoff .section-wordmark',
    { opacity: 0, scale: .94 },
    {
      opacity: 1,
      scale: 1,
      duration: 1.1,
      ease: 'expo.out',
      scrollTrigger: { trigger: '.signoff', start: 'top 80%', once: true }
    }
  );

  /* Nav links to in-page anchors rely on the native CSS
     `scroll-behavior: smooth` set on <html> — no extra plugin needed. */

});

// let tl = gsap.timeline({
//   scrollTrigger: {
//     trigger : ".bio",
//     start: "top 85%",
//     end: "end end",
//     scrub: true
//   }
// });
// gsap.to( ".bio__text__o", {
//   width: "100%",
//   scrollTrigger: {
//     trigger: ".bio",
//     start: "top 85%",
//     end: "end end",
//     scrub: true
//   }
// }
// )

const text = document.querySelector(".bio__text");

// Split paragraph into words
const words = text.textContent.trim().split(/\s+/);

text.innerHTML = words
  .map(word => `
    <span class="word">
      <span class="word-inner">${word}</span>
    </span>
  `)
  .join(" ");

const wordElements = text.querySelectorAll(".word-inner");

// Scroll-controlled animation
gsap.to(wordElements, {
  y: "0%",
  opacity: 1,
  filter: "blur(0px)",
  ease: "none",
  stagger: 0.05,

  scrollTrigger: {
    trigger: ".bio",
    start: "top 80%",
    end: "top 35%",
    scrub: 1
  }
});

// let sections = gsap.utils.toArray(".panel");

// gsap.to(sections, {
//   xPercent: -100 * (sections.length - 1),
//   ease: "none",
//   scrollTrigger: {
//     trigger: ".horizontal",
//     pin: true,
//     scrub: 1,
//     end: "+=3000"
//   }
// });

const projects = gsap.utils.toArray(".project-panel");

gsap.to(".projects-track", {
    x: () => -(document.querySelector(".projects-track").scrollWidth - window.innerWidth),

    ease: "none",

    scrollTrigger: {
        trigger: ".projects-horizontal",

        pin: true,

        scrub: 1,

        invalidateOnRefresh: true,

        end: () => "+=" + (
            document.querySelector(".projects-track").scrollWidth
            - window.innerWidth
        )
    }
});
// maiyan09 animation 
const signoffSection = document.querySelector(".signoff");
const signoffTitle = signoffSection.querySelector(".section-wordmark");
const signoffImage = signoffTitle.querySelector("img");

const signoffTextNode = [...signoffTitle.childNodes].find(
  node =>
    node.nodeType === Node.TEXT_NODE &&
    node.textContent.trim()
);

const signoffChars = signoffTextNode.textContent.trim().split("");

signoffTextNode.textContent = "";

signoffChars.forEach(char => {
  const span = document.createElement("span");

  span.textContent = char;
  span.style.display = "inline-block";

  signoffTextNode.parentNode.insertBefore(span, signoffImage);
});

const signoffCharElements =
  signoffTitle.querySelectorAll("span");

gsap.set(signoffCharElements, {
  x: 120,
  opacity: 0,
  skewX: 12
});

gsap.set(signoffImage, {
  opacity: 0,
  x: 80,
  rotation: -20
});

const signoffTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: signoffSection,
    start: "top 75%",
    end: "top 35%",
    scrub: 0.6
  }
});

signoffTimeline
  .to(signoffCharElements, {
    x: 0,
    opacity: 1,
    skewX: 0,
    stagger: 0.06,
    ease: "power4.out"
  })
  .to(
    signoffImage,
    {
      x: 0,
      opacity: 1,
      rotation: 0,
      ease: "power3.out"
    },
    "-=0.35"
  );

  // svg animation 
gsap.registerPlugin(ScrollTrigger);


// =========================================
// BIO SVG LINE ANIMATION
// =========================================

const bio = document.querySelector(".bio");
const bioLine = bio.querySelector(".bio-line");
const bioPath = bioLine.querySelector("path");


// Get the actual length of the SVG path
const bioPathLength = bioPath.getTotalLength();


// Hide the complete path initially
gsap.set(bioPath, {
    strokeDasharray: bioPathLength,
    strokeDashoffset: bioPathLength
});
// Animate path while scrolling
gsap.to(bioPath, {
    strokeDashoffset: 0,
    ease: "none",
    scrollTrigger: {
        trigger: bio,
        start: "top 80%",
        end: "bottom 85%",
        scrub: 1,
    }
});


// Skill animation
// icon fallback for this standalone preview (real site's img/*.svg files load normally)
document.querySelectorAll('.skill-chip__icon').forEach(img=>{
  img.addEventListener('error', ()=>{
    const letter = img.alt.trim().charAt(0);
    img.src = `data:image/svg+xml;utf8,${encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
         <circle cx="24" cy="24" r="23" fill="none" stroke="#A98A32" stroke-width="2"/>
         <text x="24" y="30" font-family="Inter,sans-serif" font-size="20" font-weight="900"
               text-anchor="middle" fill="#15150F">${letter}</text>
       </svg>`
    )}`;
  }, { once:true });
});

const container = document.getElementById('skillsStagger');
const svg = document.getElementById('snakeSvg');
const path = document.getElementById('snakePath');
const nodesLayer = document.getElementById('snakeNodes');
const chips = [...container.querySelectorAll('.skill-chip')];
const chipCount = chips.length;

// Catmull-Rom -> cubic Bezier, for a smooth flowing "snake" through the node points
function smoothPath(points){
  if (points.length < 2) return '';
  let d = `M ${points[0].x} ${points[0].y} `;
  for (let i = 0; i < points.length - 1; i++){
    const p0 = points[i - 1] || points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || p2;
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += `C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y} `;
  }
  return d;
}

let pathLen = 0;

function buildPath(){
  const contRect = container.getBoundingClientRect();
  svg.setAttribute('viewBox', `0 0 ${contRect.width} ${contRect.height}`);

  const points = chips.map(chip => {
    const node = chip.querySelector('.skill-chip__node');
    const r = node.getBoundingClientRect();
    return { x: r.left + r.width / 2 - contRect.left, y: r.top + r.height / 2 - contRect.top };
  });

  path.setAttribute('d', smoothPath(points));
  pathLen = path.getTotalLength();
  path.style.strokeDasharray = pathLen;
  path.style.strokeDashoffset = pathLen;

  nodesLayer.innerHTML = '';
  points.forEach((p, i) => {
    const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    c.setAttribute('cx', p.x);
    c.setAttribute('cy', p.y);
    c.setAttribute('r', 5);
    c.setAttribute('class', 'snake-node');
    c.dataset.index = i;
    nodesLayer.appendChild(c);
  });
}

let masterTrigger = null;
const chipTriggers = [];

function killAll(){
  if (masterTrigger) { masterTrigger.kill(); masterTrigger = null; }
  chipTriggers.forEach(t => t.kill());
  chipTriggers.length = 0;
}

const mm = gsap.matchMedia();

mm.add('(min-width: 861px)', () => {
  buildPath();

  masterTrigger = ScrollTrigger.create({
    trigger: container,
    start: 'top 80%',
    end: 'bottom 65%',
    scrub: true,
    onUpdate(self){
      gsap.set(path, { strokeDashoffset: pathLen * (1 - self.progress) });
      nodesLayer.querySelectorAll('.snake-node').forEach(n => {
        const idx = +n.dataset.index;
        const frac = idx / (chipCount - 1);
        n.classList.toggle('is-lit', self.progress >= frac - 0.02);
      });
    }
  });

  chips.forEach(chip => {
    gsap.set(chip, { opacity: 0.2, y: 16 });
    const t = ScrollTrigger.create({
      trigger: chip,
      start: 'top 85%',
      end: 'top 45%',
      scrub: true,
      onUpdate(self){
        const p = self.progress;
        gsap.set(chip, { opacity: gsap.utils.clamp(0.2, 1, 0.2 + p * 0.8), y: (1 - p) * 16 });
        chip.classList.toggle('is-active', p > 0.55);
      }
    });
    chipTriggers.push(t);
  });

  // rebuild on resize while still desktop (layout coords can shift with font load, etc.)
  const onResize = () => { buildPath(); ScrollTrigger.refresh(); };
  window.addEventListener('resize', onResize);

  return () => {
    window.removeEventListener('resize', onResize);
    killAll();
  };
});

mm.add('(max-width: 860px)', () => {
  gsap.set('.skill-chip', { opacity: 1, y: 0, clearProps: 'transform' });
  return () => {};
});



//
const texts = [
      "Computer Science Student",
      "Research Enthusiast"
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
      const typingText = document.getElementById("typing-text");
      const currentText = texts[textIndex];

      if (!isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentText.length) {
          setTimeout(() => {
            isDeleting = true;
            typeEffect();
          }, 1500);

          return;
        }
      } else {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
          isDeleting = false;
          textIndex = (textIndex + 1) % texts.length;
        }
      }

      setTimeout(typeEffect, isDeleting ? 50 : 100);
    }

    typeEffect();