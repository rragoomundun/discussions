import { Config } from '../../models/Config';

export interface ConfigState {
  exists: boolean;
  config: Config | null;
  onGetExists: string;
  onInit: string;
}
