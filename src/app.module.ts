import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { NotesModule } from './notes/notes.module';

@Module({
  imports: [
    NotesModule,

    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'user',
      password: 'pass',
      database: 'db',
      autoLoadModels: true,
      synchronize: true,
    }),
  ],
})
export class AppModule {}
