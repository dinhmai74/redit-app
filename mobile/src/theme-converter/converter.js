const { forEach } = require("lodash")
const fs = require("fs")
const data = require("./color.json")

const result = {}
forEach(data, (value, key) => {
  if (typeof value === "string") {
    result[key] = value
  } else {
    forEach(value, (color, depth) => {
      console.log("depth,color", depth)
      const tempKey = `${key}-${depth}`
      result[tempKey] = color
    })
  }
})

fs.writeFileSync("../theme/palette.ts", `export const palette=`)
fs.appendFileSync("../theme/palette.ts", JSON.stringify(result, null, 2), "utf-8")
