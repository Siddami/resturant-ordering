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
                  <p>$${item.price * item.quantity}</p>
              </div>
          `;
      this.confirmOrderDiv.appendChild(orderDetails);
    });

    // Total price section
    const totalDiv = document.createElement("div");
    totalDiv.classList.add("order-info", "total-div");
    totalDiv.innerHTML = `
          <p>Total Price:</p>
          <p>$${this.totalPrice}</p>
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
            <h3>Enter card details</h3>
            <form id="payment-form">
                <input type="text" placeholder="Enter your name" name="name" id="name" aria-role="name" required><br>
                <input type="text" placeholder="Enter your card number" id="card-number" aria-role="card-number" required maxlength="16"><br>
                <input type="text" placeholder="Enter CVV" name="card-cvv" id="card-cvv" aria-role="card-cvv" required maxlength="5"><br>
                <button type="submit" class="btn modal-btn">Pay</button>
            </form>
        </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector(".close-modal").onclick = () => modal.remove();
    modal.querySelector("#payment-form").onsubmit = (e) => {
      e.preventDefault();
      const name = document.querySelector("#name").value;
      modal.remove();
      this.showSuccessModal(name);
    };
  }

  showSuccessModal(name = "") {
    // Remove any existing modal
    const oldModal = document.querySelector(".modal");
    if (oldModal) oldModal.remove();

    let modal = document.createElement("div");
    modal.className = "modal";
    modal.innerHTML = `
        <div class='modal-container'>
            <button class="close-modal close-btn">&times;</button>
            <h3 style="color:green;">Payment Successful!</h3>
            <p>Your order has been placed. Thank you ${name} for your purchase!</p>
        </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector(".close-modal").onclick = () => modal.remove();
    // clear the order after success
    this.order = {};
    this.renderOrder();
  }
}

const Pizza = new PizzaMenu(menuContainer, confirmOrderDiv);

Pizza.renderMenu();
