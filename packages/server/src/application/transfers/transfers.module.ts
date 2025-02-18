import {CacheModule, Module} from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TransfersInfrastructureModule } from '../../infrastructure/transfers';
import { UpdateStatsHandler } from './commands/handlers/update-stats.handler';
import { InitializeSummariesHandler } from './commands/handlers/initialize-summaries.handler';
import { LogManifestHandler } from './commands/handlers/log-manifest.handler';
import { RegistriesInfrastructureModule } from '../../infrastructure/registries';
import { CourtsInfrastructureModule } from '../../infrastructure/courts';
import { GetStatsPagedHandler } from './queries/handlers/get-stats-paged.handler';
import { GetSummaryHandler } from './queries/handlers/get-summary.handler';
import { FacilitiesController } from './controllers/facilities.controller';
import { ManifestsController } from './controllers/manifests.controller';
import { FacilityEnrolledHandler } from './events/handlers/facility-enrolled.handler';
import { ManifestLoggedHandler } from './events/handlers/manifest-logged.handler';
import { GetStatsCountHandler } from './queries/handlers/get-stats-count.handler';
import { GetStatsHandler } from './queries/handlers/get-stats.handler';
import { MetricsInfrastructureModule } from '../../infrastructure/metrices/metrics-infrastructure.module';
import { GetMisssingStatsHandler } from './queries/handlers/get-missing-stats.handler';
import { RequestStatsHandler } from './commands/handlers/request-stats.handler';
import { MessagingModule } from '../../infrastructure/messging/messaging.module';
import { ConfigModule } from '../../config/config.module';
import {LogHandshakeHandler} from './commands/handlers/log-handshake.handler';
import { GetAllSummaryHandler } from './queries/handlers/get-all-summaries.handler';
import { UpdateSessionJob } from './jobs/update-session.job';
import { UpdateSessionHandler } from './queries/handlers/update-session.handler';
import { ReInitializeAllSummariesHandler } from './queries/handlers/re-initialize-all-summaries.handler';

const CommandHandlers = [
  LogManifestHandler,
  UpdateStatsHandler,
  InitializeSummariesHandler,
  LogHandshakeHandler,
  UpdateSessionHandler,
  ReInitializeAllSummariesHandler,
];
const EventHandlers = [FacilityEnrolledHandler, ManifestLoggedHandler];
const QueryHandlers = [
  GetStatsHandler,
  GetStatsPagedHandler,
  GetSummaryHandler,
  GetStatsCountHandler,
  GetMisssingStatsHandler,
  RequestStatsHandler,
  GetAllSummaryHandler
];

@Module({
  imports: [
    CqrsModule,
    MessagingModule,
    ConfigModule,
    MetricsInfrastructureModule,
    TransfersInfrastructureModule,
    RegistriesInfrastructureModule,
    CourtsInfrastructureModule,
    CacheModule.register({ ttl: null }),
  ],
  controllers: [FacilitiesController, ManifestsController],
  providers: [...CommandHandlers, ...QueryHandlers, ...EventHandlers, UpdateSessionJob],
})
export class TransfersModule {
  constructor(
    private readonly updateSessions: UpdateSessionJob
  ) {}

  async update() {
    await this.updateSessions.update();
  }
}
