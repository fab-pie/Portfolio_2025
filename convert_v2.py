#!/usr/bin/env python3

# Read pagee.tsx
with open('src/app/about/pagee.tsx', 'r', encoding='utf-8') as f:
    original_content = f.read()

# Remove the import lines at the start
lines = original_content.split('\n')
content_lines = []
skip_imports = True
for line in lines:
    if skip_imports:
        if line.strip().startswith('import ') or (line.strip() == '' and not content_lines):
            continue
        else:
            skip_imports = False
    content_lines.append(line)

code_content = '\n'.join(content_lines)

# Build the React component
output = '''\'use client\';

import { useEffect, useRef } from \'react\';

export default function AboutPage() {
  const mountRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (typeof window === \'undefined\' || !mountRef.current) return;

    // Créer le canvas
    const canvas = document.createElement(\'canvas\');
    canvas.id = \'cvs\';
    canvas.style.display = \'block\';
    canvasRef.current = canvas;
    mountRef.current.appendChild(canvas);

    let cleanup: (() => void) | null = null;

    // Initialiser Three.js
    const initScene = async () => {
      const THREE = await import(\'three\');
      const { GLTFLoader } = await import(\'three/addons/loaders/GLTFLoader.js\');
      const { OrbitControls } = await import(\'three/addons/controls/OrbitControls.js\');

'''

# Add the original code (with some replacements)
code_content = code_content.replace('const canvas = document.getElementById(\'cvs\');', '// canvas already created above')
code_content = code_content.replace('document.getElementById(\'cvs\')', 'canvas')

# Fix window resize handler
code_content = code_content.replace(
    '''window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
});''',
    '''const handleResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
};
window.addEventListener('resize', handleResize);'''
)

output += code_content

# Add cleanup and closing braces
output += '''

      // Fonction de nettoyage
      cleanup = () => {
        window.removeEventListener('resize', handleResize);
        try { if (doorProgressContainer.parentNode) doorProgressContainer.parentNode.removeChild(doorProgressContainer); } catch(e) {}
        try { if (introOverlay.parentNode) introOverlay.parentNode.removeChild(introOverlay); } catch(e) {}
        try { if (introSkipHint.parentNode) introSkipHint.parentNode.removeChild(introSkipHint); } catch(e) {}
        try { if (viewLabel.parentNode) viewLabel.parentNode.removeChild(viewLabel); } catch(e) {}
        try { if (crosshair.parentNode) crosshair.parentNode.removeChild(crosshair); } catch(e) {}
        try { if (pauseMenu.parentNode) pauseMenu.parentNode.removeChild(pauseMenu); } catch(e) {}
        try { if (signOverlay.parentNode) signOverlay.parentNode.removeChild(signOverlay); } catch(e) {}
        try { if (signHint.parentNode) signHint.parentNode.removeChild(signHint); } catch(e) {}
        try { renderer.dispose(); } catch(e) {}
        try { controls.dispose(); } catch(e) {}
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
'''

# Write output
with open('src/app/about/page.tsx', 'w', encoding='utf-8') as f:
    f.write(output)

print(f"✓ Conversion réussie! {len(output.split(chr(10)))} lignes générées")
