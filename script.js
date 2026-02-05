// --- DATA SIMULATION ---
let transactions = [
  {
    id: 1,
    desc: "Monthly Salary",
    amount: 3000.0,
    type: "income",
    category: "Salary",
    date: "2023-10-01",
  },
  {
    id: 2,
    desc: "Grocery Store",
    amount: 150.25,
    type: "expense",
    category: "Food",
    date: "2023-10-02",
  },
  {
    id: 3,
    desc: "Electric Bill",
    amount: 85.0,
    type: "expense",
    category: "Utilities",
    date: "2023-10-05",
  },
];

// --- EVENTS ---
document.addEventListener("DOMContentLoaded", () => {
  renderList();
  updateSummary();
});

document.getElementById("transaction-form").addEventListener("submit", (e) => {
  e.preventDefault();

  // 1. Get values
  const desc = document.getElementById("desc").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const type = document.getElementById("type").value;
  const category = document.getElementById("category").value;

  // 2. Create Object
  const newTransaction = {
    id: Date.now(),
    desc: desc,
    amount: amount,
    type: type,
    category: category,
    date: new Date().toISOString().split("T")[0],
  };

  // 3. Update Data Array
  transactions.unshift(newTransaction);

  // 4. Reset Form
  document.getElementById("desc").value = "";
  document.getElementById("amount").value = "";

  // 5. Update UI
  renderList();
  updateSummary();
});

// --- UI FUNCTIONS ---
function renderList() {
  const listEl = document.getElementById("transaction-list");
  const emptyState = document.getElementById("empty-state");

  listEl.innerHTML = "";

  // Show empty state if needed
  if (transactions.length === 0) {
    emptyState.classList.remove("hidden");
    return;
  } else {
    emptyState.classList.add("hidden");
  }

  transactions.forEach((t) => {
    const row = document.createElement("tr");

    // Determine CSS classes based on data
    const amountClass = t.type === "income" ? "text-success" : "text-danger";
    const sign = t.type === "income" ? "+" : "-";

    // Badge Logic
    let badgeClass = "badge-default";
    if (t.category === "Food") badgeClass = "badge-food";
    if (t.category === "Rent") badgeClass = "badge-rent";
    if (t.category === "Utilities") badgeClass = "badge-utilities";
    if (t.category === "Salary") badgeClass = "badge-salary";
    if (t.category === "Entertainment") badgeClass = "badge-ent";

    row.innerHTML = `
                    <td>${t.desc}</td>
                    <td><span class="badge ${badgeClass}">${t.category}</span></td>
                    <td style="color: var(--text-muted); font-size: 0.85rem;">${t.date}</td>
                    <td class="text-right ${amountClass}">${sign}$${t.amount.toFixed(2)}</td>
                `;
    listEl.appendChild(row);
  });
}

function updateSummary() {
  let income = 0;
  let expense = 0;

  transactions.forEach((t) => {
    if (t.type === "income") income += t.amount;
    else expense += t.amount;
  });

  document.getElementById("display-income").textContent =
    `$${income.toFixed(2)}`;
  document.getElementById("display-expense").textContent =
    `$${expense.toFixed(2)}`;
  document.getElementById("display-balance").textContent =
    `$${(income - expense).toFixed(2)}`;
}

function clearList() {
  if (confirm("Are you sure you want to clear all transactions?")) {
    transactions = [];
    renderList();
    updateSummary();
  }
}
