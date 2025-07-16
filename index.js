import menuArray from "./data.js";

const menuContainer = document.querySelector(".menu");
const confirmOrderDiv = document.createElement("div");
confirmOrderDiv.classList.add("confirm-order");

class PizzaMenu {
  constructor(menuContainer, confirmOrderDiv) {
    this.menuContainer = menuContainer;
    this.confirmOrderDiv = confirmOrderDiv;
    this.order = {};
    this.totalPrice = 0;
  }
  renderMenu() {
    menuArray.forEach((item) => {
      const menuItem = document.createElement("div");
      menuItem.classList.add("menu-item");

      menuItem.innerHTML = `
                <p class="emoji">${item.emoji}</p>
                <div class='menu-details'>
                    <p class='item-name'>${item.name}</p>
                    <small class='ingredients'>${item.ingredients.join(
                      ","
                    )}</small>
                    <p class='item-price'>${item.price}</p>
                </div>
               <i class="fa-solid fa-plus" data-id="${item.id}"></i>
            `;

      const plusBtn = menuItem.querySelector(".fa-plus");
      plusBtn.addEventListener("click", (e) => {
        const itemId = e.target.dataset.id;
        if (this.order[itemId]) {
          this.order[itemId].quantity += 1;
        } else {
          const clickedItem = menuArray.find((item) => item.id == itemId);
          this.order[itemId] = { ...clickedItem, quantity: 1 };
        }
        this.renderOrder();
      });
      this.menuContainer.appendChild(menuItem);
    });
  }

  renderOrder() {
    if (Object.keys(this.order).length === 0) {
      if (this.menuContainer.contains(this.confirmOrderDiv)) {
        this.menuContainer.removeChild(this.confirmOrderDiv);
      }
      return;
    }

    this.totalPrice = 0; // Reset total price before calculation
    this.confirmOrderDiv.innerHTML = "<h2>Your order</h2>";
    Object.values(this.order).forEach((item) => {
      this.totalPrice += item.price * item.quantity;
      const orderDetails = document.createElement("div");
      orderDetails.classList.add("order-info");
      orderDetails.innerHTML = `
              <div class='order-info'>
                  <div>
                      <span>${item.name} X  ${item.quantity}</span>
                      <button class='btn' data-id=${item.id}>remove</button>
                  </div>
                  <p>${item.price * item.quantity}</p>
              </div>
          `;
      this.confirmOrderDiv.appendChild(orderDetails);
    });

    // Total price section
    const totalDiv = document.createElement("div");
    totalDiv.classList.add("order-info");
    totalDiv.innerHTML = `
          <p>Total Price:</p>
          <p>${this.totalPrice}</p>
      `;
    this.confirmOrderDiv.appendChild(totalDiv);

    // Confirm order button
    if (Object.keys(this.order).length > 0) {
      const confirmBtn = document.createElement("button");
      confirmBtn.textContent = "Complete order";
      confirmBtn.classList.add("confirm-btn");
      this.confirmOrderDiv.appendChild(confirmBtn);

      confirmBtn.addEventListener("click", () => {
        this.showModal();
      });
    }

    // Remove item buttons
    this.confirmOrderDiv.querySelectorAll(".btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const itemId = e.target.dataset.id;
        delete this.order[itemId];
        this.renderOrder();
      });
    });

    if (!this.menuContainer.contains(this.confirmOrderDiv)) {
      this.menuContainer.appendChild(this.confirmOrderDiv);
    }
  }

  showModal() {
    // Remove any existing modal
    const oldModal = document.querySelector(".modal");
    if (oldModal) oldModal.remove();

    let modal = document.createElement("div");
    modal.className = "modal";
    modal.innerHTML = `
        <div class='modal-container'>
            <button class="close-modal close-btn">&times;</button>
            <h3>Payment Information</h3>
            <form id="payment-form">
                <label>Name on Card:<br><input type="text" required></label><br><br>
                <label>Card Number:<br><input type="text" required maxlength="16"></label><br><br>
                <label>Expiry:<br><input type="text" placeholder="MM/YY" required maxlength="5"></label><br><br>
                <label>CVV:<br><input type="password" required maxlength="4"></label><br><br>
                <button type="submit" style="background:green;color:white;padding:8px 16px;border:none;border-radius:4px;">Pay</button>
            </form>
        </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector(".close-modal").onclick = () => modal.remove();
    modal.querySelector("#payment-form").onsubmit = (e) => {
      e.preventDefault();
      modal.remove();
      this.showSuccessModal();
    };
  }

  showSuccessModal() {
    // Remove any existing modal
    const oldModal = document.querySelector(".modal");
    if (oldModal) oldModal.remove();

    let modal = document.createElement("div");
    modal.className = "modal";
    modal.innerHTML = `
        <div class='modal-container'>
            <button class="close-modal close-btn">&times;</button>
            <h3 style="color:green;">Payment Successful!</h3>
            <p>Your order has been placed. Thank you!</p>
        </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector(".close-modal").onclick = () => modal.remove();
    // Optionally, clear the order after success
    this.order = {};
    this.renderOrder();
  }
}

const Pizza = new PizzaMenu(menuContainer, confirmOrderDiv);

Pizza.renderMenu();
