# Personal Script Kit environment

Environment containing my personal scripts and settings for
https://www.scriptkit.com/ app.

## Scripts

### Safari Reading List export

Script that exports Safari reading list. Links are copied to clipboard for you
to paste anywhere you want.

Works by reading content of `~/Library/Safari/Bookmarks.plist` file. This file
can't be accessed by default in macOS so you will have to add Kit to
applications with "Full Disk Access" in macOS "Security & Privacy" settings. I
didn't find a way to allow only this specific script to have "Full Disk Access"
setting applied - but it would be preferable in my opinion. If you have any idea
how to approach it let's discuss in
[issues](https://github.com/straku/.kenv/issues) 🙏

Two formatting options are available:

- markdown - links are using markdown format with `[title](url)`, each link in
  new line
- raw - each url in new line
