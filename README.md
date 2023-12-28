# Prerequisites

Here are the WOMM (works on my machine) specs

- Hardware: Last gen i9 Intel Macbook Pro (Late 2019)
- Operating system: Mac OS Sonoma 14.1.1

```console
# versions I have
npm --version
10.1.0
node --version
v20.8.0
npx --version
10.1.0
```

Basically, any recent machine that runs node 20.8.0 or above :should: work

# Installation

```console
npm i
```

If you don't have the browser binaries for playwright it should prompt you to run this command. It shouldn't hurt to run it either way if you aren't sure.

```console
npx playwright install
```

# Run

```console
npm start
```

The above will run the default, you could change variables in the repo.
