# DV2026-GrizzlyBears
Repository of Grizzly Bears (Bottiglieri Gianluca, Castellotti Roberto, Siri Edoardo)

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

We plan to start with good old plain HTML, CSS and Javascript. Potentially we will extend, if needed, using either: 
+ [Preact](https://preactjs.com/) (micro react framework with API compatibility) 
+ [Svelte](https://svelte.dev/)[^1]

Eventually we might add [Tailwind CSS](https://tailwindcss.com/) if we notice our CSS becomes too complex to manage.

For the visualizations we will use [D3.js](https://d3js.org/) as instructed.

## Data handling and processing

We explore and refine the data offline in Python, with:

+ [numpy](https://numpy.org/) for numerical work
+ [pandas](https://pandas.pydata.org/) for dataset processing
+ [matplotlib](https://matplotlib.org/) for quick exploratory plots

The refined data is probably gonna be exported as static files (CSV or JSON) into the repository, and the website will load those at runtime.

[^1]: fun fact: Svelte was started as a pet project by Rich Harris when working on the delightful viz on nytimes.com
