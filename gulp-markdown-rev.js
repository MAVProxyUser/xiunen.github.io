var through = require('through2');
var objectAssign = require('object-assign');
var gutil = require('gulp-util');
var gulp = require('gulp');
var del = require('del');
var merge = require('merge');
var path = require('path');
var fs = require('fs');

function indexFromMarkdown(opts) {
    opts = merge({
        filename: 'markdown.index.json',
        dest: '.tmp',
        file_ext: '.md'
    }, opts);
    var json = [];
    return through.obj(function(file, enc, cb) {
        // file.contents
        var filename = file.path.replace(file.base, '');
        var obj = { title: '', tags: [], filename: filename, ctime: file.stat.ctime, birthtime: file.stat.birthtime, mtime: file.stat.mtime };
        // json[gutil.replaceExtension(filename, opts.file_ext)] = obj;
        json.push(obj);
        cb(null, file);
    }, function(cb) {
        del([opts.filename], function() {
            console.log('delete file' + opts.filename);
        });
        fs.writeFileSync(path.join(__dirname, opts.dest, opts.filename), JSON.stringify(json, null, '\t'));
        cb();
    });
}

module.exports = indexFromMarkdown;