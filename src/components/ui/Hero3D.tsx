import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import { useRef, useMemo, useEffect, useState } from "react";
import * as THREE from "three";
import { Server, Zap } from "lucide-react";

// Hook para seguir el mouse
function useMousePosition() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return mouse;
}

// Componente principal del escenario 3D
export function Hero3D() {
  const mouse = useMousePosition();
  
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        className="w-full h-full"
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
      >
        {/* Iluminación */}
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00D4FF" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8B5CF6" />
        
        {/* Estrellas de fondo interactivas */}
        <InteractiveStars mouse={mouse} />
        
        {/* Objetos flotantes */}
        <FloatingObjects mouse={mouse} />
        
        {/* Red de conexiones */}
        <NetworkStructure mouse={mouse} />
      </Canvas>
    </div>
  );
}

// Estrellas interactivas que reaccionan al mouse
function InteractiveStars({ mouse }: { mouse: { x: number; y: number } }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, mouse.y * 0.05, 0.02);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouse.x * 0.05, 0.02);
    }
  });
  
  return (
    <group ref={groupRef}>
      <Stars
        radius={100}
        depth={50}
        count={1500}
        factor={4}
        saturation={0}
        fade
        speed={0.5}
      />
    </group>
  );
}

// Objetos flotantes con iconos que reaccionan al mouse
function FloatingObjects({ mouse }: { mouse: { x: number; y: number } }) {
  const icons = [
    { position: [-4, 2, 0] as [number, number, number], icon: Server, color: "#00D4FF", delay: 0 },
    { position: [4, -2, 0] as [number, number, number], icon: Zap, color: "#8B5CF6", delay: 1 },
    { position: [0, 3, -2] as [number, number, number], icon: Server, color: "#A855F7", delay: 2 },
  ];
  
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (groupRef.current) {
      // Los objetos se inclinan suavemente hacia el mouse
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, mouse.y * 0.1, 0.01);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouse.x * 0.1, 0.01);
    }
  });

  return (
    <group ref={groupRef}>
      {icons.map((item, index) => (
        <Float key={index} speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <group position={item.position}>
            {/* Esfera principal */}
            <mesh>
              <sphereGeometry args={[0.5, 32, 32]} />
              <meshStandardMaterial
                color={item.color}
                transparent
                opacity={0.6}
                emissive={item.color}
                emissiveIntensity={0.3}
              />
            </mesh>
            
            {/* Anillo exterior */}
            <mesh rotation={[0, 0, Math.PI / 4]}>
              <torusGeometry args={[0.8, 0.05, 16, 32]} />
              <meshStandardMaterial
                color={item.color}
                transparent
                opacity={0.4}
              />
            </mesh>
          </group>
        </Float>
      ))}
    </group>
  );
}

// Estructura de red con nodos conectados que reaccionan al mouse
function NetworkStructure({ mouse }: { mouse: { x: number; y: number } }) {
  const nodes = [
    { position: [0, 0, 0] as [number, number, number], color: "#00D4FF", size: 1 },
    { position: [-3, 2, 1] as [number, number, number], color: "#8B5CF6", size: 0.7 },
    { position: [3, -2, -1] as [number, number, number], color: "#A855F7", size: 0.7 },
    { position: [-2, -3, 2] as [number, number, number], color: "#00D4FF", size: 0.5 },
    { position: [2, 3, -2] as [number, number, number], color: "#8B5CF6", size: 0.5 },
  ];
  
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (groupRef.current) {
      // Efecto parallax suave con el mouse
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, mouse.x * 0.5, 0.02);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, mouse.y * 0.5, 0.02);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Nodos principales */}
      {nodes.map((node, index) => (
        <NetworkNode key={index} {...node} mouse={mouse} />
      ))}
      
      {/* Conexiones entre nodos */}
      {nodes.slice(1).map((node, index) => (
        <ConnectionLine
          key={index}
          start={[0, 0, 0]}
          end={node.position}
          color={node.color}
        />
      ))}
    </group>
  );
}

// Nodo de red individual con animación e interacción
function NetworkNode({ position, color, size = 1, mouse }: { position: [number, number, number], color: string, size?: number, mouse: { x: number; y: number } }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.3;
    }
    
    // Pequeño efecto de "repulsión" del mouse sobre los nodos
    if (groupRef.current) {
      const distance = Math.sqrt(
        Math.pow(mouse.x * 5 - position[0], 2) + 
        Math.pow(mouse.y * 5 - position[1], 2)
      );
      const repulsion = Math.max(0, 1 - distance / 5) * 0.2;
      groupRef.current.position.x = position[0] + (mouse.x * 5 - position[0]) * repulsion * -0.3;
      groupRef.current.position.y = position[1] + (mouse.y * 5 - position[1]) * repulsion * -0.3;
      groupRef.current.position.z = position[2];
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef}>
        {/* Nodo central */}
        <mesh ref={meshRef}>
          <octahedronGeometry args={[0.3 * size, 0]} />
          <meshStandardMaterial
            color={color}
            roughness={0.1}
            metalness={0.8}
            emissive={color}
            emissiveIntensity={0.2}
          />
        </mesh>
        
        {/* Aura exterior */}
        <mesh>
          <sphereGeometry args={[0.6 * size, 32, 32]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.1}
          />
        </mesh>
      </group>
    </Float>
  );
}

// Línea de conexión animada entre nodos
function ConnectionLine({ start, end, color }: { start: [number, number, number], end: [number, number, number], color: string }) {
  const particlesRef = useRef<THREE.Points>(null);

  const particlePositions = useMemo(() => {
    const count = 5;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = start[0] + (end[0] - start[0]) * (i / count);
      positions[i * 3 + 1] = start[1] + (end[1] - start[1]) * (i / count);
      positions[i * 3 + 2] = start[2] + (end[2] - start[2]) * (i / count);
    }
    return positions;
  }, [start, end]);

  useFrame((state) => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < 5; i++) {
        const progress = ((state.clock.getElapsedTime() * 0.3 + i * 0.2) % 1);
        positions[i * 3] = start[0] + (end[0] - start[0]) * progress;
        positions[i * 3 + 1] = start[1] + (end[1] - start[1]) * progress;
        positions[i * 3 + 2] = start[2] + (end[2] - start[2]) * progress;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Línea base */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={2}
            array={new Float32Array([...start, ...end])}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color={color} transparent opacity={0.3} />
      </line>
      
      {/* Partículas animadas */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={5}
            array={particlePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial color={color} size={0.05} transparent opacity={0.8} />
      </points>
    </group>
  );
}