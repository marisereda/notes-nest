import { Injectable } from '@nestjs/common';
import { CategoryStats, CreateNote, Note, UpdateNote } from './types';
import { initialCategories, initialNotes } from './constants';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AppService {
  notes = initialNotes;

  addNote(note: CreateNote): Note {
    const newNote = {
      id: uuidv4(),
      created: Date.now(),
      archived: false,
      ...note,
    };
    this.notes.push(newNote);
    return newNote;
  }

  deleteNote(id: Note['id']): Note {
    const deletedNote = this.notes.find((note) => note.id === id);
    this.notes = this.notes.filter((note) => note.id !== id);
    return deletedNote;
  }

  updateNote(id: Note['id'], note: UpdateNote): Note {
    const noteIndex = this.notes.findIndex((note) => note.id === id);
    this.notes[noteIndex] = { ...this.notes[noteIndex], ...note };
    return this.notes[noteIndex];
  }

  getNote(id: Note['id']): Note {
    return this.notes.find((note) => note.id === id);
  }

  getNotes(): Note[] {
    return this.notes;
  }

  getNotesStats(): CategoryStats[] {
    return initialCategories.map((category) => {
      let zipNumber = 0;
      let activeNumber = 0;
      this.notes.forEach((note) => {
        if (note.category === category.name && note.archived) {
          zipNumber += 1;
        }
        if (note.category === category.name && !note.archived) {
          activeNumber += 1;
        }
      });
      return { ...category, zipNumber, activeNumber };
    });
  }
}
