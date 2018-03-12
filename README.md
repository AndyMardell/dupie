# `dupie`

`dupie` is a nodejs app that presents disk usage and directory size in pie chart form. Everyone loves a pie chart.

![dupie](http://mardell.me/github/dupie.jpg)

# Install `dupie`

```bash
npm i dupie -g
```

# Usage

[`dupie`](#dupie)  
[`dupie` $dir](#dupie-dir)  
[`dupie` disk](#dupie-disk)  
[`dupie` $diskname](#dupie-diskname)  

## `dupie`

Runs `dupie` on your current working directory. Similar to `du -s ./*`

```bash
dupie
```

## `dupie` $dir

Runs `dupie` on a specific directory. Similar to `du -s ./path/to/dir/*`

```bash
dupie /path/to/dir
dupie /path/to/dir\ with\ spaces/
```

## `dupie` disk

Runs `dupie` on your current disk. Similar to `df | grep /dev/disk1`

```bash
dupie disk
```

## `dupie` $diskname

Runs `dupie` on a specific disk or partition. Similar to `df | grep /dev/disk1s4`

```bash
dupie disk1s4
```

***

mrdl
