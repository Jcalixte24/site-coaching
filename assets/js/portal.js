// Portail « Qui êtes-vous ? » : le logo en 3D (anneau et triangle en or, lauriers en argent).
// - s'assemble à l'arrivée, flotte, suit légèrement la souris ;
// - penche vers l'espace survolé ;
// - au clic, la caméra traverse l'anneau puis la page s'ouvre.
// Reste en SVG animé si : mouvement réduit demandé, économie de données / 2G-3G, ou pas de WebGL.
const root = document.documentElement;
const stage = document.querySelector(".portal-stage");
const canvas = document.getElementById("pin3d");
const fade = document.getElementById("portal-fade");
const choices = document.querySelectorAll(".choice[data-side]");

const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const conn = navigator.connection;
const slow = !!(conn && (conn.saveData || /(^|-)(2g|3g)$/.test(conn.effectiveType || "")));
const hasGL = (() => {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch (e) {
    return false;
  }
})();

let lean = 0; // -1 candidat, 1 employeur
choices.forEach((c) => {
  const side = +c.dataset.side;
  c.addEventListener("pointerenter", () => (lean = side));
  c.addEventListener("pointerleave", () => (lean = 0));
  c.addEventListener("focus", () => (lean = side));
  c.addEventListener("blur", () => (lean = 0));
});

if (stage && canvas && !reduce && !slow && hasGL) start().catch(() => root.classList.remove("pin-3d"));

async function start() {
  const THREE = await import("https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.min.js");

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(30, 1, 0.05, 100);
  const CAM_Z = 13.2;
  cam.position.set(0, 0.1, CAM_Z);

  // Studio photo virtuel pour les reflets du métal
  const env = new THREE.Scene();
  env.add(new THREE.Mesh(new THREE.BoxGeometry(24, 24, 24), new THREE.MeshBasicMaterial({ color: 0x8a8580, side: THREE.BackSide })));
  const lamp = (w, h, x, y, z, k) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(k, k, k), side: THREE.DoubleSide }));
    m.position.set(x, y, z);
    m.lookAt(0, 0, 0);
    env.add(m);
  };
  lamp(10, 3, 0, 10, 2, 7);
  lamp(3, 10, -10, 1, 3, 5);
  lamp(3, 9, 10, 0, -2, 4);
  lamp(8, 2, 0, -7, 9, 2.5);
  lamp(5, 5, 4, 3, 10, 3);
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(env, 0.035).texture;

  const key = new THREE.DirectionalLight(0xfff1dc, 1.6);
  key.position.set(3, 5, 6);
  const rim = new THREE.DirectionalLight(0xe9c98f, 1.2);
  rim.position.set(-6, 2, -4);
  scene.add(key, rim, new THREE.AmbientLight(0xffffff, 0.25));

  const gold = new THREE.MeshStandardMaterial({ color: 0xc9a46a, metalness: 1, roughness: 0.26 });
  const silver = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.9, roughness: 0.16 });

  // Coordonnées reprises du logo SVG (unité = 58 px de rayon d'anneau)
  const S = 1.55 / 58;
  const P = (x, y) => new THREE.Vector2((x - 100) * S, 1.0 - (y - 88) * S);

  const pin = new THREE.Group();
  scene.add(pin);

  // Anneau ouvert en bas (là où passent les lauriers)
  const arc = THREE.MathUtils.degToRad(236);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(1.55, 0.2, 40, 180, arc), gold);
  ring.position.set(0, 1.0, 0);
  ring.rotation.z = THREE.MathUtils.degToRad(-28);
  pin.add(ring);

  // Triangle évidé + deux échelons
  const tri = new THREE.Group();
  const shape = new THREE.Shape([P(56, 142), P(144, 142), P(100, 230)]);
  shape.holes.push(new THREE.Path([P(75, 154), P(100, 204), P(125, 154)]));
  const ext = { depth: 0.34, bevelEnabled: true, bevelThickness: 0.035, bevelSize: 0.03, bevelSegments: 3, curveSegments: 4 };
  const triMesh = new THREE.Mesh(new THREE.ExtrudeGeometry(shape, ext), gold);
  triMesh.position.z = -0.17;
  tri.add(triMesh);
  const rung = (x, y, w) => {
    const g = new THREE.Mesh(new THREE.BoxGeometry(w * S, 8 * S, 0.3), gold);
    const c = P(x + w / 2, y + 4);
    g.position.set(c.x, c.y, 0);
    tri.add(g);
    return g;
  };
  const rungs = [rung(79, 165, 42), rung(88, 183, 24)];
  pin.add(tri);

  // Lauriers argentés : même tracé que le SVG
  const laurel = new THREE.Group();
  const leaves = [];
  const leafGeo = (L, W) => {
    const s = new THREE.Shape();
    s.moveTo(0, 0);
    s.bezierCurveTo(L * 0.3, W, L * 0.75, W * 0.8, L, 0);
    s.bezierCurveTo(L * 0.75, -W * 0.8, L * 0.3, -W, 0, 0);
    const g = new THREE.ExtrudeGeometry(s, { depth: 0.03, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.012, bevelSegments: 2, curveSegments: 10 });
    g.translate(0, 0, -0.03);
    return g;
  };
  for (const side of [-1, 1]) {
    const pts = [];
    const N = 8;
    for (let i = 0; i <= N; i++) {
      const t = i / N;
      pts.push(P(100 + side * (8 + 50 * t), 150 - 6 - 34 * Math.pow(t, 1.6)));
    }
    const curve = new THREE.CatmullRomCurve3(pts.map((p) => new THREE.Vector3(p.x, p.y, 0.05)));
    laurel.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 40, 0.018, 8, false), silver));
    for (let i = 1; i <= N; i++) {
      const a = pts[i - 1], b = pts[i];
      const tang = Math.atan2(b.y - a.y, b.x - a.x);
      const size = (16 - i * 0.7) * S;
      for (const [off, k] of [[0.84, 1], [-0.7, 0.92]]) {
        const m = new THREE.Mesh(leafGeo(size * k, size * k * 0.34), silver);
        m.position.set(b.x, b.y, 0.05);
        m.rotation.z = tang + off;
        m.userData = { order: i, rest: m.rotation.z };
        laurel.add(m);
        leaves.push(m);
      }
    }
  }
  pin.add(laurel);

  // Centrage vertical du logo
  pin.position.y = 0.05;

  function size() {
    const r = stage.getBoundingClientRect();
    renderer.setSize(r.width, r.height, false);
    cam.aspect = r.width / r.height;
    // le logo (≈ 3,6 × 5,6 unités) tient dans le cadre quel que soit le format
    const fit = Math.max(5.9 / (2 * Math.tan(THREE.MathUtils.degToRad(15))), 3.9 / (2 * Math.tan(THREE.MathUtils.degToRad(15)) * cam.aspect));
    cam.userData.z = fit + 1.2;
    cam.position.z = cam.userData.z;
    cam.updateProjectionMatrix();
  }
  size();
  addEventListener("resize", size);

  // Souris (desktop) : légère parallaxe
  const mouse = { x: 0, y: 0 };
  addEventListener("pointermove", (e) => {
    mouse.x = (e.clientX / innerWidth) * 2 - 1;
    mouse.y = (e.clientY / innerHeight) * 2 - 1;
  });

  // Plongée dans l'anneau au clic sur un espace
  let dive = null;
  choices.forEach((c) =>
    c.addEventListener("click", (e) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      lean = +c.dataset.side;
      dive = { t0: performance.now(), href: c.href };
      setTimeout(() => fade && fade.classList.add("on"), 650);
      setTimeout(() => (location.href = c.href), 1150);
    })
  );

  const ease = (t) => 1 - Math.pow(1 - Math.min(Math.max(t, 0), 1), 3);
  const t0 = performance.now();
  let rotY = 0, rotX = 0, visible = true;
  document.addEventListener("visibilitychange", () => (visible = !document.hidden));
  root.classList.add("pin-3d");

  function frame(now) {
    requestAnimationFrame(frame);
    if (!visible) return;
    const t = (now - t0) / 1000;

    // Assemblage : l'anneau tourne et se pose, le triangle monte, les échelons glissent, les feuilles s'ouvrent
    const a = ease(t / 1.4);
    ring.scale.setScalar(0.6 + 0.4 * a);
    ring.rotation.y = (1 - a) * Math.PI * 1.5;
    const b = ease((t - 0.35) / 1.1);
    tri.position.y = -1.6 * (1 - b);
    tri.scale.set(1, 0.4 + 0.6 * b, 1);
    rungs[0].position.x = -1.4 * (1 - ease((t - 0.8) / 0.8));
    rungs[1].position.x = 1.4 * (1 - ease((t - 0.95) / 0.8));
    leaves.forEach((m) => {
      const k = ease((t - 1.1 - m.userData.order * 0.07) / 0.6);
      m.scale.setScalar(Math.max(k, 0.0001));
    });

    // Flottement + souris + penchant vers l'espace survolé
    const targetY = Math.sin(t * 0.45) * 0.32 + mouse.x * 0.22 + lean * 0.55;
    const targetX = mouse.y * 0.1 + Math.sin(t * 0.3) * 0.04;
    rotY += (targetY - rotY) * 0.05;
    rotX += (targetX - rotX) * 0.05;
    pin.rotation.y = rotY;
    pin.rotation.x = rotX;
    pin.position.y = 0.05 + Math.sin(t * 0.9) * 0.06;

    // Traversée de l'anneau
    if (dive) {
      const d = ease((now - dive.t0) / 1100);
      const z = cam.userData.z;
      cam.position.set(0, 1.0 * d + 0.1 * (1 - d), z + (-0.6 - z) * d);
      cam.fov = 30 + 25 * d;
      cam.updateProjectionMatrix();
      pin.rotation.y += (0 - pin.rotation.y) * d;
    }
    renderer.render(scene, cam);
  }
  requestAnimationFrame(frame);
}
