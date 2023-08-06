import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Get,
  NotFoundException,
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
    const result = this.appService.deleteNote(params.id);
    if (!result) {
      throw new NotFoundException();
    }
    return result;
  }

  @Patch(':id')
  updateNote(
    @Param() params: { id: Note['id'] },
    @Body() updateNote: UpdateNote,
  ) {
    const result = this.appService.updateNote(params.id, updateNote);
    if (!result) {
      throw new NotFoundException();
    }
    return result;
  }

  @Get('stats')
  getNotesStats() {
    return this.appService.getNotesStats();
  }

  @Get(':id')
  getNote(@Param() params: { id: Note['id'] }) {
    const result = this.appService.getNote(params.id);
    if (!result) {
      throw new NotFoundException();
    }
    return result;
  }

  @Get()
  getNotes() {
    return this.appService.getNotes();
  }
}
