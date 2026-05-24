"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import * as THREE from "three";

/**
 * TerrainGrid — animated wireframe terrain that subtly tracks pointer.
 * Symbolic of "land" / topographic legal jurisdiction.
 */
function TerrainGrid() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport, pointer } = useThree();

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(28, 16, 80, 48);
    return geo;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const geo = meshRef.current?.geometry as THREE.PlaneGeometry | undefined;
    if (!geo) return;
    const pos = geo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const wave =
        Math.sin(x * 0.4 + t * 0.7) * 0.35 +
        Math.cos(y * 0.5 + t * 0.55) * 0.35 +
        Math.sin((x + y) * 0.3 + t * 0.4) * 0.15;
      pos.setZ(i, wave);
    }
    pos.needsUpdate = true;

    if (meshRef.current) {
      // Cursor-tracking parallax — gentle tilt
      const tx = (pointer.x * viewport.width) / 14;
      const ty = (pointer.y * viewport.height) / 14;
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        -1.0 + ty * 0.08,
        0.05
      );
      meshRef.current.rotation.z = THREE.MathUtils.lerp(
        meshRef.current.rotation.z,
        tx * 0.05,
        0.05
      );
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={[0, -1.5, 0]}
      rotation={[-1.0, 0, 0]}
      geometry={geometry}
    >
      <meshBasicMaterial
        color="#D4AF37"
        wireframe
        transparent
        opacity={0.55}
      />
    </mesh>
  );
}

/**
 * SubtleScale — floating "balance" glyph (two thin gold rings + a vertical pillar)
 * Abstract reference to Scales of Justice without being literal.
 */
function FloatingMonolith() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t * 0.15;
  });
  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.6}>
      <group ref={ref} position={[0, 1.6, -2]}>
        {/* vertical pillar */}
        <mesh>
          <cylinderGeometry args={[0.04, 0.04, 3.4, 24]} />
          <meshStandardMaterial
            color="#D4AF37"
            emissive="#D4AF37"
            emissiveIntensity={0.6}
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
        {/* top crossbar */}
        <mesh position={[0, 1.5, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.03, 0.03, 2.6, 24]} />
          <meshStandardMaterial
            color="#D4AF37"
            emissive="#D4AF37"
            emissiveIntensity={0.5}
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
        {/* left ring */}
        <mesh position={[-1.3, 0.9, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.38, 0.018, 16, 64]} />
          <meshStandardMaterial
            color="#E6C965"
            emissive="#D4AF37"
            emissiveIntensity={0.45}
            metalness={1}
            roughness={0.15}
          />
        </mesh>
        {/* right ring */}
        <mesh position={[1.3, 0.9, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.38, 0.018, 16, 64]} />
          <meshStandardMaterial
            color="#E6C965"
            emissive="#D4AF37"
            emissiveIntensity={0.45}
            metalness={1}
            roughness={0.15}
          />
        </mesh>
        {/* top finial */}
        <mesh position={[0, 1.85, 0]}>
          <sphereGeometry args={[0.1, 32, 32]} />
          <meshStandardMaterial
            color="#FFE9A8"
            emissive="#D4AF37"
            emissiveIntensity={1}
            metalness={1}
            roughness={0.1}
          />
        </mesh>
      </group>
    </Float>
  );
}

function GoldParticles() {
  const ref = useRef<THREE.Points>(null);
  const count = 220;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 26;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
    }
    return arr;
  }, []);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t * 0.02;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#D4AF37"
        size={0.025}
        sizeAttenuation
        transparent
        opacity={0.7}
      />
    </points>
  );
}

export default function TerrainScene() {
  return (
    <Canvas
      className="!absolute inset-0"
      camera={{ position: [0, 2.2, 7.5], fov: 50 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={["#02100c"]} />
      <fog attach="fog" args={["#02100c", 8, 18]} />

      <ambientLight intensity={0.4} />
      <pointLight position={[0, 4, 4]} intensity={1.4} color="#D4AF37" />
      <pointLight position={[-6, -2, 2]} intensity={0.8} color="#0b3d2e" />

      <TerrainGrid />
      <FloatingMonolith />
      <GoldParticles />
      <Stars
        radius={40}
        depth={40}
        count={1200}
        factor={2}
        saturation={0}
        fade
        speed={0.4}
      />
    </Canvas>
  );
}
