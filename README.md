[![Netlify Status](https://api.netlify.com/api/v1/badges/1d24018f-209d-448b-be76-decf986a2939/deploy-status)](https://app.netlify.com/sites/n31/deploys)

# My Blog

A simple blog based on the [Eleventy](https://www.11ty.dev/) static site generator with 

## License

Except as otherwise noted, creative contents in this project (text, images, etc.) are licensed under a [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-nc-sa/4.0/).

Code samples and the code source of this project are licensed under the [MIT license](LICENSE).

## Development

This project has been kickstarted using the [Eleventy Netlify Boilerplate](https://github.com/danurbanowicz/eleventy-netlify-boilerplate).
Some following additions have been inspired by [eleventy-blog-staticman](https://github.com/eduardoboucas/eleventy-blog-staticman) and some other 11ty/Netlify starter repositories.

[11ty](https://www.11ty.dev/) is therefore the core of the project.

It use markdown via [markdown-it](https://markdown-it.github.io/) (with [liquid](https://www.11ty.dev/docs/languages/liquid/) extensions) for simple pages and posts, including the following features:

- headings anchors via [markdown-it-anchor](https://github.com/valeriangalliat/markdown-it-anchor)
- [emojis](https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.json) via [markdown-it-emoji](https://github.com/markdown-it/markdown-it-emoji)
- [footnotes](https://pandoc.org/MANUAL.html#footnotes) via [markdown-it-footnote](https://github.com/markdown-it/markdown-it-footnote)

Layouts and reusable components are defined using [Nunjucks](https://mozilla.github.io/nunjucks/).


It also use the following features of Netlify :

- [functions](https://www.netlify.com/products/functions/), to [handle comments on posts](functions/staticman.js) via [Staticman](https://staticman.net/)
- [forms](https://www.netlify.com/products/forms/), for the [contact form](_includes/components/contact-form.njk)
- [build environment variables](https://docs.netlify.com/configure-builds/environment-variables/) for [deploy previews](https://docs.netlify.com/site-deploys/deploy-previews/)
- [Netlify CMS](https://www.netlifycms.org/) for collaborative work

### Step Up

#### 1. Clone this repository:

```bash
git clone https://github.com/n031/blog.git n031-blog
```

#### 2. Navigate to the directory

```bash
cd n031-blog
```

#### 3. Install dependencies locally

```bash
npm install
```

#### 4. Run Eleventy (builds the site)

```bash
npm run build
```

Or build automatically when a template changes:

```bash
npm run watch
```

Or build and host locally for local development:

```bash
npm start
```

Or in debug mode:

```bash
npm run debug
```