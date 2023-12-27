///////////////////////////////////////////////////////////
// Make mobile navigation work
const btnNavEl = document.querySelector('.btn-mobile-nav');
const headerEl = document.querySelector('.header');
btnNavEl.addEventListener('click', function() {
  // toggle: look at headerEl, if already there, remove it. If it is there, add it
  headerEl.classList.toggle('nav-open');
})


///////////////////////////////////////////////////////////
// Smooth scrolling animation
const allLinks = document.querySelectorAll('a:link');
// console.log(allLinks);
allLinks.forEach(function(link) {
  // e is the event happened
  link.addEventListener('click', function(e) {
    // turn off default event
    e.preventDefault();
    const href = link.getAttribute('href');
    // console.log(href);
    
    // scroll back to top  (#)
    if (href == "#") window.scrollTo({
      top: 0,
      behavior:"smooth",
    });

    // scroll to other links
    if (href != "#" && href.startsWith("#")) {
      // id selector start with '#'
      const sectionEl = document.querySelector(href);
      // console.log(sectionEl);
      sectionEl.scrollIntoView({behavior: 'smooth'});
    }

    // if click link on the mobile navbar, mobile navbar should be closed
    // is main-nav-link inside of the list we just clicked
    if(link.classList.contains('main-nav-link'))
      // since the link is from navbar, the navbar must be opened before, so it will be closed after toggle
      headerEl.classList.toggle('nav-open');
  })
});

///////////////////////////////////////////////////////////
// Sticky navigation
const sectionHeroEl = document.querySelector('.section-hero');
const obs = new IntersectionObserver(
  function(entries){
    const ent = entries[0];
    if(!ent.isIntersecting) {
      // console.log(ent);
      // document.querySelector('.header').classList.add('sticky');
      document.body.classList.add('sticky');
    } else {
      document.body.classList.remove('sticky');
    }
  },
  {
    // in the viewport
    root: null,
    // as soon as 0% of hero section is inside of viewport
    threshold: 0,
    rootMargin: "-80px",
  }
);
// observer hero-section in the html
// make navigation bar sticky as soon as hero section moves out of the viewport
obs.observe(sectionHeroEl);



///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();
