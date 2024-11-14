import { Injectable } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SongService {

  db : PrismaService;

  constructor(db : PrismaService) {
    this.db = db;
  }

  create(createSongDto: CreateSongDto)  {
    return this.db.song.create({
      data: createSongDto
    })
  }
  findAll() {
    return this.db.song.findMany();
  }

  findOne(id: number) {
    return this.db.song.findUnique({
      where: { id: id }
  })}

  async update(id: number, updateSongDto: UpdateSongDto)  {
    try {
      return await this.db.song.update({
        data: updateSongDto,
        where: { id }
      })
    } catch {
      return undefined;
    }
  }

  async remove(id: number)  {
    try {
      await this.db.song.delete({
        where: { id }
      })
      return true;
    } catch {
      return false;
    }                                                                                                                                                                                 
  }

  findAllFreeSongs() {
    return this.db.song.findMany({
      where : {Price : 0}
    })
  }
  findTopSongs(count : number) {
    return this.db.song.findMany({
      orderBy : {
        rate : 'desc'
      }
    })
  }

}
