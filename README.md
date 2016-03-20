# Module 6: Plotly

## Overview
In this module, you'll start building visualizations using the Plotly API. Plotly is a visualization software that recently open-sourced it's API to JavaScript, MatLab, Python, and R, making it quite valuable to learn. Plotly graphs are fairly customizable, and (by default) have a variety of interactive methods with each chart (i.e., hover, brush to zoom, pan, etc.). Many of these events are fairly cumbersome to build programmatically, which makes a library like Plotly quite attractive. Unfortunately, you will be restrained to the chart types that come _"out of the box"_, which is why we will later learn the D3 library. That being said, there are tons of use cases for using a library like Plotly, and understanding it's charting methods can help you better design your own visualization software from scratch. Interestingly, many Plotly graphs are built on top of the d3.js library, which you'll learn soon.

<!-- START doctoc -->

<!-- END doctoc -->

## Resources

- [Plotly Website](https://plot.ly/)
- [Plotly JavaScript API](https://plot.ly/javascript/)
- [Plotly JavaScript API Reference](https://plot.ly/javascript/reference/)

## Getting started
Like other JavaScript libraries, you'll need to begin by reading in the source code of the library, which you can do either by downloading the library, or reading it in via CDN:

```html
  <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
```

The library exposes the main `Plotly` function, which allows charts to be built using `Plotly.plot`, which accepts three arguments. The first argument to the function determines the container in which the chart will be rendered.

>**Chart Container**: The `<div>` element in which the chart should be rendered. The argument may be passed either as a string of the element id (_without_ the `#`), or an HTML selection (i.e., pass in `$('#div-id')`).

>**Data**: The data argument is an **array of objects**, each one of which describes a set of data you wish to render. For example, each object could specify a trace on a line chart. A single object can specify multiple attributes, such as `x` and `y` (each arrays) attributes for each datapoint.

>**Layout**: The final argument to the `Plotly.plot` function specifies the visual layout of the data, including margins, axis labeling, and geographic projections.


Once you define these argument (see below), rendering the chart simply requires calling the `Plotly.plot` function:

```javascript
Plotly.plot('div-id', data, layout);
```
## Basic chart
This section demonstrates how to define the `data` and `layout` arguments to define a scatterplot. This is only a simple example, so make sure you feel comfortable using the documentation for the [scatterplot](https://plot.ly/javascript/reference/#scatter) and the [layout](https://plot.ly/javascript/reference/#layout).

We'll begin by defining our data, which is an **array of objects** that we'll pass to the rendering function. Included properties of the object include `x`, `y`, and the `mode` we wish to use (in this case, `markers`). To start, we'll just define a single object of data to render in our array:

```javascript
// Array of objects to display in our plot
var chartData = [
  {
    x:[5, 2, 5, 9],
    y:[25, 52, 35, 98],
    mode:'markers'
  }
];
```

Once we've defined our `data` variable, we can configure layout parameters and store them in a variable. Again, nearly all elements are configurable, so make sure you're familiar with the [documentation](https://plot.ly/javascript/reference/#layout):

```javascript
// Configuration for the chart layout
var chartLayout = {
  xaxis: {
    title: 'X Data'
  },
  yaxis: {
    title: 'Y Data',
  },
  margin: {
    l: 20
  },
};
```

Having defined these variables, we can declare a Plotly graph by calling the `Plotly.plot` function:

```javascript
// Render chart (assuming there is a div with ID `chart-div`)
Plotly.plot('chart-div', chartData, chartLayout)
```

To practice using Plotly, see [exercise-1](exercise-1). Please note, the data used pertains to gun violence in the United States, and should be worked with and presented in a thoughtful and considerate fashion.
