# Qrew
**Qrew** is a binary format for **rew**. Once you have built a file to a `qrew` binary, you can only run it in it's parent [app](/app.html) or just run it as a file.

**Qrew** files are only imporable in their parent app, or sibling files that have the same parent, meaning that `qrew` files that have [no parent app](/rogue.html) can not be imported.

**Qrew** was made as a security layer to your app, meaning that only the app it was built inside can import it, but it can be ran anywhere else **unless it has been renamed**.

**Qrew** compiles and encrypts your code using it's file name and package name, so if you rename either one, your `qrew` binary will stop working.

## Building to a qrew
To build an app to a `qrew`, simple use this command:
```bash
rew build ./path/to/target.coffee
```
More about this in [building](/build.html)