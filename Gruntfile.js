module.exports = function(grunt) {
  var TSTAMP = grunt.template.today('yyyymmddHHMMssl');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    s3: {
      options: {
        key: process.env.AWS_ACCESS_KEY_ID,
        secret: process.env.AWS_SECRET_ACCESS_KEY,
        bucket: process.env.FOG_DIRECTORY,
        access: 'public-read'
      },
      dev: {
        // These options override the defaults
        options: {
          encodePaths: true,
          maxOperations: 20
        },
        // Files to be uploaded.
        upload: [
          {
            src: 'app/assets/**/*',
            dest: TSTAMP + '/assets/',
            gzip: true
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-s3');

  grunt.registerTask('saveAssetVersion', 'Log some stuff.', function() {
    grunt.file.write('.env', 'ASSET_VERSION=' + TSTAMP);
  });

  grunt.registerTask('default', ['s3:dev', 'saveAssetVersion']);

};
