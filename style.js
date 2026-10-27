
(function () {
  const RELOAD_DELAY = 150; 

  const forceReload = () => {
    console.log("[WG] Route change detected → Full reload triggered");
    window.location.reload();
  };

  const patchHistory = (method) => {
    const original = history[method];
    history[method] = function (...args) {
      const result = original.apply(this, args);
      setTimeout(forceReload, RELOAD_DELAY);
      return result;
    };
  };
  ["pushState", "replaceState"].forEach(patchHistory);
  window.addEventListener("popstate", () => {
    setTimeout(forceReload, RELOAD_DELAY);
  });
})();

(() => {
  const ID = "wgpm_final_v1";
  const TRY_MS = 250;
  const MAX_TRIES = 120; 

  const mount = () => {
    if (document.getElementById(ID)) return true;
    const slider =
      document.querySelector("main.home .landing-slider .container") ||
      document.querySelector("main.home .landing-slider");
    if (!slider) return false;
    slider.style.position = "relative";

    const html = `
      <div id="${ID}" class="wgpm-mounted">
        <a href="/casino" class="wgpm-pill gold">
          <img class="wgpm-icon" src="https://cdn-icons-png.flaticon.com/128/8336/8336950.png" alt="Slot">
          <span>Slot</span>
        </a>
        <a href="/livecasino" class="wgpm-pill green">
          <img class="wgpm-icon" src="https://cdn-icons-png.flaticon.com/128/1808/1808997.png" alt="Canlı Casino">
          <span>Canlı Casino</span>
        </a>
        <a href="/sports" class="wgpm-pill red">
          <img class="wgpm-icon" src="https://cdn-icons-png.flaticon.com/128/5540/5540420.png" alt="Spor">
          <span>Spor</span>
        </a>
        <a href="/live" class="wgpm-pill red">
          <img class="wgpm-icon" src="https://cdn-icons-png.flaticon.com/128/18668/18668743.png" alt="Canlı Bahis">
          <span>Canlı Bahis</span>
        </a>
        <a href="/games" class="wgpm-pill blue">
          <img class="wgpm-icon" src="https://cdn-icons-png.flaticon.com/128/4072/4072061.png" alt="Oyunlar">
          <span>Oyunlar</span>
        </a>
        <a href="/promotions" class="wgpm-pill gold">
          <img class="wgpm-icon" src="https://cdn-icons-png.flaticon.com/128/6453/6453565.png" alt="Promosyonlar">
          <span>Promosyonlar</span>
        </a>
      </div>
    `;

    slider.insertAdjacentHTML("beforeend", html);

    const landingSlider = document.querySelector("main.home .landing-slider");
    if (landingSlider) landingSlider.style.marginBottom = "70px";

    const observerFix = new MutationObserver(() => {
      const container = document.querySelector("main.home .landing-slider .container");
      const menu = document.getElementById(ID);
      if (container && menu && !container.contains(menu)) {
        container.appendChild(menu);
      }
    });
    observerFix.observe(document.body, { childList: true, subtree: true });

    const menu = document.getElementById(ID);
    if (menu) {
      menu.style.opacity = "0";
      menu.style.transition = "opacity 0.5s ease";
      requestAnimationFrame(() => {
        menu.style.opacity = "1";
      });
    }

    return true;
  };

  if (mount()) return;

  let tries = 0;
  const retry = setInterval(() => {
    tries++;
    if (mount() || tries >= MAX_TRIES) clearInterval(retry);
  }, TRY_MS);

  const observer = new MutationObserver(() => {
    if (mount()) observer.disconnect();
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });

  const originalPush = history.pushState;
  history.pushState = function () {
    originalPush.apply(this, arguments);
    mount();
  };
  window.addEventListener("popstate", mount);
})();

(() => {
  const HC_ID = "wg_home_collections_v1";
  const HOST_SELECTOR = "main.home section.casino .container .grid"; 
  const PLACEHOLDER = "https://dummyimage.com/800x600/e5e7eb/9ca3af.jpg&text=GAME";

  const state = {
    slots: [
      { img: "https://designwestgate.art/slotspor/img/s20extracrown.png", href: "/PlayGame/226508" },
      { img: "https://designwestgate.art/slotspor/img/s40burninghot6reels.png", href: "/PlayGame/189012" },
      { img: "https://designwestgate.art/slotspor/img/sbigbassbonanza1000.png", href: "/PlayGame/222224" },
      { img: "https://designwestgate.art/slotspor/img/sflaminghotextreme.png", href: "/PlayGame/188968" },
      { img: "https://designwestgate.art/slotspor/img/sgatesofolympus1000.png", href: "/PlayGame/187137" },
      { img: "https://designwestgate.art/slotspor/img/ssarayruyasi.png", href: "/PlayGame/187397" },
      { img: "https://designwestgate.art/slotspor/img/sstarlightprincess1000.png", href: "/PlayGame/186831" },
      { img: "https://designwestgate.art/slotspor/img/ssugarrush1000.png", href: "/PlayGame/187956" },
      { img: "https://designwestgate.art/slotspor/img/ssweetbonanza1000.png", href: "/PlayGame/188957" },
      { img: "https://designwestgate.art/slotspor/img/swisdomofathena1000.png", href: "/PlayGame/190175" },
      { img: "https://designwestgate.art/slotspor/img/szeusvshades.png", href: "/PlayGame/184084" },
      { img: "https://designwestgate.art/slotspor/img/sthedoghouse.png", href: "/PlayGame/188457" },
    ],
    live: [
      { img: "https://designwestgate.art/slotspor/img/ccboomcity.png", href: "/PlayGame/179509" },
      { img: "https://designwestgate.art/slotspor/img/cccrazytime.png", href: "/PlayGame/179010" },
      { img: "https://designwestgate.art/slotspor/img/ccdragontiger.png", href: "/PlayGame/179522" },
      { img: "https://designwestgate.art/slotspor/img/cclightningroulette.png", href: "/PlayGame/179033" },
      { img: "https://designwestgate.art/slotspor/img/cclucky6roulette.png", href: "/PlayGame/187136" },
      { img: "https://designwestgate.art/slotspor/img/ccmegaroulette.png", href: "/PlayGame/179508" },
      { img: "https://designwestgate.art/slotspor/img/ccmegawheel.png", href: "/PlayGame/179507" },
      { img: "https://designwestgate.art/slotspor/img/ccpoweruproulette.png", href: "/PlayGame/180181" },
      { img: "https://designwestgate.art/slotspor/img/ccsnakesladders.png", href: "/PlayGame/184086" },
      { img: "https://designwestgate.art/slotspor/img/ccspeedblackjack.png", href: "/PlayGame/180899" },
      { img: "https://designwestgate.art/slotspor/img/ccsweetbonanzacandyland.png", href: "/PlayGame/179503" },
      { img: "https://designwestgate.art/slotspor/img/ccturkishroulette.png", href: "/PlayGame/222656" },
    ],
    fast: [
      { img: "https://designwestgate.art/slotspor/img/haviator.png", href: "/PlayGame/172101" },
      { img: "https://designwestgate.art/slotspor/img/hdice.png", href: "/PlayGame/187607" },
      { img: "https://designwestgate.art/slotspor/img/hdice2.png", href: "/PlayGame/184040" },
      { img: "https://designwestgate.art/slotspor/img/hdino.png", href: "/PlayGame/183940" },
      { img: "https://designwestgate.art/slotspor/img/hhighlow.png", href: "/PlayGame/187605" },
      { img: "https://designwestgate.art/slotspor/img/hhilo.png", href: "/PlayGame/184039" },
      { img: "https://designwestgate.art/slotspor/img/hicefield.png", href: "/PlayGame/184041" },
      { img: "https://designwestgate.art/slotspor/img/hkeno.png", href: "/PlayGame/184037" },
      { img: "https://designwestgate.art/slotspor/img/hmines.png", href: "/PlayGame/187608" },
      { img: "https://designwestgate.art/slotspor/img/hplinko.png", href: "/PlayGame/187609" },
      { img: "https://designwestgate.art/slotspor/img/hplinko2.png", href: "/PlayGame/184038" },
      { img: "https://designwestgate.art/slotspor/img/hzeppelin.png", href: "/PlayGame/187606" },
    ],
  };

  const clamp12 = (arr) => {
    const a = Array.isArray(arr) ? arr.filter(Boolean) : [];
    return a.length >= 12
      ? a.slice(0, 12)
      : a.concat(Array.from({ length: 12 - a.length }, () => ({ img: PLACEHOLDER, href: "#" })));
  };

  const normalizeItem = (item) => {
    if (typeof item === "string") return { img: item, href: "#" };
    if (item && typeof item === "object") return { img: item.img || item.src || "", href: item.href || "#" };
    return { img: "", href: "#" };
  };

  const el = (tag, attrs = {}, children = []) => {
    const n = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => {
      if (k === "class") n.className = v;
      else if (k === "html") n.innerHTML = v;
      else n.setAttribute(k, v);
    });
    children.forEach((c) => n.appendChild(c));
    return n;
  };

  const createCard = (raw) => {
    const item = normalizeItem(raw);
    const a = el("a", { class: "hc-card", href: item.href || "#", "aria-label": "game" });
    a.addEventListener("click", (e) => {
      if (a.getAttribute("href") === "#") e.preventDefault();
    });
    const img = el("img", { alt: "game" });
    img.loading = "lazy";
    img.src = item.img || PLACEHOLDER;
    a.appendChild(img);
    return a;
  };

  const buildSection = (title, key) => {
    const header = el("div", { class: "hc-header" }, [
      el("div", { class: "hc-title", html: title }),
      el("button", { class: "hc-more", type: "button" }, []),
    ]);
    header.querySelector(".hc-more").textContent = "Tümü →";
    header.querySelector(".hc-more").addEventListener("click", () => {
    });

    const grid = el("div", { class: "hc-grid", "data-key": key });
    clamp12(state[key]).forEach((it) => grid.appendChild(createCard(it)));

    return el("div", { class: "hc-section" }, [header, grid]);
  };

  const renderHC = (root) => {
    root.innerHTML = "";
    root.appendChild(
      el("div", { class: "home-collections" }, [
        buildSection("🎰 Popüler Slotlar", "slots"),
        buildSection("🎥 Popüler Canlı Casino", "live"),
        buildSection("⚡ Hızlı Oyunlar", "fast"),
      ])
    );
  };

  const ensureHC = () => {
    const host = document.querySelector(HOST_SELECTOR);
    if (!host) return;
    const parent = host.parentElement;
    if (!parent) return;

    let root = document.getElementById(HC_ID);
    if (!root) {
      root = el("div", { id: HC_ID });
      parent.insertBefore(root, host.nextSibling);
      renderHC(root);
    } else if (root.parentElement !== parent) {
      parent.insertBefore(root, host.nextSibling);
    }
  };

  window.setHomeCollections = (payload) => {
    if (payload && typeof payload === "object") {
      if (payload.slots) state.slots = payload.slots;
      if (payload.live) state.live = payload.live;
      if (payload.fast) state.fast = payload.fast;
    }
    const root = document.getElementById(HC_ID);
    if (root) renderHC(root);
    else ensureHC();
  };

  const runMountHC = () => {
    ensureHC();
    const obs = new MutationObserver(() => {
      if (runMountHC._t) return;
      runMountHC._t = requestAnimationFrame(() => {
        runMountHC._t = 0;
        ensureHC();
      });
    });
    obs.observe(document.documentElement, { childList: true, subtree: true });

    const _push = history.pushState;
    history.pushState = function () {
      _push.apply(this, arguments);
      ensureHC();
    };
    window.addEventListener("popstate", ensureHC);
  };

  runMountHC();
})();

