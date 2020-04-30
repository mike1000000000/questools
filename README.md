# Questools

A couple tools that use the Questrade API to output informational tables.
You will first need an account here: [http://www.questrade.com]

## Prerequisites

Node and NPM need to be installed. These tools were built using Node v12.16.1 and NPM 6.13.4.

## Install

Using git (starting from an empty folder):
```
$ git clone https://github.com/mike1000000000/questools.git .
$ npm install
```
**Note:** If you install questools locally you can create a system link using `npm link` otherwise you will need to run `node questool.js [command]` whenever issuing a command.

## Usage

In order to get started, you will need to provide a refresh token from the Questrade APP Hub.

You will need to turn on the **'Enable general API access'** in the user settings and create a Personal App with Manual authorization.

The refresh token is a ***single use token*** which means once it's used you will get an access token to make requests with ***and*** a new refresh token. The new refresh token gets saved in the questools JSON file and is only good for **7** days.

To set the token, generate one in the Questrade APP hub and issue this command:
```
$ questool --token=ABCDEFGHIJKLMONPQRSTUVWXYZ1234567
```

## Syntax
```
questool [command] [arguments]
```
&nbsp;
  
Commands
***
##### Positions
Show a table of account positions. This table marks current prices red when less than the average entry price and green when more.
```
$ questool positions
```
&nbsp;
Output:

```
┌────────────────┬─────────┬────────────┬───────────┬──────────────┬────────────────┐
│ Account Number │ Symbol  │ Symbol ID  │ Quantity  │ Entry price  │ Current price  │
├────────────────┼─────────┼────────────┼───────────┼──────────────┼────────────────┤
│ 99999999       │ BP      │ 8952       │ 100       │ 25.00        │ 26.00          │
├────────────────┼─────────┼────────────┼───────────┼──────────────┼────────────────┤
│ 99999999       │ PTR     │ 31778      │ 100       │ 35.00        │ 34.00          │
├────────────────┼─────────┼────────────┼───────────┼──────────────┼────────────────┤
│ 99999999       │ CVX     │ 13185      │ 100       │ 90.00        │ 90.00          │
└────────────────┴─────────┴────────────┴───────────┴──────────────┴────────────────┘
```
&nbsp;
##### Show
Show a table of symbol info. This command requires the user to provide a list of symbols on the command line to be parsed.
```
$ questool show BP PTR CVX
```
**Note**: Symbol names only.
&nbsp;
Output:
```
┌─────────┬────────────┬─────────────┬─────────────┬─────────────┬────────────┬────────────────────┬───────────┬───────────┐
│ Symbol  │ Symbol ID  │ Prev Day    │ High Price  │ Low Price   │ Listing    │ Decription         │ Security  │ Currency  │
│         │            │ Close Price │ 52          │ 52          │ Exchange   │                    │ Type      │           │
├─────────┼────────────┼─────────────┼─────────────┼─────────────┼────────────┼────────────────────┼───────────┼───────────┤
│ BP      │ 8952       │ 25.01       │ 40          │ 25.01       │ NYSE       │ BP SPON ADR EACH … │ Stock     │ USD       │
├─────────┼────────────┼─────────────┼─────────────┼─────────────┼────────────┼────────────────────┼───────────┼───────────┤
│ PTR     │ 31778      │ 35.55       │ 60.01       │ 21.72       │ NYSE       │ PETROCHINA CO SPO… │ Stock     │ USD       │
├─────────┼────────────┼─────────────┼─────────────┼─────────────┼────────────┼────────────────────┼───────────┼───────────┤
│ CVX     │ 13185      │ 90.1        │ 150         │ 50.01       │ NYSE       │ CHEVRON CORPORATI… │ Stock     │ USD       │
└─────────┴────────────┴─────────────┴─────────────┴─────────────┴────────────┴────────────────────┴───────────┴───────────┘
```
&nbsp;
##### Watched

The `watched` command outputs the same table as the `show` command but instead of providing the list of symbols on the command line you can store a list to show when this command is called.
```
$ questool watched
```
&nbsp; 
To add symbols to be watched use this command (*BP* being the stock):
```
$ questool watch BP
```
&nbsp;  
To removed symbols from being watched use this command:
```
$ questool unwatch BP
```
&nbsp;  
Arguments
***
##### Token
Use `-t` or `--token` to set the initial refresh token.
&nbsp;  
##### Verbose
Use `-v` or `--verbose` to show retrieved JSON strings and debugging info.
&nbsp;
##### Help
Use `-h` or `--help` to show the help menu.
&nbsp;
##### Version
Use `-V` or `--Version` (note case) to the show the version info.

---
### Warranty:

VENDOR MAKES NO WARRANTIES, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED WARRANTY OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE.

Written by Michel Noel © 2020