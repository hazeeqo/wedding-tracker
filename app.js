import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAfMWQFoIeTmfS_n6zRZvylEswOv9ZrZ-s",
  authDomain: "wedding-tracker-bed3d.firebaseapp.com",
  projectId: "wedding-tracker-bed3d",
  storageBucket: "wedding-tracker-bed3d.firebasestorage.app",
  messagingSenderId: "41981843613",
  appId: "1:41981843613:web:56865dcb2ed976dd905c74",
  measurementId: "G-TRYRPF8362"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* SPLASH */
setTimeout(() => {
  splash.style.display = "none";
  dashboard.classList.remove("hidden");
}, 2000);

/* NAV */
window.showExpenses = () => {
  dashboard.classList.add("hidden");
  expensesPage.classList.remove("hidden");
};

window.backHome = () => {
  expensesPage.classList.add("hidden");
  dashboard.classList.remove("hidden");
};

/* FORM */
window.openForm = () => formPage.classList.remove("hidden");
window.closeForm = () => formPage.classList.add("hidden");

/* SAVE EXPENSE */
window.saveExpense = async () => {
  const costVal = Number(cost.value);
  const depositVal = Number(deposit.value);

  await addDoc(collection(db, "expenses"), {
    item: item.value,
    vendor: vendor.value,
    cost: costVal,
    deposit: depositVal,
    remaining: costVal - depositVal,
    desc: desc.value,
    createdAt: Date.now()
  });

  closeForm();
};

/* LOAD EXPENSES */
onSnapshot(collection(db, "expenses"), (snap) => {
  let html = "";

  snap.forEach(d => {
    const data = d.data();

    html += `
      <div class="card">
        <b>${data.item}</b><br>
        ${data.vendor}<br>
        Total: RM ${data.cost}<br>
        Deposit: RM ${data.deposit}<br>
        Remaining: RM ${data.remaining}<br>
        <small>${data.desc}</small>
      </div>
    `;
  });

  expenseList.innerHTML = html;
});
