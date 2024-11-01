# Novel static

Deploy novels to Github pages as static web pages.

## Setup

1. Fork the repository. Make sure to also copy the actions workflow.
2. Enable Github pages by going to repository Settings -> Pages and setting Source to Github actions.
3. Edit the files in `static/content` to edit the content.
4. Commits to the branch `main` are then automatically built and pushed to the Github pages site.

### How it works

Example pages and metadata are shown in the `static/content` folder.
All following paths are relative to this directory.

Novel data and other overrides are stored in `metadata.json`.
Currently, only volume names can be overriden.

The novel description is stored in the file `description.md`.
This content is shown on the root page above the table of contents.

All other pages must be stored in paths of the form `${volume-slug}/${chapter-slug}.md`.
`${volume-slug}` is the text that will be shown in the url for all files in that volume.
`${chapter-slug}` is the text that will be shown in the url for that that chapter.
For example, the file `book-1/chapter-1.md` will be accessible at `book-1/chapter-1`.
Only use alphanumeric, - and \_ characters in the file names.

Organisation of the pages on the table of contents is controlled by the frontmatter metadata stored in each chapter's markdown file.
Check the example chapters to see the syntax.
Currently it can have the following fields:

```
title: string;
volume: number;
chapter: number;
date: Date;
hideComments?: boolean;
```

Files with the same `volume` value are grouped together.
Files within the same volume are sorted by their chapter value, and volumes are sorted the same way.

### Prefaces and other information

You can create sections for auxilliary content (check the example "Extra Information" section).
By defining a key in volumeNameOverrides of metadata.json, you can create custom volume names for things like prefaces and blurbs
Give the chapter a negative value to hide the chapter number from rendering. Chapters will still be listed in ascending order, but the numbers will not be shown.

## Developing (live preview)

Once you've installed dependencies with `pnpm install`, start a development server:

```bash
pnpm run dev
```

This will allow you to see changes live.

## TODO's

- metadata tags for SEO and rich link previews
- section for latest chapters
- show chapter release date
