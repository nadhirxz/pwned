# pwned
A command line tool to check if a password has been [pwned](https://en.wikipedia.org/wiki/Leet#Owned_and_pwned) using [Have I Been Pwned](https://haveibeenpwned.com/) API

## Usage

Install dependencies

```
npm install
```

Run

```
node index [options] [password]
```
> *If you don't pass a password as argument, the program will prompt you to write one.*

## Link

Use `npm link` to create a symlink to run `pwned` from anywhere

Now you can run
```
pwned [options] [password]
```

Use `npm unlink` to remove symlink


## Options
```
Arguments:
  password       password you want to check

Options:
  -V, --version  output the version number
  -h, --help     display help for command
```