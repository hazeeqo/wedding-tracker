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
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_BUCKET",
  messagingSenderId: "YOUR_ID",
  appId: "YOUR_APP"
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
