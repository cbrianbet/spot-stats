import { IRepository } from '../../application/common/repository.interface';
import { Facility } from './facility';
import { FacilityStatsDto } from './dtos/facility-stats.dto';

export interface IFacilityRepository extends IRepository<Facility> {
  getSummary(id: string): Promise<Facility>;
  getSummaryAll(): Promise<Facility>;
  findAll(): Promise<any>;
  findByCode(code: number): Promise<Facility>;
  findWithManifestByCode(code: number): Promise<Facility>;
  updateMasterFacility(code: number): Promise<Facility>;
}
