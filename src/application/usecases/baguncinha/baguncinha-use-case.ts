export class BaguncinhaUseCase {
  async howManyYearsOfService() {
    return '15 anos';
  }

  async whichPoliceIsIt() {
    return 'SWAT LOS ANGELES, EUA';
  }
  async whatAreYouDoingHereYoungMan() {
    return `Eles me afastaram... que eu... hm... fiz uma baguncinha dento da California mandei quase mil 
    bandido pô caixão e atirei no meu ex parceiro com 45 tiro no peito, com uma AK-45.`;
  }
}

export function createFactoryBaguncinhaUseCase() {
  let instance: BaguncinhaUseCase | null = null;
  const create = () => {
    instance = new BaguncinhaUseCase();
    return instance;
  };
  const destroy = () => {
    instance = null;
    return instance;
  };

  return { create, destroy };
}

export type CreateFactoryBaguncinhaUseCase = typeof createFactoryBaguncinhaUseCase;
export type FactoryBaguncinhaUseCase = ReturnType<CreateFactoryBaguncinhaUseCase>;
