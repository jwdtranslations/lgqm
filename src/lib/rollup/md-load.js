// @ts-nocheck
export default function mdLoad() {
  return {
    name: "md",

    transform(code, id) {
      if (id.endsWith(".md")) {
        return {
          code: `export default ${JSON.stringify(code)};`,
          map: { mappings: "" }
        };
      }
    }
  };

}