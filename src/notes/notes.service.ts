import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { initialCategories } from 'src/constants';
import { CategoryStats } from 'src/types';
import { InjectModel } from '@nestjs/sequelize';
import { Note } from './models/note.model';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(Note)
    private noteModel: typeof Note,
  ) {}

  addNote(noteDto: CreateNoteDto): Promise<Note> {
    return this.noteModel.create({ ...noteDto });
  }

  async deleteNote(id: Note['id']): Promise<Note> {
    const note = await this.getNote(id);
    if (!note) {
      return null;
    }
    await note.destroy();
    return note;
  }

  async updateNote(id: Note['id'], noteDto: UpdateNoteDto): Promise<Note> {
    const note = await this.getNote(id);
    if (!note) {
      return null;
    }
    await note.update(noteDto);
    await note.save();
    return note;
  }

  async getNotesStats(): Promise<CategoryStats[]> {
    const notes = await this.getNotes();

    return initialCategories.map((category) => {
      let zipNumber = 0;
      let activeNumber = 0;
      notes.forEach((note) => {
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

  getNote(id: Note['id']): Promise<Note> {
    return this.noteModel.findOne({
      where: {
        id,
      },
    });
  }

  getNotes(): Promise<Note[]> {
    return this.noteModel.findAll();
  }
}
