
import {
    db,
    collection,
    addDoc,
    onSnapshot
} from "./firebase.js";


/* =========================
   GLOBAL STATE
========================= */

let expenses = [];


/* =========================
   SPLASH SCREEN CONTROL
========================= */

window.addEventListener("load", () => {

    const splash = document.getElementById("splash");
    const app = document.getElementById("app");

    splash.style.display = "flex";
    app.classList.add("hidden");

    setTimeout(() => {

        splash.style.display = "none";
        app.classList.remove("hidden");

        showTab("dashboard");

    }, 2000);
});


/* =========================
   TAB NAVIGATION
========================= */

function showTab(tab) {

    const screens = document.querySelectorAll(".screen");

    screens.forEach(screen => {
        screen.classList.remove("active");
    });

    const target = document.getElementById(tab);
    if (target) target.classList.add("active");
}

window.showTab = showTab;


/* =========================
   MODAL CONTROL
========================= */

function openAddExpense() {
    document.getElementById("expenseModal").classList.remove("hidden");
}

function closeAddExpense() {
    document.getElementById("expenseModal").classList.add("hidden");
}

window.openAddExpense = openAddExpense;
window.closeAddExpense = closeAddExpense;


/* =========================
   FIREBASE: LOAD DATA
========================= */

function loadExpenses() {

    const colRef = collection(db, "expenses");

    onSnapshot(colRef, (snapshot) => {

        expenses = [];

        snapshot.forEach(doc => {
            expenses.push({
                id: doc.id,
                ...doc.data()
            });
        });

        renderExpenses();
    });
}

loadExpenses();


/* =========================
   SAVE EXPENSE (FIREBASE)
========================= */

async function saveExpense() {

    const item = document.getElementById("item").value;
    const vendor = document.getElementById("vendor").value;
    const cost = document.getElementById("cost").value;
    const paid = document.getElementById("paid").value;

    await addDoc(collection(db, "expenses"), {

        item,
        vendor,
        cost: Number(cost),
        paid: Number(paid),
        remaining: Number(cost) - Number(paid),

        createdAt: new Date()
    });

    clearForm();
    closeAddExpense();
}


/* =========================
   RENDER EXPENSES
========================= */

function renderExpenses() {

    const list = document.getElementById("expenseList");

    if (!list) return;

    list.innerHTML = "";

    expenses.forEach(e => {

        const div = document.createElement("div");
        div.className = "expenseItem";

        div.innerHTML = `
            <b>${e.item}</b><br>
            ${e.vendor}<br>
            RM ${e.cost} | Paid RM ${e.paid} | Left RM ${e.remaining}
        `;

        list.appendChild(div);
    });
}


/* =========================
   CLEAR FORM
========================= */

function clearForm() {

    document.getElementById("item").value = "";
    document.getElementById("vendor").value = "";
    document.getElementById("cost").value = "";
    document.getElementById("paid").value = "";
}


/* =========================
   INITIAL RENDER SAFETY
========================= */

renderExpenses();


/* =========================
   GLOBAL EXPORTS
========================= */

window.saveExpense = saveExpense;
window.renderExpenses = renderExpenses;
