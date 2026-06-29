"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, Float, MeshDistortMaterial, Grid } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

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

function Particles({ count = 1400 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 9;
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(p) * Math.cos(t);
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = r * Math.sin(p) * Math.sin(t);
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.03;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#7dd3fc"
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Crystal() {
  const group = useRef<THREE.Group>(null);
  const wire = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.15;
      group.current.rotation.x += (pointer.y * 0.25 - group.current.rotation.x) * 0.04;
      group.current.rotation.z += (pointer.x * 0.18 - group.current.rotation.z) * 0.04;
    }
    if (wire.current) wire.current.rotation.y -= delta * 0.08;
    state.camera.position.x += (pointer.x * 0.4 - state.camera.position.x) * 0.03;
    state.camera.position.y += (pointer.y * 0.3 - state.camera.position.y) * 0.03;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={group}>
      <Float speed={1.4} rotationIntensity={0.4} floatIntensity={1.2}>
        <mesh>
          <icosahedronGeometry args={[1.35, 64]} />
          <MeshDistortMaterial
            color="#0b0b14"
            metalness={0.95}
            roughness={0.12}
            envMapIntensity={1.4}
            distort={0.32}
            speed={1.6}
          />
        </mesh>
        <mesh ref={wire} scale={1.55}>
          <icosahedronGeometry args={[1.35, 2]} />
          <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.18} />
        </mesh>
      </Float>
    </group>
  );
}

export default function HeroScene({ quality = "high" }: { quality?: "high" | "low" }) {
  const isLow = quality === "low";
  return (
    <Canvas
      dpr={isLow ? [1, 1.3] : [1, 1.8]}
      camera={{ position: [0, 0, 5.2], fov: 42 }}
      gl={{ antialias: !isLow, alpha: true, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#050507"]} />
      <fog attach="fog" args={["#050507", 8, 18]} />
      <ambientLight intensity={0.35} />
      <pointLight position={[4, 3, 4]} intensity={30} color="#22d3ee" />
      <pointLight position={[-4, -2, -2]} intensity={24} color="#a855f7" />

      <Crystal />
      <Particles count={isLow ? 600 : 1400} />

      <group position={[0, -2.4, 0]} rotation={[0, 0, 0]}>
        <Grid
          args={[30, 30]}
          cellSize={0.6}
          cellThickness={0.6}
          cellColor="#16203a"
          sectionSize={3}
          sectionThickness={1}
          sectionColor="#22d3ee"
          fadeDistance={22}
          fadeStrength={1.4}
          infiniteGrid
        />
      </group>

      <Environment resolution={isLow ? 128 : 256}>
        <group rotation={[-Math.PI / 3, 0, 0]}>
          <Lightformer intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[12, 12, 1]} />
          <Lightformer intensity={3} color="#22d3ee" rotation-y={Math.PI / 2} position={[-6, 1, 0]} scale={[10, 3, 1]} />
          <Lightformer intensity={3} color="#a855f7" rotation-y={-Math.PI / 2} position={[6, 2, 0]} scale={[10, 3, 1]} />
        </group>
      </Environment>

      {!isLow && (
        <EffectComposer>
          <Bloom intensity={0.9} luminanceThreshold={0.25} luminanceSmoothing={0.5} mipmapBlur radius={0.7} />
          <Vignette eskil={false} offset={0.25} darkness={0.85} />
        </EffectComposer>
      )}
    </Canvas>
  );
}
