'use server';

import { createSnippet as dbCreateSnippet, getSnippets as dbGetSnippets, deleteSnippet as dbDeleteSnippet } from '@/db';

export async function createSnippet(data: {
  title: string;
  description?: string;
  code: string;
  category?: string;
}) {
  try {
    const snippet = await dbCreateSnippet(data);
    return { success: true, id: snippet.id };
  } catch (error) {
    console.error('Error creating snippet:', error);
    return { success: false, error: 'Failed to create snippet' };
  }
}

export async function getSnippets() {
  try {
    console.log('Fetching snippets from database...');
    const snippets = await dbGetSnippets();
    console.log('Successfully fetched snippets:', snippets);
    return snippets;
  } catch (error) {
    console.error('Error fetching snippets:', error);
    return [];
  }
}

export async function deleteSnippet(id: number) {
  try {
    await dbDeleteSnippet(id);
    return { success: true };
  } catch (error) {
    console.error('Error deleting snippet:', error);
    return { error: 'Failed to delete snippet' };
  }
} 