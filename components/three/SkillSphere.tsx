"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

const ptr = { x: 0, y: 0 };
if (typeof window !== "undefined") {
  window.addEventListener(
    "pointermove",
    (e) => {
      ptr.x = (e.clientX / window.innerWidth) * 2 - 1;
      ptr.y = -((e.clientY / window.innerHeight) * 2 - 1);
    },
    { passive: true }
  );
}

function Field({ count = 520, radius = 2 }: { count?: number; radius?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    const phi = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const th = phi * i;
      arr[i * 3] = Math.cos(th) * r * radius;
      arr[i * 3 + 1] = y * radius;
      arr[i * 3 + 2] = Math.sin(th) * r * radius;
    }
    return arr;
  }, [count, radius]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.14;
    ref.current.rotation.x += (ptr.y * 0.25 - ref.current.rotation.x) * 0.04;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#22d3ee"
        transparent
        opacity={0.9}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Core() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.y -= d * 0.1;
  });
  return (
    <Float speed={1.2} rotationIntensity={0.5} floatIntensity={0.8}>
      <mesh ref={ref} scale={1.35}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#a855f7" wireframe transparent opacity={0.22} />
      </mesh>
    </Float>
  );
}

export default function SkillSphere() {
  return (
    <Canvas dpr={[1, 1.6]} camera={{ position: [0, 0, 5], fov: 45 }} gl={{ alpha: true }}>
      <ambientLight intensity={0.6} />
      <Field />
      <Core />
    </Canvas>
  );
}
