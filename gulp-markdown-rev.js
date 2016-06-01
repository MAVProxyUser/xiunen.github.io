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
        var filename = file.path.replace(file.base, '');
        var obj = { title: '', tags: [], filename: filename, ctime: file.stat.ctime, birthtime: file.stat.birthtime, mtime: file.stat.mtime };
        var contents = file.contents.toString().split('\n');
        obj.title = contents[0].replace(/^#/,'').replace(/^\s*/,'');
        obj.tags = contents[1].split(/\s/).map(function(item){
            return item.replace(/`/g,'');
        });
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