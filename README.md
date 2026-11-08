# DV2026-GrizzlyBears
Final Assignment for the [Data Visualization](https://corsi.unige.it/en/off.f/2025/ins/83997) course.

## Team Members

+ Gianluca Bottiglieri
+ Roberto Castellotti
+ Virginia Passalacqua
+ Edoardo Siri

## Self evaluation

### Roberto

+ webdev for the last 10 years
+ worked as backend web developer on a platform for mobile device protection
+ SAW during my bachelor

### Gianluca

+ followed SAW during BSc
+ worked in software for the last 10 years, in one way or another
+ currently, I often rely on Claude by Anthropic for boilerplate code and prototyping

## Technologies we plan to use

We plan to use [Preact](https://preactjs.com/), a micro react framework with API compatibility) with [Tailwind CSS](https://tailwindcss.com/), an atomic CSS framework with [D3.js](https://d3js.org/) for visualizations.

## Data handling and processing

We explore and refine the data offline in Python, with:

+ [numpy](https://numpy.org/) for numerical work
+ [pandas](https://pandas.pydata.org/) for dataset processing
+ [matplotlib](https://matplotlib.org/) for quick exploratory plots

The refined data is probably gonna be exported as static files (CSV or JSON) into the repository, and the website will load those at runtime.


## Running locally

A nix development shell is provided and can be activated with `nix develop`, alternatively it is enough to install bun following [the official guide](https://bun.com/get), in any case, once `bun` is installed:


```sh
bun install # install dependencies
bun dev # starts local development server
```

## Running in production

A Github Action deploys every commit to master to https://rcastellotti.github.io/DV2026-GrizzlyBears/
