import { IController } from '../../../infrastructure/api/rest/http-controller';
import { IHttpResponse } from '../../../infrastructure/api/rest/http-route';
import { FactoryBaguncinhaUseCase } from './baguncinha-use-case';

interface IHealthControllerResponse {
  howManyYearsOfService: string;
  whatAreYouDoingHereYoungMan: string;
  whichPoliceIsIt: string;
}

export class BaguncinhaController implements IController {
  constructor(private readonly factoryBaguncinhaUseCase: FactoryBaguncinhaUseCase) {}
  async handler(): Promise<IHttpResponse<IHealthControllerResponse>> {
    const baguncinhaUseCase = this.factoryBaguncinhaUseCase.create();
    const howManyYearsOfService = await baguncinhaUseCase.howManyYearsOfService();
    const whatAreYouDoingHereYoungMan = await baguncinhaUseCase.whatAreYouDoingHereYoungMan();
    const whichPoliceIsIt = await baguncinhaUseCase.whichPoliceIsIt();
    return {
      statusCode: 200,
      data: {
        howManyYearsOfService,
        whatAreYouDoingHereYoungMan,
        whichPoliceIsIt,
      },
    };
  }
}
