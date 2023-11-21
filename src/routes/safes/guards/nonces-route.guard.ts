import { CanActivate, Inject, Injectable } from '@nestjs/common';
import { IConfigurationService } from '@/config/configuration.service.interface';

@Injectable()
export class NoncesRouteGuard implements CanActivate {
  constructor(
    @Inject(IConfigurationService)
    private readonly configurationService: IConfigurationService,
  ) {}

  canActivate() {
    return this.configurationService.getOrThrow<boolean>(
      'features.noncesRoute',
    );
  }
}