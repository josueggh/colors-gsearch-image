# colors-gsearch-image
This little project was created to resolve the next task: "Extract de dominant color or pallete from a collection of image produced by a Google Image Search "

### What does the script do?

- Scrape the Google Search images and save them the into the *collection* directory
- Merge all the images into one main image in PNG format
- Get the main color or palette from the main image

### Installation

```bash
npm install 
```
### Usage
In this example we're looking get the dominant color in 5 images from Google Search with the query "Batman"
```javascript
    const color = require("./color");
    let dominant_color = color.getDominant('Batman', 5 ) 
    /*The response will be [ 34, 40, 47 ]*/
```
In this example we're looking get the palette of 5 images from Google Search with the query "Batman"
```javascript
    const color = require("./color");
    let dominant_color = color.getPalette('Iron Man', 5 ) 
    /*The response will be  [ 204, 162, 149 ], [ 28, 25, 38 ], [ 106, 161, 196 ], [ 113, 58, 57 ], [ 66, 99, 175 ] ]*/
```
### Response

Each color is represented in an array of RGB values, so the palette will be an array of arrays

```javascript
    // Dominant color
    [R,G,B]
    //Palette
    [ [R,G,B] ]
```
### Running the example

```bash
    node example.js palette "Batman" 10
```


