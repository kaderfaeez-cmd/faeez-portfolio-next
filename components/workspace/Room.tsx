"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshReflectorMaterial, useTexture } from "@react-three/drei";
import * as THREE from "three";
import {
  makeCodeTexture,
  makeGithubTexture,
  makeWhiteboardTexture,
  makeCertTexture,
  makeKeyboardTexture,
} from "./textures";
import RainWindow from "./RainWindow";

export type Boot = { t: number };

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/* ---------- PC tower with spinning RGB fans ---------- */
function Tower({ boot }: { boot: React.MutableRefObject<Boot> }) {
  const fans = useRef<THREE.Group[]>([]);
  const ringMats = useRef<THREE.MeshStandardMaterial[]>([]);
  const ledMat = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state, delta) => {
    const t = boot.current.t;
    const spin = clamp01((t - 2.5) / 1.5);
    for (const f of fans.current) if (f) f.rotation.z += delta * spin * 14;
    const glow = clamp01((t - 1.5) / 1);
    ringMats.current.forEach((m, i) => {
      if (m) {
        const pulse = 1 + Math.sin(state.clock.elapsedTime * 2 + i) * 0.25;
        m.emissiveIntensity = glow * 2.4 * pulse;
      }
    });
    if (ledMat.current) ledMat.current.emissiveIntensity = t > 1 ? 3 : 0;
  });

  const fanPos: Array<[number, number, number]> = [
    [0, 0.14, 0.231],
    [0, 0.41, 0.231],
    [-0.181, 0.14, 0],
    [-0.181, 0.41, 0],
  ];
  const fanRot: Array<[number, number, number]> = [
    [0, 0, 0],
    [0, 0, 0],
    [0, Math.PI / 2, 0],
    [0, Math.PI / 2, 0],
  ];

  return (
    <group position={[1.05, 0.76, -2.35]}>
      {/* case */}
      <mesh position={[0, 0.275, 0]}>
        <boxGeometry args={[0.36, 0.55, 0.46]} />
        <meshStandardMaterial color="#0a0b0f" roughness={0.35} metalness={0.7} />
      </mesh>
      {/* glass side */}
      <mesh position={[0.181, 0.275, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[0.44, 0.53]} />
        <meshPhysicalMaterial color="#88aacc" transparent opacity={0.12} roughness={0.05} metalness={0.2} />
      </mesh>
      {/* fans */}
      {fanPos.map((p, i) => (
        <group key={i} position={p} rotation={fanRot[i]}>
          <mesh>
            <torusGeometry args={[0.075, 0.012, 10, 32]} />
            <meshStandardMaterial
              ref={(m) => {
                if (m) ringMats.current[i] = m;
              }}
              color="#0a0b0f"
              emissive={i % 2 ? "#22d3ee" : "#a855f7"}
              emissiveIntensity={0}
              toneMapped={false}
            />
          </mesh>
          <group
            ref={(g) => {
              if (g) fans.current[i] = g;
            }}
          >
            {[0, 1, 2, 3, 4].map((b) => (
              <mesh key={b} rotation={[0, 0, (b / 5) * Math.PI * 2]} position={[0, 0, 0]}>
                <boxGeometry args={[0.012, 0.13, 0.006]} />
                <meshStandardMaterial color="#15161c" roughness={0.6} />
              </mesh>
            ))}
          </group>
        </group>
      ))}
      {/* power LED */}
      <mesh position={[0.1, 0.56, 0.2]}>
        <boxGeometry args={[0.02, 0.006, 0.02]} />
        <meshStandardMaterial ref={ledMat} color="#111" emissive="#34d399" emissiveIntensity={0} toneMapped={false} />
      </mesh>
    </group>
  );
}

/* ---------- Monitors ---------- */
function Screens({ boot }: { boot: React.MutableRefObject<Boot> }) {
  const codeTex = useMemo(() => makeCodeTexture(), []);
  const ghTex = useMemo(() => makeGithubTexture(), []);
  const m1 = useRef<THREE.MeshBasicMaterial>(null);
  const m2 = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((state) => {
    const t = boot.current.t;
    const on = clamp01((t - 3.5) / 0.8);
    // flicker as they come alive
    const fl = on < 1 ? (Math.sin(state.clock.elapsedTime * 47) > -0.4 ? on : on * 0.25) : 1;
    if (m1.current) m1.current.opacity = fl;
    if (m2.current) m2.current.opacity = clamp01(fl - 0.15);
  });

  return (
    <group>
      {/* ultrawide */}
      <group position={[-0.35, 1.18, -2.5]} rotation={[-0.04, 0, 0]}>
        <mesh>
          <boxGeometry args={[1.78, 0.78, 0.045]} />
          <meshStandardMaterial color="#0a0b0e" roughness={0.4} metalness={0.5} />
        </mesh>
        <mesh position={[0, 0, 0.026]}>
          <planeGeometry args={[1.7, 0.7]} />
          <meshBasicMaterial ref={m1} map={codeTex} transparent opacity={0} toneMapped={false} />
        </mesh>
        <mesh position={[0, -0.5, 0.1]}>
          <boxGeometry args={[0.3, 0.26, 0.18]} />
          <meshStandardMaterial color="#0d0e12" roughness={0.5} metalness={0.4} />
        </mesh>
      </group>
      {/* vertical */}
      <group position={[0.62, 1.22, -2.48]} rotation={[0, -0.18, 0]}>
        <mesh>
          <boxGeometry args={[0.5, 0.86, 0.04]} />
          <meshStandardMaterial color="#0a0b0e" roughness={0.4} metalness={0.5} />
        </mesh>
        <mesh position={[0, 0, 0.024]}>
          <planeGeometry args={[0.46, 0.8]} />
          <meshBasicMaterial ref={m2} map={ghTex} transparent opacity={0} toneMapped={false} />
        </mesh>
        <mesh position={[0, -0.52, 0.08]}>
          <boxGeometry args={[0.2, 0.2, 0.14]} />
          <meshStandardMaterial color="#0d0e12" roughness={0.5} />
        </mesh>
      </group>
    </group>
  );
}

/* ---------- LED strips ---------- */
function Strips({ boot }: { boot: React.MutableRefObject<Boot> }) {
  const mats = useRef<THREE.MeshStandardMaterial[]>([]);
  useFrame((state) => {
    const glow = clamp01((boot.current.t - 1.5) / 1);
    mats.current.forEach((m, i) => {
      if (m) m.emissiveIntensity = glow * (2.2 + Math.sin(state.clock.elapsedTime * 1.5 + i * 2) * 0.5);
    });
  });
  const strip = (key: number, pos: [number, number, number], size: [number, number, number], color: string) => (
    <mesh key={key} position={pos}>
      <boxGeometry args={size} />
      <meshStandardMaterial
        ref={(m) => {
          if (m) mats.current[key] = m;
        }}
        color="#0a0a0a"
        emissive={color}
        emissiveIntensity={0}
        toneMapped={false}
      />
    </mesh>
  );
  return (
    <group>
      {strip(0, [0, 0.72, -1.82], [2.8, 0.015, 0.015], "#7c3aed")}
      {strip(1, [-2.2, 1.62, -2.0], [0.015, 0.015, 1.9], "#22d3ee")}
      {strip(2, [-2.2, 2.02, -2.0], [0.015, 0.015, 1.9], "#7c3aed")}
      {strip(3, [0, 2.62, -2.97], [4.6, 0.02, 0.02], "#4f7cff")}
    </group>
  );
}

/* ---------- Server rack ---------- */
function Rack() {
  const leds = useRef<THREE.MeshStandardMaterial[]>([]);
  useFrame((state) => {
    leds.current.forEach((m, i) => {
      if (m) m.emissiveIntensity = Math.sin(state.clock.elapsedTime * (3 + (i % 5)) + i * 7) > 0.2 ? 2.5 : 0.2;
    });
  });
  return (
    <group position={[-2.45, 0, -2.3]}>
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[0.55, 1.6, 0.6]} />
        <meshStandardMaterial color="#0b0c10" roughness={0.4} metalness={0.6} />
      </mesh>
      {[0, 1, 2, 3, 4].map((row) => (
        <group key={row}>
          <mesh position={[0, 0.35 + row * 0.26, 0.301]}>
            <planeGeometry args={[0.48, 0.16]} />
            <meshStandardMaterial color="#14161c" roughness={0.5} />
          </mesh>
          {[0, 1, 2].map((l) => (
            <mesh key={l} position={[-0.15 + l * 0.09, 0.35 + row * 0.26, 0.305]}>
              <circleGeometry args={[0.011, 8]} />
              <meshStandardMaterial
                ref={(m) => {
                  if (m) leds.current[row * 3 + l] = m;
                }}
                color="#111"
                emissive={l === 2 ? "#34d399" : "#22d3ee"}
                emissiveIntensity={0.2}
                toneMapped={false}
              />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

/* ---------- Static furnishings ---------- */
function Furnishings() {
  const kbTex = useMemo(() => makeKeyboardTexture(), []);
  const wbTex = useMemo(() => makeWhiteboardTexture(), []);
  const certs = useMemo(
    () => [
      makeCertTexture("Responsive Web Design", "freeCodeCamp", "In Progress"),
      makeCertTexture("JS Algorithms & Data Structures", "freeCodeCamp", "Pursuing"),
      makeCertTexture("Generative AI Fundamentals", "Self-directed", "In Progress"),
    ],
    []
  );
  const bookCols = ["#2563eb", "#7c3aed", "#0e7490", "#b45309", "#166534", "#9f1239", "#334155", "#4338ca", "#0f766e"];

  return (
    <group>
      {/* desk */}
      <mesh position={[0, 0.735, -2.2]}>
        <boxGeometry args={[3.0, 0.05, 0.85]} />
        <meshStandardMaterial color="#241a12" roughness={0.55} metalness={0.1} />
      </mesh>
      {[-1.4, 1.4].map((dx) => (
        <mesh key={dx} position={[dx, 0.36, -2.2]}>
          <boxGeometry args={[0.06, 0.72, 0.75]} />
          <meshStandardMaterial color="#101114" roughness={0.5} metalness={0.6} />
        </mesh>
      ))}
      {/* keyboard */}
      <mesh position={[-0.35, 0.766, -1.95]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.62, 0.22]} />
        <meshBasicMaterial map={kbTex} toneMapped={false} />
      </mesh>
      {/* mouse + pad */}
      <mesh position={[0.25, 0.765, -1.95]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.28, 0.24]} />
        <meshStandardMaterial color="#111318" roughness={0.9} />
      </mesh>
      <mesh position={[0.25, 0.785, -1.95]}>
        <capsuleGeometry args={[0.028, 0.05, 4, 12]} />
        <meshStandardMaterial color="#16181d" roughness={0.35} />
      </mesh>
      {/* mug */}
      <mesh position={[-0.95, 0.82, -1.95]}>
        <cylinderGeometry args={[0.05, 0.045, 0.12, 20]} />
        <meshStandardMaterial color="#7c2d12" roughness={0.4} />
      </mesh>
      {/* whiteboard (right wall) */}
      <group position={[2.97, 1.65, -1.2]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh>
          <boxGeometry args={[1.7, 1.15, 0.04]} />
          <meshStandardMaterial color="#c8ccd2" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0, 0.025]}>
          <planeGeometry args={[1.6, 1.05]} />
          <meshBasicMaterial map={wbTex} />
        </mesh>
      </group>
      {/* certificates (right wall, nearer window) */}
      {certs.map((t, i) => (
        <group key={i} position={[2.97, 1.75, -2.45 + i * 0.62]} rotation={[0, -Math.PI / 2, 0]}>
          <mesh>
            <boxGeometry args={[0.46, 0.56, 0.03]} />
            <meshStandardMaterial color="#3d2f1a" roughness={0.5} />
          </mesh>
          <mesh position={[0, 0, 0.02]}>
            <planeGeometry args={[0.4, 0.5]} />
            <meshBasicMaterial map={t} />
          </mesh>
        </group>
      ))}
      {/* shelves + books (left wall) */}
      {[1.55, 2.0].map((sy, si) => (
        <group key={sy}>
          <mesh position={[-2.9, sy, -1.6]}>
            <boxGeometry args={[0.28, 0.035, 1.7]} />
            <meshStandardMaterial color="#241a12" roughness={0.55} />
          </mesh>
          {bookCols.slice(si * 4, si * 4 + 5).map((col, bi) => {
            const h = 0.2 + ((bi * 37) % 10) / 100;
            return (
              <mesh key={bi} position={[-2.9, sy + 0.02 + h / 2, -2.25 + bi * 0.16 + si * 0.05]}>
                <boxGeometry args={[0.16, h, 0.045]} />
                <meshStandardMaterial color={col} roughness={0.7} />
              </mesh>
            );
          })}
        </group>
      ))}
      {/* chair silhouette */}
      <group position={[-0.2, 0, -1.15]} rotation={[0, 0.5, 0]}>
        <mesh position={[0, 0.46, 0]}>
          <boxGeometry args={[0.5, 0.07, 0.48]} />
          <meshStandardMaterial color="#0d0e12" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.85, -0.22]} rotation={[0.12, 0, 0]}>
          <boxGeometry args={[0.48, 0.75, 0.07]} />
          <meshStandardMaterial color="#0d0e12" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.45, 8]} />
          <meshStandardMaterial color="#16181d" metalness={0.7} roughness={0.3} />
        </mesh>
      </group>
    </group>
  );
}

/* ---------- Room shell + window + city ---------- */
function Shell() {
  const city = useTexture("/workspace/city.jpg");
  city.colorSpace = THREE.SRGBColorSpace;

  return (
    <group>
      {/* floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -0.5]}>
        <planeGeometry args={[6.2, 7]} />
        <MeshReflectorMaterial
          blur={[280, 80]}
          resolution={768}
          mixBlur={0.9}
          mixStrength={2.2}
          roughness={0.75}
          depthScale={1.1}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.3}
          color="#0a0b0f"
          metalness={0.5}
          mirror={0.4}
        />
      </mesh>
      {/* ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 3, -0.5]}>
        <planeGeometry args={[6.2, 7]} />
        <meshStandardMaterial color="#07080b" roughness={0.9} />
      </mesh>
      {/* side walls */}
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-3.1, 1.5, -0.5]}>
        <planeGeometry args={[7, 3]} />
        <meshStandardMaterial color="#0c0d12" roughness={0.85} />
      </mesh>
      <mesh rotation={[0, -Math.PI / 2, 0]} position={[3.1, 1.5, -0.5]}>
        <planeGeometry args={[7, 3]} />
        <meshStandardMaterial color="#0c0d12" roughness={0.85} />
      </mesh>
      {/* back wall pieces around window opening (window: x -1.9..1.9, y 0.85..2.65) */}
      <mesh position={[-2.5, 1.5, -3]}>
        <planeGeometry args={[1.2, 3]} />
        <meshStandardMaterial color="#0c0d12" roughness={0.85} />
      </mesh>
      <mesh position={[2.5, 1.5, -3]}>
        <planeGeometry args={[1.2, 3]} />
        <meshStandardMaterial color="#0c0d12" roughness={0.85} />
      </mesh>
      <mesh position={[0, 0.425, -3]}>
        <planeGeometry args={[3.8, 0.85]} />
        <meshStandardMaterial color="#0c0d12" roughness={0.85} />
      </mesh>
      <mesh position={[0, 2.825, -3]}>
        <planeGeometry args={[3.8, 0.35]} />
        <meshStandardMaterial color="#0c0d12" roughness={0.85} />
      </mesh>
      {/* front wall behind camera */}
      <mesh position={[0, 1.5, 3]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[6.2, 3]} />
        <meshStandardMaterial color="#0a0b0f" roughness={0.9} />
      </mesh>
      {/* window frame */}
      {[
        { p: [0, 0.85, -3] as const, s: [3.9, 0.08, 0.12] as const },
        { p: [0, 2.65, -3] as const, s: [3.9, 0.08, 0.12] as const },
        { p: [-1.9, 1.75, -3] as const, s: [0.08, 1.9, 0.12] as const },
        { p: [1.9, 1.75, -3] as const, s: [0.08, 1.9, 0.12] as const },
        { p: [0, 1.75, -3] as const, s: [0.05, 1.9, 0.08] as const },
      ].map((f, i) => (
        <mesh key={i} position={f.p as unknown as [number, number, number]}>
          <boxGeometry args={f.s as unknown as [number, number, number]} />
          <meshStandardMaterial color="#101116" roughness={0.4} metalness={0.6} />
        </mesh>
      ))}
      {/* rain glass */}
      <RainWindow position={[0, 1.75, -3.02]} size={[3.8, 1.8]} />
      {/* city backdrop */}
      <mesh position={[0, 1.9, -7.5]}>
        <planeGeometry args={[16, 6.8]} />
        <meshBasicMaterial map={city} toneMapped={false} />
      </mesh>
    </group>
  );
}

export default function Room({ boot }: { boot: React.MutableRefObject<Boot> }) {
  return (
    <group>
      <Shell />
      <Furnishings />
      <Screens boot={boot} />
      <Tower boot={boot} />
      <Strips boot={boot} />
      <Rack />
    </group>
  );
}
