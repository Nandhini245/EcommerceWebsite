window.addEventListener("load", () => {
  const table = document.getElementById("cart-table");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function renderCart() {
    // Clear all rows except header
    table.querySelectorAll("tr:not(:first-child)").forEach(tr => tr.remove());

    cart.forEach((item, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td><img src="${item.image}" width="50"> ${item.title}</td>
        <td>Rs. ${item.price}</td>
        <td>
          <button class="decrement" data-index="${index}">−</button>
          <span>${item.quantity}</span>
          <button class="increment" data-index="${index}">+</button>
        </td>
        <td>Rs. ${(item.price * item.quantity).toFixed(2)}</td>
      `;
      table.appendChild(row);
    });

    // Update total count
    document.getElementById("cart-total").textContent =
      cart.reduce((sum, i) => sum + i.quantity, 0);

    // Save back to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // Handle + and − button clicks
  table.addEventListener("click", (e) => {
    if (e.target.classList.contains("increment")) {
      const index = e.target.dataset.index;
      cart[index].quantity++;
      renderCart();
    }

    if (e.target.classList.contains("decrement")) {
      const index = e.target.dataset.index;
      if (cart[index].quantity > 1) {
        cart[index].quantity--;
      } else {
        cart.splice(index, 1);
      }
      renderCart();
    }
  });

  renderCart(); // Initial render
});

window.addEventListener("storage", () => {
  console.log("Cart updated — refreshing...");
  location.reload(); // ✅ reload cart page automatically
});

