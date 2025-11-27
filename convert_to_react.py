import re

# Read the original file
with open('src/app/about/pagee.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove the imports at the beginning
content = re.sub(r"^import.*?from.*?;?\n", "", content, flags=re.MULTILINE)

# Wrap everything in a React component with useEffect
react_component = """'use client';

import { useEffect, useRef } from 'react';

export default function AboutPage() {
  const mountRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !mountRef.current) return;

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

      """ + content + """

      // Fonction de nettoyage
      cleanup = () => {
        window.removeEventListener('resize', handleResize);
        if (doorProgressContainer.parentNode) doorProgressContainer.parentNode.removeChild(doorProgressContainer);
        if (introOverlay.parentNode) introOverlay.parentNode.removeChild(introOverlay);
        if (introSkipHint.parentNode) introSkipHint.parentNode.removeChild(introSkipHint);
        if (viewLabel.parentNode) viewLabel.parentNode.removeChild(viewLabel);
        if (crosshair.parentNode) crosshair.parentNode.removeChild(crosshair);
        if (pauseMenu.parentNode) pauseMenu.parentNode.removeChild(pauseMenu);
        if (signOverlay.parentNode) signOverlay.parentNode.removeChild(signOverlay);
        if (signHint.parentNode) signHint.parentNode.removeChild(signHint);
        renderer.dispose();
        controls.dispose();
      };
    };

    initScene();

    // Cleanup à la fin
    return () => {
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
"""

# Fix issues
# Replace references to canvas to use the variable
react_component = react_component.replace("const canvas = document.getElementById('cvs');", "// canvas already created")
react_component = react_component.replace("document.getElementById('cvs')", "canvas")

# Fix window.addEventListener that's already in the code
react_component = react_component.replace(
    "window.addEventListener('resize', () => {",
    "const handleResize = () => {"
)
react_component = react_component.replace(
    "  camera.aspect = window.innerWidth / window.innerHeight;\n  camera.updateProjectionMatrix();\n  renderer.setSize(window.innerWidth, window.innerHeight);\n  renderer.setPixelRatio(window.devicePixelRatio);\n});",
    "  camera.aspect = window.innerWidth / window.innerHeight;\n  camera.updateProjectionMatrix();\n  renderer.setSize(window.innerWidth, window.innerHeight);\n  renderer.setPixelRatio(window.devicePixelRatio);\n};\nwindow.addEventListener('resize', handleResize);"
)

# Write the output
with open('src/app/about/page.tsx', 'w', encoding='utf-8') as f:
    f.write(react_component)

print("Conversion completed successfully!")
