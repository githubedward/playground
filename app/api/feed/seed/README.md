# Database Seeding API

## Overview

Seeds the database with sample users and posts for development and demo purposes.

## Usage

```bash
pnpm run seed:feed
```

## What it does

- **Clears** all existing posts and users from the database
- **Creates** sample users with usernames and avatar URLs
- **Creates** sample posts with a mix of text-only and image posts
- **Timestamps** posts 1 minute apart for chronological feed order

## Post Distribution

- 75% posts include images (using Picsum for placeholder images)
- 25% text-only posts
- All posts include realistic content examples

## Environment Requirements

- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` - Service role key for database operations

## Response

Returns JSON with counts of created users and posts:

```json
{
  "message": "Database seeded successfully",
  "users": 2,
  "posts": 10
}
```
