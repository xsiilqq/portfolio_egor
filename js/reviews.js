import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

console.log("reviews.js loaded ✅");

const firebaseConfig = {
  apiKey: "AIzaSyDP814LEFr5aDqiQQLoa5VdI0MckC_j9vU",
  authDomain: "client-e8982.firebaseapp.com",
  projectId: "client-e8982",
  storageBucket: "client-e8982.firebasestorage.app",
  messagingSenderId: "849694287076",
  appId: "1:849694287076:web:c9cac196640e146eff38f1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const reviewsRef = collection(db, "reviews");

// DOM (лучше объявлять до render)
const emptyText = document.querySelector(".reviews-empty");
const list = document.querySelector(".reviews-list");

function formatDate(date) {
  const d = date instanceof Date ? date : new Date(date);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}.${mm}.${yyyy}`;
}

function renderReviews(reviews) {
  if (!list || !emptyText) return; // если на странице нет блока отзывов

  list.innerHTML = "";

  if (!reviews || reviews.length === 0) {
    emptyText.style.display = "block";
    return;
  }

  emptyText.style.display = "none";

  reviews.forEach((review) => {
    const createdAt = review.createdAt?.toDate ? review.createdAt.toDate() : new Date();
    const name = review.name || "Anonymous";
    const text = review.text || "";

    list.insertAdjacentHTML("beforeend", `
      <li>
        <article class="review-card">
          <div class="review-top">
            <span class="review-name">${name}</span>
            <span class="review-date">${formatDate(createdAt)}</span>
          </div>
          <p class="review-text">${text}</p>
        </article>
      </li>
    `);
  });
}

const toast = document.getElementById("toast");

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}


// realtime read
onSnapshot(query(reviewsRef, orderBy("createdAt", "desc")), (snapshot) => {
  const reviews = snapshot.docs
    .map(d => d.data())
    .filter(r => r.status === "approved");

  renderReviews(reviews);
});

// form submit (write)
const form = document.querySelector(".send-feedback");

if (!form) {
  console.warn("Форма не найдена: .send-feedback");
} else {
  const nameInput = form.querySelector('input[name="name"]');
  const emailInput = form.querySelector('input[name="email"]');
  const textInput = form.querySelector('textarea[name="message"], textarea[name="text"]'); 
  // ↑ у тебя textarea name="message", поэтому так!

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = (nameInput?.value || "").trim();
  const email = (emailInput?.value || "").trim();
  const text = (textInput?.value || "").trim();

  if (!text) return;

    if (text.length < 3) return;
    if (!email.includes("@")) return;
    
  try {
    await addDoc(reviewsRef, {
      name: name || "Anonymous",
      email,
      text,
      createdAt: serverTimestamp(),
      status: "pending",
    });

      showToast("Thanks for your feedback 💙");
    console.log("Saved ✅");
    form.reset();
  } catch (err) {
    console.error("Firestore error ❌", err);
  }
});

  // counter
  const textarea = document.querySelector(".feedback-textarea");
  const counter = document.getElementById("charCount");
  const maxLen = 500;

  function updateCounter() {
    if (!textarea || !counter) return;
    counter.textContent = textarea.value.length;
  }

  if (textarea && counter) {
    updateCounter();
    textarea.addEventListener("input", updateCounter);
  }
}

