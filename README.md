# Frontend Object Relations

## The Problem

Relational databases natively support "cascade delete": in other words, if you delete an entity, its references in other parts of the database will be deleted too.

This is very helpful in more complex applications.

How can we replicate it in pure frontend state?

This repo has an example animation-creation app which works like this:

- Users can add shapes globally.
- Users can position the shapes on a canvas and add keyframes which will be interpolated.

Naturally, this requires a data model with lots of relations!

The `apps` directory includes a few different ways to implement this:

## Plain Redux

`apps/redux` shows how this is implemented using just Redux and Redux Toolkit.

This is not a great implementation: searching for all the relations on delete is basically manual.

## AI Disclosure

1. The UI was generated using v0: https://v0.dev/r/KDK0YL4SCXL
2. [Github Copilot](https://github.com/features/copilot), [Cursor.sh](https://cursor.sh/) and [Claude.ai](https://claude.ai/) were used during development
