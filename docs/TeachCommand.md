# Teach Command

🍎 Teaches `webpack-command` that a command has been installed and is available.

```console
$ webpack teach [...options]

  Usage
    $ webpack teach --command <command> --module <module>

  Options
    --command   The name of a command that users will type
    --forget    Instructs the tool to forget a previously added command
    --module    The npm module name of a command

  Examples
    $ webpack teach --command init --module webpack-command-init
    $ webpack teach --command init --forget
```

## Getting Started

> This command is included by default with `webpack-command`

## Usage

To teach `webpack-command` that a command package has been installed run:

```console
$ webpack teach --command <command-name> --module <module-name>
```

_Note: `<module-name>` can be either an npm package name or an absolute path to
a module file._

To teach `webpack-command` that a command package should be forgotten run:

```console
$ webpack teach --command <command-name> --forget
```

## When to Use

This command is primarily meant to be used in the `postinstall` and
`postuninstall` npm scripts for an npm package, but can be used for specialized
local command modules for devops environments.

An npm `package.json` example:

```json
{
  "scripts": {
    "postinstall": "webpack teach --command batman --module webpack-command-batman",
    "postuninstall": "webpack teach --command batman --forget"
  }
}
```

The example above teaches `webpack-command` that it should recognize `batman` as
a valid command, and use the `webpack-command-batman` module to run it.

## That's All, Folks