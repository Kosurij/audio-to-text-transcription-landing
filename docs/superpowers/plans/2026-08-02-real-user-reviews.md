# Real Chrome Web Store Reviews Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace fabricated testimonials with seven verifiable five-star Chrome Web Store reviews, real author names, and local profile images.

**Architecture:** Keep testimonial data local to `TestimonialsSection.vue` and render it through one reusable card template for desktop and mobile. Desktop retains the original one-tall-plus-six layout; mobile continues to use Embla.

**Tech Stack:** Vue 3, Astro, scoped CSS, Embla Carousel, Node test runner.

## Global Constraints

- Preserve the seven review texts in their original language and without rewriting.
- Show only real names, avatars, star ratings, and review text; omit invented roles and metadata.
- Store profile images locally under `public/reviews/`.

---

### Task 1: Replace the testimonial content and presentation

**Files:**
- Modify: `src/components/TestimonialsSection.vue`
- Replace assets: `public/reviews/*.webp`

**Interfaces:**
- Consumes: seven names, exact texts, and public profile-image URLs from Chrome Web Store.
- Produces: a responsive desktop grid, mobile carousel, and source link.

- [ ] **Step 1: Download the seven public profile images**

Save one image per author in `public/reviews/` and reference only local `/reviews/...` paths from the component.

- [ ] **Step 2: Implement the minimal component change**

Replace the separate `tall` and `short` arrays with one seven-item `testimonials` array. Lay out the first card across two rows without special accent styling, remove roles and large fabricated photography, and retain the mobile Embla carousel.

### Task 2: Verify the landing page

**Files:**
- Modify only if verification exposes a defect: `src/components/TestimonialsSection.vue`

**Interfaces:**
- Consumes: completed testimonial component.
- Produces: a build-tested landing page.

- [ ] **Step 1: Run the full verification suite**

Run `npm test` and confirm the Astro build and all Node tests finish with zero failures.

- [ ] **Step 2: Review the final diff**

Run `git diff --check` and `git status --short`; confirm there is no whitespace damage and only the testimonial implementation, assets, tests, spec, and plan changed.
