import esbuild from "esbuild"

await esbuild.build({
    sourceRoot: "src",
    entryPoint: "src/index.ts",
    outfile: "dist/cli.js",
    bundle: true,
    platform: "node",
})

await esbuild.build({
    sourceRoot: "src",
    entryPoint: "src/index.ts",
    outfile: "dist/cli.js",
    bundle: true,
    platform: "commonjs",
})