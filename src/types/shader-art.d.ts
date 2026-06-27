declare module "shader-art" {
  export class ShaderArt extends HTMLElement {
    static register(plugins: Array<() => unknown>): void;
  }
}

declare module "@shader-art/plugin-uniform" {
  export class UniformPlugin {
    constructor();
  }
}
