# Tailwind CSS Snippets Manager

A Next.js application for managing and previewing Tailwind CSS snippets. Built with Next.js, Tailwind CSS, Drizzle ORM, and SQLite.

## Features

- Create and store Tailwind CSS snippets
- Live preview of snippets
- Categorize snippets
- Responsive grid layout
- SQLite database for persistence

## Setup

1. Install dependencies:
```bash
npm install
```

2. Initialize the database:
```bash
npm run db:generate
npm run db:push
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Create a new snippet:
   - Fill in the title and code
   - Optionally add a description and category
   - Click "Create Snippet"

2. View snippets:
   - All snippets are displayed in a responsive grid
   - Each snippet shows:
     - Title and description
     - Code preview
     - Live rendered preview
     - Category tag (if provided)

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:studio` - Open Drizzle Studio to manage database
- `npm run db:generate` - Generate database migrations
- `npm run db:push` - Push migrations to database

## Technologies

- Next.js 14
- React 18
- Tailwind CSS
- Drizzle ORM
- SQLite
- TypeScript

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
