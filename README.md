# Novel static

Deploy novels to Github pages as static web pages.

Now uses [DecapCMS](https://decapcms.org/) for content editing within the browser.

## Setup

1. Fork the repository. Make sure to also copy the actions workflow.
2. Enable Github pages by going to repository Settings -> Pages and setting Source to Github actions.
3. Set the build variables (Settings -> Secrets and variables -> Actions -> Variables) `REMARK42_URL`, `REMARK42_SITE_ID`, `BASE_URL` to your correct values.
   The remark42 variables are for the comment system.
   An example `BASE_URL` for a site hosted on github pages is `https://sqooid.github.io` (excludes the repository name).
4. Let the site deploy
5. Go to `${BASE_URL}/${REPOSITORY_NAME}/admin/index.html` to access the CMS and edit chapters/metadata.

### Creating content

Navigate to the CMS at `/${REPOSITORY_NAME}/admin/index.html` and log in with the Github account that has access to the repository.
The CMS works by making commits (creating markdown files) on your behalf to the website's repository, which is then automatically rebuilt and deployed.

Create a new chapter by clicking on the "Chapter" collection tab on the left and then clicking "New Chapter".
In the "Path" field, input something like `volume-1/chapter-1`.
This field determines the slug (url) that will be used to access the chapter.

The other fields are fairly self-explanatory.
However, there are some special cases, which are explained below

Files with the same `volume` value are grouped together.
Files within the same volume are sorted by their chapter value, and volumes are sorted the same way.

### Metadata

The "Metadata" collection controls the `metadata.json` file.
Here, you control the data on the root page - i.e. the table of contents - as well as the content that is shown in rich links and on search engines.

The "Volume Overrides" field can be used to hardcode a different value for specific volume values for things such as prefaces and blurbs (more below).

### Prefaces and other information

You can create sections for auxilliary content (Metadata collection for a demo example).
Give a chapter a negative value to hide the chapter number from rendering. Chapters will still be listed in ascending order, but the numbers will not be shown.

## Developing (live preview)

Once you've installed dependencies with `pnpm install`, start a development server:

```bash
pnpm run dev
```

This will allow you to see changes live.

## TODO's

- section for latest chapters
- show chapter release date
