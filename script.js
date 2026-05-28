// LOADER

window.addEventListener("load", () => {
  document.querySelector(".loader-wrapper").style.display = "none";
});

// MOBILE MENU

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// STICKY NAVBAR

window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");

  navbar.classList.toggle("scrolled", window.scrollY > 50);
});

// REVEAL ANIMATION

const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {

    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }

  });
}, {
  threshold: 0.15
});

reveals.forEach((el) => observer.observe(el));

// COUNTER

const counters = document.querySelectorAll(".stat-card h3");

const counterObserver = new IntersectionObserver((entries) => {

  entries.forEach((entry) => {

    if (entry.isIntersecting) {

      const counter = entry.target;
      const target = +counter.dataset.target;

      let count = 0;

      const updateCounter = () => {

        const increment = target / 100;

        if (count < target) {
          count += increment;
          counter.innerText = Math.ceil(count);
          requestAnimationFrame(updateCounter);
        } else {
          counter.innerText = target;
        }

      };

      updateCounter();

      counterObserver.unobserve(counter);

    }

  });

});

counters.forEach((counter) => counterObserver.observe(counter));

// BMI CALCULATOR

const bmiBtn = document.getElementById("calculateBMI");

bmiBtn.addEventListener("click", () => {

  const height = document.getElementById("height").value / 100;
  const weight = document.getElementById("weight").value;

  const result = document.getElementById("bmiResult");

  if (!height || !weight) {
    result.innerHTML = "Please enter valid values.";
    return;
  }

  const bmi = (weight / (height * height)).toFixed(1);

  let category = "";
  let suggestion = "";

  if (bmi < 18.5) {
    category = "Underweight";
    suggestion =
      "Join HEALTH FITNESS GYM muscle gain programs to build strength and size.";
  }

  else if (bmi < 25) {
    category = "Normal";
    suggestion =
      "Maintain your physique and achieve aesthetic body goals at HEALTH FITNESS GYM.";
  }

  else {
    category = "Overweight/Obese";
    suggestion =
      "Join HEALTH FITNESS GYM fat loss transformation programs for healthier fitness.";
  }

  result.innerHTML = `
    <h3>Your BMI: ${bmi}</h3>
    <p>${category}</p>
    <small>${suggestion}</small>
  `;
});

// LIGHTBOX

const galleryImages = document.querySelectorAll(".gallery-card img");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");

galleryImages.forEach((img) => {

  img.addEventListener("click", () => {
    lightbox.style.display = "flex";
    lightboxImg.src = img.src;
  });

});

document.querySelector(".close-lightbox").addEventListener("click", () => {
  lightbox.style.display = "none";
});

// BACK TO TOP

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

  if (window.scrollY > 300) {
    backToTop.style.display = "block";
  }

  else {
    backToTop.style.display = "none";
  }

});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// PRICING AUTO FILL

const chooseButtons = document.querySelectorAll(".choose-plan");
const planInput = document.getElementById("plan");

chooseButtons.forEach((btn) => {

  btn.addEventListener("click", () => {

    const selectedPlan = btn.dataset.plan;

    planInput.value = selectedPlan;

    document.getElementById("booking").scrollIntoView({
      behavior: "smooth"
    });

  });

});

// FORM + WHATSAPP

const form = document.getElementById("gymForm");

form.addEventListener("submit", (e) => {

  e.preventDefault();

  const name = document.getElementById("name").value;
  const mobile = document.getElementById("mobile").value;
  const gender = document.getElementById("gender").value;
  const goal = document.getElementById("goal").value;
  const joiningDate = document.getElementById("joiningDate").value;
  const plan = document.getElementById("plan").value;

  const services = Array.from(
    document.getElementById("servicesSelect").selectedOptions
  ).map(option => option.value).join(", ");

  const whatsappMessage = `
🏋️ HEALTH FITNESS GYM Booking

Name: ${name}
Mobile: ${mobile}
Gender: ${gender}
Fitness Goal: ${goal}
Selected Services: ${services}
Selected Plan: ${plan}
Joining Date: ${joiningDate}
`;

  const whatsappURL =
    `https://wa.me/917908750067?text=${encodeURIComponent(whatsappMessage)}`;

  window.open(whatsappURL, "_blank");

  form.reset();

});
