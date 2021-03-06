$(document).ready(function () {

  // Scroll Animation (sa, 스크롤 애니메이션)
  const saTriggerMargin = 300;
  const saElementList = document.querySelectorAll('.sa');

  const saFunc = function() {
    for (const element of saElementList) {
      if (!element.classList.contains('show')) {
        if (window.innerHeight > element.getBoundingClientRect().top + saTriggerMargin) {
          element.classList.add('show');
        }
      }
    }
  }

  window.addEventListener('load', saFunc);
  window.addEventListener('scroll', saFunc);

  
  var wid = $(window).width();
  console.log(wid)
  if (wid > 426) {
    $(".slick-items").slick({
      autoplay: true,
      dots: true,
      speed: 400 /* 이미지가 슬라이딩시 걸리는 시간 */,
      infinite: true,
      /* 이미지가 다른 이미지로 넘어 갈때의 텀 */
      autoplaySpeed: 3000,
      arrows: false,
      slidesToShow: 3,
      slidesToScroll: 1,
      fade: false,
    });
  } else {
    $(".slick-items").slick({
      autoplay: true,
      dots: true,
      speed: 400 /* 이미지가 슬라이딩시 걸리는 시간 */,
      infinite: true,
      /* 이미지가 다른 이미지로 넘어 갈때의 텀 */
      autoplaySpeed: 3000,
      arrows: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: false,
    });
  }
  

  side_navi() ;
  btun_resume();




});

$("header>i").click(function () {
  console.log("클릭중");
  $("#side").show();
});

$("#side>.close>i").click(function () {
  console.log("클릭중");
  $("#side").hide();
});


function side_navi() {
	$(window).scroll(function () {
		var height = $(window).scrollTop();
		console.log(height);

		if(height>200){
			$("#side_navi").slideDown();
		}else{
			$("#side_navi").slideUp();
		}
	});
	$(window).trigger("scroll");
}






gsap.registerPlugin("ScrollTrigger");

let wheel = document.querySelector(".wheel");
let images = gsap.utils.toArray(".wheel__card");

gsap.to(".arrow", { y: 5, ease: "power1.inOut", repeat: -1, yoyo: true });

function setup() {
  let radius = wheel.offsetWidth / 2;
  let center = wheel.offsetWidth / 2;
  let total = images.length;
  let slice = (2 * Math.PI) / total;

  images.forEach((item, i) => {
    let angle = i * slice;

    let x = center + radius * Math.sin(angle);
    let y = center - radius * Math.cos(angle);

    gsap.set(item, {
      rotation: angle + "_rad",
      xPercent: -50,
      yPercent: -50,
      x: x,
      y: y,
    });
  });
}

setup();

window.addEventListener("resize", setup);

gsap.to(".wheel", {
  rotate: () => -360,
  ease: "none",
  duration: images.length,
  scrollTrigger: {
    start: 0,
    end: "max",
    scrub: 1,
    snap: 1 / images.length,
    invalidateOnRefresh: true,
  },
});

let cards = gsap.utils.toArray(".wheel__card");
let header = document.querySelector(".header");
let body = document.querySelector(".header");

let isFullScreen = false;

// keep track of last clicked card so we can put it back
let lastClickedCard;

cards.forEach((card) => {
  card.addEventListener("click", (e) => {
    if (lastClickedCard) {
      putBack(e);
    }
    flip(e);
  });
});

header.addEventListener("click", (e) => {
  if (!lastClickedCard) return;
  putBack(e);
});

function putBack(e) {
  let image = header.querySelector("img");

  let state = Flip.getState(image);

  lastClickedCard.appendChild(image);

  Flip.from(state, {
    duration: 0.6,
    ease: "sine.out",
    absolute: true,
  });

  lastClickedCard = null;
}

function flip(e) {
  let image = e.target.querySelector("img");

  let state = Flip.getState(image);

  header.appendChild(image);

  Flip.from(state, {
    duration: 0.4,
    ease: "sine.out",
    absolute: true,
  });

  lastClickedCard = e.target;
}


function btun_resume(){
  $("#profile_bottom>.btn_resume").click(function(){
    console.log("클릭클릭")
    $("#about_wrap>.design_resume,#about_wrap>#m_back").slideDown();
  });
  
  $("#about_wrap>.design_resume>.close").click(function(){
    console.log("클릭클릭")
    $("#about_wrap>.design_resume,#about_wrap>#m_back").slideUp();

  });

}