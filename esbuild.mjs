import esbuild from "esbuild"

await esbuild.build({
    sourceRoot: "src",
    entryPoints: ["src/index.ts"],
    outfile: "dist/cli.js",
    bundle: true,
    platform: "node",
})

/*await esbuild.build({
    sourceRoot: "src",
    entryPoint: "src/stuff.ts",
    outfile: "dist/cli.js",
    bundle: true,
    platform: "commonjs",
})*/