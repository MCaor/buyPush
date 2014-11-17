module.exports = function(grunt) {
  var path = require("path");
  var viewsPath = "views";
  var uiTemplatesPath = "ui-templates";

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    dust: {
      options: {
        name: function(data) {
          var fileName = data.file.src[0];
          fileName = fileName.replace("/", "_");
          fileName = fileName.replace(path.extname(fileName), "");
          return "app_" + fileName;
        }
      },
      build: {
        expand: true,
        cwd: viewsPath,
        src: "**/*.html",
        dest: uiTemplatesPath,
        ext: ".js",
        filter: "isFile"
      }
    },
    concat: {
      options: {
        separator: "\n",
      },
      dist: {
        src: uiTemplatesPath + "/**/*.js",
        dest: "js/" + uiTemplatesPath + ".js",
      }
    },
    watch: {
      templates: {
        files: [viewsPath + "/**/*.html"],
        tasks: ["dust", "dust-static-templates", "concat", "jsbeautifier"],
        options: {
          event: ["all"]
        }
      }
    },
    jsbeautifier: {
      files: ["*.html"]
    }
  });

  grunt.registerTask("dust-static-templates", function() {
    var dust = require("dustjs-linkedin"),
      fs = require("fs");
    var compiledTemplate = dust.compile(fs.readFileSync(viewsPath + "/master.html", "utf8"), "app_views_master");
    dust.loadSource(compiledTemplate);

    compiledTemplate = dust.compile(fs.readFileSync(viewsPath + "/index.html", "utf8"), "app_views_index");
    dust.loadSource(compiledTemplate);

    dust.render("app_views_index", {}, function(err, text) {
      fs.writeFileSync("index.html", text);
    });
  });

  grunt.loadNpmTasks("grunt-dustjs-linkedin");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-jsbeautifier");

  grunt.registerTask("default", ["dust", "concat"]);
  grunt.registerTask("develop", ["dust", "concat", "dust-static-templates", "jsbeautifier", "watch"]);

};