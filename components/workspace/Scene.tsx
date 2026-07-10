"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import Room, { type Boot } from "./Room";

const pointer = { x: 0, y: 0 };
if (typeof window !== "undefined") {
  window.addEventListener(
    "pointermove",
    (e) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    },
    { passive: true }
  );
}

const easeOut = (p: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, p)), 3);

function Rig({ boot, started }: { boot: React.MutableRefObject<Boot>; started: React.MutableRefObject<boolean> }) {
  const { camera } = useThree();
  const look = useRef(new THREE.Vector3(0, 1.25, -2.4));
  const t0 = useRef(-1);

  useFrame((state) => {
    if (!started.current) return;
    if (t0.current < 0) t0.current = state.clock.elapsedTime;
    const t = state.clock.elapsedTime - t0.current;
    boot.current.t = t;

    // fly-in: glide from window side down to desk view over 4.5s
    const p = easeOut(t / 4.5);
    const from = new THREE.Vector3(0.9, 2.1, -1.3);
    const to = new THREE.Vector3(0, 1.42, 0.9);
    const base = from.clone().lerp(to, p);

    // mouse parallax after arrival
    const par = easeOut((t - 4) / 1.5);
    base.x += pointer.x * 0.22 * par;
    base.y += pointer.y * 0.12 * par;

    camera.position.copy(base);
    const lookTarget = look.current.clone();
    lookTarget.x += pointer.x * 0.35 * par;
    lookTarget.y += pointer.y * 0.2 * par;
    camera.lookAt(lookTarget);
  });
  return null;
}

export default function Scene({ started }: { started: React.MutableRefObject<boolean> }) {
  const boot = useRef<Boot>({ t: 0 });

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0.9, 2.1, -1.3], fov: 55 }}
      gl={{ antialias: true, powerPreference: "high-performance", preserveDrawingBuffer: true }}
      onCreated={({ scene, camera }) => {
        (window as unknown as Record<string, unknown>).__wsScene = scene;
        (window as unknown as Record<string, unknown>).__wsCam = camera;
      }}
    >
      <color attach="background" args={["#05060a"]} />
      <fog attach="fog" args={["#05060a", 5, 13]} />

      <ambientLight intensity={0.12} />
      {/* city glow through window */}
      <directionalLight position={[0, 2, -6]} intensity={0.5} color="#5b7fd4" />
      {/* warm desk key */}
      <pointLight position={[0, 1.6, -1.6]} intensity={2.2} color="#8a76ff" distance={5} decay={2} />
      <pointLight position={[1.05, 1.2, -2.1]} intensity={1.4} color="#22d3ee" distance={3} decay={2} />
      <pointLight position={[-2.2, 1.9, -1.9]} intensity={0.8} color="#7c3aed" distance={4} decay={2} />

      <Suspense fallback={null}>
        <Room boot={boot} />
      </Suspense>
      <Rig boot={boot} started={started} />

      <EffectComposer>
        <Bloom intensity={1.1} luminanceThreshold={0.32} luminanceSmoothing={0.6} mipmapBlur radius={0.75} />
        <Vignette eskil={false} offset={0.22} darkness={0.9} />
      </EffectComposer>
    </Canvas>
  );
}
