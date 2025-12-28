import { Config } from '../../models/Config';

export interface ConfigState {
  exists: {
    config: boolean;
    admin: boolean;
  } | null;
  config: Config | null;
  onGetExists: string;
  onInit: string;
  onGetConfig: string;
}
