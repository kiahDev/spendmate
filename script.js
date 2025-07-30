const amountEl = document.getElementById("amount");
const dateEl = document.getElementById("date");
const calendarEl = document.getElementById("calendarDate");
const noteEl = document.getElementById("note");

const expenseBtn = document.getElementById("expenseBtn");
const incomeBtn = document.getElementById("incomeBtn");

const addBtn = document.getElementById("addBtn");

const expenseTab = document.getElementById("expenseTab");
const incomeTab = document.getElementById("incomeTab");
const transactionList = document.getElementById("transactionList");

let selectedType = "expense";

const toggleButtons = [expenseBtn, incomeBtn, currentBtn];

toggleButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    toggleButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    selectedType = btn.id.replace("Btn", "").toLowerCase();
  });
});

addBtn.addEventListener("click", () => {
  const date = dateEl.value;
  const amount = parseFloat(amountEl.value).toFixed(2);
  const note = noteEl.value.trim();

  if (!date || !amount || !note) return;

  const data = JSON.parse(localStorage.getItem("transactions") || "{}");
  if (!data[date]) data[date] = [];

  data[date].push({ type: selectedType, amount, note });

  localStorage.setItem("transactions", JSON.stringify(data));
  if (calendarEl.value === date) loadTransactions(date);
  
  noteEl.value = "";
  amountEl.value = "";
});

calendarEl.addEventListener("change", () => {
  loadTransactions(calendarEl.value);
});

expenseTab.addEventListener("click", () => {
  incomeTab.classList.remove("active");
  expenseTab.classList.add("active");
  loadTransactions(calendarEl.value);
});

incomeTab.addEventListener("click", () => {
  expenseTab.classList.remove("active");
  incomeTab.classList.add("active");
  loadTransactions(calendarEl.value);
});

function loadTransactions(date) {
  const data = JSON.parse(localStorage.getItem("transactions") || "{}");
  const transactions = data[date] || [];
  const activeTab = incomeTab.classList.contains("active") ? "income" : "expense";

  transactionList.innerHTML = transactions
    .filter(tx => tx.type === activeTab)
    .map(tx => `<div>$${tx.amount} — ${tx.note}</div>`)
    .join("");
}


setInterval(() => {
  const now = new Date();
  document.getElementById("time").textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}, 1000);


const today = new Date().toISOString().split("T")[0];
dateEl.value = today;
calendarEl.value = today;
loadTransactions(today);
