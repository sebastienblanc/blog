[![Netlify Status](https://api.netlify.com/api/v1/badges/1d24018f-209d-448b-be76-decf986a2939/deploy-status)](https://app.netlify.com/sites/n31/deploys)

# My Blog

> Based on the [Eleventy Netlify Boilerplate](https://github.com/danurbanowicz/eleventy-netlify-boilerplate).

## What is it?

A simple blog based on the [Eleventy](https://www.11ty.dev/) static site generator with [Netlify CMS](https://www.netlifycms.org/).

## Local development

### 1. Clone this repository:

```bash
git clone https://github.com/n031/blog.git n031-blog
```

### 2. Navigate to the directory

```bash
cd n031-blog
```

### 3. Install dependencies locally

```bash
npm install @11ty/eleventy
```

### 4. Run Eleventy (builds the site)

```bash
npx @11ty/eleventy
```

Or build automatically when a template changes:
```
npx @11ty/eleventy --watch
```

Or build and host locally for local development:
```
npx @11ty/eleventy --serve
```

Or in debug mode:
```
DEBUG=* npx @11ty/eleventy
```

## Bug reports, feature requests, etc

This is an ongoing project and I welcome contributions and suggestions! Feel free to submit a PR.
