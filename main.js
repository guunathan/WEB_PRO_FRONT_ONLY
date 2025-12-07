async function loadProducts(gridId) {
    const res = await fetch("http://localhost:3000/products");
    const products = await res.json();

    const grid = document.getElementById(gridId);
    grid.innerHTML = "";

    products.forEach(p => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
            <img src="${p.image_url}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p>ราคา: ${p.price} บาท</p>
            <p>หมวดหมู่: ${p.category}</p>
            <p>คำอธิบาย: ${p.description}</p>
            <button>
                <a>เพิ่มสินค้า</a>
                <a>ตะกร้า</a>
            </button>
            
            
        `;
        grid.appendChild(card);
    });
}


loadProducts("product-grid");
loadProducts("new-product-grid");  
loadProducts("fishing-product-grid");

function slideProducts(direction, gridId) {
    const grid = document.getElementById(gridId);
    const scrollAmount = grid.offsetWidth; // เลื่อนทีละความกว้างของ grid

    if (direction === "next") {
        grid.scrollLeft += scrollAmount;
    } else if (direction === "prev") {
        grid.scrollLeft -= scrollAmount;
    }
}


const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
let current = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(${(i - index) * 100}%)`;
  });
  dots.forEach(dot => dot.classList.remove("active"));
  dots[index].classList.add("active");
}

dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    current = i;
    showSlide(current);
  });
});

function autoSlide() {
  current = (current + 1) % slides.length;
  showSlide(current);
}

showSlide(current);
setInterval(autoSlide, 5000); // 5 วิเปลี่ยนครั้ง

