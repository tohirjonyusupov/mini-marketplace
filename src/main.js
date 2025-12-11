const API = "https://fakestoreapi.com/products";
const productsList = document.getElementById("products-list");

async function loadProducts() {
  try {
    const res = await fetch(API);
    const data = await res.json();
    
    renderProducts(data);
  } catch (err) {
    productsList.innerHTML =
      "<p>Mahsulotlarni yuklashda xatolik yuz berdi.</p>";
    console.error(err);
  }
}

function renderProducts(products) {
  productsList.innerHTML = "";
  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
  <img src="${product.image}" alt="${product.title}" class="product-image" />
            <h3 class="product-title" title="${product.title}">${
      product.title.length > 25 ? product.title.slice(0, 25) + "..." : product.title
    }</h3>
            <p class="product-price">$${product.price}</p>
            <button class="product-btn add-btn">Add to Cart</button>
`;

    const btn = card.querySelector(".add-btn");
    btn.addEventListener("click", () => {
      const new_product = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
      };
      // Bu yerda js react ga maxsus hodisa yuboriladi: yangi mahsulot qo'shildi degan
    window.dispatchEvent(new CustomEvent('mini-market-add', { detail: new_product }));
    });

    productsList.appendChild(card);
  });
}

loadProducts();

import("/src/cart/main.jsx");