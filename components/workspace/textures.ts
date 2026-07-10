"use client";

import * as THREE from "three";

// Canvas-built screen/prop textures for the workspace scene.

function canvas(w: number, h: number) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  return { c, x: c.getContext("2d")! };
}

function tex(c: HTMLCanvasElement) {
  const t = new THREE.CanvasTexture(c);
  t.anisotropy = 4;
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

const CODE_COLORS = ["#7dd3fc", "#c084fc", "#34d399", "#f472b6", "#e2e8f0", "#64748b"];

/** Ultrawide monitor: editor + terminal panes full of code. */
export function makeCodeTexture(): THREE.CanvasTexture {
  const { c, x } = canvas(1536, 640);
  x.fillStyle = "#07090f";
  x.fillRect(0, 0, 1536, 640);

  // three panes
  const panes = [
    { px: 16, pw: 640 },
    { px: 672, pw: 480 },
    { px: 1168, pw: 352 },
  ];
  for (const { px, pw } of panes) {
    x.fillStyle = "#0b0e16";
    x.fillRect(px, 16, pw, 608);
    x.fillStyle = "#121722";
    x.fillRect(px, 16, pw, 28);
    // tab dots
    for (let i = 0; i < 3; i++) {
      x.fillStyle = ["#f87171", "#fbbf24", "#34d399"][i];
      x.beginPath();
      x.arc(px + 16 + i * 18, 30, 5, 0, Math.PI * 2);
      x.fill();
    }
    // code lines
    let y = 66;
    let seed = px;
    const rnd = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    while (y < 600) {
      const indent = Math.floor(rnd() * 4) * 18;
      let lx = px + 14 + indent;
      const segs = 1 + Math.floor(rnd() * 3);
      for (let s = 0; s < segs; s++) {
        const w = 30 + rnd() * (pw / segs - 60);
        x.fillStyle = CODE_COLORS[Math.floor(rnd() * CODE_COLORS.length)];
        x.globalAlpha = 0.75;
        x.fillRect(lx, y, w, 7);
        lx += w + 14;
      }
      x.globalAlpha = 1;
      y += 19;
    }
  }
  return tex(c);
}

/** Vertical monitor: GitHub profile — heatmap + language bars. */
export function makeGithubTexture(): THREE.CanvasTexture {
  const { c, x } = canvas(640, 1024);
  x.fillStyle = "#0a0d13";
  x.fillRect(0, 0, 640, 1024);

  x.fillStyle = "#e2e8f0";
  x.font = "bold 34px monospace";
  x.fillText("kaderfaeez-cmd", 40, 80);
  x.fillStyle = "#64748b";
  x.font = "22px monospace";
  x.fillText("github.com", 40, 116);

  // contribution heatmap
  x.fillStyle = "#94a3b8";
  x.font = "20px monospace";
  x.fillText("Contributions", 40, 190);
  let seed = 7;
  const rnd = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  const greens = ["#0e1a13", "#0e4429", "#006d32", "#26a641", "#39d353"];
  for (let col = 0; col < 26; col++) {
    for (let row = 0; row < 7; row++) {
      const v = rnd();
      const lvl = v < 0.3 ? 0 : v < 0.55 ? 1 : v < 0.75 ? 2 : v < 0.92 ? 3 : 4;
      x.fillStyle = greens[lvl];
      x.fillRect(40 + col * 22, 210 + row * 22, 18, 18);
    }
  }

  // repo list
  const repos = ["aegis", "autoapply", "vanta", "caliber", "stocksense", "sentinel", "akhals-recipes"];
  let y = 440;
  x.font = "24px monospace";
  for (const r of repos) {
    x.fillStyle = "#0f141d";
    x.fillRect(40, y - 30, 560, 46);
    x.fillStyle = "#7dd3fc";
    x.fillText(r, 56, y);
    x.fillStyle = "#334155";
    x.fillRect(500, y - 18, 80, 8);
    y += 62;
  }

  // language bar
  x.fillStyle = "#94a3b8";
  x.font = "20px monospace";
  x.fillText("Languages", 40, y + 20);
  const langs: Array<[string, number]> = [["#3178c6", 0.62], ["#f1e05a", 0.2], ["#178600", 0.12], ["#a97bff", 0.06]];
  let lx = 40;
  for (const [col, frac] of langs) {
    x.fillStyle = col;
    x.fillRect(lx, y + 40, 560 * frac, 16);
    lx += 560 * frac;
  }
  return tex(c);
}

/** Whiteboard: marker-scrawled about-me. */
export function makeWhiteboardTexture(): THREE.CanvasTexture {
  const { c, x } = canvas(1024, 704);
  x.fillStyle = "#eef0f2";
  x.fillRect(0, 0, 1024, 704);
  x.strokeStyle = "#d8dbe0";
  x.lineWidth = 3;
  x.strokeRect(8, 8, 1008, 688);

  x.fillStyle = "#1e293b";
  x.font = "bold 56px 'Comic Sans MS', cursive";
  x.fillText("ABOUT FAEEZ", 60, 100);
  x.strokeStyle = "#7c3aed";
  x.lineWidth = 5;
  x.beginPath();
  x.moveTo(58, 118);
  x.lineTo(460, 122);
  x.stroke();

  x.font = "34px 'Comic Sans MS', cursive";
  const lines = [
    ["• CS student @ Varsity College", "#1e293b"],
    ["• led a team of 6 (retail ops)", "#1e293b"],
    ["• builds: web + AI + security", "#0e7490"],
    ["• ships something every day", "#0e7490"],
    ["• Gauteng, South Africa", "#64748b"],
  ] as const;
  let y = 200;
  for (const [t, col] of lines) {
    x.fillStyle = col;
    x.fillText(t, 70, y);
    y += 72;
  }

  // doodle arrow + box
  x.strokeStyle = "#dc2626";
  x.lineWidth = 4;
  x.strokeRect(640, 480, 320, 130);
  x.fillStyle = "#dc2626";
  x.font = "30px 'Comic Sans MS', cursive";
  x.fillText("hire this guy →", 668, 556);
  return tex(c);
}

/** Certificate plaque. */
export function makeCertTexture(title: string, issuer: string, status: string): THREE.CanvasTexture {
  const { c, x } = canvas(512, 640);
  x.fillStyle = "#f5f1e6";
  x.fillRect(0, 0, 512, 640);
  x.strokeStyle = "#b8a56f";
  x.lineWidth = 10;
  x.strokeRect(20, 20, 472, 600);
  x.strokeStyle = "#d8caa2";
  x.lineWidth = 3;
  x.strokeRect(38, 38, 436, 564);

  x.fillStyle = "#8a7433";
  x.font = "bold 26px Georgia";
  x.textAlign = "center";
  x.fillText("CERTIFICATE", 256, 120);
  x.fillStyle = "#1f2937";
  x.font = "bold 30px Georgia";
  const words = title.split(" ");
  let line = "";
  let y = 240;
  for (const w of words) {
    if ((line + w).length > 18) {
      x.fillText(line.trim(), 256, y);
      y += 42;
      line = "";
    }
    line += w + " ";
  }
  x.fillText(line.trim(), 256, y);
  x.fillStyle = "#6b7280";
  x.font = "24px Georgia";
  x.fillText(issuer, 256, y + 80);
  x.fillStyle = "#0e7490";
  x.font = "italic 24px Georgia";
  x.fillText(status, 256, y + 140);
  return tex(c);
}

/** RGB keyboard top-down. */
export function makeKeyboardTexture(): THREE.CanvasTexture {
  const { c, x } = canvas(512, 192);
  x.fillStyle = "#0c0e13";
  x.fillRect(0, 0, 512, 192);
  let seed = 3;
  const rnd = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 14; col++) {
      const hue = (col * 22 + row * 30) % 360;
      x.fillStyle = `hsl(${hue}, 85%, ${52 + rnd() * 10}%)`;
      x.fillRect(10 + col * 35.5, 12 + row * 35, 29, 28);
      x.fillStyle = "#0c0e13";
      x.fillRect(12 + col * 35.5, 14 + row * 35, 25, 24);
      x.fillStyle = `hsla(${hue}, 85%, 65%, 0.5)`;
      x.fillRect(12 + col * 35.5, 14 + row * 35, 25, 24);
    }
  }
  return tex(c);
}
