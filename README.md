# Atom Date Package

Insert the current date & time.

## Installation

```sh
apm install date
```
or find it in the Packages tab under settings.

## Usage

Select a command from `Date & Time` in the Command Palette.

You can also bind your keys to `date:date`, `date:time`, and `date:datetime`.

# Options

Formatting is done using [date-fns](https://date-fns.org/docs/format).

## Examples

All outputs are for 11:39:23.584 AM MDT August 21, 2017 

| Format | Output |
| ------ | ------ |
| `D/M/YYYY` | 21/8/2017 |
| `dddd MMMM D, YYYY` | Monday August 21, 2017 |
| `H:mm A` | 11:39 AM |
| `X` | 1503337163 |
| `YYYY-MM-DD` | 2017-08-21 |
| `THH:mm:ssZ` | T11:39:23-06:00 |