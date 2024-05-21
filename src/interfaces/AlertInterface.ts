import { SnackbarOrigin } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';

export interface AlertInterface extends SnackbarOrigin {
  open: boolean;
  Transition: React.ComponentType<
    TransitionProps & {
      children: React.ReactElement<any, any>;
    }
  >;
}
