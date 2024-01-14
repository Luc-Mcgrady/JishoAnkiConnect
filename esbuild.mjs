import esbuild from "esbuild"

await esbuild.build({
    sourceRoot: "src",
    entryPoints: ["src/index.ts"],
    outfile: "dist/cli.js",
    bundle: true,
    platform: "node",
})