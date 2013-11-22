cd /d %~dp0
cd ../
node lib/r.js -o build/ko.widget.build.js
node lib/r.js -o build/ko.widget.min.build.js