"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { 
  Float, 
  ContactShadows, 
  Environment, 
  Text,
  PerspectiveCamera,
  Stars
} from "@react-three/drei";
import * as THREE from "three";

type SceneMode = "sales" | "logic" | "learning" | "developer" | "future";

interface AvatarProps {
  mode: SceneMode;
}

function HumanoidAvatar({ mode }: AvatarProps) {
  const group = useRef<THREE.Group>(null);
  const head = useRef<THREE.Mesh>(null);
  const leftArm = useRef<THREE.Group>(null);
  const rightArm = useRef<THREE.Group>(null);
  const leftLeg = useRef<THREE.Group>(null);
  const rightLeg = useRef<THREE.Group>(null);

  // Character Colors
  const skinColor = "#8d5524"; // Medium skin tone
  const hairColor = "#0a0a0a";
  const shirtColor = "#2d2d2d";
  const pantColor = "#1a1a1a";

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (!group.current) return;

    // Base Idle / Breathing
    group.current.position.y = Math.sin(t * 1.5) * 0.02;
    
    // Head tilt (tracking cursor slightly)
    if (head.current) {
      head.current.rotation.y = THREE.MathUtils.lerp(head.current.rotation.y, (state.pointer.x * Math.PI) / 10, 0.1);
      head.current.rotation.x = THREE.MathUtils.lerp(head.current.rotation.x, (state.pointer.y * Math.PI) / 10, 0.1);
    }

    // Animation Logic per Mode
    switch (mode) {
      case "sales":
        // Standing and gesturing
        if (leftArm.current) {
          leftArm.current.rotation.x = -Math.PI / 4 + Math.sin(t * 2) * 0.2;
          leftArm.current.rotation.z = Math.sin(t * 1.5) * 0.1;
        }
        if (rightArm.current) {
          rightArm.current.rotation.x = -Math.PI / 4 + Math.cos(t * 2) * 0.2;
          rightArm.current.rotation.z = -Math.sin(t * 1.5) * 0.1;
        }
        break;

      case "logic":
        // Thinking pose - hand to chin
        if (rightArm.current) {
          rightArm.current.rotation.x = -Math.PI / 1.5;
          rightArm.current.rotation.y = -Math.PI / 6;
          rightArm.current.rotation.z = -Math.PI / 8;
        }
        if (leftArm.current) {
          leftArm.current.rotation.x = -Math.PI / 8;
        }
        break;

      case "learning":
      case "developer":
        // Sitting and typing
        if (leftArm.current && rightArm.current) {
          const typeSpeed = mode === "developer" ? 15 : 10;
          leftArm.current.rotation.x = -Math.PI / 2.2 + Math.sin(t * typeSpeed) * 0.1;
          rightArm.current.rotation.x = -Math.PI / 2.2 + Math.cos(t * typeSpeed) * 0.1;
        }
        break;

      case "future":
        // Walking animation
        if (leftLeg.current && rightLeg.current) {
          leftLeg.current.rotation.x = Math.sin(t * 5) * 0.4;
          rightLeg.current.rotation.x = -Math.sin(t * 5) * 0.4;
        }
        if (leftArm.current && rightArm.current) {
          leftArm.current.rotation.x = -Math.sin(t * 5) * 0.4;
          rightArm.current.rotation.x = Math.sin(t * 5) * 0.4;
        }
        break;
    }
  });

  return (
    <group ref={group} position={[0, -1, 0]}>
      {/* Body / Torso */}
      <mesh position={[0, 0.75, 0]}>
        <boxGeometry args={[0.5, 0.7, 0.25]} />
        <meshStandardMaterial color={shirtColor} />
      </mesh>

      {/* Head */}
      <group ref={head} position={[0, 1.3, 0]}>
        <mesh>
          <boxGeometry args={[0.3, 0.35, 0.3]} />
          <meshStandardMaterial color={skinColor} />
        </mesh>
        {/* Hair */}
        <mesh position={[0, 0.15, 0.05]}>
          <boxGeometry args={[0.32, 0.1, 0.32]} />
          <meshStandardMaterial color={hairColor} />
        </mesh>
      </group>

      {/* Arms */}
      <group ref={leftArm} position={[-0.35, 1.05, 0]}>
        <mesh position={[0, -0.25, 0]}>
          <boxGeometry args={[0.12, 0.5, 0.12]} />
          <meshStandardMaterial color={shirtColor} />
        </mesh>
        <mesh position={[0, -0.55, 0]}>
          <boxGeometry args={[0.1, 0.15, 0.1]} />
          <meshStandardMaterial color={skinColor} />
        </mesh>
      </group>

      <group ref={rightArm} position={[0.35, 1.05, 0]}>
        <mesh position={[0, -0.25, 0]}>
          <boxGeometry args={[0.12, 0.5, 0.12]} />
          <meshStandardMaterial color={shirtColor} />
        </mesh>
        <mesh position={[0, -0.55, 0]}>
          <boxGeometry args={[0.1, 0.15, 0.1]} />
          <meshStandardMaterial color={skinColor} />
        </mesh>
      </group>

      {/* Legs */}
      <group ref={leftLeg} position={[-0.15, 0.4, 0]}>
        <mesh position={[0, -0.3, 0]}>
          <boxGeometry args={[0.18, 0.6, 0.2]} />
          <meshStandardMaterial color={pantColor} />
        </mesh>
      </group>
      <group ref={rightLeg} position={[0.15, 0.4, 0]}>
        <mesh position={[0, -0.3, 0]}>
          <boxGeometry args={[0.18, 0.6, 0.2]} />
          <meshStandardMaterial color={pantColor} />
        </mesh>
      </group>
    </group>
  );
}

export default function AvatarScene({ mode }: { mode: SceneMode }) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  // Dynamic Camera Position based on mode
  useFrame((state) => {
    if (!cameraRef.current) return;
    
    let targetPos = new THREE.Vector3(0, 0.5, 4);
    let targetLookAt = new THREE.Vector3(0, 0.5, 0);

    switch (mode) {
      case "sales":
        targetPos.set(-2, 1, 4);
        break;
      case "logic":
        targetPos.set(2, 0.5, 3);
        break;
      case "learning":
      case "developer":
        targetPos.set(0, 1.2, 2.5);
        targetLookAt.set(0, 0.8, 0);
        break;
      case "future":
        targetPos.set(0, 0.5, 6);
        break;
    }

    cameraRef.current.position.lerp(targetPos, 0.05);
  });

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0.5, 5]} fov={50} />
      
      <color attach="background" args={["#050505"]} />
      <fog attach="fog" args={["#050505", 5, 15]} />

      <ambientLight intensity={0.4} />
      <spotLight position={[5, 5, 5]} angle={0.25} penumbra={1} intensity={150} castShadow shadow-bias={-0.0001} />
      <pointLight position={[-3, 2, -2]} intensity={20} color="#3b82f6" />

      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <HumanoidAvatar mode={mode} />
        
        {/* Environment based on mode */}
        {mode === "sales" && (
           <group position={[1.5, -1, 0]}>
             <mesh position={[0, 0.4, 0]}>
               <boxGeometry args={[1, 0.8, 1]} />
               <meshStandardMaterial color="#222" />
             </mesh>
             <Text position={[0, 1.5, 0]} fontSize={0.2} color="white">COMMUNICATION</Text>
           </group>
        )}

        {(mode === "learning" || mode === "developer") && (
          <group position={[0, -0.3, 0.8]}>
            {/* Minimal Desk */}
            <mesh position={[0, -0.6, 0]}>
               <boxGeometry args={[2, 0.05, 1]} />
               <meshStandardMaterial color="#111" />
            </mesh>
            {/* Laptop */}
            <mesh position={[0, -0.4, 0.2]} rotation={[-0.2, 0, 0]}>
               <boxGeometry args={[0.5, 0.02, 0.35]} />
               <meshStandardMaterial color="#333" />
            </mesh>
            <mesh position={[0, -0.25, 0.03]} rotation={[1.2, 0, 0]}>
               <boxGeometry args={[0.5, 0.02, 0.35]} />
               <meshStandardMaterial color="#000" emissive="#3b82f6" emissiveIntensity={4} />
            </mesh>
            <pointLight position={[0, 0, 0.5]} intensity={5} color="#3b82f6" distance={2} />
          </group>
        )}

        {mode === "developer" && (
          <group position={[0, 1, -1]}>
             <Text position={[-1, 0.5, 0]} fontSize={0.1} color="#3b82f6">JAVA</Text>
             <Text position={[1, -0.2, 0]} fontSize={0.1} color="#a855f7">REACT</Text>
             <Text position={[-0.8, -0.5, 0]} fontSize={0.1} color="#ec4899">NEXT.JS</Text>
          </group>
        )}
      </Float>

      <ContactShadows resolution={1024} scale={15} blur={2} opacity={0.4} far={10} color="#000000" />
      <Environment preset="city" />
    </>
  );
}
