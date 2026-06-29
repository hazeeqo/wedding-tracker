import {
    db,
    collection,
    addDoc,
    onSnapshot,
    deleteDoc,
    doc,
    updateDoc
} from "./firebase.js";

let expenses = [];
let editId = null;

/* SPLASH SAFE */
window.addEventListener("load", () => {

    setTimeout(() => {

        document.getElementById("splash").style.display = "none";
        document.getElementById("app").classList.remove("hidden");

    }, 1200);
});

/* MODAL */
function openModal() {
    document.getElementById("modal").classList.remove("hidden");
}
function closeModal() {
    document.getElementById("modal").classList.add("hidden");
    clearForm();
    editId = null;
}

window.openModal = openModal;
window.closeModal = closeModal;

/* FIREBASE */
onSnapshot(collection(db, "expenses"), (snapshot) => {

    expenses = [];

    snapshot.forEach(d => {
        expenses.push({ id: d.id, ...d.data() });
    });

    render();
    dashboard();
});

/* SAVE */
async function saveExpense() {

    const item = document.getElementById("item").value;
    const vendor = document.getElementById("vendor").value;
    const category = document.getElementById("category").value;
    const cost = Number(document.getElementById("cost").value);
    const paid = Number(document.getElementById("paid").value);

    const data = {
        item,
        vendor,
        category,
        cost,
        paid,
        remaining: cost - paid
    };

    if (editId) {
        await updateDoc(doc(db, "expenses", editId), data);
    } else {
        await addDoc(collection(db, "expenses"), data);
    }

    closeModal();
}

window.saveExpense = saveExpense;

/* RENDER */
function render() {

    const list = document.getElementById("expenseList");
    list.innerHTML = "";

    expenses.forEach(e => {

        const div = document.createElement("div");
        div.className = "expenseItem";

        div.innerHTML = `
            <b>${e.item}</b><br>
            ${e.category}<br>
            RM ${e.cost}
        `;

        list.appendChild(div);
    });
}

/* DASHBOARD */
function dashboard() {

    let total = 0;

    expenses.forEach(e => total += e.paid);

    document.getElementById("totalSpent").innerText = "RM " + total;
    document.getElementById("totalRemaining").innerText = "RM " + (0 - total);
}
