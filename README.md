# Circles All The Way Down

## References

[All 6 Trig Functions on the Unit Circle](https://www.youtube.com/watch?v=Dsf6ADwJ66E&t=352s)

[The Coding Train #125 — Fourier Series](https://thecodingtrain.com/challenges/125-fourier-series)

[The Coding Train #130 — Drawing with Fourier Transform and Epicycles](https://thecodingtrain.com/challenges/130-drawing-with-fourier-transform-and-epicycles)

[3Blue1Brown - But what is a Fourier series? From heat flow to drawing with circles | DE4](https://www.youtube.com/watch?v=r6sGWTCMz2k&t=1152s)

[3Blue1Brown - But what is the Fourier Transform? A visual introduction.](https://www.youtube.com/watch?v=spUNpyF58BY&t=23s)

[Custom Fractal Spirograph - chromatic.waltz](https://editor.p5js.org/chromatic.waltz/sketches/3U4VpZ1Ee)

[Juan Carlos Ponce Campuzano - T-Rex Dynamicmath](https://editor.p5js.org/jcponce/sketches/-IvSz9U-6)

[Draw any SVG with Fourier Transform and Epicycles - Abbas Majidov](https://absmj.github.io/fourier-artist/)

[Playable Fourier Series Audiovisualisation - Sander Vermeer](https://editor.p5js.org/mohragk/full/BkMiw4KxV)

[An Interactive Introduction to Fourier Transforms - Jez Swanson](https://www.jezzamon.com/fourier/index.html)

[The Ghost in the MP3 - Ryan Maguire](https://www.theghostinthemp3.com/theghostinthemp3.html)


## My P5js links

[Custom Fractal Spirograph](https://editor.p5js.org/robnet/sketches/uO80F2sLJ)

[T-Rex Dynamicmath](https://editor.p5js.org/robnet/sketches/lsSFK3cZn)

[Drawing with Fourier Transform and Epicycles](https://editor.p5js.org/robnet/sketches/j1Uq5eTXT)

[Fourier Sound Test](https://editor.p5js.org/robnet/sketches/1l9ViSDoO)


# Reveal.js + Svelte + Vite + TailwindCSS

![Svelte Slides logo](public/svelte-slides.jpg)

This template should help get you started creating awesome slide decks using [Reveal.js](https://revealjs.com) with Svelte in Vite.
You can also use [TailwindCSS](https://tailwindcss.com) utility classes to style your slide contents.

## How does it work?
- Your slides are both Svelte components and Reveal.js slides.
- You can have one or more slides (using `<section/>`) within a single Svelte component.
- Create new slides as Svelte components under `src/slides`
- Just import and include your components inside the `src/Presentation.svelte` component
- That's it, you are good to go.

## Configuring Reveal.js
You can customize the `Reveal.js` setup in `src/config.js`.


## Sample slide
### src/Title.svelte
You can insert code blocks using template literals inside `<pre>` and `<code>` elements.
```html
<section>
<h1>This is a sample slide</h1>
<ul>
<li>Apples</li>
<li>Oranges</li>
<li>Grapes</li>
</ul>

<h2>Sample code</h2>

    <pre>
    <code data-line-numbers data-trim data-no-escape>
    {`
      const name = "hello world";
      if(name === 'hello') {
        console.log('world');
      }
    `}
    </code>
    </pre>
</section>
```

### src/Presentation.svelte
The slide order is the order in which you layout your Svelte components.

```html
<script>
    import Title          from './slides/Title.svelte';
    import Love           from './slides/Love.svelte';
    import GettingStarted from './slides/GettingStarted.svelte';

    const partner = ['Svelte', 'Reveal.js'];
</script>

<Title/>
<Love {partner}/>
<GettingStarted/>

```

## Built-in Components
### Slide
A component for slide with all the options supported 
```html
<Slide bgColor="red">
<h1>This is a sample slide</h1>
<ul>
<li>Apples</li>
<li>Oranges</li>
<li>Grapes</li>
</ul>
</Slide>
```

Please refer to [src/lib/Slide.svelte](src/lib/Slide.svelte) for more information about the props.


### Code
A component to render code blocks
```html
<Code trim={true} lineNumbers="1|2-4" >
    {`
      const name = "hello world";
      if(name === 'hello') {
        console.log('world');
      }
    `}
</Code>
```

Please refer to [/src/lib/Code.svelte](/src/lib/Code.svelte) for more information about the props.

### Notes
A component for speaker notes
```html
<Notes>
Hello Everyone, I am using svelte-slides for this presentation
</Notes>
```

### Youtube
A component embedding YouTube videos
```
<Youtube url="https://www.youtube.com/watch?v=1lcPGnRL4Qo"/>
```

Please refer to [/src/lib/Youtube.svelte](/src/lib/Youtube.svelte) for more information about the props.

## Inspiration
This project is inspired by [svelte-reveal-boilerplate](https://github.com/micschwarz/svelte-reveal-boilerplate/) 

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Svelte](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode).

## References
- [Svelte](https://svelte.dev)
- [Vite.js](https://vitejs.dev)
- [Reveal.js](https://revealjs.com)

