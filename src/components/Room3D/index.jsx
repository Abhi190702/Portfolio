/*
 * 3D Room - based on joan-portfolio by Joan Ramos Refusta
 * Original: https://github.com/jrefusta/joan-portfolio
 * Licensed under MIT License
 * Heavily modified and personalized by Abhijeet Ranjan
 */
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ExternalLink, Github, Instagram, Keyboard, Linkedin, MousePointer2, X } from "lucide-react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { gsap } from "gsap";
import projects from "@/data/projects";

const ROOM = {
  bg: "#0a0a0f",
  surface: "#0f1117",
  cyan: "#00d4ff",
  purple: "#7c3aed",
  text: "#e2e8f0",
  green: "#22c55e",
};

const OWNER_LINKS = {
  github: "https://github.com/Abhi190702",
  linkedIn: "https://www.linkedin.com/in/abhijeet-ranjan-7056ab22a/",
  instagram: "https://www.instagram.com/abhi.lonelyfans/",
};

const ROOM_PROJECTS = projects.map((project) => ({
  id: project.id,
  title: project.title,
  category: project.category,
  summary: project.summary,
  image: project.src,
  url: project.github || project.live,
  accent: project.accent,
}));

const SOURCE_SCREEN = {
  monitorWidth: 1370.178 * 0.00102,
  monitorHeight: 764.798 * 0.00102,
  arcadeWidth: 1006.986 * 0.00102,
  arcadeHeight: 1210.1182617331252 * 0.00102,
  leftMonitorPosition: [1.06738, 2.50725, -4.2185],
  rightMonitorPosition: [2.47898, 2.50716, -4.134],
  rightMonitorRotationY: (-7.406 * Math.PI) / 180,
  arcadePosition: [3.24776, 2.7421, 2.3009],
  arcadeRotationX: -Math.PI / 7,
  arcadeRotationY: -Math.PI / 2,
};

const LOADING_MESSAGES = [
  "Initializing room...",
  "Loading shaders...",
  "Placing objects...",
  "Almost there...",
];

const TECH_BOOKS = [
  { label: "React", color: "#61dafb", position: [0.58, 3.52, -4.52] },
  { label: "Node.js", color: "#68a063", position: [0.78, 3.52, -4.52] },
  { label: "Python", color: "#ffd43b", position: [0.98, 3.52, -4.52] },
  { label: "Docker", color: "#2496ed", position: [1.18, 3.52, -4.52] },
  { label: "Linux", color: "#fcc624", position: [1.38, 3.52, -4.52] },
  { label: "LLMs", color: "#7c3aed", position: [1.58, 3.52, -4.52] },
  { label: "Cybersec", color: "#00d4ff", position: [1.78, 3.52, -4.52] },
];

const CAMERA_DEFAULT = new THREE.Vector3(-6.2, 4.4, 6.8);
const CAMERA_INTRO = new THREE.Vector3(-8.2, 6.4, 8.8);
const CAMERA_TARGET = new THREE.Vector3(0.2, 2.2, -2.2);

function openExternal(url) {
  window.open(url, "_blank", "noopener,noreferrer");
}

function getFittedFontSize(ctx, text, maxWidth, startSize, minSize = 28) {
  let size = startSize;
  while (size > minSize) {
    ctx.font = `700 ${size}px monospace`;
    if (ctx.measureText(text).width <= maxWidth) break;
    size -= 2;
  }
  return size;
}

function makeTexture({
  width = 1024,
  height = 512,
  background = ROOM.bg,
  accent = ROOM.cyan,
  foreground = ROOM.text,
  title,
  subtitle,
  lines = [],
  align = "left",
}) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  const x = align === "center" ? width / 2 : width * 0.08;

  ctx.fillStyle = background;
  ctx.fillRect(0, 0, width, height);

  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, `${accent}44`);
  gradient.addColorStop(0.4, "transparent");
  gradient.addColorStop(1, `${accent}18`);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = `${accent}99`;
  ctx.lineWidth = 4;
  ctx.strokeRect(24, 24, width - 48, height - 48);

  ctx.textAlign = align;
  ctx.fillStyle = foreground;
  const titleSize = getFittedFontSize(ctx, title, width * 0.84, height * 0.13);
  ctx.font = `700 ${titleSize}px monospace`;
  ctx.fillText(title, x, height * 0.28);

  if (subtitle) {
    ctx.fillStyle = `${foreground}cc`;
    ctx.font = `500 ${height * 0.055}px monospace`;
    ctx.fillText(subtitle, x, height * 0.4);
  }

  ctx.fillStyle = `${accent}dd`;
  ctx.font = `400 ${height * 0.045}px monospace`;
  lines.forEach((line, index) => {
    ctx.fillText(line, x, height * 0.57 + index * height * 0.085);
  });

  for (let y = 0; y < height; y += 8) {
    ctx.fillStyle = "rgba(255,255,255,0.025)";
    ctx.fillRect(0, y, width, 1);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  texture.needsUpdate = true;
  return texture;
}

function makeProjectsDashboardTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 1400;
  canvas.height = 780;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#070a12";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const bg = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  bg.addColorStop(0, "rgba(0, 212, 255, 0.22)");
  bg.addColorStop(0.5, "rgba(124, 58, 237, 0.1)");
  bg.addColorStop(1, "rgba(34, 197, 94, 0.12)");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
  ctx.fillRect(0, 0, canvas.width, 74);
  ctx.fillStyle = ROOM.text;
  ctx.font = "700 36px monospace";
  ctx.fillText("Projects Window", 46, 49);
  ctx.fillStyle = "rgba(226, 232, 240, 0.62)";
  ctx.font = "500 20px monospace";
  ctx.fillText("click monitor to focus - choose a project from the window", 430, 48);

  ROOM_PROJECTS.slice(0, 4).forEach((project, index) => {
    const col = index % 2;
    const row = Math.floor(index / 2);
    const x = 58 + col * 646;
    const y = 118 + row * 284;
    const width = 588;
    const height = 244;
    ctx.fillStyle = "rgba(3, 7, 18, 0.82)";
    ctx.fillRect(x, y, width, height);
    ctx.strokeStyle = `${project.accent}aa`;
    ctx.lineWidth = 3;
    ctx.strokeRect(x, y, width, height);

    ctx.fillStyle = `${project.accent}22`;
    ctx.fillRect(x + 22, y + 24, 132, 132);
    ctx.strokeStyle = `${project.accent}66`;
    ctx.lineWidth = 2;
    ctx.strokeRect(x + 22, y + 24, 132, 132);

    ctx.fillStyle = project.accent;
    ctx.font = "700 20px monospace";
    ctx.fillText(project.category, x + 178, y + 58);

    ctx.fillStyle = ROOM.text;
    const titleSize = getFittedFontSize(ctx, project.title, 350, 34, 22);
    ctx.font = `800 ${titleSize}px monospace`;
    ctx.fillText(project.title, x + 178, y + 104);

    ctx.fillStyle = "rgba(226, 232, 240, 0.72)";
    ctx.font = "500 17px monospace";
    const words = project.summary.split(" ");
    let line = "";
    let lineY = y + 142;
    words.forEach((word) => {
      const next = `${line}${word} `;
      if (ctx.measureText(next).width > 360) {
        ctx.fillText(line, x + 178, lineY);
        line = `${word} `;
        lineY += 24;
      } else {
        line = next;
      }
    });
    ctx.fillText(line, x + 178, lineY);

    ctx.fillStyle = project.accent;
    ctx.fillRect(x + 22, y + 180, 132, 38);
    ctx.fillStyle = "#020617";
    ctx.font = "800 16px monospace";
    ctx.fillText("Open repo", x + 38, y + 205);
  });

  for (let y = 0; y < canvas.height; y += 7) {
    ctx.fillStyle = "rgba(255,255,255,0.025)";
    ctx.fillRect(0, y, canvas.width, 1);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  texture.needsUpdate = true;
  return texture;
}

function makeNoteTexture({ background, text }) {
  const canvas = document.createElement("canvas");
  canvas.width = 768;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = background;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(255,255,255,0.18)";
  ctx.fillRect(0, 0, canvas.width, 42);
  ctx.fillStyle = ROOM.bg;
  ctx.font = "700 54px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const words = text.split(" ");
  const lines = [words.slice(0, 2).join(" "), words.slice(2).join(" ")];
  lines.forEach((line, index) => {
    ctx.fillText(line, canvas.width / 2, canvas.height * (0.43 + index * 0.19));
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function disposeMaterial(material) {
  const materials = Array.isArray(material) ? material : [material];
  materials.forEach((entry) => {
    if (!entry) return;
    Object.keys(entry).forEach((key) => {
      if (entry[key]?.isTexture) entry[key].dispose();
    });
    entry.dispose();
  });
}

function TerminalOverlay({ open, onClose }) {
  const [typed, setTyped] = useState("");

  useEffect(() => {
    if (!open) {
      setTyped("");
      return undefined;
    }

    const text = [
      "> whoami",
      "Abhijeet Ranjan",
      "> skills",
      "[Cybersec, AI/LLM, DevOps, React, Node, Python]",
      "> motto",
      '"Breaking things to understand them."',
      "> _",
    ].join("\n");
    let index = 0;
    const interval = window.setInterval(() => {
      setTyped(text.slice(0, index));
      index += 1;
      if (index > text.length) window.clearInterval(interval);
    }, 18);

    const handleEscape = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);

    return () => {
      window.clearInterval(interval);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose, open]);

  if (!open) return null;

  return (
    <div className="room-terminal-backdrop" onMouseDown={onClose}>
      <div className="room-terminal" onMouseDown={(event) => event.stopPropagation()}>
        <pre>{typed}</pre>
      </div>
    </div>
  );
}

function ProjectsWindow({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="room-project-window" role="dialog" aria-label="Projects Window">
      <div className="room-project-window-bar">
        <div>
          <span>Projects Window</span>
          <small>select a project to open its repository</small>
        </div>
        <button type="button" onClick={onClose} aria-label="Close projects window">
          <X size={16} />
        </button>
      </div>
      <div className="room-project-grid">
        {ROOM_PROJECTS.map((project) => (
          <article key={project.id} className="room-project-card">
            <img src={project.image} alt={`${project.title} screenshot`} />
            <div>
              <span style={{ color: project.accent }}>{project.category}</span>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              <button type="button" onClick={() => openExternal(project.url)}>
                Open repository
                <ExternalLink size={14} />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function MobileFallback() {
  return (
    <div className="room-mobile-shell">
      <div className="room-mobile-avatar">AR</div>
      <h3>Abhijeet Ranjan</h3>
      <p>Full Stack + Cybersec</p>
      <div className="room-mobile-projects">
        {ROOM_PROJECTS.map((project) => (
          <a key={project.id} href={project.url} target="_blank" rel="noreferrer">
            {project.title}
            <ExternalLink size={16} />
          </a>
        ))}
      </div>
      <div className="room-mobile-socials">
        <a href={OWNER_LINKS.github} target="_blank" rel="noreferrer" aria-label="GitHub">
          <Github size={20} />
        </a>
        <a href={OWNER_LINKS.linkedIn} target="_blank" rel="noreferrer" aria-label="LinkedIn">
          <Linkedin size={20} />
        </a>
        <a href={OWNER_LINKS.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
          <Instagram size={20} />
        </a>
      </div>
      <span className="room-mobile-desktop-note">3D experience available on desktop</span>
    </div>
  );
}

export default function Room3D() {
  const mountRef = useRef(null);
  const tooltipRef = useRef(null);
  const [isMobile, setIsMobile] = useState(null);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [projectWindowOpen, setProjectWindowOpen] = useState(false);
  const [roomEntered, setRoomEntered] = useState(false);
  const [pointerLocked, setPointerLocked] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [showLoading, setShowLoading] = useState(true);
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);
  const nameLetters = useMemo(() => "Abhijeet Ranjan".split(""), []);

  useEffect(() => {
    const update = () => {
      setIsMobile(
        /Android|iPhone|iPad|iPod/i.test(window.navigator.userAgent) ||
          window.innerWidth < 768
      );
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (loaded) return undefined;
    const interval = window.setInterval(() => {
      setLoadingTextIndex((index) => (index + 1) % LOADING_MESSAGES.length);
    }, 900);
    return () => window.clearInterval(interval);
  }, [loaded]);

  useEffect(() => {
    if (!loaded) return undefined;
    const timeout = window.setTimeout(() => setShowLoading(false), 800);
    return () => window.clearTimeout(timeout);
  }, [loaded]);

  useEffect(() => {
    if (isMobile !== false || !mountRef.current) return undefined;

    setProgress(0);
    setLoaded(false);
    setShowLoading(true);
    setProjectWindowOpen(false);
    setRoomEntered(false);
    setPointerLocked(false);

    const container = mountRef.current;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(ROOM.bg);

    const camera = new THREE.PerspectiveCamera(
      38,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.copy(CAMERA_INTRO);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = false;
    renderer.shadowMap.autoUpdate = false;
    renderer.domElement.className = "room-canvas";
    renderer.domElement.tabIndex = 0;
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enabled = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minPolarAngle = Math.PI / 6;
    controls.maxPolarAngle = Math.PI / 2.2;
    controls.minAzimuthAngle = -Math.PI / 4;
    controls.maxAzimuthAngle = Math.PI / 4;
    controls.minDistance = 3;
    controls.maxDistance = 12;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.rotateSpeed = 0.28;
    controls.zoomSpeed = 0;
    controls.target.copy(CAMERA_TARGET);
    controls.update();

    const loadingManager = new THREE.LoadingManager();
    loadingManager.onProgress = (_url, loadedItems, totalItems) => {
      setProgress(totalItems ? (loadedItems / totalItems) * 100 : 100);
    };

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco/");
    dracoLoader.setDecoderConfig({ type: "js" });

    const ktx2Loader = new KTX2Loader(loadingManager);
    ktx2Loader.setTranscoderPath("/basis/");
    ktx2Loader.detectSupport(renderer);

    const gltfLoader = new GLTFLoader(loadingManager);
    gltfLoader.setDRACOLoader(dracoLoader);
    const textureLoader = new THREE.TextureLoader(loadingManager);

    const created = [];
    const interactive = [];
    const pressedKeys = new Set();
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const clock = new THREE.Clock();
    let hovered = null;
    let animationFrame = 0;
    let cameraMoveDelay = null;
    let projectWindowDelay = null;
    let roomReady = false;
    let hasEnteredRoom = false;
    let pointerDown = null;

    const loadModel = (url) =>
      new Promise((resolve, reject) => gltfLoader.load(url, resolve, undefined, reject));
    const loadTexture = (url) =>
      new Promise((resolve, reject) => ktx2Loader.load(url, resolve, undefined, reject));
    const loadImageTexture = (url) =>
      new Promise((resolve, reject) => textureLoader.load(url, resolve, undefined, reject));

    Promise.allSettled([
      loadTexture("/textures/baked1.ktx2"),
      loadTexture("/textures/baked2.ktx2"),
      loadTexture("/textures/baked3.ktx2"),
      loadModel("/models/room.glb"),
      loadModel("/models/room2.glb"),
      loadModel("/models/room3.glb"),
      loadModel("/models/leftMonitor.glb"),
      loadModel("/models/rightMonitor.glb"),
      loadModel("/models/arcadeMachine.glb"),
      loadModel("/models/whiteboard.glb"),
      loadModel("/models/topChair.glb"),
      loadModel("/models/github.glb"),
      loadModel("/models/linkedin.glb"),
      ...ROOM_PROJECTS.map((project) => loadImageTexture(project.image)),
    ])
      .then((results) => {
        const item = (index) =>
          results[index].status === "fulfilled" ? results[index].value : null;

        const baked1 = item(0);
        const baked2 = item(1);
        const baked3 = item(2);
        const room1 = item(3);
        const room2 = item(4);
        const room3 = item(5);
        const left = item(6);
        const right = item(7);
        const arcade = item(8);
        const whiteboard = item(9);
        const topChair = item(10);
        const github = item(11);
        const linkedin = item(12);
        const projectTextures = ROOM_PROJECTS.map((_, index) => item(13 + index)).filter(Boolean);

        [baked1, baked2, baked3, ...projectTextures].filter(Boolean).forEach((texture) => {
          texture.colorSpace = THREE.SRGBColorSpace;
          texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
          texture.needsUpdate = true;
        });

        const material1 = baked1
          ? new THREE.MeshBasicMaterial({ map: baked1 })
          : new THREE.MeshBasicMaterial({ color: "#234b5a" });
        const material2 = baked2
          ? new THREE.MeshBasicMaterial({ map: baked2 })
          : new THREE.MeshBasicMaterial({ color: "#284f60" });
        const material3 = baked3
          ? new THREE.MeshBasicMaterial({ map: baked3 })
          : new THREE.MeshBasicMaterial({ color: "#2c5768" });

        if (room1) addBakedScene(room1.scene, material1, "roomBaked1");
        if (room2) addBakedScene(room2.scene, material2, "roomBaked2");
        if (room3) addBakedScene(room3.scene, material3, "roomBaked3");
        if (left) addBakedScene(left.scene, material2, "leftMonitorModel");
        if (right) addBakedScene(right.scene, material2, "rightMonitorModel");
        if (arcade) addBakedScene(arcade.scene, material2, "arcadeMachineModel");
        if (whiteboard) addBakedScene(whiteboard.scene, material1, "whiteboardModel");
        if (topChair) {
          topChair.scene.position.set(1.4027, 0.496728, -1.21048);
          addBakedScene(topChair.scene, material2, "topChairModel");
        }
        if (github) {
          addBakedScene(github.scene, material3, "githubModel");
          addModelInteraction(github.scene, "GitHub profile", () => openExternal(OWNER_LINKS.github));
        }
        if (linkedin) {
          addBakedScene(linkedin.scene, material3, "linkedinModel");
          addModelInteraction(linkedin.scene, "LinkedIn profile", () => openExternal(OWNER_LINKS.linkedIn));
        }

        addMonitorScreens(projectTextures);
        addSocialNotes();
        addStackLabels();
        addEasterEggs();
        addProfilePlaceholder();

        roomReady = true;
        setProgress(100);
        setLoaded(true);
        playIntroCamera();
      });

    function addBakedScene(model, material, name) {
      model.name = name;
      model.traverse((child) => {
        if (child.isMesh) {
          child.material = material;
          child.frustumCulled = true;
        }
      });
      scene.add(model);
      created.push(model);
    }

    function addInteractivePlane({
      name,
      texture,
      position,
      rotation = [0, 0, 0],
      scale = [1, 1, 1],
      size = [1, 1],
      tooltip,
      onClick,
      baseOpacity = 1,
      hoverScale = 1.035,
      hoverOpacity = 1,
    }) {
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: baseOpacity,
        side: THREE.DoubleSide,
        depthWrite: false,
        polygonOffset: true,
        polygonOffsetFactor: -1,
      });
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(size[0], size[1]), material);
      mesh.name = name;
      mesh.position.set(...position);
      mesh.rotation.set(...rotation);
      mesh.scale.set(...scale);
      scene.add(mesh);
      created.push(mesh);
      interactive.push({
        object: mesh,
        tooltip,
        onClick,
        onEnter: () => {
          if (hoverScale !== 1) {
            gsap.to(mesh.scale, {
              x: scale[0] * hoverScale,
              y: scale[1] * hoverScale,
              z: scale[2],
              duration: 0.2,
            });
          }
          gsap.to(material, { opacity: hoverOpacity, duration: 0.2 });
        },
        onLeave: () => {
          if (hoverScale !== 1) {
            gsap.to(mesh.scale, { x: scale[0], y: scale[1], z: scale[2], duration: 0.2 });
          }
          gsap.to(material, { opacity: baseOpacity, duration: 0.2 });
        },
      });
      return mesh;
    }

    function addModelInteraction(model, tooltip, onClick) {
      const baseScale = model.scale.clone();
      model.traverse((child) => {
        if (!child.isMesh) return;
        interactive.push({
          object: child,
          tooltip,
          onClick,
          onEnter: () => {
            gsap.to(model.scale, {
              x: baseScale.x * 1.04,
              y: baseScale.y * 1.04,
              z: baseScale.z * 1.04,
              duration: 0.18,
            });
          },
          onLeave: () => {
            gsap.to(model.scale, {
              x: baseScale.x,
              y: baseScale.y,
              z: baseScale.z,
              duration: 0.18,
            });
          },
        });
      });
    }

    function focusProjectDashboard() {
      window.clearTimeout(projectWindowDelay);
      setProjectWindowOpen(false);
      moveCameraTo(
        new THREE.Vector3(1.55, 2.72, -1.35),
        new THREE.Vector3(1.78, 2.52, -4.18),
        0.95
      );
      projectWindowDelay = window.setTimeout(() => setProjectWindowOpen(true), 620);
    }

    function addMonitorScreens(projectTextures) {
      addInteractivePlane({
        name: "projectsDashboardScreen",
        texture: makeProjectsDashboardTexture(),
        position: SOURCE_SCREEN.leftMonitorPosition,
        size: [SOURCE_SCREEN.monitorWidth, SOURCE_SCREEN.monitorHeight],
        tooltip: "Projects Window - Click to focus",
        onClick: focusProjectDashboard,
        hoverScale: 1,
      });

      addInteractivePlane({
        name: "lawPortfolioPreviewScreen",
        texture:
          projectTextures[1] ||
          makeTexture({
            title: "Law Portfolio",
            subtitle: "professional portfolio build",
            lines: ["interface: clean", "layout: responsive", "status: polished"],
          }),
        position: SOURCE_SCREEN.rightMonitorPosition,
        rotation: [0, SOURCE_SCREEN.rightMonitorRotationY, 0],
        size: [SOURCE_SCREEN.monitorWidth, SOURCE_SCREEN.monitorHeight],
        tooltip: "Featured project - Click to open Projects Window",
        onClick: focusProjectDashboard,
        hoverScale: 1,
      });

      const arcadeScreen = addInteractivePlane({
        name: "sonySidePreviewScreen",
        texture:
          projectTextures[2] ||
          makeTexture({
            width: 768,
            height: 920,
            title: "Projects",
            subtitle: "Featured Work",
            lines: ["updated from GitHub", "click to browse", "open repos from window"],
          }),
        position: SOURCE_SCREEN.arcadePosition,
        size: [SOURCE_SCREEN.arcadeWidth, SOURCE_SCREEN.arcadeHeight],
        tooltip: "Featured project - Click to open Projects Window",
        onClick: focusProjectDashboard,
        hoverScale: 1,
      });
      arcadeScreen.rotation.y = SOURCE_SCREEN.arcadeRotationY;
      arcadeScreen.rotateX(SOURCE_SCREEN.arcadeRotationX);
    }

    function addSocialNotes() {
      const notes = [
        {
          name: "githubSticky",
          text: "GitHub -> Abhi190702",
          bg: "#ffd43b",
          pos: [-3.92, 3.55, -4.59],
          tip: "GitHub -> Abhi190702",
          url: OWNER_LINKS.github,
        },
        {
          name: "linkedinSticky",
          text: "LinkedIn -> Abhijeet Ranjan",
          bg: "#93c5fd",
          pos: [-3.38, 3.47, -4.59],
          tip: "LinkedIn -> Abhijeet Ranjan",
          url: OWNER_LINKS.linkedIn,
        },
        {
          name: "instagramSticky",
          text: "Instagram -> abhi.lonelyfans",
          bg: ROOM.purple,
          pos: [-2.84, 3.55, -4.59],
          tip: "Instagram -> abhi.lonelyfans",
          url: OWNER_LINKS.instagram,
        },
      ];

      notes.forEach((note) => {
        addInteractivePlane({
          name: note.name,
          texture: makeNoteTexture({ background: note.bg, text: note.text }),
          position: note.pos,
          size: [0.42, 0.28],
          tooltip: note.tip,
          onClick: () => openExternal(note.url),
        });
      });
    }

    function addStackLabels() {
      TECH_BOOKS.forEach((book) => {
        const label = addInteractivePlane({
          name: `${book.label}BookLabel`,
          texture: makeTexture({
            width: 256,
            height: 512,
            background: book.color,
            foreground: ROOM.bg,
            accent: book.color,
            title: book.label,
            align: "center",
          }),
          position: book.position,
          size: [0.16, 0.34],
          tooltip: `${book.label} - Part of the stack`,
          onClick: undefined,
        });
        label.rotation.z = 0.02;
      });
    }

    function addEasterEggs() {
      addInteractivePlane({
        name: "terminalPanel",
        texture: makeTexture({
          width: 768,
          height: 384,
          background: "#020402",
          foreground: "#bbf7d0",
          accent: ROOM.green,
          title: "CLI",
          subtitle: "> ready",
          lines: ["> whoami", "> _"],
        }),
        position: [-0.24, 3.04, -4.58],
        size: [0.75, 0.38],
        tooltip: "Click to open terminal",
        onClick: () => {
          moveCameraTo(new THREE.Vector3(-0.35, 3, -1.75), new THREE.Vector3(-0.24, 3.04, -4.58), 1);
          window.setTimeout(() => setTerminalOpen(true), 450);
        },
      });

      addInteractivePlane({
        name: "cyberPoster",
        texture: makeTexture({
          width: 768,
          height: 1024,
          background: ROOM.bg,
          foreground: ROOM.text,
          accent: ROOM.cyan,
          title: "0x",
          subtitle: "ethical mode",
          lines: ["  .-.", " (0_0)", " /|#|\\", "audit. learn. harden."],
          align: "center",
        }),
        position: [3.72, 2.85, -4.58],
        size: [0.54, 0.72],
        tooltip: "Stay curious. Stay ethical.",
      });

      const orbMaterial = new THREE.MeshBasicMaterial({ color: ROOM.purple });
      const orb = new THREE.Mesh(new THREE.SphereGeometry(0.12, 32, 32), orbMaterial);
      orb.position.set(0.05, 2.05, -3.35);
      scene.add(orb);
      created.push(orb);
      interactive.push({
        object: orb,
        tooltip: "Currently obsessing over LLMs",
        onClick: () => console.log("tokens hum softly\npatterns wake in blue light\nquestions learn to bloom"),
        onEnter: () => gsap.to(orb.scale, { x: 1.18, y: 1.18, z: 1.18, duration: 0.2 }),
        onLeave: () => gsap.to(orb.scale, { x: 1, y: 1, z: 1, duration: 0.2 }),
      });
    }

    function addProfilePlaceholder() {
      // TODO: Replace with assets/photos/profile.jpg
      addInteractivePlane({
        name: "profilePlaceholder",
        texture: makeTexture({
          width: 768,
          height: 768,
          background: ROOM.surface,
          foreground: ROOM.text,
          accent: ROOM.cyan,
          title: "AR",
          subtitle: "Abhijeet Ranjan",
          lines: ["cybersec", "ai/llm", "devops"],
          align: "center",
        }),
        position: [3.72, 1.75, -4.58],
        size: [0.62, 0.62],
        tooltip: "Abhijeet Ranjan",
      });
    }

    function updateTooltip(event, text) {
      const tooltip = tooltipRef.current;
      if (!tooltip) return;
      tooltip.textContent = text || "";
      tooltip.style.left = `${event.clientX + 15}px`;
      tooltip.style.top = `${event.clientY + 15}px`;
      tooltip.style.opacity = text ? "1" : "0";
    }

    function setHovered(next, event) {
      if (hovered === next) {
        if (next) updateTooltip(event, next.tooltip);
        return;
      }
      hovered?.onLeave?.();
      hovered = next;
      hovered?.onEnter?.();
      renderer.domElement.style.cursor = hovered ? "pointer" : "grab";
      updateTooltip(event, hovered?.tooltip);
    }

    function handlePointerMove(event) {
      const bounds = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      pointer.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(interactive.map((item) => item.object), false);
      setHovered(
        hits.length ? interactive.find((item) => item.object === hits[0].object) : null,
        event
      );
    }

    function handlePointerLeave() {
      hovered?.onLeave?.();
      hovered = null;
      renderer.domElement.style.cursor = "grab";
      updateTooltip({ clientX: 0, clientY: 0 }, "");
    }

    function handlePointerDown(event) {
      pointerDown = new THREE.Vector2(event.clientX, event.clientY);
    }

    function enterExploreMode() {
      if (!hasEnteredRoom) {
        hasEnteredRoom = true;
        setRoomEntered(true);
      }
      renderer.domElement.focus?.();
    }

    function handlePointerUp(event) {
      if (!pointerDown) return;
      const pointerUp = new THREE.Vector2(event.clientX, event.clientY);
      const isClick = pointerUp.distanceTo(pointerDown) < 6;
      pointerDown = null;
      if (!isClick) return;
      if (!hasEnteredRoom) {
        enterExploreMode();
        return;
      }
      if (!hovered) {
        enterExploreMode();
        return;
      }
      hovered?.onClick?.();
    }

    function handlePointerLockChange() {
      setPointerLocked(document.pointerLockElement === renderer.domElement);
    }

    function handleLockedMouseMove(event) {
      if (document.pointerLockElement !== renderer.domElement) return;
      const offset = camera.position.clone().sub(controls.target);
      const spherical = new THREE.Spherical().setFromVector3(offset);
      spherical.theta -= event.movementX * 0.0014;
      spherical.phi -= event.movementY * 0.0014;
      spherical.phi = Math.max(Math.PI / 6, Math.min(Math.PI / 2.15, spherical.phi));
      offset.setFromSpherical(spherical);
      camera.position.copy(controls.target).add(offset);
      controls.update();
    }

    function handleKeyDown(event) {
      const key = event.key.toLowerCase();
      if (["w", "a", "s", "d"].includes(key)) {
        event.preventDefault();
        pressedKeys.add(key);
        setRoomEntered(true);
        hasEnteredRoom = true;
      }
    }

    function handleKeyUp(event) {
      pressedKeys.delete(event.key.toLowerCase());
    }

    function clampCameraRig() {
      const targetBefore = controls.target.clone();
      controls.target.x = THREE.MathUtils.clamp(controls.target.x, -3.8, 3.8);
      controls.target.y = THREE.MathUtils.clamp(controls.target.y, 1.15, 3.35);
      controls.target.z = THREE.MathUtils.clamp(controls.target.z, -4.8, 2.2);
      const correction = controls.target.clone().sub(targetBefore);
      camera.position.add(correction);
    }

    function moveCameraTo(position, target, duration = 1.2) {
      window.clearTimeout(cameraMoveDelay);
      if (document.pointerLockElement === renderer.domElement) document.exitPointerLock?.();
      gsap.killTweensOf(camera.position);
      gsap.killTweensOf(controls.target);
      controls.enabled = false;
      gsap.to(camera.position, {
        x: position.x,
        y: position.y,
        z: position.z,
        duration,
        ease: "power2.inOut",
        onUpdate: () => controls.update(),
      });
      gsap.to(controls.target, {
        x: target.x,
        y: target.y,
        z: target.z,
        duration,
        ease: "power2.inOut",
        onUpdate: () => controls.update(),
        onComplete: () => {
          clampCameraRig();
          controls.enabled = true;
        },
      });
    }

    function playIntroCamera() {
      controls.enabled = false;
      gsap.to(camera.position, {
        x: CAMERA_DEFAULT.x,
        y: CAMERA_DEFAULT.y,
        z: CAMERA_DEFAULT.z,
        duration: 1.8,
        ease: "power3.out",
        onUpdate: () => controls.update(),
      });
      gsap.to(controls.target, {
        x: CAMERA_TARGET.x,
        y: CAMERA_TARGET.y,
        z: CAMERA_TARGET.z,
        duration: 1.8,
        ease: "power3.out",
        onUpdate: () => controls.update(),
        onComplete: () => {
          controls.enabled = true;
        },
      });
    }

    function resize() {
      if (!container.clientWidth || !container.clientHeight) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    }

    function animate() {
      const delta = Math.min(clock.getDelta(), 0.04);
      if (roomReady) {
        const time = clock.elapsedTime;
        const orb = interactive.find((item) => item.tooltip === "Currently obsessing over LLMs")?.object;
        if (orb) orb.position.y = 2.05 + Math.sin(time * 1.8) * 0.035;

        if (pressedKeys.size) {
          const forward = new THREE.Vector3();
          camera.getWorldDirection(forward);
          forward.y = 0;
          forward.normalize();
          const right = new THREE.Vector3().crossVectors(forward, camera.up).normalize();
          const move = new THREE.Vector3();
          if (pressedKeys.has("w")) move.add(forward);
          if (pressedKeys.has("s")) move.sub(forward);
          if (pressedKeys.has("d")) move.add(right);
          if (pressedKeys.has("a")) move.sub(right);
          if (move.lengthSq() > 0) {
            move.normalize().multiplyScalar(delta * 1.55);
            camera.position.add(move);
            controls.target.add(move);
            clampCameraRig();
          }
        }
      }
      controls.update();
      renderer.render(scene, camera);
      animationFrame = window.requestAnimationFrame(animate);
    }

    renderer.domElement.addEventListener("pointermove", handlePointerMove);
    renderer.domElement.addEventListener("pointerdown", handlePointerDown);
    renderer.domElement.addEventListener("pointerleave", handlePointerLeave);
    renderer.domElement.addEventListener("pointerup", handlePointerUp);
    document.addEventListener("pointerlockchange", handlePointerLockChange);
    document.addEventListener("mousemove", handleLockedMouseMove);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("resize", resize);
    animate();

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(cameraMoveDelay);
      window.clearTimeout(projectWindowDelay);
      window.removeEventListener("resize", resize);
      renderer.domElement.removeEventListener("pointermove", handlePointerMove);
      renderer.domElement.removeEventListener("pointerdown", handlePointerDown);
      renderer.domElement.removeEventListener("pointerleave", handlePointerLeave);
      renderer.domElement.removeEventListener("pointerup", handlePointerUp);
      document.removeEventListener("pointerlockchange", handlePointerLockChange);
      document.removeEventListener("mousemove", handleLockedMouseMove);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      if (document.pointerLockElement === renderer.domElement) document.exitPointerLock?.();
      gsap.killTweensOf(camera.position);
      gsap.killTweensOf(controls.target);
      controls.dispose();
      dracoLoader.dispose();
      ktx2Loader.dispose();
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) disposeMaterial(object.material);
      });
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isMobile]);

  if (isMobile === null) return <div className="room3d-pending" aria-hidden="true" />;

  return (
    <div className="room3d-wrapper">
      {isMobile ? (
        <MobileFallback />
      ) : (
        <>
          <div ref={mountRef} className="room3d-stage" />
          <div className="room-hud" aria-live="polite">
            <div className="room-hud-pill">
              <Keyboard size={15} />
              <span>W/A/S/D move</span>
            </div>
            <div className="room-hud-pill">
              <MousePointer2 size={15} />
              <span>Drag mouse to look</span>
            </div>
            <div className="room-hud-pill">
              <ExternalLink size={15} />
              <span>Click objects to interact</span>
            </div>
            <div className="room-hud-status">
              {pointerLocked
                ? "Esc exits mouse look"
                : roomEntered
                  ? "Explore mode active"
                  : "Click once to enter the room"}
            </div>
          </div>
          {showLoading && (
            <div className={`room-loading ${loaded ? "room-loading-hidden" : ""}`}>
              <div className="room-loading-monogram">AR</div>
              <div className="room-loading-name" aria-label="Abhijeet Ranjan">
                {nameLetters.map((letter, index) => (
                  <span key={`${letter}-${index}`} style={{ animationDelay: `${index * 45}ms` }}>
                    {letter === " " ? "\u00a0" : letter}
                  </span>
                ))}
              </div>
              <div className="room-loading-bar">
                <div style={{ width: `${progress}%` }} />
              </div>
              <p>{LOADING_MESSAGES[loadingTextIndex]}</p>
            </div>
          )}
          <div id="room-tooltip" ref={tooltipRef} />
          <ProjectsWindow open={projectWindowOpen} onClose={() => setProjectWindowOpen(false)} />
          <TerminalOverlay open={terminalOpen} onClose={() => setTerminalOpen(false)} />
        </>
      )}
      <style jsx global>{`
        .room3d-wrapper {
          position: relative;
          width: 100%;
          height: min(78vh, 760px);
          min-height: 620px;
          overflow: hidden;
          background: ${ROOM.bg};
          color: ${ROOM.text};
          border: 1px solid rgba(0, 212, 255, 0.18);
          contain: layout paint style;
        }

        .room3d-stage {
          position: absolute;
          inset: 0;
        }

        .room-hud {
          position: absolute;
          left: 18px;
          top: 18px;
          z-index: 10;
          display: flex;
          max-width: min(720px, calc(100% - 36px));
          flex-wrap: wrap;
          gap: 8px;
          pointer-events: none;
          font: 12px/1.2 monospace;
        }

        .room-hud-pill,
        .room-hud-status {
          display: inline-flex;
          align-items: center;
          min-height: 32px;
          gap: 7px;
          border: 1px solid rgba(0, 212, 255, 0.22);
          border-radius: 6px;
          background: rgba(3, 7, 18, 0.72);
          color: rgba(226, 232, 240, 0.86);
          padding: 8px 10px;
          backdrop-filter: blur(10px);
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.22);
        }

        .room-hud-pill svg {
          color: ${ROOM.cyan};
          flex: 0 0 auto;
        }

        .room-hud-status {
          color: ${ROOM.cyan};
        }

        .room3d-pending {
          min-height: 420px;
          background: ${ROOM.bg};
        }

        .room-loading {
          position: absolute;
          inset: 0;
          z-index: 20;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 18px;
          background: ${ROOM.bg};
          opacity: 1;
          transition: opacity 800ms ease;
        }

        .room-loading-hidden {
          pointer-events: none;
          opacity: 0;
        }

        .room-loading-monogram {
          color: ${ROOM.cyan};
          font: 800 82px/1 monospace;
          text-shadow: 0 0 18px rgba(0, 212, 255, 0.6), 0 0 42px rgba(0, 212, 255, 0.6);
        }

        .room-loading-name {
          display: flex;
          font: 500 16px/1 monospace;
          color: ${ROOM.text};
        }

        .room-loading-name span {
          opacity: 0;
          animation: room-letter 420ms ease forwards;
        }

        .room-loading-bar {
          width: min(340px, 68vw);
          height: 2px;
          background: rgba(226, 232, 240, 0.12);
          overflow: hidden;
        }

        .room-loading-bar div {
          height: 100%;
          background: ${ROOM.cyan};
          box-shadow: 0 0 16px rgba(0, 212, 255, 0.6);
          transition: width 220ms ease;
        }

        .room-loading p {
          min-height: 20px;
          color: rgba(226, 232, 240, 0.72);
          font: 13px/1.4 monospace;
        }

        #room-tooltip {
          position: fixed;
          z-index: 1000;
          pointer-events: none;
          opacity: 0;
          padding: 6px 12px;
          border: 1px solid ${ROOM.cyan};
          border-radius: 6px;
          background: rgba(10, 10, 15, 0.9);
          color: ${ROOM.text};
          font: 13px/1.3 monospace;
          transition: opacity 0.2s ease;
          box-shadow: 0 0 18px rgba(0, 212, 255, 0.18);
        }

        .room-terminal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 999;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.62);
        }

        .room-terminal {
          position: relative;
          width: min(680px, calc(100vw - 32px));
          min-height: 310px;
          padding: 26px;
          overflow: hidden;
          border: 1px solid rgba(34, 197, 94, 0.45);
          background: #020402;
          color: #6ee787;
          box-shadow: 0 0 32px rgba(34, 197, 94, 0.18);
        }

        .room-terminal::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: repeating-linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.05),
            rgba(255, 255, 255, 0.05) 1px,
            transparent 1px,
            transparent 5px
          );
        }

        .room-terminal pre {
          position: relative;
          z-index: 1;
          margin: 0;
          white-space: pre-wrap;
          font: 16px/1.7 monospace;
        }

        .room-project-window {
          position: absolute;
          right: 22px;
          bottom: 22px;
          z-index: 12;
          width: min(860px, calc(100% - 44px));
          max-height: min(70vh, 560px);
          overflow: hidden;
          border: 1px solid rgba(0, 212, 255, 0.32);
          border-radius: 8px;
          background: rgba(5, 8, 15, 0.94);
          color: ${ROOM.text};
          box-shadow: 0 24px 80px rgba(0, 0, 0, 0.48), 0 0 40px rgba(0, 212, 255, 0.12);
          backdrop-filter: blur(16px);
          animation: room-window-in 260ms ease forwards;
        }

        .room-project-window-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          border-bottom: 1px solid rgba(226, 232, 240, 0.1);
          background: rgba(255, 255, 255, 0.06);
          padding: 12px 14px;
        }

        .room-project-window-bar span,
        .room-project-window-bar small {
          display: block;
          font-family: monospace;
        }

        .room-project-window-bar span {
          font-size: 14px;
          font-weight: 800;
        }

        .room-project-window-bar small {
          margin-top: 2px;
          color: rgba(226, 232, 240, 0.58);
          font-size: 11px;
        }

        .room-project-window-bar button {
          display: grid;
          width: 32px;
          height: 32px;
          flex: 0 0 auto;
          place-items: center;
          border: 1px solid rgba(226, 232, 240, 0.16);
          border-radius: 6px;
          background: rgba(15, 17, 23, 0.9);
          color: ${ROOM.text};
          cursor: pointer;
        }

        .room-project-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
          max-height: calc(min(70vh, 560px) - 58px);
          overflow: auto;
          padding: 14px;
        }

        .room-project-card {
          min-width: 0;
          overflow: hidden;
          border: 1px solid rgba(226, 232, 240, 0.1);
          border-radius: 8px;
          background: rgba(15, 17, 23, 0.86);
          transition: transform 180ms ease, border-color 180ms ease;
        }

        .room-project-card:hover {
          transform: translateY(-3px);
          border-color: rgba(0, 212, 255, 0.42);
        }

        .room-project-card img {
          display: block;
          width: 100%;
          aspect-ratio: 16 / 10;
          object-fit: cover;
          background: #020617;
        }

        .room-project-card div {
          display: grid;
          gap: 9px;
          padding: 12px;
        }

        .room-project-card span {
          font: 800 10px/1.2 monospace;
          text-transform: uppercase;
        }

        .room-project-card h3 {
          margin: 0;
          font: 800 15px/1.2 monospace;
        }

        .room-project-card p {
          min-height: 62px;
          margin: 0;
          color: rgba(226, 232, 240, 0.62);
          font: 12px/1.45 monospace;
        }

        .room-project-card button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-height: 34px;
          border: 1px solid rgba(0, 212, 255, 0.34);
          border-radius: 6px;
          background: ${ROOM.cyan};
          color: #020617;
          cursor: pointer;
          font: 800 12px/1 monospace;
          transition: transform 160ms ease, background 160ms ease;
        }

        .room-project-card button:hover {
          transform: translateY(-1px);
          background: #7dd3fc;
        }

        .room-mobile-shell {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 18px;
          padding: 32px 20px;
          background: ${ROOM.bg};
          color: ${ROOM.text};
          opacity: 0;
          animation: room-fade-in 0.8s ease forwards;
        }

        .room-mobile-avatar {
          display: grid;
          place-items: center;
          width: 96px;
          height: 96px;
          border: 1px solid ${ROOM.cyan};
          border-radius: 50%;
          color: ${ROOM.cyan};
          font: 800 34px/1 monospace;
          box-shadow: 0 0 28px rgba(0, 212, 255, 0.6);
          animation: room-pulse 2.4s ease-in-out infinite;
        }

        .room-mobile-shell h3 {
          margin: 0;
          font: 700 32px/1.1 monospace;
          text-align: center;
        }

        .room-mobile-shell p,
        .room-mobile-desktop-note {
          margin: 0;
          color: rgba(226, 232, 240, 0.72);
          font: 14px/1.4 monospace;
          text-align: center;
        }

        .room-mobile-projects {
          width: min(360px, 100%);
          display: grid;
          gap: 10px;
          margin-top: 10px;
        }

        .room-mobile-projects a,
        .room-mobile-socials a {
          color: ${ROOM.text};
          text-decoration: none;
          background: ${ROOM.surface};
          border: 1px solid rgba(0, 212, 255, 0.28);
        }

        .room-mobile-projects a {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 16px;
          font: 14px/1 monospace;
        }

        .room-mobile-socials {
          display: flex;
          gap: 12px;
        }

        .room-mobile-socials a {
          display: grid;
          place-items: center;
          width: 44px;
          height: 44px;
        }

        @keyframes room-letter {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes room-fade-in {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes room-pulse {
          0%,
          100% {
            box-shadow: 0 0 22px rgba(0, 212, 255, 0.42);
          }
          50% {
            box-shadow: 0 0 42px rgba(0, 212, 255, 0.72);
          }
        }

        @keyframes room-window-in {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @media (max-width: 767px) {
          .room3d-wrapper {
            min-height: 100vh;
            height: auto;
            border: 0;
          }
        }

        @media (max-width: 980px) {
          .room-project-grid {
            grid-template-columns: 1fr;
          }

          .room-project-window {
            left: 16px;
            right: 16px;
            bottom: 16px;
            width: auto;
          }
        }
      `}</style>
    </div>
  );
}
