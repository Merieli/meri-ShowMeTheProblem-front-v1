import { ButtonTypes } from './ButonTypes.enum'
import { ButtonColorTypes } from './ButtonColorTypes.enum'

export interface BaseButton {
    color: ButtonColorTypes
    type: ButtonTypes
}
