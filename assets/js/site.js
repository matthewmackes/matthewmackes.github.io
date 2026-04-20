// MAP2 — Feature explorer, architecture hover, hero VU animation.
(function () {
  const FEATURES = [
    { n: 1, cat: "Tone", t: "Neural Amp Modeler", d: "AI-based amp and bass modeling inside the live graph." },
    { n: 2, cat: "Tone", t: "IR Convolution", d: "Load custom cabinet, speaker, and room impulse responses." },
    { n: 3, cat: "Tone", t: "Studio effects suite", d: "Comprehensive built-in effects for full signal-chain building." },
    { n: 4, cat: "Tone", t: "Vintage amp emulations", d: "Classic voicings across clean, crunch, and high-gain." },
    { n: 5, cat: "Tone", t: "Modulation & pitch", d: "Harmonizer, poly-shifter, shoegaze-style ambient." },
    { n: 6, cat: "Tone", t: "Dynamics suite", d: "Compressor, limiter, noise gate, expander." },
    { n: 7, cat: "Tone", t: "Time-based FX", d: "Chorus, phaser, flanger, delay, reverb." },
    { n: 8, cat: "Tone", t: "Comprehensive EQ", d: "Parametric, graphic, high-pass and low-pass filters." },
    { n: 9, cat: "Tone", t: "LV2 plugin host", d: "Load any third-party LV2 processor natively." },

    { n: 10, cat: "Routing", t: "Dual processing chains", d: "Two independent chains in parallel for complex routing." },
    { n: 11, cat: "Routing", t: "A/B morphing", d: "Crossfade and interpolate parameters between chains." },
    { n: 12, cat: "Routing", t: "Series + parallel paths", d: "Split and merge the signal graph inside a chain." },
    { n: 13, cat: "Routing", t: "Plugin presets", d: "Save, load, and manage per-plugin settings." },
    { n: 14, cat: "Routing", t: "Chain snapshots", d: "Recall the complete state of a signal path instantly." },
    { n: 60, cat: "Routing", t: "Chain as recipe", d: "A saved chain is a portable JSON definition of a sound." },
    { n: 61, cat: "Routing", t: "Flow as runtime", d: "A chain deployed to a node becomes a live flow." },
    { n: 62, cat: "Routing", t: "Flow orchestrator", d: "Manages deployment, state, and lifecycle of flows." },

    { n: 15, cat: "MIDI", t: "MIDI learn", d: "Map any CC to any parameter in one gesture." },
    { n: 16, cat: "MIDI", t: "Non-consumptive CC", d: "CC messages pass through the chain so one knob controls many." },
    { n: 17, cat: "MIDI", t: "CC fan-out", d: "One controller drives parameters on many plugins." },
    { n: 18, cat: "MIDI", t: "Series MIDI flow", d: "MIDI moves sequentially through the chain by default." },
    { n: 19, cat: "MIDI", t: "Parallel branching", d: "Split MIDI to control multiple targets in parallel." },
    { n: 20, cat: "MIDI", t: "Program change", d: "Preset and chain switching from external controllers." },
    { n: 35, cat: "MIDI", t: "Hot-swap MIDI", d: "Connect or disconnect controllers without restarting." },

    { n: 21, cat: "Hardware", t: "Multi-page LCD UI", d: "Standalone interface inspired by Kemper, Helix, Axe-FX." },
    { n: 22, cat: "Hardware", t: "Standalone operation", d: "Full performance control without a connected computer." },
    { n: 23, cat: "Hardware", t: "Status page", d: "Sample rate, buffer size, CPU load, active chain at a glance." },
    { n: 24, cat: "Hardware", t: "Hardware VU meters", d: "Stereo levels with peak-hold and color zones on the LCD." },
    { n: 25, cat: "Hardware", t: "Chain page", d: "Scrollable visual list of active plugins on the device." },
    { n: 26, cat: "Hardware", t: "LV2 browser", d: "Scroll all available plugins and toggle bypass." },
    { n: 27, cat: "Hardware", t: "MIDI activity page", d: "Monitor connected devices and live message flow." },
    { n: 28, cat: "Hardware", t: "Performance page", d: "Real-time CPU, xrun, and callback-time metrics." },
    { n: 29, cat: "Hardware", t: "Rotary encoder", d: "Navigate menus and adjust parameters with a physical knob." },
    { n: 30, cat: "Hardware", t: "Navigation buttons", d: "GPIO inputs for Up, Down, Select, Menu, Back." },
    { n: 31, cat: "Hardware", t: "Dual LCD support", d: "Power two displays for expanded information views." },
    { n: 32, cat: "Hardware", t: "Custom LCD graphics", d: "Renders VU bars and status icons natively." },
    { n: 33, cat: "Hardware", t: "Backlight control", d: "Software-controllable display brightness." },
    { n: 34, cat: "Hardware", t: "Screensaver", d: "Prevents screen burn-in during idle." },

    { n: 36, cat: "Engine", t: "Ultra-low-latency engine", d: "JUCE 8 core targeting sub-3ms round-trip on tuned hardware." },
    { n: 37, cat: "Engine", t: "SCHED_FIFO processing", d: "Audio threads run at the highest real-time priority." },
    { n: 38, cat: "Engine", t: "CPU core isolation", d: "Dedicates specific cores to audio to stop OS interference." },
    { n: 39, cat: "Engine", t: "Memory locking", d: "Prevents page faults on the real-time thread." },
    { n: 40, cat: "Engine", t: "PipeWire + JACK", d: "Modern Linux audio backend with explicit JACK interop." },
    { n: 41, cat: "Engine", t: "High-res audio", d: "Supports professional sample rates up to 192 kHz." },
    { n: 42, cat: "Engine", t: "Tunable buffer sizes", d: "Dial latency vs. stability from 64 samples upward." },
    { n: 43, cat: "Engine", t: "Plugin delay compensation", d: "Automatic phase alignment across the chain." },
    { n: 44, cat: "Engine", t: "Zero-alloc audio path", d: "Pre-allocated memory prevents runtime allocation xruns." },
    { n: 45, cat: "Engine", t: "XRun detection", d: "Active monitoring with detailed logging and recovery." },
    { n: 46, cat: "Engine", t: "Pro metering suite", d: "Spectrum analyzer, LUFS, VU, phase correlation." },
    { n: 47, cat: "Engine", t: "Hot-swap USB audio", d: "Add or remove interfaces without restarting the service." },
    { n: 48, cat: "Engine", t: "Optimized NAM inference", d: "Eigen-backed CPU inference for neural amp models." },
    { n: 49, cat: "Engine", t: "Graceful degradation", d: "System stays controllable if hardware disconnects." },
    { n: 50, cat: "Engine", t: "Float + fixed-point", d: "Supports multiple bit depths for quality and headroom." },
    { n: 51, cat: "Engine", t: "IRQ balancing", d: "Disables IRQ balancing on audio cores for consistency." },
    { n: 52, cat: "Engine", t: "Async device handling", d: "Hardware changes handled without blocking the app." },

    { n: 53, cat: "Control", t: "FastAPI control plane", d: "50+ documented REST endpoints for full system control." },
    { n: 54, cat: "Control", t: "WebSocket streaming", d: "Live metering and status pushed to UI and TUI clients." },
    { n: 55, cat: "Control", t: "React 18 web UI", d: "Full-featured browser control from any device." },
    { n: 56, cat: "Control", t: "Textual TUI", d: "Fast, lightweight text UI for remote SSH management." },
    { n: 57, cat: "Control", t: "Multi-user sessions", d: "Concurrent workspaces with isolation." },
    { n: 58, cat: "Control", t: "SQLite backend", d: "Presets, chains, plugins, and config in one inspectable store." },
    { n: 59, cat: "Control", t: "Async DB ops", d: "aiosqlite keeps the event loop unblocked." },
    { n: 65, cat: "Control", t: "Health monitoring", d: "API and UI panels for live system status." },
    { n: 66, cat: "Control", t: "Service orchestration", d: "systemd manages startup, shutdown, dependencies." },
    { n: 67, cat: "Control", t: "Background metrics", d: "Performance daemon that never touches real-time threads." },
    { n: 68, cat: "Control", t: "Plugin discovery", d: "Auto-scans and registers LV2 plugins at startup." },
    { n: 69, cat: "Control", t: "LCD simulation mode", d: "Run the hardware UI in a terminal for testing." },
    { n: 70, cat: "Control", t: "Setup wizard", d: "CLI tool walks users through hardware configuration." },
    { n: 71, cat: "Control", t: "Python control plane", d: "Entire backend built on modern async Python." },
    { n: 72, cat: "Control", t: "Multi-platform clients", d: "Control from any modern browser on any OS." },

    { n: 73, cat: "Network", t: "Multi-node cluster", d: "Link multiple MAP2 units over the network to scale." },
    { n: 74, cat: "Network", t: "AVB support", d: "Deterministic, time-synced audio over standard Ethernet." },
    { n: 75, cat: "Network", t: "Digital snake", d: "Carry many audio channels over one Ethernet cable." },
    { n: 76, cat: "Network", t: "Distributed DSP", d: "Split a CPU-heavy chain across nodes in an AVB network." },
    { n: 77, cat: "Network", t: "Pro AVB interop", d: "Stream to and from third-party AVB gear." },
    { n: 78, cat: "Network", t: "gPTP sync", d: "Sub-microsecond clock sync across all cluster nodes." },
    { n: 79, cat: "Network", t: "AVDECC discovery", d: "Automatic discovery of AVB-capable devices." },
    { n: 80, cat: "Network", t: "AEM enumeration", d: "Queries and understands the capabilities of AVB peers." },
    { n: 81, cat: "Network", t: "AEM cache", d: "Caches discovery data to speed up startup." },
    { n: 82, cat: "Network", t: "Dual-mode networking", d: "IP-only control mode or full AVB streaming mode." },

    { n: 83, cat: "Deployment", t: "All-in-one mode", d: "Engine + backend + UI on one machine." },
    { n: 84, cat: "Deployment", t: "Dedicated audio node", d: "Engine only — minimum latency inside a cluster." },
    { n: 85, cat: "Deployment", t: "Dedicated control node", d: "Backend + UI only to operate a cluster." },
    { n: 86, cat: "Deployment", t: "High-availability", d: "Primary and standby nodes for critical rigs." },
    { n: 87, cat: "Deployment", t: "Automatic failover", d: "Orchestrator promotes a standby if a primary fails." },
    { n: 88, cat: "Deployment", t: "Intel I210/I225 NICs", d: "Works with professional-grade AVB network hardware." },
    { n: 89, cat: "Deployment", t: "ptp4l integration", d: "Standard Linux PTP daemon for network time sync." },
    { n: 91, cat: "Deployment", t: "Headless operation", d: "Runs without a connected display; managed remotely." },
    { n: 92, cat: "Deployment", t: "systemd services", d: "Deployed as robust, manageable production services." },
    { n: 93, cat: "Deployment", t: "Bare-metal target", d: "Designed for Fedora Linux with an RT kernel." },

    { n: 63, cat: "Workflow", t: "Cluster management", d: "One UI to control and monitor many MAP2 nodes." },
    { n: 64, cat: "Workflow", t: "Preset import/export", d: "Share and back up sounds as portable files." },
    { n: 90, cat: "Workflow", t: "JSON chain config", d: "Chains stored in human-readable, shareable format." },
    { n: 94, cat: "Workflow", t: "AVB roadmap", d: "Phased, documented plan for future connection management." },
    { n: 95, cat: "Workflow", t: "Service-oriented", d: "Components are independent, communicating services." },
    { n: 96, cat: "Workflow", t: "Asyncio event loop", d: "Modern Python async for high I/O throughput." },
    { n: 97, cat: "Workflow", t: "Scales 1→10+ nodes", d: "Architecture covers solo rigs through large clusters." },
    { n: 98, cat: "Workflow", t: "Extensible schema", d: "Database designed to grow with future features." },
    { n: 99, cat: "Workflow", t: "Hardware abstraction", d: "Code separated from specific hardware for flexibility." },
    { n: 100, cat: "Workflow", t: "Full documentation", d: "Architecture, features, and implementation covered." }
  ];

  const CATEGORIES = [
    { key: "All", label: "All" },
    { key: "Tone", label: "Tone & FX" },
    { key: "Routing", label: "Routing" },
    { key: "MIDI", label: "MIDI" },
    { key: "Hardware", label: "Hardware" },
    { key: "Engine", label: "Engine" },
    { key: "Control", label: "Control" },
    { key: "Network", label: "Network" },
    { key: "Deployment", label: "Deployment" },
    { key: "Workflow", label: "Workflow" }
  ];

  const grid = document.getElementById("features-grid");
  const search = document.getElementById("features-search");
  const chipsEl = document.getElementById("features-chips");
  const countEl = document.getElementById("features-count");

  let activeCat = "All";
  let query = "";

  if (chipsEl) {
    CATEGORIES.forEach((c) => {
      const b = document.createElement("button");
      b.className = "chip-btn";
      b.type = "button";
      b.textContent = c.label;
      b.dataset.active = c.key === activeCat ? "true" : "false";
      b.addEventListener("click", () => {
        activeCat = c.key;
        [...chipsEl.children].forEach((x) => (x.dataset.active = "false"));
        b.dataset.active = "true";
        render();
      });
      chipsEl.appendChild(b);
    });
  }

  if (search) {
    search.addEventListener("input", (e) => {
      query = e.target.value.trim().toLowerCase();
      render();
    });
  }

  function render() {
    if (!grid) return;
    const filtered = FEATURES
      .filter((f) => (activeCat === "All" ? true : f.cat === activeCat))
      .filter((f) => {
        if (!query) return true;
        return (
          f.t.toLowerCase().includes(query) ||
          f.d.toLowerCase().includes(query) ||
          f.cat.toLowerCase().includes(query)
        );
      })
      .sort((a, b) => a.n - b.n);

    grid.innerHTML = "";
    if (filtered.length === 0) {
      const el = document.createElement("div");
      el.className = "features__empty";
      el.textContent = "No matches — try a different filter or query.";
      grid.appendChild(el);
    } else {
      filtered.forEach((f) => {
        const el = document.createElement("article");
        el.className = "feature";
        el.innerHTML = `
          <div class="feature__head">
            <span class="feature__num">${String(f.n).padStart(3, "0")}</span>
            <span class="feature__cat">${f.cat}</span>
          </div>
          <h4></h4>
          <p></p>
        `;
        el.querySelector("h4").textContent = f.t;
        el.querySelector("p").textContent = f.d;
        grid.appendChild(el);
      });
    }
    if (countEl) {
      countEl.textContent = `${filtered.length} / ${FEATURES.length}`;
    }
  }

  render();

  /* Architecture hover */
  const layerDetails = {
    engine: {
      tag: "Layer 01 · Real-time",
      h: "JUCE / C++ audio engine",
      p: "Owns the real-time callback. DSP, plugin execution, signal-chain state, and device I/O live here — with memory locking, CPU isolation, and zero-allocation hot paths. This is where latency and signal integrity are decided.",
      chips: ["JUCE 8", "SCHED_FIFO", "Sub-3ms", "Zero-alloc", "PipeWire"]
    },
    control: {
      tag: "Layer 02 · Orchestration",
      h: "Python control plane",
      p: "FastAPI endpoints, WebSocket streams, and async services coordinate presets, chains, MIDI mapping, cluster topology, and device state — without ever touching the real-time thread.",
      chips: ["FastAPI", "asyncio", "WebSocket", "SQLite", "systemd"]
    },
    surface: {
      tag: "Layer 03 · Operator",
      h: "Remote + hardware surfaces",
      p: "A React web UI, a Textual TUI, the hardware LCDs, and external MIDI controllers all target the same inspectable state. You can run MAP2 from a browser, SSH, or a knob.",
      chips: ["React 18", "Textual TUI", "LCD UI", "MIDI learn"]
    },
    network: {
      tag: "Layer 04 · Fabric",
      h: "AVB cluster fabric",
      p: "gPTP, AVDECC, and AEM bring deterministic Ethernet audio to the platform. Split heavy DSP across nodes, run hot/standby pairs, or use MAP2 as a digital snake.",
      chips: ["IEEE 802.1AS", "AVTP", "AVDECC", "I210/I225", "ptp4l"]
    }
  };

  const layerBtns = document.querySelectorAll(".arch__layer");
  const archDetail = document.getElementById("arch-detail");

  function paintLayer(key) {
    const d = layerDetails[key];
    if (!d || !archDetail) return;
    archDetail.innerHTML = `
      <span class="eyebrow"></span>
      <h3></h3>
      <p style="color:var(--fg-muted);margin:0;font-size:.9375rem;line-height:1.6"></p>
      <div class="chips"></div>
    `;
    archDetail.querySelector(".eyebrow").textContent = d.tag;
    archDetail.querySelector("h3").textContent = d.h;
    archDetail.querySelector("p").textContent = d.p;
    const chipsWrap = archDetail.querySelector(".chips");
    d.chips.forEach((c) => {
      const s = document.createElement("span");
      s.className = "chip";
      s.textContent = c;
      chipsWrap.appendChild(s);
    });
    layerBtns.forEach((b) => (b.dataset.active = b.dataset.layer === key ? "true" : "false"));
  }

  layerBtns.forEach((b) => {
    b.addEventListener("mouseenter", () => paintLayer(b.dataset.layer));
    b.addEventListener("focus", () => paintLayer(b.dataset.layer));
    b.addEventListener("click", () => paintLayer(b.dataset.layer));
  });
  paintLayer("engine");

  /* Hero VU animation */
  const vuBars = document.querySelectorAll(".vu__bar-fill");
  const vuVals = document.querySelectorAll(".vu__val");
  if (vuBars.length) {
    let t = 0;
    setInterval(() => {
      t += 1;
      vuBars.forEach((bar, i) => {
        const base = 0.62 + Math.sin((t + i * 7) * 0.08) * 0.18 + (Math.random() - 0.5) * 0.06;
        const v = Math.max(0.3, Math.min(0.95, base));
        bar.style.width = (v * 100).toFixed(1) + "%";
        if (vuVals[i]) {
          const db = (-30 + v * 30).toFixed(1);
          vuVals[i].textContent = `${db > 0 ? "+" : ""}${db}`;
        }
      });
    }, 110);
  }
})();
