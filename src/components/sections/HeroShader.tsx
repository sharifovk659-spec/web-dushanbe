"use client";

import { useEffect, useRef } from "react";
import styles from "./HeroShader.module.css";

const SHADER_MARKUP = `
<shader-art autoplay play-state="running">
  <uniform type="float" name="scale" value=".38" />
  <uniform type="float" name="ax" value="5" />
  <uniform type="float" name="ay" value="7" />
  <uniform type="float" name="az" value="9" />
  <uniform type="float" name="aw" value="13" />
  <uniform type="float" name="bx" value="1" />
  <uniform type="float" name="by" value="1" />
  <uniform type="color" name="color1" value="#050505" />
  <uniform type="color" name="color2" value="#c9f24d" />
  <uniform type="color" name="color3" value="#1a2608" />
  <uniform type="color" name="color4" value="#d4f87a" />

  <script type="buffer" name="position" data-size="2">
    [-1, 1, -1,-1, 1,1, 1, 1, -1,-1, 1,-1]
  </script>
  <script type="buffer" name="uv" data-size="2">
    [ 0, 0,  0, 1, 1,0, 1, 0,  0, 1, 1, 1]
  </script>

  <script type="vert">
    precision highp float;
    attribute vec4 position;
    attribute vec2 uv;
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = position;
    }
  </script>
  <script type="frag">
    precision highp float;
    varying vec2 vUv;
    uniform float time;
    uniform float scale;
    uniform vec2 resolution;
    uniform vec3 color1, color2, color3, color4;
    uniform int numOctaves;
    const float PI = 3.141592654;
    uniform float ax, ay, az, aw;
    uniform float bx, by;

    float cheapNoise(vec3 stp) {
      vec3 p = vec3(stp.st, stp.p);
      vec4 a = vec4(ax, ay, az, aw);
      return mix(
        sin(p.z + p.x * a.x + cos(p.x * a.x - p.z)) *
        cos(p.z + p.y * a.y + cos(p.y * a.x + p.z)),
        sin(1. + p.x * a.z + p.z + cos(p.y * a.w - p.z)) *
        cos(1. + p.y * a.w + p.z + cos(p.x * a.x + p.z)),
        .436
      );
    }

    void main() {
      vec2 aR = vec2(resolution.x/resolution.y, 1.);
      vec2 st = vUv * aR * scale;
      float S = sin(time * .005);
      float C = cos(time * .005);
      vec2 v1 = vec2(cheapNoise(vec3(st, 2.)), cheapNoise(vec3(st, 1.)));
      vec2 v2 = vec2(
        cheapNoise(vec3(st + bx*v1 + vec2(C * 1.7, S * 9.2), 0.15 * time)),
        cheapNoise(vec3(st + by*v1 + vec2(S * 8.3, C * 2.8), 0.126 * time))
      );
      float n = .5 + .5 * cheapNoise(vec3(st + v2, 0.));

      vec3 color = mix(color1, color2, clamp((n*n)*8.,0.0,1.0));
      color = mix(color, color3, clamp(length(v1),0.0,1.0));
      color = mix(color, color4, clamp(length(v2.x),0.0,1.0));
      color /= n*n + n * 5.;
      gl_FragColor = vec4(color,1.);
    }
  </script>
</shader-art>
`;

function removeGuiPanels() {
  document.querySelectorAll(".dg.ac, .dg.main").forEach((el) => el.remove());
}

export function HeroShader() {
  const hostRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const root = rootRef.current;
    if (!host || !root) return;

    let disposed = false;

    const init = async () => {
      try {
        const [{ ShaderArt }, { UniformPlugin }] = await Promise.all([
          import("shader-art"),
          import("@shader-art/plugin-uniform"),
        ]);

        if (disposed) return;

        if (!customElements.get("shader-art")) {
          ShaderArt.register([() => new UniformPlugin()]);
        }

        host.replaceChildren();
        const mount = document.createElement("div");
        mount.innerHTML = SHADER_MARKUP.trim();
        const shaderEl = mount.firstElementChild;
        if (!shaderEl) throw new Error("shader-art element missing");

        host.appendChild(shaderEl);
        root.classList.remove(styles.fallback);

        const kick = () => {
          if (disposed) return;
          const el = host.querySelector("shader-art") as HTMLElement | null;
          if (el) {
            el.setAttribute("autoplay", "");
            el.setAttribute("play-state", "running");
          }
          removeGuiPanels();
        };

        requestAnimationFrame(kick);
        window.setTimeout(kick, 80);
        window.setTimeout(kick, 320);
      } catch (error) {
        console.error("[HeroShader] WebGL init failed:", error);
        if (!disposed) root.classList.add(styles.fallback);
      }
    };

    void init();

    return () => {
      disposed = true;
      host.replaceChildren();
      root.classList.remove(styles.fallback);
      removeGuiPanels();
    };
  }, []);

  return (
    <div ref={rootRef} className={`${styles.shader} ${styles.fallback}`} aria-hidden>
      <div ref={hostRef} className={styles.canvasLayer} />
      <div className={styles.overlay} />
    </div>
  );
}
