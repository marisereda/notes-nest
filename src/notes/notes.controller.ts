import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from 'src/types';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  addNote(@Body() createNote: CreateNoteDto) {
    return this.notesService.addNote(createNote);
  }

  @Delete(':id')
  deleteNote(@Param() params: { id: Note['id'] }) {
    const result = this.notesService.deleteNote(params.id);
    if (!result) {
      throw new NotFoundException();
    }
    return result;
  }

  @Patch(':id')
  updateNote(
    @Param() params: { id: Note['id'] },
    @Body() updateNote: UpdateNoteDto,
  ) {
    const result = this.notesService.updateNote(params.id, updateNote);
    if (!result) {
      throw new NotFoundException();
    }
    return result;
  }

  @Get('stats')
  getNotesStats() {
    return this.notesService.getNotesStats();
  }

  @Get(':id')
  getNote(@Param() params: { id: Note['id'] }) {
    const result = this.notesService.getNote(params.id);
    if (!result) {
      throw new NotFoundException();
    }
    return result;
  }

  @Get()
  getNotes() {
    return this.notesService.getNotes();
  }
}
