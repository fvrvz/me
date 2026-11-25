import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface HeroCanvas3DProps {
  isDark: boolean;
}

function createPlanetTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // Rich Mars-Saturn atmospheric gradient bands matching Swiss Vermilion & Obsidian
  const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  grad.addColorStop(0.0, '#191316');
  grad.addColorStop(0.18, '#6b2216');
  grad.addColorStop(0.32, '#c8391e');
  grad.addColorStop(0.46, '#ff4d2a');
  grad.addColorStop(0.55, '#d94826');
  grad.addColorStop(0.7, '#7d2618');
  grad.addColorStop(0.86, '#341614');
  grad.addColorStop(1.0, '#120e10');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Subtle horizontal atmospheric storm bands
  for (let i = 0; i < 42; i++) {
    const y = Math.random() * canvas.height;
    const h = 2 + Math.random() * 14;
    ctx.fillStyle =
      i % 4 === 0
        ? `rgba(204, 255, 0, ${0.03 + Math.random() * 0.05})`
        : `rgba(244, 243, 238, ${0.04 + Math.random() * 0.08})`;
    ctx.fillRect(0, y, canvas.width, h);
  }

  // Subtle mineral craters / surface spots
  for (let i = 0; i < 65; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const r = 3 + Math.random() * 18;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(13, 13, 16, ${0.08 + Math.random() * 0.14})`;
    ctx.fill();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createRingTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 64;
  const ctx = canvas.getContext('2d')!;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Concentric radial bands (encoded along X for UV mapping)
  for (let x = 0; x < canvas.width; x++) {
    const t = x / canvas.width;
    // Fade in and out at inner/outer edges + Cassini division gap
    const edgeFade = Math.sin(t * Math.PI);
    const cassiniGap = t > 0.58 && t < 0.65 ? 0.08 : 1.0;
    const fineBand = 0.55 + 0.45 * Math.sin(t * 75);
    const alpha = Math.max(0, Math.min(1, edgeFade * cassiniGap * fineBand * 0.88));

    let color = `rgba(244, 243, 238, ${alpha})`;
    if (t > 0.38 && t < 0.48) {
      color = `rgba(204, 255, 0, ${alpha * 0.9})`;
    } else if (t > 0.68 && t < 0.82) {
      color = `rgba(255, 59, 29, ${alpha * 0.85})`;
    }

    ctx.fillStyle = color;
    ctx.fillRect(x, 0, 1, canvas.height);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function HeroCanvas3D({ isDark }: HeroCanvas3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cageMatRef = useRef<THREE.MeshBasicMaterial | null>(null);

  useEffect(() => {
    if (cageMatRef.current) {
      cageMatRef.current.color.set(isDark ? '#ccff00' : '#0d0d10');
      cageMatRef.current.opacity = isDark ? 0.14 : 0.1;
    }
  }, [isDark]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      40,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.35, 7.2);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // Dramatic planetary lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambient);

    const sunLight = new THREE.DirectionalLight(0xfff4e0, 2.8);
    sunLight.position.set(5, 4, 5);
    scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight(0xccff00, 1.4);
    rimLight.position.set(-5, -3, -3);
    scene.add(rimLight);

    // Planetary System Group
    const systemGroup = new THREE.Group();
    systemGroup.position.set(window.innerWidth < 860 ? 0 : 1.55, 0.1, 0);
    systemGroup.rotation.z = -0.34; // Classic Saturn axial tilt
    systemGroup.rotation.x = 0.24;
    scene.add(systemGroup);

    // Planet Sphere
    const planetTex = createPlanetTexture();
    const planetGeo = new THREE.SphereGeometry(1.38, 64, 64);
    const planetMat = new THREE.MeshStandardMaterial({
      map: planetTex,
      roughness: 0.62,
      metalness: 0.12,
    });
    const planetMesh = new THREE.Mesh(planetGeo, planetMat);
    systemGroup.add(planetMesh);

    // Subtle Swiss architectural meridian wireframe cage
    const cageGeo = new THREE.SphereGeometry(1.42, 24, 16);
    const cageMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0xccff00 : 0x0d0d10,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.14 : 0.1,
    });
    cageMatRef.current = cageMat;
    const cageMesh = new THREE.Mesh(cageGeo, cageMat);
    systemGroup.add(cageMesh);

    // Saturn Rings with radial UV mapping
    const ringGeo = new THREE.RingGeometry(1.82, 3.15, 128, 1);
    const posAttr = ringGeo.attributes.position;
    const uvAttr = ringGeo.attributes.uv;
    const v3 = new THREE.Vector3();
    for (let i = 0; i < posAttr.count; i++) {
      v3.fromBufferAttribute(posAttr, i);
      const radius = v3.length();
      const u = (radius - 1.82) / (3.15 - 1.82);
      uvAttr.setXY(i, u, 0.5);
    }

    const ringTex = createRingTexture();
    const ringMat = new THREE.MeshBasicMaterial({
      map: ringTex,
      side: THREE.DoubleSide,
      transparent: true,
      depthWrite: false,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    systemGroup.add(ringMesh);

    // Orbiting Moon
    const moonGeo = new THREE.SphereGeometry(0.14, 24, 24);
    const moonMat = new THREE.MeshStandardMaterial({
      color: 0xccff00,
      emissive: 0xccff00,
      emissiveIntensity: 0.25,
      roughness: 0.35,
    });
    const moonMesh = new THREE.Mesh(moonGeo, moonMat);
    systemGroup.add(moonMesh);

    const pointer = { x: 0, y: 0, boost: 0 };

    const onPointerMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const onClick = () => {
      pointer.boost = 0.08;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    container.addEventListener('click', onClick);

    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
      systemGroup.position.x = window.innerWidth < 860 ? 0 : 1.55;
    };
    window.addEventListener('resize', onResize);

    let rafId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      pointer.boost *= 0.95;

      planetMesh.rotation.y += 0.003 + pointer.boost;
      cageMesh.rotation.y = planetMesh.rotation.y * 0.6;
      ringMesh.rotation.z -= 0.0012 + pointer.boost * 0.5;

      // Moon orbit
      const orbitAngle = t * 0.65;
      moonMesh.position.set(
        Math.cos(orbitAngle) * 2.75,
        Math.sin(orbitAngle * 0.5) * 0.22,
        Math.sin(orbitAngle) * 2.75
      );

      // Smooth mouse parallax
      const targetRotY = pointer.x * 0.28;
      const targetRotX = 0.24 - pointer.y * 0.18;
      systemGroup.rotation.y += (targetRotY - systemGroup.rotation.y) * 0.05;
      systemGroup.rotation.x += (targetRotX - systemGroup.rotation.x) * 0.05;
      systemGroup.position.y = 0.1 + Math.sin(t * 0.9) * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onResize);
      container.removeEventListener('click', onClick);
      planetTex.dispose();
      planetGeo.dispose();
      planetMat.dispose();
      cageGeo.dispose();
      cageMat.dispose();
      ringTex.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      moonGeo.dispose();
      moonMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="hero-canvas-wrap"
      data-cursor="ORBIT"
      title="Click to boost planetary orbit"
    />
  );
}
