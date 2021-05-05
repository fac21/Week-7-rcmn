const build = require("../../database/build.js")

module.exports = (on, config) => {
  on("task", { 
      resetDb: () => {
        console.log("resetting DB");
        return build();
      }
    })
};
