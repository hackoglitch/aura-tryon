import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";

/* ── Floating AI Particles ── */
const AIParticles = () => {
  const particlesRef = useRef<THREE.Points>(null!);
  const count = 200;

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
      sz[i] = Math.random() * 3 + 0.5;
    }
    return [pos, sz];
  }, []);

  useFrame(({ clock }) => {
    if (!particlesRef.current) return;
    const t = clock.getElapsedTime();
    const posArr = particlesRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      posArr[i * 3 + 1] += Math.sin(t * 0.3 + i) * 0.002;
      posArr[i * 3] += Math.cos(t * 0.2 + i * 0.5) * 0.001;
    }
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
    particlesRef.current.rotation.y = t * 0.02;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color={new THREE.Color("hsl(210, 100%, 65%)")}
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

/* ── Neural Ring ── */
const NeuralRing = () => {
  const ringRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (!ringRef.current) return;
    ringRef.current.rotation.x = clock.getElapsedTime() * 0.2;
    ringRef.current.rotation.z = clock.getElapsedTime() * 0.15;
  });

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[3, 0.015, 16, 100]} />
      <meshBasicMaterial color={new THREE.Color("hsl(210, 100%, 65%)")} transparent opacity={0.25} />
    </mesh>
  );
};

const NeuralRing2 = () => {
  const ringRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (!ringRef.current) return;
    ringRef.current.rotation.y = clock.getElapsedTime() * 0.25;
    ringRef.current.rotation.x = Math.PI * 0.3 + Math.sin(clock.getElapsedTime() * 0.1) * 0.2;
  });

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[3.5, 0.01, 16, 100]} />
      <meshBasicMaterial color={new THREE.Color("hsl(210, 100%, 55%)")} transparent opacity={0.15} />
    </mesh>
  );
};

/* ── Main Organic Mesh ── */
const AnimatedMesh = () => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<THREE.ShaderMaterial>(null!);

  const shaderData = useMemo(
    () => ({
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color("hsl(210, 100%, 65%)") },
        uColor2: { value: new THREE.Color("hsl(210, 100%, 30%)") },
        uColor3: { value: new THREE.Color("hsl(250, 80%, 60%)") },
      },
      vertexShader: `
        varying vec2 vUv;
        varying float vDisplacement;
        varying vec3 vNormal;
        uniform float uTime;
        
        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
        vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
        
        float snoise(vec3 v) {
          const vec2 C = vec2(1.0/6.0, 1.0/3.0);
          const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
          vec3 i = floor(v + dot(v, C.yyy));
          vec3 x0 = v - i + dot(i, C.xxx);
          vec3 g = step(x0.yzx, x0.xyz);
          vec3 l = 1.0 - g;
          vec3 i1 = min(g.xyz, l.zxy);
          vec3 i2 = max(g.xyz, l.zxy);
          vec3 x1 = x0 - i1 + C.xxx;
          vec3 x2 = x0 - i2 + C.yyy;
          vec3 x3 = x0 - D.yyy;
          i = mod289(i);
          vec4 p = permute(permute(permute(
            i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
          float n_ = 0.142857142857;
          vec3 ns = n_ * D.wyz - D.xzx;
          vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
          vec4 x_ = floor(j * ns.z);
          vec4 y_ = floor(j - 7.0 * x_);
          vec4 x = x_ * ns.x + ns.yyyy;
          vec4 y = y_ * ns.x + ns.yyyy;
          vec4 h = 1.0 - abs(x) - abs(y);
          vec4 b0 = vec4(x.xy, y.xy);
          vec4 b1 = vec4(x.zw, y.zw);
          vec4 s0 = floor(b0)*2.0 + 1.0;
          vec4 s1 = floor(b1)*2.0 + 1.0;
          vec4 sh = -step(h, vec4(0.0));
          vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
          vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
          vec3 p0 = vec3(a0.xy, h.x);
          vec3 p1 = vec3(a0.zw, h.y);
          vec3 p2 = vec3(a1.xy, h.z);
          vec3 p3 = vec3(a1.zw, h.w);
          vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
          p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
          vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
          m = m * m;
          return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
        }
        
        void main() {
          vUv = uv;
          vNormal = normal;
          float displacement = snoise(position * 1.5 + uTime * 0.3) * 0.18;
          displacement += snoise(position * 3.0 + uTime * 0.5) * 0.06;
          vDisplacement = displacement;
          vec3 newPosition = position + normal * displacement;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        varying float vDisplacement;
        varying vec3 vNormal;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uColor3;
        
        void main() {
          float mixFactor = (vDisplacement + 0.18) / 0.36;
          vec3 color = mix(uColor2, uColor1, mixFactor);
          color = mix(color, uColor3, sin(vUv.y * 6.28) * 0.3 + 0.1);
          float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.0);
          color += uColor1 * fresnel * 0.4;
          float alpha = 0.5 + vDisplacement * 1.5 + fresnel * 0.3;
          gl_FragColor = vec4(color, alpha);
        }
      `,
    }),
    []
  );

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.12;
      meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.08) * 0.15;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.6}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2, 24]} />
        <shaderMaterial
          ref={materialRef}
          {...shaderData}
          transparent
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </Float>
  );
};

const wordVariants = {
  hidden: { opacity: 0, y: 50, filter: "blur(10px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: 0.6 + i * 0.18,
      duration: 1,
      ease: [0.6, 0, 0.4, 1],
    },
  }),
};

const Hero = () => {
  const words = ["Try on", "the", "Future"];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }} gl={{ alpha: true }}>
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={0.6} color="hsl(210, 100%, 80%)" />
          <pointLight position={[-8, -5, 5]} intensity={0.3} color="hsl(250, 80%, 70%)" />
          <AnimatedMesh />
          <AIParticles />
          <NeuralRing />
          <NeuralRing2 />
        </Canvas>
      </div>

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_25%,_hsl(0_0%_4%)_65%)] z-[1]" />

      {/* Floating AI labels */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1.5 }}
        className="absolute z-[2] hidden lg:block"
      >
        {[
          { text: "Neural Mesh Active", x: "15%", y: "25%" },
          { text: "Body Map Ready", x: "78%", y: "30%" },
          { text: "AI Engine v4.2", x: "12%", y: "70%" },
          { text: "Fabric Sim Online", x: "80%", y: "68%" },
        ].map((label, i) => (
          <motion.div
            key={label.text}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
            className="absolute glass-panel rounded-full px-4 py-1.5 border border-border/30"
            style={{ left: label.x, top: label.y }}
          >
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-glow" />
              <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">{label.text}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Content */}
      <div className="relative z-[2] text-center px-6 max-w-5xl mx-auto">
        {/* AI badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.6, 0, 0.4, 1] }}
          className="inline-flex items-center gap-2 glass-panel rounded-full px-5 py-2 border border-accent/20 mb-8"
        >
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse-glow" />
          <span className="text-xs uppercase tracking-[0.2em] text-accent">Powered by AI</span>
        </motion.div>

        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-[-0.04em] leading-[0.9] mb-8">
          {words.map((word, i) => (
            <motion.span
              key={word}
              custom={i}
              variants={wordVariants}
              initial="hidden"
              animate="visible"
              className={`inline-block mr-4 ${i === 2 ? "text-gradient-accent" : ""}`}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8, ease: [0.6, 0, 0.4, 1] }}
          className="text-lg sm:text-xl text-muted-foreground mb-12 max-w-lg mx-auto tracking-wide"
        >
          Real-time generative clothing, fitted to you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.8, ease: [0.6, 0, 0.4, 1] }}
          className="flex items-center justify-center gap-4 flex-wrap"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px -8px hsl(210 100% 65% / 0.5)" }}
            whileTap={{ scale: 0.97 }}
            className="bg-primary text-primary-foreground px-10 py-4 rounded-full text-base font-medium tracking-wide relative overflow-hidden group"
          >
            <span className="relative z-10 group-hover:text-accent-foreground transition-colors duration-500">Start Virtual Try-On</span>
            <div className="absolute inset-0 bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-4 rounded-full text-base font-medium tracking-wide border border-border/50 text-muted-foreground hover:text-foreground hover:border-accent/40 transition-all duration-300"
          >
            Watch Demo
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[2]"
      >
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-2 bg-accent rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
