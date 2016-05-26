var gulp = require('gulp'), // Сообственно Gulp JS
    uglify = require('gulp-uglify'), // Минификация JS
    csso = require('gulp-csso'), // Минификация CSS    
    rimraf = require('rimraf');


 gulp.task('clean', function (cb) {
	 rimraf('./out', cb);
 });

gulp.task('public:css', function () { 
 gulp.src('./src/style.css')
 .pipe(csso()) // минифицируем css, полученный на предыдущем шаге
 .pipe(gulp.dest('./out')); // результат пишем по указанному адресу
});

gulp.task('public:js', function() {
    gulp.src('./src/*.js') // файлы, которые обрабатываем   
        .pipe(uglify()) // получившуюся "портянку" минифицируем 
        .pipe(gulp.dest('./out')) // результат пишем по указанному адресу
});
gulp.task('public:img', function() {
    gulp.src('./src/*.png') // файлы, которые обрабатываем   
        .pipe(gulp.dest('./out')) // результат пишем по указанному адресу
});
gulp.task('public:json', function() {
    gulp.src('./src/*.json')  
        .pipe(gulp.dest('./out'))
});
gulp.task('public:html', function() {
    gulp.src('./src/*.html')  
        .pipe(gulp.dest('./out'))
});
gulp.task('watch', function () {
 gulp.watch('./src/style.css', ['public:css']); 
 gulp.watch('./src/*.js', ['public:js']);
});
gulp.task('default', ['public:css', 'public:js', 'public:img', 'public:json', 'public:html', 'watch']);