import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vessel } from './vessel/vessel.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Vessel)
    private usersRepository: Repository<Vessel>,
  ) {}

  async findVessel(vesselInput: string): Promise<any | undefined> {
    const vesselData = await this.usersRepository.find({
      where: {
        vsl_cd: vesselInput.toUpperCase()
      },
    })
    return vesselData;
  }  
  
  async findDetailVessel(vesselInput: string): Promise<any | undefined> {
    const vesselData = await this.usersRepository.find({
      where: {
        vsl_cd: vesselInput.toUpperCase()
      },
    })
    return vesselData;
  }  
  
  async deleteVessel(vesselInput: string): Promise<any | undefined> {
    const vesselData = await this.usersRepository.find({
      where: {
        vsl_cd: vesselInput.toUpperCase()
      },
    })
    await this.usersRepository.remove(vesselData);
    return `deleted ${vesselData}`;
  }  
  
  async updateVessel(id, data): Promise<any | undefined> {
    await this.usersRepository.update({id: data.id}, {
      vsl_cd: data.vsl_cd,
      vsl_eng_nm: data.vsl_eng_nm,
      crr_cd: data.crr_cd,
      crr_nm: data.crr_nm,
      net_ton: data.net_ton,
      gross_ton: data.gross_ton,
      imo: data.imo,
      feeder_div: data.feeder_div,
    })

    // const vesselData = await this.usersRepository.find({
    //   where: {
    //     vsl_cd: vesselInput.toUpperCase()
    //   },
    // })
    // await this.usersRepository.remove(vesselData);
    return `Updated`;
  }
}
