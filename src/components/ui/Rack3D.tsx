import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";
import { cn } from "../../lib/utils";

/**
 * El plano de StackDrawing, pero como pieza real: el mismo rack de 4
 * unidades (Cloud/Server/Network/Floor), ahora modelado con primitivas de
 * Three.js en vez de trazos SVG. Sin archivos .glb — todo geometria y
 * material en codigo, igual que el resto del sistema visual del sitio.
 *
 * Camara fija a proposito (no es un juguete para explorar): la vida la dan
 * los LEDs, que parpadean como en un equipo real encendido.
 */

const RACK_INK = "#101E2B";
const RACK_EDGE = "#9CA9B6";
const RACK_LINK = "#0E8A6F";
const RACK_ACT = "#B26A08";

interface LayerSpec {
  label: string;
  led: "link" | "act";
  /** Fase inicial del parpadeo, para que las 4 unidades no titilen a la vez. */
  blinkOffset: number;
}

const layers: LayerSpec[] = [
  { label: "CLOUD", led: "act", blinkOffset: 0 },
  { label: "SERVER", led: "act", blinkOffset: 1.4 },
  { label: "NETWORK", led: "link", blinkOffset: 2.7 },
  { label: "FLOOR", led: "link", blinkOffset: 0.6 },
];

const UNIT_WIDTH = 2.6;
const UNIT_HEIGHT = 0.42;
const UNIT_DEPTH = 1.1;
const UNIT_GAP = 0.06;
const RAIL_INSET = 0.08;

function RackUnit({
  index,
  layer,
  reduce,
}: {
  index: number;
  layer: LayerSpec;
  reduce: boolean;
}) {
  const ledRef = useRef<THREE.Mesh>(null);
  const ledColor = layer.led === "link" ? RACK_LINK : RACK_ACT;

  // Parpadeo irregular, como el keyframe CSS "blink" que ya usa el resto
  // del sitio (45%-55% cae a baja intensidad, el resto queda encendido).
  useFrame(({ clock }) => {
    if (reduce || !ledRef.current) return;
    const material = ledRef.current.material as THREE.MeshStandardMaterial;
    const t = (clock.elapsedTime + layer.blinkOffset) % 4;
    const dip = t > 1.8 && t < 2.2;
    material.emissiveIntensity = dip ? 0.35 : 1.4;
  });

  const y = index * (UNIT_HEIGHT + UNIT_GAP);

  // Fila de puertos: pequenos huecos oscuros en la cara frontal, igual que
  // los rects del panel en StackDrawing.
  const ports = useMemo(
    () => Array.from({ length: 8 }, (_, p) => -1.05 + p * 0.3),
    []
  );

  return (
    <group position={[0, y, 0]}>
      {/* Cuerpo de la unidad */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[UNIT_WIDTH, UNIT_HEIGHT, UNIT_DEPTH]} />
        <meshStandardMaterial color={RACK_INK} roughness={0.55} metalness={0.2} />
      </mesh>

      {/* Puertos: cara frontal */}
      {ports.map((x, p) => (
        <mesh key={p} position={[x, 0, UNIT_DEPTH / 2 + 0.01]}>
          <boxGeometry args={[0.12, 0.1, 0.02]} />
          <meshStandardMaterial color="#050810" roughness={0.9} />
        </mesh>
      ))}

      {/* LED de estado, esquina frontal */}
      <mesh ref={ledRef} position={[UNIT_WIDTH / 2 - 0.18, 0, UNIT_DEPTH / 2 + 0.02]}>
        <circleGeometry args={[0.045, 16]} />
        <meshStandardMaterial
          color={ledColor}
          emissive={ledColor}
          emissiveIntensity={1.4}
          toneMapped={false}
        />
      </mesh>

      {/* Tornillos de montaje */}
      {[-1, 1].map((side) => (
        <mesh
          key={side}
          position={[side * (UNIT_WIDTH / 2 - RAIL_INSET), 0, UNIT_DEPTH / 2 + 0.015]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <cylinderGeometry args={[0.035, 0.035, 0.02, 12]} />
          <meshStandardMaterial color={RACK_EDGE} roughness={0.4} metalness={0.6} />
        </mesh>
      ))}
    </group>
  );
}

function RackModel({ reduce }: { reduce: boolean }) {
  const totalHeight = layers.length * (UNIT_HEIGHT + UNIT_GAP);

  return (
    <group position={[0, -totalHeight / 2 + UNIT_HEIGHT / 2, 0]}>
      {/* Rieles verticales */}
      {[-1, 1].map((side) => (
        <mesh
          key={side}
          position={[side * (UNIT_WIDTH / 2 - RAIL_INSET / 2), totalHeight / 2 - UNIT_HEIGHT / 2, UNIT_DEPTH / 2 + 0.02]}
        >
          <boxGeometry args={[0.05, totalHeight + 0.3, 0.04]} />
          <meshStandardMaterial color={RACK_EDGE} roughness={0.5} metalness={0.4} />
        </mesh>
      ))}

      {layers.map((layer, i) => (
        <RackUnit key={layer.label} index={i} layer={layer} reduce={reduce} />
      ))}
    </group>
  );
}

export function Rack3D({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <div
      className={className}
      role="img"
      aria-label="Modelo 3D del rack: la instalación completa, del cableado del piso hasta la nube"
    >
      <div className="relative h-full w-full">
        <Canvas
          camera={{ position: [3.4, 1.6, 4.4], fov: 32 }}
          dpr={[1, 1.75]}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.65} color="#EDEFF2" />
          <directionalLight
            position={[3, 5, 4]}
            intensity={1.1}
            color="#FFFFFF"
            castShadow
            shadow-mapSize={[512, 512]}
          />
          <directionalLight position={[-4, 1, -2]} intensity={0.25} color="#0A6E96" />
          <mesh position={[0, -1.55, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <planeGeometry args={[10, 10]} />
            <shadowMaterial opacity={0.08} />
          </mesh>
          <RackModel reduce={!!reduce} />
        </Canvas>

        {/* Leyenda: mismas 4 capas que StackDrawing, de la nube al piso —
            mas simple que proyectar cada etiqueta sobre su unidad en 3D. */}
        <dl className="pointer-events-none absolute bottom-3 left-3 space-y-1">
          {layers.map((layer) => (
            <div key={layer.label} className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className={cn(
                  "h-[6px] w-[6px] shrink-0 rounded-full",
                  layer.led === "link" ? "bg-rack-link" : "bg-rack-act"
                )}
              />
              <dt className="font-mono text-[9px] uppercase tracking-[0.18em] text-rack-graph/70">
                {layer.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
