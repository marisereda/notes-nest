import { Injectable } from '@nestjs/common';
import { CategoryStats, Note } from './types';
import { initialCategories, initialNotes } from './constants';
import { v4 as uuidv4 } from 'uuid';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class AppService {
  notes = initialNotes;

  addNote(note: CreateNoteDto): Note {
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

  updateNote(id: Note['id'], note: UpdateNoteDto): Note {
    const noteIndex = this.notes.findIndex((note) => note.id === id);
    if (noteIndex === -1) {
      return;
    }
    this.notes[noteIndex] = { ...this.notes[noteIndex], ...note };
    return this.notes[noteIndex];
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

  getNote(id: Note['id']): Note {
    return this.notes.find((note) => note.id === id);
  }

  getNotes(): Note[] {
    return this.notes;
  }
}
