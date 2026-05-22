import { BottomLink } from '../../models/BottomLink';
import { Config } from '../../models/Config';

export interface ConfigState {
  exists: {
    config: boolean;
    admin: boolean;
  } | null;
  config: Config | null;
  bottomLinks: BottomLink[];
  onGetExists: string;
  onInit: string;
  onGetConfig: string;
  onUpdateConfig: string;
  onUpdateBottomLinks: string;
}
