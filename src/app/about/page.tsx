'use client';

import { useEffect, useRef } from 'react';

export default function AboutPage() {
  const mountRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !mountRef.current) return;

    // Masquer la navbar
    const navbar = document.querySelector('header');
    if (navbar) {
      (navbar as HTMLElement).style.display = 'none';
    }

    // Créer le canvas
    const canvas = document.createElement('canvas');
    canvas.id = 'cvs';
    canvas.style.display = 'block';
    canvasRef.current = canvas;
    mountRef.current.appendChild(canvas);

    let cleanup: (() => void) | null = null;

    // Initialiser Three.js
    const initScene = async () => {
      const THREE = await import('three');
      const { GLTFLoader } = await import('three/addons/loaders/GLTFLoader.js');
      const { OrbitControls } = await import('three/addons/controls/OrbitControls.js');

      // ===== SCÈNE ET RENDU =====
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);

      // ===== CONTROLES =====
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.enabled = false;
      controls.minDistance = 5;
      controls.maxDistance = 100;
      controls.minPolarAngle = 0.1;
      controls.maxPolarAngle = Math.PI / 2 - 0.05;

      camera.position.set(-30, 30, -10);

      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
      };
      window.addEventListener('resize', handleResize);

      // Fonction sleep pour l'intro
      const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

      // Barre de progression pour maintien sur la porte
      const doorProgressContainer = document.createElement('div');
      Object.assign(doorProgressContainer.style, {
        position: 'absolute',
        top: '50px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '220px',
        height: '14px',
        background: 'rgba(255,255,255,0.15)',
        borderRadius: '8px',
        overflow: 'hidden',
        display: 'none',
        zIndex: '1001'
      });
      const doorProgressBar = document.createElement('div');
      Object.assign(doorProgressBar.style, {
        height: '100%',
        width: '0%',
        background: 'linear-gradient(90deg,#88ccff,#88ffcc)',
        transition: 'width 0.05s linear'
      });
      doorProgressContainer.appendChild(doorProgressBar);
      document.body.appendChild(doorProgressContainer);

      // ===== INTRO OVERLAY =====
      let introDone = false;
      const introOverlay = document.createElement('div');
      Object.assign(introOverlay.style, {
        position: 'fixed',
        left: '0', top: '0', right: '0', bottom: '0',
        background: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '2000',
        opacity: '1',
        transition: 'opacity 0.8s ease'
      });
      const introText = document.createElement('div');
      Object.assign(introText.style, {
        color: '#fff',
        fontSize: '72px',
        fontFamily: "'Great Vibes', 'Dancing Script', cursive",
        textAlign: 'center',
        maxWidth: '90%',
        lineHeight: '1.1',
        padding: '20px',
        textShadow: '0 6px 18px rgba(0,0,0,0.7)'
      });
      introOverlay.appendChild(introText);
      
      const gf = document.createElement('link');
      gf.rel = 'stylesheet';
      gf.href = 'https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap';
      document.head.appendChild(gf);
      document.body.appendChild(introOverlay);

      const introSkipHint = document.createElement('div');
      Object.assign(introSkipHint.style, {
        position: 'fixed',
        right: '14px',
        bottom: '14px',
        color: '#fff',
        background: 'rgba(0,0,0,0.4)',
        padding: '8px 12px',
        borderRadius: '6px',
        fontSize: '14px',
        zIndex: '2001',
        pointerEvents: 'none',
        opacity: '1'
      });
      introSkipHint.textContent = 'Appuyez sur Espace pour passer';
      document.body.appendChild(introSkipHint);
      
      let introSkipRequested = false;

      const skipIntro = async () => {
        if (introDone) return;
        introSkipRequested = true;
        try {
          introText.style.opacity = '0';
          introOverlay.style.opacity = '0';
        } catch (e) {}
        const overlayFade = 800;
        await sleep(overlayFade);
        try { introOverlay.style.display = 'none'; } catch(e) {}
        introDone = true;
        controls.enabled = false;
        try { introSkipHint.style.display = 'none'; } catch(e){}
        if (typeof lockPointer === 'function') lockPointer();
        // Initialize room 1 visibility
        updateDoorsVisibility();
      };

      const onIntroKeyDown = (e: KeyboardEvent) => {
        if ((e.code === 'Space' || e.key === ' ') && !introDone) {
          e.preventDefault();
          skipIntro();
        }
      };
      document.addEventListener('keydown', onIntroKeyDown);

      const introMessages = [
        'Bienvenue dans mon monde.',
        'Retraçons mon parcours.',
        'Chaque salle correspond à une partie de ma vie.',
        'Explorez autant que vous voulez'
      ];

      const playIntro = async () => {
        introOverlay.style.display = 'flex';
        introOverlay.style.opacity = '1';
        introText.style.opacity = '0';
        introText.style.transition = 'opacity 1.2s ease';

        const visibleTime = 1600;
        const fadeTime = 1200;

        for (let i = 0; i < introMessages.length; i++) {
          if (introSkipRequested) break;
          introText.textContent = introMessages[i];
          introText.style.opacity = '1';
          await sleep(visibleTime);
          introText.style.opacity = '0';
          await sleep(fadeTime);
          if (introSkipRequested) break;
        }

        const overlayFade = 800;
        introOverlay.style.opacity = '0';
        await sleep(overlayFade);
        introOverlay.style.display = 'none';
        introDone = true;
        try { introSkipHint.style.display = 'none'; } catch (e) {}
        controls.enabled = false;
        if (typeof lockPointer === 'function') lockPointer();
        // Afficher l'indication pour revenir au menu une fois l'intro terminée
        escapeHint.style.opacity = '1';
      };

      playIntro().catch(err => { 
        console.error('Intro failed:', err); 
        try { introOverlay.style.opacity = '0'; introOverlay.style.display = 'none'; } catch(e){}
        try { introSkipHint.style.display = 'none'; } catch (e) {}
        introDone = true; 
        controls.enabled = false;
        escapeHint.style.opacity = '1';
      });

      // ===== LUMIÈRES =====
      scene.add(new THREE.AmbientLight(0xffffff, 0.6));
      const dirLight = new THREE.DirectionalLight(0xffffff, 1);
      dirLight.position.set(10, 20, 10);
      scene.add(dirLight);

      // ===== SOL =====
      const planeGeo = new THREE.PlaneGeometry(2000, 2000, 200, 200);
      const planeMat = new THREE.MeshStandardMaterial({ 
        color: 0x228B22, 
        side: THREE.DoubleSide,
        roughness: 0.9,
        metalness: 0.1
      });
      const meshPlane = new THREE.Mesh(planeGeo, planeMat);
      meshPlane.rotation.x = -Math.PI / 2;
      meshPlane.receiveShadow = true;
      scene.add(meshPlane);

      const textureLoader = new THREE.TextureLoader();

      // Charger la texture de base (diffuse/color)
      textureLoader.load(
        'https://threejs.org/examples/textures/terrain/grasslight-big.jpg',
        (texture) => {
          texture.wrapS = THREE.RepeatWrapping;
          texture.wrapT = THREE.RepeatWrapping;
          texture.repeat.set(40, 40);
          planeMat.map = texture;
          planeMat.needsUpdate = true;
        },
        undefined,
        (err) => {
          console.warn('Texture d\'herbe non chargée, utilisation de la couleur de base');
        }
      );

      // Normal map procédurale
      const normalCanvas = document.createElement('canvas');
      normalCanvas.width = 512;
      normalCanvas.height = 512;
      const normalCtx = normalCanvas.getContext('2d')!;
      const normalImageData = normalCtx.createImageData(512, 512);
      
      // Normal map avec du bruit de Perlin simplifié
      for (let y = 0; y < 512; y++) {
        for (let x = 0; x < 512; x++) {
          const i = (y * 512 + x) * 4;
          
          // Créer des variations pseudo-aléatoires
          const noise1 = Math.sin(x * 0.1) * Math.cos(y * 0.1);
          const noise2 = Math.sin(x * 0.05 + y * 0.05);
          const combined = (noise1 + noise2) * 0.5;
          
          // Normal map: RGB représente XYZ de la normale
          normalImageData.data[i] = 128 + combined * 60;     // R = X
          normalImageData.data[i + 1] = 128 + combined * 60; // G = Y
          normalImageData.data[i + 2] = 200 + combined * 30; // B = Z (pointe vers le haut)
          normalImageData.data[i + 3] = 255;                 // A
        }
      }
      
      normalCtx.putImageData(normalImageData, 0, 0);
      const normalTexture = new THREE.CanvasTexture(normalCanvas);
      normalTexture.wrapS = THREE.RepeatWrapping;
      normalTexture.wrapT = THREE.RepeatWrapping;
      normalTexture.repeat.set(40, 40);
      planeMat.normalMap = normalTexture;
      planeMat.normalScale = new THREE.Vector2(2.0, 2.0);

      // Bump map procédurale
      const bumpCanvas = document.createElement('canvas');
      bumpCanvas.width = 256;
      bumpCanvas.height = 256;
      const bumpCtx = bumpCanvas.getContext('2d')!;
      const bumpImageData = bumpCtx.createImageData(256, 256);
      for (let i = 0; i < bumpImageData.data.length; i += 4) {
        const noise = Math.random() * 255;
        bumpImageData.data[i] = noise;
        bumpImageData.data[i + 1] = noise;
        bumpImageData.data[i + 2] = noise;
        bumpImageData.data[i + 3] = 255;
      }
      bumpCtx.putImageData(bumpImageData, 0, 0);
      const bumpTexture = new THREE.CanvasTexture(bumpCanvas);
      bumpTexture.wrapS = THREE.RepeatWrapping;
      bumpTexture.wrapT = THREE.RepeatWrapping;
      bumpTexture.repeat.set(40, 40);
      planeMat.bumpMap = bumpTexture;
      planeMat.bumpScale = 0.3;

      // Créer une roughness map procédurale
      const roughCanvas = document.createElement('canvas');
      roughCanvas.width = 256;
      roughCanvas.height = 256;
      const roughCtx = roughCanvas.getContext('2d')!;
      const roughImageData = roughCtx.createImageData(256, 256);
      for (let i = 0; i < roughImageData.data.length; i += 4) {
        const value = 200 + Math.random() * 55;
        roughImageData.data[i] = value;
        roughImageData.data[i + 1] = value;
        roughImageData.data[i + 2] = value;
        roughImageData.data[i + 3] = 255;
      }
      roughCtx.putImageData(roughImageData, 0, 0);
      const roughnessTexture = new THREE.CanvasTexture(roughCanvas);
      roughnessTexture.wrapS = THREE.RepeatWrapping;
      roughnessTexture.wrapT = THREE.RepeatWrapping;
      roughnessTexture.repeat.set(40, 40);
      planeMat.roughnessMap = roughnessTexture;

      // Créer une AO map procédurale
      const aoCanvas = document.createElement('canvas');
      aoCanvas.width = 256;
      aoCanvas.height = 256;
      const aoCtx = aoCanvas.getContext('2d')!;
      const aoImageData = aoCtx.createImageData(256, 256);
      for (let i = 0; i < aoImageData.data.length; i += 4) {
        const ao = 180 + Math.random() * 75;
        aoImageData.data[i] = ao;
        aoImageData.data[i + 1] = ao;
        aoImageData.data[i + 2] = ao;
        aoImageData.data[i + 3] = 255;
      }
      aoCtx.putImageData(aoImageData, 0, 0);
      const aoTexture = new THREE.CanvasTexture(aoCanvas);
      aoTexture.wrapS = THREE.RepeatWrapping;
      aoTexture.wrapT = THREE.RepeatWrapping;
      aoTexture.repeat.set(40, 40);
      planeMat.aoMap = aoTexture;
      planeMat.aoMapIntensity = 0.5;

      planeMat.needsUpdate = true;

      // ===== BRINS D'HERBE 3D =====
      function createGrassBlades() {
        const grassCount = 15000;
        
        const bladeHeight = 1.2;
        const bladeWidth = 0.3;
        
        const bladeGeo = new THREE.BufferGeometry();
        const vertices = [];
        
        // Premier plan (vertical)
        vertices.push(
          -bladeWidth/2, 0, 0,
          bladeWidth/2, 0, 0,
          bladeWidth/2, bladeHeight, 0,
          -bladeWidth/2, 0, 0,
          bladeWidth/2, bladeHeight, 0,
          -bladeWidth/2, bladeHeight, 0
        );
        
        // Deuxième plan (croisé à 90°)
        vertices.push(
          0, 0, -bladeWidth/2,
          0, 0, bladeWidth/2,
          0, bladeHeight, bladeWidth/2,
          0, 0, -bladeWidth/2,
          0, bladeHeight, bladeWidth/2,
          0, bladeHeight, -bladeWidth/2
        );
        
        bladeGeo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        bladeGeo.computeVertexNormals();
        
        const grassMat = new THREE.MeshStandardMaterial({
          color: 0x4a9d5f,
          side: THREE.DoubleSide,
          roughness: 0.9,
          metalness: 0
        });
        
        const grassMesh = new THREE.InstancedMesh(bladeGeo, grassMat, grassCount);
        
        const dummy = new THREE.Object3D();
        const minBound = -58;
        const maxBound = 58;
        
        for (let i = 0; i < grassCount; i++) {
          dummy.position.set(
            minBound + Math.random() * (maxBound - minBound),
            0.01,
            minBound + Math.random() * (maxBound - minBound)
          );
          
          dummy.rotation.y = Math.random() * Math.PI * 2;
          dummy.rotation.x = (Math.random() - 0.5) * 0.15;
          dummy.rotation.z = (Math.random() - 0.5) * 0.15;
          
          const scale = 0.7 + Math.random() * 0.6;
          dummy.scale.set(scale, scale * (0.8 + Math.random() * 0.5), scale);
          
          dummy.updateMatrix();
          grassMesh.setMatrixAt(i, dummy.matrix);
        }
        
        grassMesh.instanceMatrix.needsUpdate = true;
        grassMesh.castShadow = true;
        grassMesh.receiveShadow = true;
        
        scene.add(grassMesh);
        return grassMesh;
      }

      const grassBlades = createGrassBlades();

      // ===== IMAGES SUR LES MURS (groupes et helper) =====
      const room1WallImagesGroup = new THREE.Group();
      const room2WallImagesGroup = new THREE.Group();
      const room3WallImagesGroup = new THREE.Group();

      const room1Images = [
        '/images/three.js/image_salle_1/astro.png',
        '/images/three.js/image_salle_1/atome.png',
        '/images/three.js/image_salle_1/judo.png',
        '/images/three.js/image_salle_1/microscope.png',
        '/images/three.js/image_salle_1/james webb.png',
        '/images/three.js/image_salle_1/tank.png',
        '/images/three.js/image_salle_1/veto.png',
        '/images/three.js/image_salle_1/Voiture.png'
      ];

      const room2Images = [
        '/images/three.js/image_salle_2/echecs.png',
        '/images/three.js/image_salle_2/barrage.png',
        '/images/three.js/image_salle_2/engrenage.png',
        '/images/three.js/image_salle_2/geo_non_eucli.png',
        '/images/three.js/image_salle_2/centrale.png',
        '/images/three.js/image_salle_2/panneau solaire.png',
        '/images/three.js/image_salle_2/thermo.png',
        '/images/three.js/image_salle_2/python.png'
      ];

      const room3Images = [
        '/images/three.js/image_salle_3/Microfab.png',
        '/images/three.js/image_salle_3/drone.png',
        '/images/three.js/image_salle_3/Electrode.png',
        '/images/three.js/image_salle_3/microelec.png',
        '/images/three.js/image_salle_3/computer vision.png',
        '/images/three.js/image_salle_3/robotique.png',
        '/images/three.js/image_salle_3/fablab.png',
        '/images/three.js/image_salle_3/imprim3d.png'
      ];

      // Cache for preloaded textures
      const textureCache = new Map<string, any>();

      // Preload all textures before creating meshes
      const preloadTextures = async () => {
        console.log('🔄 Starting texture preload...');
        const allImages = [...room1Images, ...room2Images, ...room3Images];
        console.log(`📦 Preloading ${allImages.length} textures`);
        const loadPromises = allImages.map(imgPath => {
          return new Promise((resolve) => {
            textureLoader.load(
              imgPath,
              (tex) => {
                try { (tex as any).encoding = (THREE as any).sRGBEncoding; } catch (e) {}
                try { (tex as any).colorSpace = (THREE as any).SRGBColorSpace; } catch (e) {}
                tex.wrapS = THREE.ClampToEdgeWrapping;
                tex.wrapT = THREE.ClampToEdgeWrapping;
                textureCache.set(imgPath, tex);
                console.log('✅ Loaded:', imgPath);
                resolve(tex);
              },
              undefined,
              (err) => {
                console.error('❌ Failed to preload texture:', imgPath, err);
                resolve(null);
              }
            );
          });
        });
        await Promise.all(loadPromises);
        console.log('✨ All textures preloaded!');
      };

      // Preload all wall textures before creating meshes
      console.log('⏳ About to preload textures...');
      await preloadTextures();
      console.log('🎉 Textures preloaded, continuing scene setup...');

      function createWallImage(imgPath: string, width: number, height: number) {
        const geo = new THREE.PlaneGeometry(width, height);
        const tex = textureCache.get(imgPath);
        
        if (tex) {
          // Use preloaded texture immediately
          const mat = new THREE.MeshStandardMaterial({ 
            map: tex,
            color: 0xffffff,
            side: THREE.DoubleSide 
          });
          const mesh = new THREE.Mesh(geo, mat);
          return mesh;
        } else {
          // Fallback: load texture if not in cache
          const placeholderMat = new THREE.MeshStandardMaterial({ color: 0x777777, side: THREE.DoubleSide });
          const mesh = new THREE.Mesh(geo, placeholderMat);
          console.warn('⚠️ Texture not in cache, loading:', imgPath);
          
          textureLoader.load(
            imgPath,
            (tex) => {
              try { (tex as any).encoding = (THREE as any).sRGBEncoding; } catch (e) {}
              try { (tex as any).colorSpace = (THREE as any).SRGBColorSpace; } catch (e) {}
              tex.wrapS = THREE.ClampToEdgeWrapping;
              tex.wrapT = THREE.ClampToEdgeWrapping;
              placeholderMat.map = tex;
              placeholderMat.color.set(0xffffff);
              placeholderMat.needsUpdate = true;
            },
            undefined,
            (err) => console.error('Failed to load wall texture:', imgPath, err)
          );
          
          return mesh;
        }
      }

      // keep groups in scene but populate them after layout constants are defined
      room1WallImagesGroup.visible = false;
      scene.add(room1WallImagesGroup);

      room2WallImagesGroup.visible = false;
      scene.add(room2WallImagesGroup);

      room3WallImagesGroup.visible = false;
      scene.add(room3WallImagesGroup);

      // ===== PANNEAUX POUR CHAQUE IMAGE DE LA SALLE 1 =====
      const room1ImageSigns: any[] = [];
      const room1ImageCylinders: any[] = [];
      const room2ImageSigns: any[] = [];
      const room2ImageCylinders: any[] = [];
      const room3ImageSigns: any[] = [];
      const room3ImageCylinders: any[] = [];
      const room1ImageTexts = [
        { title: "ASTRONAUTE 8-15 ANS", text: "Pour accompagner ma passion de l'astronomie, je voulais évidemmenet devenir astronaute durant mon enfance. Cela s'est dévié plus vers l'aéronautique de manière générale par la suite." },
        { title: "ATOMIQUE", text: "J'adorais lire des Sciences et Vies et faire des recherches sur comment fonctionnait l'univers atomique, notamment sur la composition des atomes et des nouvelles avancées scientifiques." },
        { title: "JUDO", text: "J'ai pratiqué le judo depuis mes 3 ans, jusqu'à maintenant. C'était ma manière de pouvoir faire du sport et me défouler chaque semaine." },
        { title: "BIOLOGIE 8-11 ANS", text: "J'étais passionné de manière générale de ce qu'on ne pouvait pas observé à l'oeil nu, j'empruntais les microscopes de mon collèges pour observer de plus près tout ce que je trouvais. " },
        { title: "ASTRONOMIE 7-14 ANS", text: "L'astronomie était une de mes grandes passions, j'adorais observer les étoiles, connaitres toutes les constellations et suivre les avancés. J'avais également rejoins un club d'astronomie amateur pour aller plus loin." },
        { title: "CHARS 6-9 ANS", text: "J'étais très interessé par les vehicules blindés, j'avais appris tout les modèles français, allemand, russe et américain ainsi que leur caractéristique et leur utilisation." },
        { title: "VÉTÉRINAIRE 5-6 ANS", text: "Ma première passion était autour des animaux, et je voulais donc devenir vétérinaire. Cependant, j'ai vite abandonné cette idée car l'échec dans ce" },
        { title: "VOITURES 10-12 ANS", text: "J'adorais les voitures, j'avais globalement appris tout les modèles circulant sur le marché ainsi que leurs caractéristiques techniques et leurs performances." }
      ];

      const room2ImageTexts = [
        { title: "ÉCHECS", text: "J'ai pu reprendre les échecs et les sudoku que j'avais arreté vers 10 ans. Cela me permettait de m'amuser tout en mettant à contribution ma réflexion." },
        { title: "BARRAGES", text: "Je voulais travailler dans les énergies durant ma période en prépa, cependant, je me suis rendu compte, que cela ne m'interessais pas tant que ça finalement." },
        { title: "SCIENCES D'INGÉNIEUR", text: "J'ai beaucoup travailler sur les sciences de l'ingénieur durant cette période, la matière était assez intéressante car on pouvait plus mettre la main à la patte." },
        { title: "MATHÉMATIQUES", text: "J'étais extrement focus sur les mathématiques durant la prépa, cepandant cela m'agacer de ne pas avoir d'utilisation concret sur tout ce que j'apprenais." },
        { title: "CENTRALES ÉLECTRIQUES", text: "C'était vraiment la voies que j'imagineais prendre en prépa car j'aimais beaucoup la manière dont fonctionnait les centrales et l'efficacité de cette méthode." },
        { title: "PANNEAUX SOLAIRES", text: "J'ai pu travailler sur quelques projets avec des panneaux solaires et ce qui m'avait le plus plus était de faire des solars trackers ou la majorité du projet était accès sur la robotique." },
        { title: "THERMODYNAMIQUE", text: "Matière pour laquelle j'étais le plus investi en prépa car correspondait à ce que je voulais faire plus tard. J'ai cependant arreter de m'y interessé après avoir changer de projet." },
        { title: "PYTHON", text: "Mes premiers pas sur des languages de programation. M'a permis de découvrir la logique pour programmer et toutes les possibilités que cela offre." }
      ];

      const room3ImageTexts = [
        { title: "MICROFABRICATION", text: "J'ai adorer pouvoir fabriqué en salle blanche divers type de composants. L'environnement est assez impressionnant et les processus de fabrication son très sympa a réaliser." },
        { title: "DRONES", text: "Je me suis récemment très interessés au sujet des drones qui sont de plus en plus sur le devant de la scène. Que ce soit lutte anti-drone, pilotage automatisées ou swarm." },
        { title: "BIOMÉDICAL", text: "J'ai pu réaliser de nombreux dispositifs à but médical ces dernières années, qui combinent de la création de circuit éléctronique, de boitier et d'analyse de données, chose que j'aime bien faire." },
        { title: "MICROÉLECTRONIQUE", text: "J'adore de manière général crée des nouveaux circuits élécrtoniques, que ce soit sur breadboards, des assemblages de composants ou des PCB entières, et de réaliser un produit complet." },
        { title: "COMPUTER VISION", text: "Ces derniers mois, j'ai commencer à vraiment m'intéresser à la vision par ordinateur, utilisant des outils comme Mediapipe, OpenCV et YOLOv11 pour la détection d'objets et le suivi en temps réel." },
        { title: "ROBOTIQUE", text: "C'est la branche qui regroupe tout ce que j'aime en ce moment, beaucoup d'itération de prototype, d'éléctronique, de modèles 3D et de programmation." },
        { title: "FABLAB", text: "Mon nouvel espace préféré, j'ai accès à tout le matériel que je souhaite pour réaliser mes projets. Je peux également découvrir de nouveaux outils et guider des nouvelles personnes pour devenir des makers." },
        { title: "IMPRESSION 3D", text: "Un outil que j'adore utilisé pour créer. Que ce soit des figurines, des boitiers ou des pièces mécaniques, je peux crée tout ce que j'ai besoin." }
      ];

      // Retourne uniquement la partie numérique d'un titre (ex: "VÉTÉRINAIRE 5-6 ANS" -> "5-6").
      function getNumericPreview(title: string) {
        const m = title.match(/\d+(?:[-–]\d+)*/g);
        if (m && m.length) return m.join(', ');
        // fallback: si pas de chiffres, utilise le premier mot (sans accents si possible)
        return title.split(' ')[0];
      }

      function makeImageSign(previewText: string, fullTitle: string, fullText: string, id: number) {
        const w = 512, h = 128;
        const cvs = document.createElement('canvas');
        cvs.width = w; cvs.height = h;
        const ctx = cvs.getContext('2d')!;
        ctx.fillStyle = '#8b7355';
        ctx.fillRect(0,0,w,h);
        ctx.fillStyle = 'rgba(0,0,0,0.15)';
        ctx.fillRect(0,h*0.65,w,h*0.2);
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 48px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(previewText, w/2, h/2);

        const tex = new THREE.CanvasTexture(cvs);
        if ((THREE as any).sRGBEncoding !== undefined) {
          (tex as any).encoding = (THREE as any).sRGBEncoding;
        } else if ((THREE as any).SRGBColorSpace !== undefined) {
          // newer three versions use colorSpace
          (tex as any).colorSpace = (THREE as any).SRGBColorSpace;
        }
        tex.needsUpdate = true;

        const geo = new THREE.PlaneGeometry(8, 2);
        const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, side: THREE.DoubleSide });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.userData.imageSignId = 100 + id;
        mesh.userData.fullTitle = fullTitle;
        mesh.userData.fullText = fullText;
        return mesh;
      }

      // Créer les cylindres et panneaux pour chaque image de la salle 1
      const cylGeo = new THREE.CylinderGeometry(0.5, 0.5, 12, 16);
      const cylMat = new THREE.MeshStandardMaterial({ color: 0x6b3b1a, roughness: 0.9 });

      // We'll position these signs once the room coordinates are available; create and keep them hidden by default
      const r1Half = 59; // slight inside wall, matches room layout
      const r1SegmentWidth = 60; // approximate segment width
      const r1SegmentHeight = 70;

      // Populate room1 wall images now that layout constants are available
      try {
        const addImg = (imgPath: string, x: number, y: number, z: number, rotY = 0, w = r1SegmentWidth, h = r1SegmentHeight) => {
          const m = createWallImage(imgPath, w, h);
          m.position.set(x, y, z);
          m.rotation.y = rotY;
          room1WallImagesGroup.add(m);
        };

        // North
        addImg(room1Images[0], -r1SegmentWidth / 2, r1SegmentHeight / 2, r1Half);
        addImg(room1Images[1], r1SegmentWidth / 2, r1SegmentHeight / 2, r1Half);

        // East
        addImg(room1Images[2], r1Half, r1SegmentHeight / 2, r1SegmentWidth / 2, -Math.PI / 2);
        addImg(room1Images[3], r1Half, r1SegmentHeight / 2, -r1SegmentWidth / 2, -Math.PI / 2);

        // South
        addImg(room1Images[4], r1SegmentWidth / 2, r1SegmentHeight / 2, -r1Half, Math.PI);
        addImg(room1Images[5], -r1SegmentWidth / 2, r1SegmentHeight / 2, -r1Half, Math.PI);

        // West
        addImg(room1Images[6], -r1Half, r1SegmentHeight / 2, -r1SegmentWidth / 2, Math.PI / 2);
        addImg(room1Images[7], -r1Half, r1SegmentHeight / 2, r1SegmentWidth / 2, Math.PI / 2);

        room1WallImagesGroup.visible = false;
      } catch (e) {
        console.warn('Failed to populate room1 wall images', e);
      }

      // Populate room2 wall images
      try {
        const addImg2 = (imgPath: string, x: number, y: number, z: number, rotY = 0, w = r1SegmentWidth, h = r1SegmentHeight) => {
          const m = createWallImage(imgPath, w, h);
          m.position.set(x, y, z);
          m.rotation.y = rotY;
          room2WallImagesGroup.add(m);
        };

        // North
        addImg2(room2Images[0], -r1SegmentWidth / 2, r1SegmentHeight / 2, r1Half);
        addImg2(room2Images[1], r1SegmentWidth / 2, r1SegmentHeight / 2, r1Half);

        // East
        addImg2(room2Images[2], r1Half, r1SegmentHeight / 2, r1SegmentWidth / 2, -Math.PI / 2);
        addImg2(room2Images[3], r1Half, r1SegmentHeight / 2, -r1SegmentWidth / 2, -Math.PI / 2);

        // South
        addImg2(room2Images[4], r1SegmentWidth / 2, r1SegmentHeight / 2, -r1Half, Math.PI);
        addImg2(room2Images[5], -r1SegmentWidth / 2, r1SegmentHeight / 2, -r1Half, Math.PI);

        // West
        addImg2(room2Images[6], -r1Half, r1SegmentHeight / 2, -r1SegmentWidth / 2, Math.PI / 2);
        addImg2(room2Images[7], -r1Half, r1SegmentHeight / 2, r1SegmentWidth / 2, Math.PI / 2);

        room2WallImagesGroup.visible = false;
      } catch (e) {
        console.warn('Failed to populate room2 wall images', e);
      }

      // Populate room3 wall images
      try {
        const addImg3 = (imgPath: string, x: number, y: number, z: number, rotY = 0, w = r1SegmentWidth, h = r1SegmentHeight) => {
          const m = createWallImage(imgPath, w, h);
          m.position.set(x, y, z);
          m.rotation.y = rotY;
          room3WallImagesGroup.add(m);
        };

        // North
        addImg3(room3Images[0], -r1SegmentWidth / 2, r1SegmentHeight / 2, r1Half);
        addImg3(room3Images[1], r1SegmentWidth / 2, r1SegmentHeight / 2, r1Half);

        // East
        addImg3(room3Images[2], r1Half, r1SegmentHeight / 2, r1SegmentWidth / 2, -Math.PI / 2);
        addImg3(room3Images[3], r1Half, r1SegmentHeight / 2, -r1SegmentWidth / 2, -Math.PI / 2);

        // South
        addImg3(room3Images[4], r1SegmentWidth / 2, r1SegmentHeight / 2, -r1Half, Math.PI);
        addImg3(room3Images[5], -r1SegmentWidth / 2, r1SegmentHeight / 2, -r1Half, Math.PI);

        // West
        addImg3(room3Images[6], -r1Half, r1SegmentHeight / 2, -r1SegmentWidth / 2, Math.PI / 2);
        addImg3(room3Images[7], -r1Half, r1SegmentHeight / 2, r1SegmentWidth / 2, Math.PI / 2);

        room3WallImagesGroup.visible = false;
      } catch (e) {
        console.warn('Failed to populate room3 wall images', e);
      }

      const r1_cyl_n1 = new THREE.Mesh(cylGeo, cylMat.clone());
      r1_cyl_n1.position.set(-r1SegmentWidth / 2, 3, r1Half - 5);
      r1_cyl_n1.castShadow = true;
      r1_cyl_n1.receiveShadow = true;
      r1_cyl_n1.visible = false;
      scene.add(r1_cyl_n1);
      room1ImageCylinders.push(r1_cyl_n1);
      const r1_sign_n1 = makeImageSign(getNumericPreview(room1ImageTexts[0].title), room1ImageTexts[0].title, room1ImageTexts[0].text, 0);
      r1_sign_n1.position.set(-r1SegmentWidth / 2, 9.4, r1Half - 5);
      // orienté vers l'intérieur de la salle (côté entrée)
      r1_sign_n1.rotation.y = Math.PI;
      r1_sign_n1.visible = false;
      scene.add(r1_sign_n1);
      room1ImageSigns.push(r1_sign_n1);

      const r1_cyl_n2 = new THREE.Mesh(cylGeo, cylMat.clone());
      r1_cyl_n2.position.set(r1SegmentWidth / 2, 3, r1Half - 5);
      r1_cyl_n2.castShadow = true;
      r1_cyl_n2.receiveShadow = true;
      r1_cyl_n2.visible = false;
      scene.add(r1_cyl_n2);
      room1ImageCylinders.push(r1_cyl_n2);
      const r1_sign_n2 = makeImageSign(getNumericPreview(room1ImageTexts[1].title), room1ImageTexts[1].title, room1ImageTexts[1].text, 1);
      r1_sign_n2.position.set(r1SegmentWidth / 2, 9.4, r1Half - 5);
      // orienté vers l'intérieur de la salle (côté entrée)
      r1_sign_n2.rotation.y = Math.PI;
      r1_sign_n2.visible = false;
      scene.add(r1_sign_n2);
      room1ImageSigns.push(r1_sign_n2);

      // East wall signs with cylinders
      const r1_cyl_e1 = new THREE.Mesh(cylGeo, cylMat.clone());
      r1_cyl_e1.position.set(r1Half - 5, 3, r1SegmentWidth / 2);
      r1_cyl_e1.castShadow = true;
      r1_cyl_e1.receiveShadow = true;
      r1_cyl_e1.visible = false;
      scene.add(r1_cyl_e1);
      room1ImageCylinders.push(r1_cyl_e1);
      const r1_sign_e1 = makeImageSign(getNumericPreview(room1ImageTexts[2].title), room1ImageTexts[2].title, room1ImageTexts[2].text, 2);
      r1_sign_e1.position.set(r1Half - 5, 9.4, r1SegmentWidth / 2);
      r1_sign_e1.rotation.y = -Math.PI / 2;
      r1_sign_e1.visible = false;
      scene.add(r1_sign_e1);
      room1ImageSigns.push(r1_sign_e1);

      const r1_cyl_e2 = new THREE.Mesh(cylGeo, cylMat.clone());
      r1_cyl_e2.position.set(r1Half - 5, 3, -r1SegmentWidth / 2);
      r1_cyl_e2.castShadow = true;
      r1_cyl_e2.receiveShadow = true;
      r1_cyl_e2.visible = false;
      scene.add(r1_cyl_e2);
      room1ImageCylinders.push(r1_cyl_e2);
      const r1_sign_e2 = makeImageSign(getNumericPreview(room1ImageTexts[3].title), room1ImageTexts[3].title, room1ImageTexts[3].text, 3);
      r1_sign_e2.position.set(r1Half - 5, 9.4, -r1SegmentWidth / 2);
      r1_sign_e2.rotation.y = -Math.PI / 2;
      r1_sign_e2.visible = false;
      scene.add(r1_sign_e2);
      room1ImageSigns.push(r1_sign_e2);

      // South wall signs with cylinders (côté des portes)
      const r1_cyl_s1 = new THREE.Mesh(cylGeo, cylMat.clone());
      r1_cyl_s1.position.set(r1SegmentWidth / 2, 3, -r1Half + 5);
      r1_cyl_s1.castShadow = true;
      r1_cyl_s1.receiveShadow = true;
      r1_cyl_s1.visible = false;
      scene.add(r1_cyl_s1);
      room1ImageCylinders.push(r1_cyl_s1);
      const r1_sign_s1 = makeImageSign(getNumericPreview(room1ImageTexts[4].title), room1ImageTexts[4].title, room1ImageTexts[4].text, 4);
      r1_sign_s1.position.set(r1SegmentWidth / 2, 9.4, -r1Half + 5);
      // panneau tourné vers l'intérieur de la salle
      r1_sign_s1.rotation.y = 0;
      r1_sign_s1.visible = false;
      scene.add(r1_sign_s1);
      room1ImageSigns.push(r1_sign_s1);

      const r1_cyl_s2 = new THREE.Mesh(cylGeo, cylMat.clone());
      r1_cyl_s2.position.set(-r1SegmentWidth / 2, 3, -r1Half + 5);
      r1_cyl_s2.castShadow = true;
      r1_cyl_s2.receiveShadow = true;
      r1_cyl_s2.visible = false;
      scene.add(r1_cyl_s2);
      room1ImageCylinders.push(r1_cyl_s2);
      const r1_sign_s2 = makeImageSign(getNumericPreview(room1ImageTexts[5].title), room1ImageTexts[5].title, room1ImageTexts[5].text, 5);
      r1_sign_s2.position.set(-r1SegmentWidth / 2, 9.4, -r1Half + 5);
      // panneau tourné vers l'intérieur de la salle
      r1_sign_s2.rotation.y = 0;
      r1_sign_s2.visible = false;
      scene.add(r1_sign_s2);
      room1ImageSigns.push(r1_sign_s2);

      // West wall signs with cylinders
      const r1_cyl_w1 = new THREE.Mesh(cylGeo, cylMat.clone());
      r1_cyl_w1.position.set(-r1Half + 5, 3, -r1SegmentWidth / 2);
      r1_cyl_w1.castShadow = true;
      r1_cyl_w1.receiveShadow = true;
      r1_cyl_w1.visible = false;
      scene.add(r1_cyl_w1);
      room1ImageCylinders.push(r1_cyl_w1);
      const r1_sign_w1 = makeImageSign(getNumericPreview(room1ImageTexts[6].title), room1ImageTexts[6].title, room1ImageTexts[6].text, 6);
      r1_sign_w1.position.set(-r1Half + 5, 9.4, -r1SegmentWidth / 2);
      r1_sign_w1.rotation.y = Math.PI / 2;
      r1_sign_w1.visible = false;
      scene.add(r1_sign_w1);
      room1ImageSigns.push(r1_sign_w1);

      const r1_cyl_w2 = new THREE.Mesh(cylGeo, cylMat.clone());
      r1_cyl_w2.position.set(-r1Half + 5, 3, r1SegmentWidth / 2);
      r1_cyl_w2.castShadow = true;
      r1_cyl_w2.receiveShadow = true;
      r1_cyl_w2.visible = false;
      scene.add(r1_cyl_w2);
      room1ImageCylinders.push(r1_cyl_w2);
      const r1_sign_w2 = makeImageSign(getNumericPreview(room1ImageTexts[7].title), room1ImageTexts[7].title, room1ImageTexts[7].text, 7);
      r1_sign_w2.position.set(-r1Half + 5, 9.4, r1SegmentWidth / 2);
      r1_sign_w2.rotation.y = Math.PI / 2;
      r1_sign_w2.visible = false;
      scene.add(r1_sign_w2);
      room1ImageSigns.push(r1_sign_w2);

      // ===== PANNEAUX ET CYLINDRES POUR SALLE 2 =====
      // North wall signs with cylinders
      const r2_cyl_n1 = new THREE.Mesh(cylGeo, cylMat.clone());
      r2_cyl_n1.position.set(-r1SegmentWidth / 2, 3, r1Half - 5);
      r2_cyl_n1.castShadow = true;
      r2_cyl_n1.receiveShadow = true;
      r2_cyl_n1.visible = false;
      scene.add(r2_cyl_n1);
      room2ImageCylinders.push(r2_cyl_n1);
      const r2_sign_n1 = makeImageSign(getNumericPreview(room2ImageTexts[0].title), room2ImageTexts[0].title, room2ImageTexts[0].text, 10);
      r2_sign_n1.position.set(-r1SegmentWidth / 2, 9.4, r1Half - 5);
      // orienté vers l'intérieur de la salle (côté entrée)
      r2_sign_n1.rotation.y = Math.PI;
      r2_sign_n1.visible = false;
      scene.add(r2_sign_n1);
      room2ImageSigns.push(r2_sign_n1);

      const r2_cyl_n2 = new THREE.Mesh(cylGeo, cylMat.clone());
      r2_cyl_n2.position.set(r1SegmentWidth / 2, 3, r1Half - 5);
      r2_cyl_n2.castShadow = true;
      r2_cyl_n2.receiveShadow = true;
      r2_cyl_n2.visible = false;
      scene.add(r2_cyl_n2);
      room2ImageCylinders.push(r2_cyl_n2);
      const r2_sign_n2 = makeImageSign(getNumericPreview(room2ImageTexts[1].title), room2ImageTexts[1].title, room2ImageTexts[1].text, 11);
      r2_sign_n2.position.set(r1SegmentWidth / 2, 9.4, r1Half - 5);
      // orienté vers l'intérieur de la salle (côté entrée)
      r2_sign_n2.rotation.y = Math.PI;
      r2_sign_n2.visible = false;
      scene.add(r2_sign_n2);
      room2ImageSigns.push(r2_sign_n2);

      // East wall signs with cylinders
      const r2_cyl_e1 = new THREE.Mesh(cylGeo, cylMat.clone());
      r2_cyl_e1.position.set(r1Half - 5, 3, r1SegmentWidth / 2);
      r2_cyl_e1.castShadow = true;
      r2_cyl_e1.receiveShadow = true;
      r2_cyl_e1.visible = false;
      scene.add(r2_cyl_e1);
      room2ImageCylinders.push(r2_cyl_e1);
      const r2_sign_e1 = makeImageSign(getNumericPreview(room2ImageTexts[2].title), room2ImageTexts[2].title, room2ImageTexts[2].text, 12);
      r2_sign_e1.position.set(r1Half - 5, 9.4, r1SegmentWidth / 2);
      r2_sign_e1.rotation.y = -Math.PI / 2;
      r2_sign_e1.visible = false;
      scene.add(r2_sign_e1);
      room2ImageSigns.push(r2_sign_e1);

      const r2_cyl_e2 = new THREE.Mesh(cylGeo, cylMat.clone());
      r2_cyl_e2.position.set(r1Half - 5, 3, -r1SegmentWidth / 2);
      r2_cyl_e2.castShadow = true;
      r2_cyl_e2.receiveShadow = true;
      r2_cyl_e2.visible = false;
      scene.add(r2_cyl_e2);
      room2ImageCylinders.push(r2_cyl_e2);
      const r2_sign_e2 = makeImageSign(getNumericPreview(room2ImageTexts[3].title), room2ImageTexts[3].title, room2ImageTexts[3].text, 13);
      r2_sign_e2.position.set(r1Half - 5, 9.4, -r1SegmentWidth / 2);
      r2_sign_e2.rotation.y = -Math.PI / 2;
      r2_sign_e2.visible = false;
      scene.add(r2_sign_e2);
      room2ImageSigns.push(r2_sign_e2);

      // South wall signs with cylinders (côté des portes)
      const r2_cyl_s1 = new THREE.Mesh(cylGeo, cylMat.clone());
      r2_cyl_s1.position.set(r1SegmentWidth / 2, 3, -r1Half + 5);
      r2_cyl_s1.castShadow = true;
      r2_cyl_s1.receiveShadow = true;
      r2_cyl_s1.visible = false;
      scene.add(r2_cyl_s1);
      room2ImageCylinders.push(r2_cyl_s1);
      const r2_sign_s1 = makeImageSign(getNumericPreview(room2ImageTexts[4].title), room2ImageTexts[4].title, room2ImageTexts[4].text, 14);
      r2_sign_s1.position.set(r1SegmentWidth / 2, 9.4, -r1Half + 5);
      // panneau tourné vers l'intérieur de la salle
      r2_sign_s1.rotation.y = 0;
      r2_sign_s1.visible = false;
      scene.add(r2_sign_s1);
      room2ImageSigns.push(r2_sign_s1);

      const r2_cyl_s2 = new THREE.Mesh(cylGeo, cylMat.clone());
      r2_cyl_s2.position.set(-r1SegmentWidth / 2, 3, -r1Half + 5);
      r2_cyl_s2.castShadow = true;
      r2_cyl_s2.receiveShadow = true;
      r2_cyl_s2.visible = false;
      scene.add(r2_cyl_s2);
      room2ImageCylinders.push(r2_cyl_s2);
      const r2_sign_s2 = makeImageSign(getNumericPreview(room2ImageTexts[5].title), room2ImageTexts[5].title, room2ImageTexts[5].text, 15);
      r2_sign_s2.position.set(-r1SegmentWidth / 2, 9.4, -r1Half + 5);
      // panneau tourné vers l'intérieur de la salle
      r2_sign_s2.rotation.y = 0;
      r2_sign_s2.visible = false;
      scene.add(r2_sign_s2);
      room2ImageSigns.push(r2_sign_s2);

      // West wall signs with cylinders
      const r2_cyl_w1 = new THREE.Mesh(cylGeo, cylMat.clone());
      r2_cyl_w1.position.set(-r1Half + 5, 3, -r1SegmentWidth / 2);
      r2_cyl_w1.castShadow = true;
      r2_cyl_w1.receiveShadow = true;
      r2_cyl_w1.visible = false;
      scene.add(r2_cyl_w1);
      room2ImageCylinders.push(r2_cyl_w1);
      const r2_sign_w1 = makeImageSign(getNumericPreview(room2ImageTexts[6].title), room2ImageTexts[6].title, room2ImageTexts[6].text, 16);
      r2_sign_w1.position.set(-r1Half + 5, 9.4, -r1SegmentWidth / 2);
      r2_sign_w1.rotation.y = Math.PI / 2;
      r2_sign_w1.visible = false;
      scene.add(r2_sign_w1);
      room2ImageSigns.push(r2_sign_w1);

      const r2_cyl_w2 = new THREE.Mesh(cylGeo, cylMat.clone());
      r2_cyl_w2.position.set(-r1Half + 5, 3, r1SegmentWidth / 2);
      r2_cyl_w2.castShadow = true;
      r2_cyl_w2.receiveShadow = true;
      r2_cyl_w2.visible = false;
      scene.add(r2_cyl_w2);
      room2ImageCylinders.push(r2_cyl_w2);
      const r2_sign_w2 = makeImageSign(getNumericPreview(room2ImageTexts[7].title), room2ImageTexts[7].title, room2ImageTexts[7].text, 17);
      r2_sign_w2.position.set(-r1Half + 5, 9.4, r1SegmentWidth / 2);
      r2_sign_w2.rotation.y = Math.PI / 2;
      r2_sign_w2.visible = false;
      scene.add(r2_sign_w2);
      room2ImageSigns.push(r2_sign_w2);

      // ===== PANNEAUX ET CYLINDRES POUR SALLE 3 =====
      // North wall signs with cylinders
      const r3_cyl_n1 = new THREE.Mesh(cylGeo, cylMat.clone());
      r3_cyl_n1.position.set(-r1SegmentWidth / 2, 3, r1Half - 5);
      r3_cyl_n1.castShadow = true;
      r3_cyl_n1.receiveShadow = true;
      r3_cyl_n1.visible = false;
      scene.add(r3_cyl_n1);
      room3ImageCylinders.push(r3_cyl_n1);
      const r3_sign_n1 = makeImageSign(getNumericPreview(room3ImageTexts[0].title), room3ImageTexts[0].title, room3ImageTexts[0].text, 20);
      r3_sign_n1.position.set(-r1SegmentWidth / 2, 9.4, r1Half - 5);
      // orienté vers l'intérieur de la salle (côté entrée)
      r3_sign_n1.rotation.y = Math.PI;
      r3_sign_n1.visible = false;
      scene.add(r3_sign_n1);
      room3ImageSigns.push(r3_sign_n1);

      const r3_cyl_n2 = new THREE.Mesh(cylGeo, cylMat.clone());
      r3_cyl_n2.position.set(r1SegmentWidth / 2, 3, r1Half - 5);
      r3_cyl_n2.castShadow = true;
      r3_cyl_n2.receiveShadow = true;
      r3_cyl_n2.visible = false;
      scene.add(r3_cyl_n2);
      room3ImageCylinders.push(r3_cyl_n2);
      const r3_sign_n2 = makeImageSign(getNumericPreview(room3ImageTexts[1].title), room3ImageTexts[1].title, room3ImageTexts[1].text, 21);
      r3_sign_n2.position.set(r1SegmentWidth / 2, 9.4, r1Half - 5);
      // orienté vers l'intérieur de la salle (côté entrée)
      r3_sign_n2.rotation.y = Math.PI;
      r3_sign_n2.visible = false;
      scene.add(r3_sign_n2);
      room3ImageSigns.push(r3_sign_n2);

      // East wall signs with cylinders
      const r3_cyl_e1 = new THREE.Mesh(cylGeo, cylMat.clone());
      r3_cyl_e1.position.set(r1Half - 5, 3, r1SegmentWidth / 2);
      r3_cyl_e1.castShadow = true;
      r3_cyl_e1.receiveShadow = true;
      r3_cyl_e1.visible = false;
      scene.add(r3_cyl_e1);
      room3ImageCylinders.push(r3_cyl_e1);
      const r3_sign_e1 = makeImageSign(getNumericPreview(room3ImageTexts[2].title), room3ImageTexts[2].title, room3ImageTexts[2].text, 22);
      r3_sign_e1.position.set(r1Half - 5, 9.4, r1SegmentWidth / 2);
      r3_sign_e1.rotation.y = -Math.PI / 2;
      r3_sign_e1.visible = false;
      scene.add(r3_sign_e1);
      room3ImageSigns.push(r3_sign_e1);

      const r3_cyl_e2 = new THREE.Mesh(cylGeo, cylMat.clone());
      r3_cyl_e2.position.set(r1Half - 5, 3, -r1SegmentWidth / 2);
      r3_cyl_e2.castShadow = true;
      r3_cyl_e2.receiveShadow = true;
      r3_cyl_e2.visible = false;
      scene.add(r3_cyl_e2);
      room3ImageCylinders.push(r3_cyl_e2);
      const r3_sign_e2 = makeImageSign(getNumericPreview(room3ImageTexts[3].title), room3ImageTexts[3].title, room3ImageTexts[3].text, 23);
      r3_sign_e2.position.set(r1Half - 5, 9.4, -r1SegmentWidth / 2);
      r3_sign_e2.rotation.y = -Math.PI / 2;
      r3_sign_e2.visible = false;
      scene.add(r3_sign_e2);
      room3ImageSigns.push(r3_sign_e2);

      // South wall signs with cylinders (côté des portes)
      const r3_cyl_s1 = new THREE.Mesh(cylGeo, cylMat.clone());
      r3_cyl_s1.position.set(r1SegmentWidth / 2, 3, -r1Half + 5);
      r3_cyl_s1.castShadow = true;
      r3_cyl_s1.receiveShadow = true;
      r3_cyl_s1.visible = false;
      scene.add(r3_cyl_s1);
      room3ImageCylinders.push(r3_cyl_s1);
      const r3_sign_s1 = makeImageSign('Recherche', room3ImageTexts[4].title, room3ImageTexts[4].text, 24);
      r3_sign_s1.position.set(r1SegmentWidth / 2, 9.4, -r1Half + 5);
      // panneau tourné vers l'intérieur de la salle
      r3_sign_s1.rotation.y = 0;
      r3_sign_s1.visible = false;
      scene.add(r3_sign_s1);
      room3ImageSigns.push(r3_sign_s1);

      const r3_cyl_s2 = new THREE.Mesh(cylGeo, cylMat.clone());
      r3_cyl_s2.position.set(-r1SegmentWidth / 2, 3, -r1Half + 5);
      r3_cyl_s2.castShadow = true;
      r3_cyl_s2.receiveShadow = true;
      r3_cyl_s2.visible = false;
      scene.add(r3_cyl_s2);
      room3ImageCylinders.push(r3_cyl_s2);
      const r3_sign_s2 = makeImageSign('Laboratoire', room3ImageTexts[5].title, room3ImageTexts[5].text, 25);
      r3_sign_s2.position.set(-r1SegmentWidth / 2, 9.4, -r1Half + 5);
      // panneau tourné vers l'intérieur de la salle
      r3_sign_s2.rotation.y = 0;
      r3_sign_s2.visible = false;
      scene.add(r3_sign_s2);
      room3ImageSigns.push(r3_sign_s2);

      // West wall signs with cylinders
      const r3_cyl_w1 = new THREE.Mesh(cylGeo, cylMat.clone());
      r3_cyl_w1.position.set(-r1Half + 5, 3, -r1SegmentWidth / 2);
      r3_cyl_w1.castShadow = true;
      r3_cyl_w1.receiveShadow = true;
      r3_cyl_w1.visible = false;
      scene.add(r3_cyl_w1);
      room3ImageCylinders.push(r3_cyl_w1);
      const r3_sign_w1 = makeImageSign('Conception', room3ImageTexts[6].title, room3ImageTexts[6].text, 26);
      r3_sign_w1.position.set(-r1Half + 5, 9.4, -r1SegmentWidth / 2);
      r3_sign_w1.rotation.y = Math.PI / 2;
      r3_sign_w1.visible = false;
      scene.add(r3_sign_w1);
      room3ImageSigns.push(r3_sign_w1);

      const r3_cyl_w2 = new THREE.Mesh(cylGeo, cylMat.clone());
      r3_cyl_w2.position.set(-r1Half + 5, 3, r1SegmentWidth / 2);
      r3_cyl_w2.castShadow = true;
      r3_cyl_w2.receiveShadow = true;
      r3_cyl_w2.visible = false;
      scene.add(r3_cyl_w2);
      room3ImageCylinders.push(r3_cyl_w2);
      const r3_sign_w2 = makeImageSign('Innovation', room3ImageTexts[7].title, room3ImageTexts[7].text, 27);
      r3_sign_w2.position.set(-r1Half + 5, 9.4, r1SegmentWidth / 2);
      r3_sign_w2.rotation.y = Math.PI / 2;
      r3_sign_w2.visible = false;
      scene.add(r3_sign_w2);
      room3ImageSigns.push(r3_sign_w2);


      // ===== PANCARTES "CLICK ON HERE" AVEC FLÈCHE =====
      let room1Sign2: any = null;
      let room2Sign2: any = null;
      let room3Sign2: any = null;

      function createButtonSign() {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d')!;
        
        // Fond bois (texture bois simplifiée)
        ctx.fillStyle = '#8b6f47';
        ctx.fillRect(0, 0, 512, 512);
        
        // Lignes de bois horizontales
        ctx.strokeStyle = '#6b5537';
        ctx.lineWidth = 3;
        for (let i = 0; i < 512; i += 40) {
          ctx.beginPath();
          ctx.moveTo(0, i);
          ctx.lineTo(512, i + Math.random() * 10 - 5);
          ctx.stroke();
        }
        
        // Bordure sombre
        ctx.strokeStyle = '#5a4a2a';
        ctx.lineWidth = 12;
        ctx.strokeRect(6, 6, 500, 500);
        
        // Texte en français avec mention d'Échap
        ctx.fillStyle = '#ff0000';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 3;
        ctx.font = 'bold 46px Arial';
        ctx.textAlign = 'center';
        ctx.strokeText('APPUYEZ SUR ÉCHAP', 256, 140);
        ctx.fillText('APPUYEZ SUR ÉCHAP', 256, 140);
        ctx.strokeText('PUIS CLIQUEZ ICI', 256, 210);
        ctx.fillText('PUIS CLIQUEZ ICI', 256, 210);
        
        // Flèche vers le bas
        ctx.fillStyle = '#ff0000';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 4;
        // Corps de la flèche
        ctx.fillRect(226, 250, 60, 120);
        ctx.strokeRect(226, 250, 60, 120);
        // Pointe de la flèche
        ctx.beginPath();
        ctx.moveTo(256, 430);
        ctx.lineTo(180, 350);
        ctx.lineTo(332, 350);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        
        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        
        const signGeo = new THREE.PlaneGeometry(6, 6);
        const signMat = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
        const signMesh = new THREE.Mesh(signGeo, signMat);
        return signMesh;
      }

      // ===== CAGES AUTOUR DES PILIERS (vitre + bois) =====
      let room1Cage: any = null;
      let room2Cage: any = null;
      let room3Cage: any = null;

      function createCage() {
        const cageGroup = new THREE.Group();
        const cageHeight = 25;
        const cageSize = 20; // taille de la cage
        const frameThickness = 0.4;
        const openingSide = 'south'; // ouverture au sud
        
        // Matériaux
        const woodMat = new THREE.MeshStandardMaterial({ 
          color: 0x8b6f47, 
          roughness: 0.8,
          metalness: 0.1
        });
        
        const glassMat = new THREE.MeshStandardMaterial({ 
          color: 0x88ccff, 
          transparent: true, 
          opacity: 0.5,
          roughness: 0.2,
          metalness: 0.1,
          side: THREE.DoubleSide,
          depthWrite: false
        });
        
        // Cadres verticaux en bois (4 coins)
        const cornerGeo = new THREE.BoxGeometry(frameThickness * 2, cageHeight, frameThickness * 2);
        const corners = [
          [-cageSize/2, cageHeight/2, -cageSize/2],
          [cageSize/2, cageHeight/2, -cageSize/2],
          [-cageSize/2, cageHeight/2, cageSize/2],
          [cageSize/2, cageHeight/2, cageSize/2]
        ];
        
        corners.forEach(pos => {
          const corner = new THREE.Mesh(cornerGeo, woodMat);
          corner.position.set(pos[0], pos[1], pos[2]);
          corner.castShadow = true;
          corner.receiveShadow = true;
          cageGroup.add(corner);
        });
        
        // Cadres horizontaux haut et bas
        const hFrameGeo = new THREE.BoxGeometry(cageSize, frameThickness * 2, frameThickness * 2);
        const vFrameGeo = new THREE.BoxGeometry(frameThickness * 2, frameThickness * 2, cageSize);
        
        // Cadres du haut
        [0, cageHeight].forEach(y => {
          // Nord
          const frameN = new THREE.Mesh(hFrameGeo, woodMat);
          frameN.position.set(0, y, -cageSize/2);
          cageGroup.add(frameN);
          
          // Sud (avec ouverture, donc pas de cadre complet en bas)
          if (y !== 0) {
            const frameS = new THREE.Mesh(hFrameGeo, woodMat);
            frameS.position.set(0, y, cageSize/2);
            cageGroup.add(frameS);
          }
          
          // Est
          const frameE = new THREE.Mesh(vFrameGeo, woodMat);
          frameE.position.set(cageSize/2, y, 0);
          cageGroup.add(frameE);
          
          // Ouest
          const frameW = new THREE.Mesh(vFrameGeo, woodMat);
          frameW.position.set(-cageSize/2, y, 0);
          cageGroup.add(frameW);
        });
        
        // Panneaux de vitre (3 côtés, le sud est ouvert)
        const glassGeo = new THREE.PlaneGeometry(cageSize - frameThickness * 4, cageHeight - frameThickness * 4);
        
        // Vitre Nord
        const glassN = new THREE.Mesh(glassGeo, glassMat);
        glassN.position.set(0, cageHeight/2, -cageSize/2);
        glassN.rotation.y = 0;
        cageGroup.add(glassN);
        
        // Vitre Est
        const glassE = new THREE.Mesh(glassGeo, glassMat);
        glassE.position.set(cageSize/2, cageHeight/2, 0);
        glassE.rotation.y = Math.PI / 2;
        cageGroup.add(glassE);
        
        // Vitre Ouest
        const glassW = new THREE.Mesh(glassGeo, glassMat);
        glassW.position.set(-cageSize/2, cageHeight/2, 0);
        glassW.rotation.y = -Math.PI / 2;
        cageGroup.add(glassW);
        
        // Toit en bois
        const roofGeo = new THREE.BoxGeometry(cageSize, frameThickness * 3, cageSize);
        const roof = new THREE.Mesh(roofGeo, woodMat);
        roof.position.set(0, cageHeight + frameThickness * 1.5, 0);
        roof.castShadow = true;
        roof.receiveShadow = true;
        cageGroup.add(roof);
        
        // Cadre de porte (ouverture sud)
        const doorFrameGeo = new THREE.BoxGeometry(frameThickness * 2, cageHeight, frameThickness * 2);
        const doorFrameL = new THREE.Mesh(doorFrameGeo, woodMat);
        doorFrameL.position.set(-cageSize/2 + frameThickness * 2, cageHeight/2, cageSize/2);
        cageGroup.add(doorFrameL);
        
        const doorFrameR = new THREE.Mesh(doorFrameGeo, woodMat);
        doorFrameR.position.set(cageSize/2 - frameThickness * 2, cageHeight/2, cageSize/2);
        cageGroup.add(doorFrameR);
        
        // Linteau de porte
        const lintelGeo = new THREE.BoxGeometry(cageSize - frameThickness * 4, frameThickness * 2, frameThickness * 2);
        const lintel = new THREE.Mesh(lintelGeo, woodMat);
        lintel.position.set(0, cageHeight - frameThickness, cageSize/2);
        cageGroup.add(lintel);
        
        // Murs invisibles pour les collisions (3 côtés fermés)
        const collisionWallGeo = new THREE.BoxGeometry(cageSize, cageHeight, 0.5);
        
        // Mur Nord (collision)
        const wallN = new THREE.Mesh(collisionWallGeo, new THREE.MeshBasicMaterial({ visible: false }));
        wallN.position.set(0, cageHeight/2, -cageSize/2);
        cageGroup.add(wallN);
        
        // Mur Est (collision)
        const wallE = new THREE.Mesh(new THREE.BoxGeometry(0.5, cageHeight, cageSize), new THREE.MeshBasicMaterial({ visible: false }));
        wallE.position.set(cageSize/2, cageHeight/2, 0);
        cageGroup.add(wallE);
        
        // Mur Ouest (collision)
        const wallW = new THREE.Mesh(new THREE.BoxGeometry(0.5, cageHeight, cageSize), new THREE.MeshBasicMaterial({ visible: false }));
        wallW.position.set(-cageSize/2, cageHeight/2, 0);
        cageGroup.add(wallW);
        
        // Montants de porte (collision)
        cageGroup.add(doorFrameL);
        cageGroup.add(doorFrameR);
        
        // Stocker les éléments de collision dans le groupe
        cageGroup.userData.collisionWalls = [wallN, wallE, wallW, doorFrameL, doorFrameR];
        
        return cageGroup;
      }

      // Créer les 3 cages
      room1Cage = createCage();
      room1Cage.position.set(0, 0, 0);
      room1Cage.visible = true;
      scene.add(room1Cage);

      room2Cage = createCage();
      room2Cage.position.set(0, 0, 0);
      room2Cage.visible = false;
      scene.add(room2Cage);

      room3Cage = createCage();
      room3Cage.position.set(0, 0, 0);
      room3Cage.visible = false;
      scene.add(room3Cage);

      // Créer les panneaux "CLICK ON HERE" (un par salle)
      const pillarHeight = 9;
      room1Sign2 = createButtonSign();
      room1Sign2.position.set(0, pillarHeight + 8, -6);
      room1Sign2.visible = true;
      scene.add(room1Sign2);

      room2Sign2 = createButtonSign();
      room2Sign2.position.set(0, pillarHeight + 8, -6);
      room2Sign2.visible = false;
      scene.add(room2Sign2);

      room3Sign2 = createButtonSign();
      room3Sign2.position.set(0, pillarHeight + 8, -6);
      room3Sign2.visible = false;
      scene.add(room3Sign2);

      // ===== PILIERS CENTRAUX CARRÉS =====
      let room1Pillar: any = null;
      let room2Pillar: any = null;
      let room3Pillar: any = null;
      {
        const pillarHeight = 9;
        const pillarSize = 2;
        const pillarGeo = new THREE.BoxGeometry(pillarSize, pillarHeight, pillarSize);
        const pillarMat = new THREE.MeshStandardMaterial({ color: 0x8b4513, roughness: 0.7 });

        room1Pillar = new THREE.Mesh(pillarGeo, pillarMat.clone());
        room1Pillar.position.set(0, pillarHeight / 2, 0);
        room1Pillar.castShadow = true;
        room1Pillar.receiveShadow = true;
        room1Pillar.visible = false;
        scene.add(room1Pillar);

        room2Pillar = new THREE.Mesh(pillarGeo, pillarMat.clone());
        room2Pillar.position.set(0, pillarHeight / 2, 0);
        room2Pillar.castShadow = true;
        room2Pillar.receiveShadow = true;
        room2Pillar.visible = false;
        scene.add(room2Pillar);

        room3Pillar = new THREE.Mesh(pillarGeo, pillarMat.clone());
        room3Pillar.position.set(0, pillarHeight / 2, 0);
        room3Pillar.castShadow = true;
        room3Pillar.receiveShadow = true;
        room3Pillar.visible = false;
        scene.add(room3Pillar);
      }

      // ===== PETITS CYLINDRES MARRON VERTICAUX =====
      let room1Cylinder: any = null;
      let room2Cylinder: any = null;
      let room3Cylinder: any = null;
      {
        const cylGeo = new THREE.CylinderGeometry(0.5, 0.5, 12, 16);
        const cylMat = new THREE.MeshStandardMaterial({ color: 0x6b3b1a, roughness: 0.9 });

        room1Cylinder = new THREE.Mesh(cylGeo, cylMat.clone());
        room1Cylinder.position.set(0, 3, 30);
        room1Cylinder.castShadow = true;
        room1Cylinder.receiveShadow = true;
        room1Cylinder.visible = false;
        scene.add(room1Cylinder);

        room2Cylinder = new THREE.Mesh(cylGeo, cylMat.clone());
        room2Cylinder.position.set(0, 3, 30);
        room2Cylinder.castShadow = true;
        room2Cylinder.receiveShadow = true;
        room2Cylinder.visible = false;
        scene.add(room2Cylinder);

        room3Cylinder = new THREE.Mesh(cylGeo, cylMat.clone());
        room3Cylinder.position.set(0, 3, 30);
        room3Cylinder.castShadow = true;
        room3Cylinder.receiveShadow = true;
        room3Cylinder.visible = false;
        scene.add(room3Cylinder);
      }

      // ===== PANNEAUX AU SOMMET DES CYLINDRES PRINCIPAUX =====
      let room1Sign: any = null, room2Sign: any = null, room3Sign: any = null;

      function makeSignMesh(previewText: string, id: number) {
        const w = 1024, h = 256;
        const cvs = document.createElement('canvas');
        cvs.width = w; cvs.height = h;
        const ctx = cvs.getContext('2d')!;
        ctx.fillStyle = '#7a4f2e';
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = 'rgba(0,0,0,0.08)';
        ctx.fillRect(0, h * 0.6, w, h * 0.25);
        ctx.fillStyle = '#fff';
        ctx.font = '72px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(previewText, w / 2, h / 2 - 8);

        const tex = new THREE.CanvasTexture(cvs);
        try { (tex as any).encoding = (THREE as any).sRGBEncoding; } catch (e) {}
        tex.needsUpdate = true;

        const planeGeo = new THREE.PlaneGeometry(7, 1.75);
        const planeMat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, side: THREE.DoubleSide });
        const mesh = new THREE.Mesh(planeGeo, planeMat);
        (mesh as any).userData = { signId: id };
        return mesh;
      }

      room1Sign = makeSignMesh('Mon enfance', 1);
      room1Sign.position.set(0, 9.4, 30);
      room1Sign.rotation.y = Math.PI;
      room1Sign.visible = false;
      scene.add(room1Sign);

      room2Sign = makeSignMesh('La prépa', 2);
      room2Sign.position.set(0, 9.4, 30);
      room2Sign.rotation.y = Math.PI;
      room2Sign.visible = false;
      scene.add(room2Sign);

      room3Sign = makeSignMesh('Maintenant', 3);
      room3Sign.position.set(0, 9.4, 30);
      room3Sign.rotation.y = Math.PI;
      room3Sign.visible = false;
      scene.add(room3Sign);

      // ===== OVERLAY POUR TEXTE DÉTAILLÉ DES PANNEAUX PRINCIPAUX =====
      const signOverlay = document.createElement('div');
      Object.assign(signOverlay.style, {
        position: 'fixed', left: '0', top: '0', right: '0', bottom: '0',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(0,0,0,0.85)', color: '#fff', zIndex: '4000',
        padding: '20px', pointerEvents: 'none', opacity: '0', transition: 'opacity 0.2s ease'
      });
      const signBox = document.createElement('div');
      Object.assign(signBox.style, { maxWidth: '760px', background: 'rgba(20,20,20,0.95)', padding: '24px', borderRadius: '8px' });
      const signTitle = document.createElement('h2');
      signTitle.style.marginTop = '0';
      const signBody = document.createElement('div');
      signBody.style.whiteSpace = 'pre-wrap';
      const signClose = document.createElement('button');
      signClose.textContent = 'Fermer';
      Object.assign(signClose.style, { marginTop: '12px', padding: '8px 12px', cursor: 'pointer' });
      signBox.appendChild(signTitle);
      signBox.appendChild(signBody);
      signBox.appendChild(signClose);
      signOverlay.appendChild(signBox);
      document.body.appendChild(signOverlay);

      const signHint = document.createElement('div');
      Object.assign(signHint.style, {
        position: 'fixed',
        left: '50%',
        bottom: '60px',
        transform: 'translateX(-50%)',
        color: '#fff',
        background: 'rgba(0,0,0,0.7)',
        padding: '8px 14px',
        borderRadius: '6px',
        fontSize: '14px',
        zIndex: '3001',
        pointerEvents: 'none',
        opacity: '0',
        transition: 'opacity 0.2s ease'
      });
      signHint.textContent = "Appuyez sur Échap puis cliquez pour lire le panneau";
      document.body.appendChild(signHint);

      const doorHint = document.createElement('div');
      Object.assign(doorHint.style, {
        position: 'fixed',
        left: '50%',
        bottom: '90px',
        transform: 'translateX(-50%)',
        color: '#fff',
        background: 'rgba(0,0,0,0.7)',
        padding: '8px 14px',
        borderRadius: '6px',
        fontSize: '14px',
        zIndex: '3001',
        pointerEvents: 'none',
        opacity: '0',
        transition: 'opacity 0.2s ease'
      });
      doorHint.textContent = "Maintenez O pour entrer";
      document.body.appendChild(doorHint);

      // Indication permanente pour revenir au menu
      const escapeHint = document.createElement('div');
      Object.assign(escapeHint.style, {
        position: 'fixed',
        right: '14px',
        bottom: '14px',
        color: '#fff',
        background: 'rgba(0,0,0,0.6)',
        padding: '6px 10px',
        borderRadius: '6px',
        fontSize: '12px',
        zIndex: '3001',
        pointerEvents: 'none',
        opacity: '0',
        transition: 'opacity 0.3s ease'
      });
      escapeHint.textContent = 'Double click sur Échap pour revenir au menu';
      document.body.appendChild(escapeHint);

      function showSignOverlay(title: string, text: string) {
        signTitle.textContent = title;
        signBody.textContent = text;
        signOverlay.style.pointerEvents = 'auto';
        signOverlay.style.opacity = '1';
      }
      function hideSignOverlay() {
        signOverlay.style.pointerEvents = 'none';
        signOverlay.style.opacity = '0';
      }
      signClose.addEventListener('click', hideSignOverlay);

      const fullTexts: { [key: number]: string } = {
  1: 'Mon enfance 3-15 ans\nJ\'ai toujours été curieux de comprendre comment les choses fonctionnent. J\'aimais démonter des objets, bidouiller des gadgets et essayer de voir ce qu\'il y avait “derrière” ce que j\'utilisais au quotidien. Petit à petit, je me suis naturellement tourné vers tout ce qui touchait à la science, la technique et l\'informatique, ce qui a posé les bases de mon intérêt pour l\'ingénierie.',
  2: 'La prépa 16-18 ans\nLa prépa m\'a appris la rigueur, la persévérance et une vraie méthode de travail. J\'y ai travaillé sur des matières très théoriques, dans un rythme soutenu. Même si ce n\'était pas toujours simple, cette période m\'a donné de bonnes bases théoriques et une capacité à aborder des problèmes complexes de manière structurée. Cependant, j\'ai aussi ressenti le besoin de revenir à quelque chose de plus concret et pratique par la suite.',
  3: 'Maintenant 19-21 ans\nAujourd\'hui, je cherche surtout à concrétiser des idées en projets réels. J\'aime concevoir, tester, améliorer, que ce soit à travers des projets techniques, du code ou des systèmes plus complets. Ce que je recherche, c\'est un bon équilibre entre réflexion, créativité et mise en pratique, avec l\'envie de continuer à apprendre en construisant des choses utiles et bien faites.'
};

      // ===== BOUTON ROUGE + ANNEAU BLANC SUR LE PILIER CENTRAL =====
      let room1Button: any = null, room1Ring: any = null;
      let room2Button: any = null, room2Ring: any = null;
      let room3Button: any = null, room3Ring: any = null;
      {
        const buttonRadius = 0.4;
        const buttonHeight = 0.2;
        const ringRadius = 0.6;
        const ringThickness = 0.05;

        const buttonGeo = new THREE.CylinderGeometry(buttonRadius, buttonRadius, buttonHeight, 16);
        const buttonMat = new THREE.MeshStandardMaterial({ color: 0xff0000, emissive: 0x660000, roughness: 0.3 });

        const ringGeo = new THREE.TorusGeometry(ringRadius, ringThickness, 8, 24);
        const ringMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x444444, roughness: 0.2 });

        // Room 1 button and ring
        room1Button = new THREE.Mesh(buttonGeo, buttonMat.clone());
        room1Button.position.set(0, pillarHeight + buttonHeight / 2, 0);
        room1Button.rotation.x = 0;
        room1Button.visible = false;
        scene.add(room1Button);

        room1Ring = new THREE.Mesh(ringGeo, ringMat.clone());
        room1Ring.position.set(0, pillarHeight, 0);
        room1Ring.rotation.x = Math.PI / 2;
        room1Ring.visible = false;
        scene.add(room1Ring);

        // Room 2 button and ring (hidden)
        room2Button = new THREE.Mesh(buttonGeo, buttonMat.clone());
        room2Button.position.set(0, pillarHeight + buttonHeight / 2, 0);
        room2Button.rotation.x = 0;
        room2Button.visible = false;
        scene.add(room2Button);

        room2Ring = new THREE.Mesh(ringGeo, ringMat.clone());
        room2Ring.position.set(0, pillarHeight, 0);
        room2Ring.rotation.x = Math.PI / 2;
        room2Ring.visible = false;
        scene.add(room2Ring);

        // Room 3 button and ring (hidden)
        room3Button = new THREE.Mesh(buttonGeo, buttonMat.clone());
        room3Button.position.set(0, pillarHeight + buttonHeight / 2, 0);
        room3Button.rotation.x = 0;
        room3Button.visible = false;
        scene.add(room3Button);

        room3Ring = new THREE.Mesh(ringGeo, ringMat.clone());
        room3Ring.position.set(0, pillarHeight, 0);
        room3Ring.rotation.x = Math.PI / 2;
        room3Ring.visible = false;
        scene.add(room3Ring);
      }

      // Raycaster + button click handling
      const raycaster = new THREE.Raycaster();
      const pointer = new THREE.Vector2();

      // simple shake state for the button
      const buttonShake = { active: false, time: 0, duration: 0.7, intensity: 0.12 };

      const onCanvasClick = (e: MouseEvent) => {
        if (!canvas || !introDone) return;
        const rect = canvas.getBoundingClientRect();
        pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(pointer, camera);

        // Check main signs first (room1Sign, room2Sign, room3Sign)
        const mainSigns = [
          { mesh: room1Sign, id: 1 },
          { mesh: room2Sign, id: 2 },
          { mesh: room3Sign, id: 3 }
        ];

        for (const sign of mainSigns) {
          if (!sign.mesh || !sign.mesh.visible) continue;
          const signHits = raycaster.intersectObject(sign.mesh, true);
          if (signHits.length > 0) {
            const text = fullTexts[sign.id];
            if (text) {
              const lines = text.split('\n');
              const title = lines[0];
              const body = lines.slice(1).join('\n');
              showSignOverlay(title, body);
            }
            return;
          }
        }

        // Check image signs (room1, room2, room3)
        const allImageSigns = [...room1ImageSigns, ...room2ImageSigns, ...room3ImageSigns];
        for (const sign of allImageSigns) {
          if (!sign || !sign.visible) continue;
          const signHits = raycaster.intersectObject(sign, true);
          if (signHits.length > 0) {
            const signId = sign.userData.imageSignId;
            if (signId && sign.userData.fullTitle && sign.userData.fullText) {
              showSignOverlay(sign.userData.fullTitle, sign.userData.fullText);
            }
            return;
          }
        }

        // Check activation buttons for all rooms
        const buttons = [
          { mesh: room1Button, room: 1, activated: room1Activated },
          { mesh: room2Button, room: 2, activated: room2Activated },
          { mesh: room3Button, room: 3, activated: room3Activated }
        ];

        for (const btn of buttons) {
          if (!btn.mesh || !btn.mesh.visible) continue;
          const hits = raycaster.intersectObject(btn.mesh, true);
          if (hits.length > 0) {
            buttonShake.active = true;
            buttonShake.time = 0;
            if (!btn.activated) {
              if (btn.room === 1) {
                room1Activated = true;
                activateRoom(1);
              } else if (btn.room === 2) {
                room2Activated = true;
                activateRoom(2);
              } else if (btn.room === 3) {
                room3Activated = true;
                activateRoom(3);
              }
            }
            return;
          }
        }
      };

      canvas.addEventListener('click', onCanvasClick);

      // ===== COLLISIONS =====
      const collidableMeshes: any[] = [];

      // ===== AJOUTER / METTRE À JOUR LES COLLISIONS POUR LES ÉLÉMENTS DE SALLES =====
      // On reconstruit dynamiquement la liste en fonction de la visibilité
      // pour éviter les collisions avec des objets disparus (cage, panneaux, etc.).

      const addIfVisible = (obj: any) => {
        if (!obj) return;
        if (obj.visible === false) return;
        collidableMeshes.push(obj);
      };

      const addArrayIfVisible = (arr: any[]) => {
        arr.forEach((o: any) => addIfVisible(o));
      };

      const rebuildRoomCollisions = () => {
        // On garde les murs périmétriques déjà dans le tableau,
        // mais on enlève toutes les anciennes collisions de salle
        // (cages, piliers, cylindres, panneaux, portes).

        const keep: any[] = [];
        const toRemove: any[] = [];

        collidableMeshes.forEach((m: any) => {
          // On détecte les murs/plafond périmétriques :
          // ils ont un matériau gris ou blanc défini ci‑dessous.
          const mat: any = (m as any).material;
          const color = mat?.color?.getHex?.();
          if (color === 0x555555 || color === 0xffffff) {
            keep.push(m);
          } else {
            toRemove.push(m);
          }
        });

        collidableMeshes.length = 0;
        keep.forEach((m) => collidableMeshes.push(m));

        // Cages (murs intérieurs uniquement si visibles)
        if (room1Cage?.visible && room1Cage.userData?.collisionWalls) {
          room1Cage.userData.collisionWalls.forEach((w: any) => addIfVisible(w));
        }
        if (room2Cage?.visible && room2Cage.userData?.collisionWalls) {
          room2Cage.userData.collisionWalls.forEach((w: any) => addIfVisible(w));
        }
        if (room3Cage?.visible && room3Cage.userData?.collisionWalls) {
          room3Cage.userData.collisionWalls.forEach((w: any) => addIfVisible(w));
        }

        // Piliers centraux
        addIfVisible(room1Pillar);
        addIfVisible(room2Pillar);
        addIfVisible(room3Pillar);

        // Gros cylindres des salles
        addIfVisible(room1Cylinder);
        addIfVisible(room2Cylinder);
        addIfVisible(room3Cylinder);

        // Petits cylindres des panneaux d'images
        addArrayIfVisible(room1ImageCylinders);
        addArrayIfVisible(room2ImageCylinders);
        addArrayIfVisible(room3ImageCylinders);

        // Montants de portes (uniquement portes visibles)
        allDoors?.forEach((d: any) => {
          if (!d?.group?.visible) return;
          d.parts.forEach((p: any) => addIfVisible(p));
        });
      };

      // ===== CRÉATION DE PORTE AVEC FILTRE =====
      function createDoorWithFilter(x: number, z: number, filterColor: number, nextRoom: number, rotationY = Math.PI / 2) {
        const width = 16, height = 24, thickness = 1.2, depth = 6;

        const frameMat = new THREE.MeshStandardMaterial({ color: 0x4b2e1f });
        const frameGroup = new THREE.Group();

        const pillarGeo = new THREE.BoxGeometry(thickness, height, depth);
        const left = new THREE.Mesh(pillarGeo, frameMat);
        left.position.set(-(width / 2 - thickness / 2), height / 2, 0);
        const right = left.clone();
        right.position.set((width / 2 - thickness / 2), height / 2, 0);

        const top = new THREE.Mesh(new THREE.BoxGeometry(width, thickness, depth), frameMat);
        top.position.set(0, height - thickness / 2, 0);

        frameGroup.add(left, right, top);

        const filterMat = new THREE.MeshStandardMaterial({
          color: filterColor,
          opacity: 0.35,
          transparent: true,
          side: THREE.DoubleSide
        });
        const filter = new THREE.Mesh(new THREE.PlaneGeometry(width, height), filterMat);
        filter.position.set(0, height / 2, 0);
        frameGroup.add(filter);

        frameGroup.position.set(x, 0, z);
        frameGroup.rotation.y = rotationY;
        frameGroup.visible = false;
        scene.add(frameGroup);

        return { group: frameGroup, parts: [left, right, top], filter, nextRoom } as any;
      }

      // Créer les portes
      // Salle 1: 1 porte derrière la cage (vers salle 2)
      const door1 = createDoorWithFilter(0, -58, 0xff66cc, 2, 0);
      
      // Salle 2: 1 porte derrière (vers salle 1) + 1 porte devant (vers salle 3)
      const door2Back = createDoorWithFilter(0, 58, 0x228B22, 1, Math.PI);
      const door2Front = createDoorWithFilter(0, -58, 0xffdd44, 3, 0);
      
      // Salle 3: 1 porte devant (vers salle 2)
      const door3 = createDoorWithFilter(0, 58, 0xff66cc, 2, Math.PI);

      const allDoors = [door1, door2Back, door2Front, door3];

      // Système d'activation par bouton / état des salles
      let room1Activated = false;
      let room2Activated = false;
      let room3Activated = false;
      let isShaking = false;
      let shakeStartTime = 0;
      const shakeDuration = 4500; // durée totale du tremblement/allumage de la salle
      const shakeIntensity = 0.3;
      let centerFallStartTime: number | null = null;
      let centerGroup: any = null;

      let currentRoom = 1, previousRoom = 1;
      let entryDoor: any = null;

      // Porte : maintien pour traverser
      let doorHoldStart: number | null = null;
      let doorHoldTarget: any = null;
      const doorHoldRequired = 2; // secondes

      function updateDoorsVisibility() {
        allDoors.forEach((d: any) => {
          d.group.visible = false;
        });

        if (currentRoom === 1 && room1Activated) {
          door1.group.visible = true;
        } else if (currentRoom === 2 && room2Activated) {
          if (entryDoor !== door2Back) { door2Back.group.visible = true; }
          if (entryDoor !== door2Front) { door2Front.group.visible = true; }
        } else if (currentRoom === 3 && room3Activated) {
          door3.group.visible = true;
        }

        // Update visibility for all room elements
        try {
          // Wall images
          room1WallImagesGroup.visible = (currentRoom === 1 && room1Activated);
          room2WallImagesGroup.visible = (currentRoom === 2 && room2Activated);
          room3WallImagesGroup.visible = (currentRoom === 3 && room3Activated);

          // Signs and cylinders for all rooms
          room1ImageSigns.forEach((s: any) => { if (s) s.visible = (currentRoom === 1 && room1Activated); });
          room1ImageCylinders.forEach((c: any) => { if (c) c.visible = (currentRoom === 1 && room1Activated); });
          room2ImageSigns.forEach((s: any) => { if (s) s.visible = (currentRoom === 2 && room2Activated); });
          room2ImageCylinders.forEach((c: any) => { if (c) c.visible = (currentRoom === 2 && room2Activated); });
          room3ImageSigns.forEach((s: any) => { if (s) s.visible = (currentRoom === 3 && room3Activated); });
          room3ImageCylinders.forEach((c: any) => { if (c) c.visible = (currentRoom === 3 && room3Activated); });

          // Wall lines for each room
          room1WallLines.forEach((line: any) => { if (line) line.visible = (currentRoom === 1 && room1Activated); });
          room2WallLines.forEach((line: any) => { if (line) line.visible = (currentRoom === 2 && room2Activated); });
          room3WallLines.forEach((line: any) => { if (line) line.visible = (currentRoom === 3 && room3Activated); });

          // Cages, buttons, rings, signs for each room
          if (room1Cage) room1Cage.visible = (currentRoom === 1);
          if (room2Cage) room2Cage.visible = (currentRoom === 2);
          if (room3Cage) room3Cage.visible = (currentRoom === 3);

          if (room1Pillar) room1Pillar.visible = (currentRoom === 1);
          if (room2Pillar) room2Pillar.visible = (currentRoom === 2);
          if (room3Pillar) room3Pillar.visible = (currentRoom === 3);

          if (room1Button) room1Button.visible = (currentRoom === 1);
          if (room1Ring) room1Ring.visible = (currentRoom === 1);
          if (room1Sign2) room1Sign2.visible = (currentRoom === 1);

          if (room2Button) room2Button.visible = (currentRoom === 2);
          if (room2Ring) room2Ring.visible = (currentRoom === 2);
          if (room2Sign2) room2Sign2.visible = (currentRoom === 2);

          if (room3Button) room3Button.visible = (currentRoom === 3);
          if (room3Ring) room3Ring.visible = (currentRoom === 3);
          if (room3Sign2) room3Sign2.visible = (currentRoom === 3);

          // Main cylinder signs for each room
          if (room1Cylinder) room1Cylinder.visible = (currentRoom === 1 && room1Activated);
          if (room1Sign) room1Sign.visible = (currentRoom === 1 && room1Activated);
          if (room2Cylinder) room2Cylinder.visible = (currentRoom === 2 && room2Activated);
          if (room2Sign) room2Sign.visible = (currentRoom === 2 && room2Activated);
          if (room3Cylinder) room3Cylinder.visible = (currentRoom === 3 && room3Activated);
          if (room3Sign) room3Sign.visible = (currentRoom === 3 && room3Activated);
        } catch (e) {}

        // Après toute mise à jour de visibilité, on reconstruit les collisions
        rebuildRoomCollisions();
      }

      function changeRoom(newRoom: number, enteringDoor: any = null) {
        previousRoom = currentRoom;
        currentRoom = newRoom;

        if (!model) return;

        if (newRoom === 1) {
          planeMat.color.set(0x228B22);
          scene.background = new THREE.Color(0x88cc88);
        } else if (newRoom === 2) {
          planeMat.color.set(0xff66cc);
          scene.background = new THREE.Color(0xffbbee);
        } else if (newRoom === 3) {
          planeMat.color.set(0xffdd44);
          scene.background = new THREE.Color(0xffffbb);
        }

        entryDoor = enteringDoor;

        // Position player away from the entry door
        // Doors are at Z=-35 (back) or Z=+35 (front)
        if (enteringDoor) {
          // If entering from back door (Z=-35), spawn at front (Z=+20)
          // If entering from front door (Z=+35), spawn at back (Z=-20)
          const doorZ = enteringDoor.group.position.z;
          if (doorZ < 0) {
            // Entered from back, spawn at front
            model.position.set(0, 0, 20);
          } else {
            // Entered from front, spawn at back
            model.position.set(0, 0, -20);
          }
        } else {
          // Default spawn position (center-ish)
          model.position.set(0, 0, 15);
        }

        updateDoorsVisibility();
      }

      function activateRoom(roomNumber: number) {
        isShaking = true;
        shakeStartTime = performance.now();

        // Créer un groupe temporaire pour faire trembler et descendre
        // la cage + pilier + bouton + anneau + panneau central de cette salle.
        if (centerGroup && centerGroup.parent) {
          centerGroup.parent.remove(centerGroup);
        }
        centerGroup = new THREE.Group();

        if (roomNumber === 1) {
          if (room1Cage) centerGroup.add(room1Cage);
          if (room1Pillar) centerGroup.add(room1Pillar);
          if (room1Button) centerGroup.add(room1Button);
          if (room1Ring) centerGroup.add(room1Ring);
          if (room1Sign2) centerGroup.add(room1Sign2);
        } else if (roomNumber === 2) {
          if (room2Cage) centerGroup.add(room2Cage);
          if (room2Pillar) centerGroup.add(room2Pillar);
          if (room2Button) centerGroup.add(room2Button);
          if (room2Ring) centerGroup.add(room2Ring);
          if (room2Sign2) centerGroup.add(room2Sign2);
        } else if (roomNumber === 3) {
          if (room3Cage) centerGroup.add(room3Cage);
          if (room3Pillar) centerGroup.add(room3Pillar);
          if (room3Button) centerGroup.add(room3Button);
          if (room3Ring) centerGroup.add(room3Ring);
          if (room3Sign2) centerGroup.add(room3Sign2);
        }

        scene.add(centerGroup);
        centerGroup.position.set(0, 0, 0);
        centerFallStartTime = performance.now();

        setTimeout(() => {
          if (roomNumber === 1) {
            room1WallImagesGroup.visible = true;
            room1ImageSigns.forEach((sign: any) => sign.visible = true);
            room1ImageCylinders.forEach((cyl: any) => cyl.visible = true);
            room1WallLines.forEach((line: any) => line.visible = true);
            if (room1Cylinder) room1Cylinder.visible = true;
            if (room1Sign) room1Sign.visible = true;
          } else if (roomNumber === 2) {
            room2WallImagesGroup.visible = true;
            room2ImageSigns.forEach((sign: any) => sign.visible = true);
            room2ImageCylinders.forEach((cyl: any) => cyl.visible = true);
            room2WallLines.forEach((line: any) => line.visible = true);
            if (room2Cylinder) room2Cylinder.visible = true;
            if (room2Sign) room2Sign.visible = true;
          } else if (roomNumber === 3) {
            room3WallImagesGroup.visible = true;
            room3ImageSigns.forEach((sign: any) => sign.visible = true);
            room3ImageCylinders.forEach((cyl: any) => cyl.visible = true);
            room3WallLines.forEach((line: any) => line.visible = true);
            if (room3Cylinder) room3Cylinder.visible = true;
            if (room3Sign) room3Sign.visible = true;
          }
          updateDoorsVisibility();
          isShaking = false;

          // Une fois la salle activée, on termine l'animation de chute
          // en supprimant complètement le groupe central.
          if (centerGroup && centerGroup.parent) {
            centerGroup.parent.remove(centerGroup);
          }
          centerGroup = null;
          centerFallStartTime = null;
        }, shakeDuration);
      }

      // ===== CONTRAINTE CAMERA =====
      const cameraBounds = {
        minX: -58,
        maxX: 58,
        minZ: -58,
        maxZ: 58,
        minY: 1,
        maxY: 40
      };

      const clampCameraPosition = () => {
        camera.position.x = Math.max(cameraBounds.minX, Math.min(cameraBounds.maxX, camera.position.x));
        camera.position.z = Math.max(cameraBounds.minZ, Math.min(cameraBounds.maxZ, camera.position.z));
        camera.position.y = Math.max(cameraBounds.minY, Math.min(cameraBounds.maxY, camera.position.y));

        if (controls && controls.target) {
          controls.target.x = Math.max(cameraBounds.minX, Math.min(cameraBounds.maxX, controls.target.x));
          controls.target.z = Math.max(cameraBounds.minZ, Math.min(cameraBounds.maxZ, controls.target.z));
          controls.target.y = Math.max(cameraBounds.minY, Math.min(cameraBounds.maxY, controls.target.y));
          camera.lookAt(controls.target);
        }
      };

      // ===== MURS PÉRIMÉTRIQUES =====
      const createPerimeterWalls = (minX: number, maxX: number, minZ: number, maxZ: number, height = 30, thickness = 2) => {
        const wallMat = new THREE.MeshStandardMaterial({ color: 0x555555 });

        const wx1 = new THREE.BoxGeometry(thickness, height, Math.abs(maxZ - minZ) + thickness);
        const wall1 = new THREE.Mesh(wx1, wallMat);
        wall1.position.set(maxX + thickness / 2, height / 2, (minZ + maxZ) / 2);
        scene.add(wall1);
        collidableMeshes.push(wall1);

        const wx2 = new THREE.BoxGeometry(thickness, height, Math.abs(maxZ - minZ) + thickness);
        const wall2 = new THREE.Mesh(wx2, wallMat);
        wall2.position.set(minX - thickness / 2, height / 2, (minZ + maxZ) / 2);
        scene.add(wall2);
        collidableMeshes.push(wall2);

        const wz1 = new THREE.BoxGeometry(Math.abs(maxX - minX) + thickness, height, thickness);
        const wall3 = new THREE.Mesh(wz1, wallMat);
        wall3.position.set((minX + maxX) / 2, height / 2, maxZ + thickness / 2);
        scene.add(wall3);
        collidableMeshes.push(wall3);

        const wz2 = new THREE.BoxGeometry(Math.abs(maxX - minX) + thickness, height, thickness);
        const wall4 = new THREE.Mesh(wz2, wallMat);
        wall4.position.set((minX + maxX) / 2, height / 2, minZ - thickness / 2);
        scene.add(wall4);
        collidableMeshes.push(wall4);
      };

      createPerimeterWalls(-60, 60, -60, 60, 70, 2);

      // ===== PLAFOND PÉRIMÉTRIQUE =====
      const createPerimeterCeiling = (minX: number, maxX: number, minZ: number, maxZ: number, height = 80, thickness = 2) => {
        const ceilMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
        const width = Math.abs(maxX - minX) + thickness * 2;
        const depth = Math.abs(maxZ - minZ) + thickness * 2;
        const geo = new THREE.BoxGeometry(width, thickness, depth);
        const ceiling = new THREE.Mesh(geo, ceilMat);
        ceiling.position.set((minX + maxX) / 2, height + thickness / 2, (minZ + maxZ) / 2);
        scene.add(ceiling);
        collidableMeshes.push(ceiling);
      };

      createPerimeterCeiling(-60, 60, -60, 60, 70, 2);

      // ===== LIGNES BLANCHES SUR LES MURS (vertical mid-wall) =====
      let room1WallLines: any[] = [];
      let room2WallLines: any[] = [];
      let room3WallLines: any[] = [];

      function createWallLines(roomCenterX: number, roomCenterZ: number, roomSize = 120, wallHeight = 70, lineThickness = 0.6) {
        const lines = [];
        const halfSize = roomSize / 2 - 1; // Slightly inside the wall
        const lineMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const lineGeo = new THREE.BoxGeometry(lineThickness, wallHeight, lineThickness);

        // IMPORTANT : on ne dessine pas de ligne sur les murs
        // où se trouvent les portes (axe Z), pour éviter
        // les "traits blancs" derrière les filtres colorés.

        // North wall (Z = +halfSize): center line -> supprimé (derrière une porte virtuelle)
        // South wall (Z = -halfSize): center line -> supprimé (derrière une porte virtuelle)

        // East wall (X = +halfSize): center line
        const eastLine = new THREE.Mesh(lineGeo, lineMat);
        eastLine.position.set(roomCenterX + halfSize, wallHeight / 2, roomCenterZ);
        scene.add(eastLine);
        lines.push(eastLine);

        // West wall (X = -halfSize): center line
        const westLine = new THREE.Mesh(lineGeo, lineMat);
        westLine.position.set(roomCenterX - halfSize, wallHeight / 2, roomCenterZ);
        scene.add(westLine);
        lines.push(westLine);

        return lines;
      }

      // Add wall lines to each room (all 3 rooms at origin since rooms are virtual spaces)
      room1WallLines = createWallLines(0, 0, 120.5, 70, 0.6);
      room2WallLines = createWallLines(0, 0, 120.5, 70, 0.6);
      room3WallLines = createWallLines(0, 0, 120.5, 70, 0.6);

      // Initially hide all lines - they'll be shown based on current room
      room1WallLines.forEach(line => line.visible = false);
      room2WallLines.forEach(line => line.visible = false);
      room3WallLines.forEach(line => line.visible = false);

      // ===== SOLDIER =====
      const loader = new GLTFLoader();
      let model: any = null;
      let mixer: any = null;
      const actions: { [key: string]: any } = {};
      let activeAction: any = null;

      loader.load(
        'https://threejs.org/examples/models/gltf/Soldier.glb',
        (gltf) => {
          model = gltf.scene;
          model.scale.set(8, 8, 8);
          model.position.set(0, 0, 15);
          model.rotation.y = Math.PI;
          scene.add(model);

          mixer = new THREE.AnimationMixer(model);
          gltf.animations.forEach((clip) => {
            actions[clip.name] = mixer!.clipAction(clip);
          });
          activeAction = actions['Idle'];
          if (activeAction) activeAction.play();

          controls.target.copy(model.position);
        },
        undefined,
        (error) => console.error("Erreur de chargement :", error)
      );

      // ===== CONTROLES CLAVIER =====
      const keys: { [key: string]: boolean } = {};
      const onKeyDownMove = (e: KeyboardEvent) => { keys[e.code] = true; };
      const onKeyUpMove = (e: KeyboardEvent) => { keys[e.code] = false; };
      document.addEventListener('keydown', onKeyDownMove);
      document.addEventListener('keyup', onKeyUpMove);
      const walkSpeed = 0.5, runSpeed = 2;

      // ===== SAUT =====
      let isJumping = false;
      let jumpVelocity = 0;
      const jumpForce = 1.2;
      const gravity = 0.05;
      const groundY = 0;

      const onKeyDownJump = (e: KeyboardEvent) => {
        if (e.code === 'Space' && !isJumping && introDone && model) {
          isJumping = true;
          jumpVelocity = jumpForce;
        }
      };
      document.addEventListener('keydown', onKeyDownJump);

      // ===== CONTROLE SOURIS =====
      let mouseRotation = 0;
      let cameraPitch = 0;
      let isPointerLocked = false;

      const crosshair = document.createElement('div');
      Object.assign(crosshair.style, {
        position: 'fixed',
        left: '50%',
        top: '50%',
        width: '8px',
        height: '8px',
        background: 'rgba(255,255,255,0.8)',
        borderRadius: '50%',
        transform: 'translate(-50%,-50%)',
        pointerEvents: 'none',
        zIndex: '1000',
        display: 'none'
      });
      document.body.appendChild(crosshair);

      const lockPointer = () => {
        if (introDone) {
          canvas.requestPointerLock();
        }
      };

      const onCanvasClickLock = () => {
        if (introDone) lockPointer();
      };
      canvas.addEventListener('click', onCanvasClickLock);

      const onPointerLockChange = () => {
        isPointerLocked = document.pointerLockElement === canvas;
        if (isPointerLocked) {
          crosshair.style.display = 'block';
        } else {
          crosshair.style.display = 'none';
        }
      };
      document.addEventListener('pointerlockchange', onPointerLockChange);

      const onKeyDownEscape = (e: KeyboardEvent) => {
        if (e.code === 'Escape' && introDone) {
          e.preventDefault();
          window.location.href = '/';
        }
      };
      document.addEventListener('keydown', onKeyDownEscape);

      const onMouseMove = (e: MouseEvent) => {
        if (isPointerLocked && model && introDone) {
          mouseRotation -= e.movementX * 0.002;
          cameraPitch -= e.movementY * 0.002;
          cameraPitch = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, cameraPitch));
        }
      };
      document.addEventListener('mousemove', onMouseMove);

      const switchAnimation = (name: string) => {
        if (!actions[name] || activeAction === actions[name]) return;
        if (activeAction) activeAction.fadeOut(0.2);
        activeAction = actions[name];
        if (activeAction) activeAction.reset().fadeIn(0.2).play();
      };

      const checkCollision = (obj: any) => {
        const objBox = new THREE.Box3().setFromObject(obj);
        return collidableMeshes.some(m => objBox.intersectsBox(new THREE.Box3().setFromObject(m)));
      };

      const updateCamera = () => {
        if (!model) return;
        // TPS Camera
        const backDist = 3;
        const baseHeight = 12;
        const shoulderOffset = 4;
        const followTarget = model.position.clone();
        const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(model.quaternion).setY(0).normalize();
        const right = new THREE.Vector3(1, 0, 0).applyQuaternion(model.quaternion).setY(0).normalize();

        const pitchDistance = backDist * Math.sin(cameraPitch);
        const horizontalDistance = backDist * Math.cos(cameraPitch);
        const upHeight = baseHeight + pitchDistance;

        const desiredPos = followTarget.clone()
          .add(forward.clone().multiplyScalar(-horizontalDistance))
          .add(right.clone().multiplyScalar(shoulderOffset))
          .add(new THREE.Vector3(0, upHeight, 0));

        desiredPos.x = Math.max(cameraBounds.minX, Math.min(cameraBounds.maxX, desiredPos.x));
        desiredPos.z = Math.max(cameraBounds.minZ, Math.min(cameraBounds.maxZ, desiredPos.z));

        camera.position.lerp(desiredPos, 0.12);

        const lookAheadDist = 50;
        const lookAtPos = model.position.clone()
          .add(forward.clone().multiplyScalar(lookAheadDist))
          .add(new THREE.Vector3(0, 1.6 + lookAheadDist * Math.tan(cameraPitch), 0));
        camera.lookAt(lookAtPos);
      };

      // ===== ANIMATION =====
      const clock = new THREE.Clock();
      let animationFrameId: number | null = null;
      let disposed = false;

      const animate = () => {
        if (disposed) return;
        animationFrameId = requestAnimationFrame(animate);
        const delta = clock.getDelta();
        if (mixer) mixer.update(delta);

        // handle camera/scene shake during room activation
        if (isShaking) {
          const now = performance.now();
          const elapsed = now - shakeStartTime;
          const progress = Math.min(1, elapsed / shakeDuration);
          const damp = 1 - progress;
          const shakeX = (Math.random() - 0.5) * shakeIntensity * damp;
          const shakeY = (Math.random() - 0.5) * shakeIntensity * damp;
          const shakeZ = (Math.random() - 0.5) * shakeIntensity * damp;
          camera.position.x += shakeX;
          camera.position.y += shakeY;
          camera.position.z += shakeZ;

          // Faire vibrer le groupe central (cage + pilier + bouton + panneau)
          if (centerGroup) {
            centerGroup.position.x = shakeX * 2;
            centerGroup.position.z = shakeZ * 2;

            // Animation de descente progressive vers le bas
            if (centerFallStartTime !== null) {
              const fallElapsed = (now - centerFallStartTime) / 1000; // en secondes
              const fallDuration = shakeDuration / 1000; // même durée que le tremblement
              const fallProgress = Math.min(1, fallElapsed / fallDuration);
              const fallDistance = 30; // descente un peu plus profonde
              centerGroup.position.y = -fallProgress * fallDistance;
            }
          }
        }

        // handle button shake animation
        if (buttonShake.active) {
          buttonShake.time += delta;
          const p = buttonShake.time / buttonShake.duration;
          const damp = 1 - Math.min(1, p);
          const wobble = Math.sin(buttonShake.time * 40) * buttonShake.intensity * damp;
          if (currentRoom === 1 && room1Button) {
            room1Button.position.x = wobble;
            if (room1Ring) room1Ring.rotation.z = wobble * 6;
          } else if (currentRoom === 2 && room2Button) {
            room2Button.position.x = wobble;
            if (room2Ring) room2Ring.rotation.z = wobble * 6;
          } else if (currentRoom === 3 && room3Button) {
            room3Button.position.x = wobble;
            if (room3Ring) room3Ring.rotation.z = wobble * 6;
          }
          if (p >= 1) {
            buttonShake.active = false;
            if (room1Button) room1Button.position.x = 0;
            if (room1Ring) room1Ring.rotation.z = 0;
            if (room2Button) room2Button.position.x = 0;
            if (room2Ring) room2Ring.rotation.z = 0;
            if (room3Button) room3Button.position.x = 0;
            if (room3Ring) room3Ring.rotation.z = 0;
          }
        }

        if (model && introDone) {
          model.rotation.y = mouseRotation;

          const forwardPressed = (keys['ArrowUp'] || keys['KeyW'] || keys['KeyZ']);
          const backPressed = (keys['ArrowDown'] || keys['KeyS']);
          const strafeLeftPressed = (keys['KeyA'] || keys['KeyQ']);
          const strafeRightPressed = (keys['KeyD'] || keys['KeyE']);

          const moved = forwardPressed || backPressed || strafeLeftPressed || strafeRightPressed;

          if (moved) {
            const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(model.quaternion).setY(0).normalize();
            const right = new THREE.Vector3(1, 0, 0).applyQuaternion(model.quaternion).setY(0).normalize();

            const moveDir = new THREE.Vector3();
            if (forwardPressed) moveDir.add(forward);
            if (backPressed) moveDir.sub(forward);
            if (strafeRightPressed) moveDir.add(right);
            if (strafeLeftPressed) moveDir.sub(right);

            if (moveDir.lengthSq() > 0) moveDir.normalize();

            const speed = (keys['ShiftLeft'] || keys['ShiftRight']) ? runSpeed : walkSpeed;
            const prevPos = model.position.clone();
            const moveVec = moveDir.clone().multiplyScalar(speed);
            model.position.add(moveVec);

            // Empêcher de franchir la position du filtre (plan de la porte) si le maintien n'est pas complété
            for (const d of allDoors) {
              if (!d.group.visible) continue;
              const filterWorldPos = new THREE.Vector3();
              d.filter.getWorldPosition(filterWorldPos);
              const filterWorldQuat = new THREE.Quaternion();
              d.filter.getWorldQuaternion(filterWorldQuat);
              const normal = new THREE.Vector3(0, 0, 1).applyQuaternion(filterWorldQuat).normalize();

              const prevDist = prevPos.clone().sub(filterWorldPos).dot(normal);
              const newDist = model.position.clone().sub(filterWorldPos).dot(normal);

              if ((prevDist > 0 && newDist < 0) || (prevDist < 0 && newDist > 0)) {
                let holdOk = false;
                if (doorHoldTarget === d && doorHoldStart && keys['KeyO']) {
                  const elapsed = (performance.now() - doorHoldStart) / 1000;
                  if (elapsed >= doorHoldRequired) holdOk = true;
                }
                if (!holdOk) {
                  model.position.copy(prevPos);
                  break;
                }
              }
            }

            if (checkCollision(model)) model.position.copy(prevPos);
            switchAnimation(speed === runSpeed ? 'Run' : 'Walk');
          } else {
            switchAnimation('Idle');
          }

          // Interaction avec portes : maintenir 'O' pour traverser
          let intersectedDoor: any = null;
          for (const d of allDoors) {
            if (!d.group.visible) continue;
            const doorBox = new THREE.Box3().setFromObject(d.filter);
            const playerBox = new THREE.Box3().setFromObject(model);
            if (doorBox.intersectsBox(playerBox)) {
              intersectedDoor = d;
              if (!doorHoldTarget || doorHoldTarget !== d) {
                doorHoldTarget = d;
                doorHoldStart = null;
              }

              if (keys['KeyO']) {
                if (!doorHoldStart) doorHoldStart = performance.now();
                const elapsed = (performance.now() - doorHoldStart) / 1000;
                if (elapsed >= doorHoldRequired) {
                  changeRoom(d.nextRoom, d);
                  doorHoldStart = null;
                  doorHoldTarget = null;
                }
              } else {
                doorHoldStart = null;
              }
              break;
            }
          }

          if (!intersectedDoor) {
            doorHoldStart = null;
            doorHoldTarget = null;
            doorProgressContainer.style.display = 'none';
            doorHint.style.opacity = '0';
          } else {
            doorProgressContainer.style.display = 'block';
            let pct = 0;
            if (doorHoldStart && keys['KeyO']) {
              const elapsed = (performance.now() - doorHoldStart) / 1000;
              pct = Math.min(1, elapsed / doorHoldRequired);
            }
            doorProgressBar.style.width = (pct * 100) + '%';
            doorHint.style.opacity = '1';
          }

          // Affichage de l'indication pour cliquer sur les panneaux
          let nearReadableSign = false;
          const readableSigns: any[] = [room1Sign, room2Sign, room3Sign, ...room1ImageSigns, ...room2ImageSigns, ...room3ImageSigns];
          const playerPos = model.position.clone();
          for (const s of readableSigns) {
            if (!s || !s.visible) continue;
            const sp = new THREE.Vector3();
            s.getWorldPosition(sp);
            if (sp.distanceTo(playerPos) < 15) {
              nearReadableSign = true;
              break;
            }
          }
          signHint.style.opacity = nearReadableSign ? '1' : '0';

          updateCamera();
        } else if (model && !introDone) {
          switchAnimation('Idle');
          updateCamera();
        }

        renderer.render(scene, camera);
      };

      animate();

      // Fonction de nettoyage
      cleanup = () => {
        disposed = true;
        if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
        window.removeEventListener('resize', handleResize);
        renderer.dispose();
        controls.dispose();
        canvas.removeEventListener('click', onCanvasClick);
        canvas.removeEventListener('click', onCanvasClickLock);
        document.removeEventListener('keydown', onIntroKeyDown);
        document.removeEventListener('keydown', onKeyDownMove);
        document.removeEventListener('keyup', onKeyUpMove);
        document.removeEventListener('keydown', onKeyDownJump);
        document.removeEventListener('pointerlockchange', onPointerLockChange);
        document.removeEventListener('keydown', onKeyDownEscape);
        document.removeEventListener('mousemove', onMouseMove);
        if (doorProgressContainer.parentNode) doorProgressContainer.parentNode.removeChild(doorProgressContainer);
        if (introOverlay.parentNode) introOverlay.parentNode.removeChild(introOverlay);
        if (introSkipHint.parentNode) introSkipHint.parentNode.removeChild(introSkipHint);
        if (signOverlay.parentNode) signOverlay.parentNode.removeChild(signOverlay);
        if (signHint.parentNode) signHint.parentNode.removeChild(signHint);
        if (doorHint.parentNode) doorHint.parentNode.removeChild(doorHint);
        if (crosshair.parentNode) crosshair.parentNode.removeChild(crosshair);
      };
    };

    initScene();

    // Cleanup à la fin
    return () => {
      // Réafficher la navbar
      const navbar = document.querySelector('header');
      if (navbar) {
        (navbar as HTMLElement).style.display = '';
      }
      
      if (cleanup) cleanup();
      if (mountRef.current && canvasRef.current && canvasRef.current.parentNode === mountRef.current) {
        mountRef.current.removeChild(canvasRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        margin: 0,
        padding: 0
      }}
    />
  );
}


