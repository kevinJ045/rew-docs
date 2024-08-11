# Module `fs`
Rew comes with the node's `fs` module by default, you don't need to import this module as it is there by default.

## Functions
+ `read`: Reads files
+ `write`: Writes to files
+ `exists`: Checks if file exists
+ `fstat`: Gives you the file stats
+ `rm`: Removes files
+ `chmod`: Changes file permissions
+ `mkdir`: Creates Directories
+ `ls`: Lists Directories

## Helpers
+ `basename(string, suffix)`: Gives the path's basename
+ `dirname`: Gives the dirname of the given path
+ `extname`: Gives the file extension of the given path
+ `pjoin`: Joins given paths
+ `presolve`: Resolves given paths

## Examples
```coffee
myFile = read './myfile.txt'
print myFile # file content

write './myfile.txt', "My content"

# Allow access for everyone
chmod './myfile.txt', 077 

print 'It Exists' if exists './myfile.txt'
```