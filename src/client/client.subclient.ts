import { SpotifiedClientBase } from './client.base';

export abstract class SpotifiedSubClient extends SpotifiedClientBase {
  constructor(instance: SpotifiedClientBase) {
    if (!(instance instanceof SpotifiedClientBase)) {
      throw new Error('You must instance SubClient instance from existing Spotified instance.');
    }
    super(instance);
  }
}

export default SpotifiedClientBase;
