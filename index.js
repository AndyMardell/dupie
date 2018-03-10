#!/usr/bin/env node

var pie = require("cli-pie");
var cmd = require('node-cmd');
var program = require('commander');

program
    .usage('[options] <dir>')
    .description('If no argument is given, will show a chart for the current directory\n\n  Alternative usage:\n\n  dupie disk - show current disk usage\n  dupie <diskn> - show specific disk usage')
    .arguments('<dir>')
    .action(function(dirPath) {
        dir = dirPath;
    })
    .parse(process.argv);

if (typeof dir === 'undefined' || dir.substring(0, 4) !== "disk" ) {

    var path = (typeof dir === 'undefined' ? "" : dir);
    cmd.get(
        'du -d 1 ' + path + " | sort -nr",
        function(err, data, stderr) {
            if (typeof data === 'undefined' || data === "") {
                console.log("Directory not found");
                process.exit(1);
            } else {
                var lines = data.split("\n");
                var pieArr = [];
                var totalSize = parseInt(lines[0]);
                // Store all values in array, starting at 2nd line
                for (var i = 1, len = lines.length; i < len; i++) {
                    const line = lines[i].split("\t");
                    var size = parseInt(line[0]);
                    var name = line[1];
                    var percentage = (size / totalSize) * 100;
                    // TODO: group all things below 2%
                    if ( typeof name !== 'undefined' && percentage > 2 ) {
                        pieArr.push({ label: name, value: size });
                    }
                }
                var du = new pie(10, pieArr, { legend: true } );
                console.log(du.toString())
            }
        }
    );

} else {

    var disk = dir;
    cmd.get(
        'df | grep -E ' + disk,
        function(err, data, stderr) {
            if (typeof data === 'undefined' || data === "") {
                console.log("Disk not found");
                process.exit(1);
            }
            var dataArr = data.split(/\s+/);
            var used = parseInt(dataArr[4].replace('%', ''));
            var free = 100 - used;
            var df = new pie(10, [
                    { label: "Used", value: used, color: [237, 115, 85] },
                    { label: "Free", value: free, color: [183, 183, 183] }
                ], 
                { legend: true }
            );
            console.log(df.toString())
            process.exit(1);
        }
    );

}