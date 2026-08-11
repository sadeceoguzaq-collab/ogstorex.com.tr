
const icon = (name, cls = "") =>
  `<svg class="icon ${cls}" aria-hidden="true"><use href="#${name}"></use></svg>`;

function renderServers() {
  document.querySelectorAll("[data-server-grid]").forEach(grid => {
    const items = (window.OGSTOREX?.discordServers || []);
    grid.innerHTML = items.map((s, i) => `
      <article class="server-card">
        <div class="server-no">0${i+1}</div>
        <div class="server-logo">${icon("messages-square")}</div>
        <h3>${s.name}</h3>
        <p>${s.description}</p>
        <div class="server-tags">
          ${s.tags.map((t, idx) => `<span class="server-tag">${icon(["users-round","radio-tower","badge-check"][idx % 3])}${t}</span>`).join("")}
        </div>
        <div class="server-bottom">
          <span class="server-url">${s.short}</span>
          <a class="server-open" href="${s.invite}" target="_blank" rel="noopener noreferrer" aria-label="${s.name} Discord sunucusunu aç">
            ${icon("arrow-up-right")}
          </a>
        </div>
      </article>
    `).join("");
  });
}

function listingCard(item) {
  return `
    <a class="listing-card" href="${item.link}" target="_blank" rel="noopener noreferrer">
      <div class="listing-media">
        <div class="listing-icon">${icon(item.icon || "package")}</div>
      </div>
      <div class="listing-body">
        <div class="listing-label">${item.category || "İlan"}</div>
        <h3>${item.title}</h3>
        <p>${item.description || ""}</p>
        <div class="listing-foot">
          <span class="listing-price">${item.price || ""}</span>
          <span class="listing-open">İlanı gör ${icon("arrow-up-right")}</span>
        </div>
      </div>
    </a>`;
}

function renderListings() {
  document.querySelectorAll("[data-listing-grid]").forEach(grid => {
    const source = window.OGSTOREX?.listings || [];
    const q = (document.querySelector("[data-listing-search]")?.value || "").trim().toLowerCase();
    const list = source.filter(x => (`${x.title} ${x.category} ${x.description}`).toLowerCase().includes(q));

    if (!list.length) {
      grid.innerHTML = `
        <div class="empty-state">
          <div>
            <div class="empty-icon">${icon("package-open")}</div>
            <h3>${source.length ? "Aramana uygun ilan bulunamadı" : "İlan alanı hazır"}</h3>
            <p>${source.length ? "Farklı bir arama deneyebilirsin." : "İtemSatış ilan linklerini gönderdiğinde kartları aynı premium tasarım diliyle buraya tek tek ekleyeceğiz."}</p>
          </div>
        </div>`;
      return;
    }
    grid.innerHTML = list.map(listingCard).join("");
  });
}

function setActiveNav() {
  const page = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(a => {
    if (a.getAttribute("href") === page) a.classList.add("active");
  });
}

function setupMenu() {
  const btn = document.querySelector(".menu-btn");
  const menu = document.querySelector(".nav-links");
  if (!btn || !menu) return;
  btn.addEventListener("click", () => {
    menu.classList.toggle("open");
    btn.innerHTML = menu.classList.contains("open") ? icon("x") : icon("menu");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderServers();
  renderListings();
  setActiveNav();
  setupMenu();
  const search = document.querySelector("[data-listing-search]");
  if (search) search.addEventListener("input", renderListings);
});
