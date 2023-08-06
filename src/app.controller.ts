import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Get,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateNote, Note, UpdateNote } from './types';

@Controller('notes')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  addNote(@Body() createNote: CreateNote) {
    return this.appService.addNote(createNote);
  }

  @Delete(':id')
  deleteNote(@Param() params: { id: Note['id'] }) {
    return this.appService.deleteNote(params.id);
  }

  @Patch(':id')
  updateNote(
    @Param() params: { id: Note['id'] },
    @Body() updateNote: UpdateNote,
  ) {
    return this.appService.updateNote(params.id, updateNote);
  }

  @Get('stats')
  getNotesStats() {
    return this.appService.getNotesStats();
  }

  @Get(':id')
  getNote(@Param() params: { id: Note['id'] }) {
    return this.appService.getNote(params.id);
  }

  @Get()
  getNotes() {
    return this.appService.getNotes();
  }
}
