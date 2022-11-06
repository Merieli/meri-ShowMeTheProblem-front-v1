import { TButton } from './ButonTypes.enum';
import { TColorsButton } from './ButtonColorTypes.enum';

export interface IBaseButton {
    color: TColorsButton;
    type: TButton;
}
