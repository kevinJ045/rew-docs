# Module `secrets`
You don't import secrets as a module, but rather `secrets` is a cli utility to put all your secrets into one [qrew](/qrew.html) file and import it to multiple different files.

## Initiate
```bash
rew secret init
```
Once initiated, you will have a `secrets.qrew` file in the root of your project, also keep in mind that once initiated it can only be manipulated using the password that initator put.

## Setting Keys
This will create an i
```bash
rew secret set MY_KEY
```

## Getting keys
```bash
rew secret get MY_KEY
```

## Removing keys
```bash
rew secret remove MY_KEY
```

## Using different files
```bash
rew secret init -f my-custom-file.qrew

rew secret set MY_KEY -f my-custom-file.qrew
```

## Using in your files
To you it, you just import it inside your code normally.
```coffee
secrets = imp '@/secrets.qrew'

using secrets.MY_KEY
  .do (key) -> # whatever you want
```