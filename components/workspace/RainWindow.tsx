"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/** Window glass with animated rain streaks running down it. */
export default function RainWindow({
  position,
  size,
}: {
  position: [number, number, number];
  size: [number, number];
}) {
  const mat = useRef<THREE.ShaderMaterial>(null);

  useFrame((state) => {
    if (mat.current) mat.current.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <mesh position={position}>
      <planeGeometry args={size} />
      <shaderMaterial
        ref={mat}
        transparent
        depthWrite={false}
        uniforms={{ uTime: { value: 0 } }}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          varying vec2 vUv;
          uniform float uTime;

          float hash(float n) { return fract(sin(n) * 43758.5453); }

          float streaks(vec2 uv, float t, float cols, float speedBase) {
            vec2 g = vec2(uv.x * cols, uv.y);
            float col = floor(g.x);
            float fx = fract(g.x);
            float h = hash(col * 7.13);
            if (h < 0.45) return 0.0;               // some columns dry
            float speed = speedBase * (0.5 + hash(col * 3.7));
            float y = fract(uv.y * 1.4 + t * speed + hash(col * 13.7));
            float drop = smoothstep(0.0, 0.06, y) * smoothstep(0.28, 0.06, y);
            float core = smoothstep(0.42, 0.5, fx) * smoothstep(0.58, 0.5, fx);
            return drop * core;
          }

          void main() {
            float t = uTime;
            float r = 0.0;
            r += streaks(vUv, t, 46.0, 0.22) * 0.9;
            r += streaks(vUv + vec2(0.37, 0.11), t, 78.0, 0.35) * 0.55;
            // faint static droplets
            vec2 cell = floor(vUv * vec2(60.0, 34.0));
            float d = hash(cell.x * 17.0 + cell.y * 91.0);
            float dot_ = step(0.965, d) * 0.35;
            float a = clamp(r * 0.5 + dot_ * 0.4, 0.0, 0.6);
            // glass base tint
            vec3 col = vec3(0.62, 0.78, 0.92);
            gl_FragColor = vec4(col, a * 0.55 + 0.035);
          }
        `}
      />
    </mesh>
  );
}
