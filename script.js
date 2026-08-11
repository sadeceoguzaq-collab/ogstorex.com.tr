
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector(".menu-btn");
  const links = document.querySelector(".nav-links");
  if (btn && links) {
    btn.addEventListener("click", () => links.classList.toggle("open"));
  }

  const current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(a => {
    const href = a.getAttribute("href");
    if (href === current) a.classList.add("active");
  });

  if (window.OGSTOREX_LISTINGS && document.querySelector("#listingGrid")) {
    const grid = document.querySelector("#listingGrid");
    if (!window.OGSTOREX_LISTINGS.length) {
      grid.innerHTML = '<div class="empty">İlanlar hazırlanıyor. İtemSatış linkleri eklendikçe burada görünecek.</div>';
    } else {
      grid.innerHTML = window.OGSTOREX_LISTINGS.map(item => `
        <a class="product-card" href="${item.link}" target="_blank" rel="noopener noreferrer">
          <div class="product-visual">
            <div class="product-symbol">${item.icon || "◆"}</div>
          </div>
          <div class="product-body">
            <span class="tag">${item.category || "İlan"}</span>
            <h3>${item.title}</h3>
            <p>${item.description || ""}</p>
            <div class="product-footer">
              <span class="price">${item.price || ""}</span>
              <span class="goto">İlanı Gör →</span>
            </div>
          </div>
        </a>
      `).join("");
    }
  }
});
