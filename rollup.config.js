import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

const legoUmd = (input, name) => {
  return {
    input,
    output: [
      {
        name,
        file: input.replace("./src", "./dist").replace(".js", ".umd.js"),
        format: "umd"
      }
    ],
    plugins: [
      resolve(), // so Rollup can find `ms`
      commonjs() // so Rollup can convert `ms` to an ES module
    ]
  };
};

const legoNodeEs = input => ({
  input,
  external: ["ms"],
  output: [
    {
      file: input.replace("./src", "./dist").replace(".js", ".cjs.js"),
      format: "cjs"
    },
    {
      file: input.replace("./src", "./dist"),
      format: "es"
    }
  ]
});

const config = ["./src/index.js"].reduce((previous, file) => {
  previous.push(legoUmd(file, "w3cwebstorage"));
  previous.push(legoNodeEs(file));
  return previous;
}, []);

export default config;
