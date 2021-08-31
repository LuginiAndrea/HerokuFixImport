# HerokuFixImport
Script that translates .ts files imports to .js files for heroku.

To use it you need to write in the exceptions array all the exceptions (like npm modules).

Then, run it with node specifying the folder with the files to update and the mode (0 .js -> .ts, 1 .ts -> .js)
