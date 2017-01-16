import { languageText } from './interfaces/interfaceslanguage';
import { tusindtalsSep } from './pipes/tusindtalsSeperator';
import { decimalDK } from './pipes/decimalDK.pipe'

import { normalInput } from './udgComponents/input.skts';
import { bootstrapStyleRadioButton } from './udgComponents/radiobutton.skts';
import { selector } from './udgComponents/selectBootStrap.skts'
import { CheckboxGroup } from './udgComponents/checkboxes.normal'
import { wizardBar } from './udgComponents/wizardsteps.skts'

import { listValues, excludeDates,multiGears } from './interfaces/input'

import { Validator,regMapElement,specialOps } from './services/validator.service';
import { getJSONdata } from './services/getJsonData.service';
import { CalenderServices } from './services/dateServices';
import { MathCalc } from './services/math.services';
import { readableDigitFormat } from './udgComponents/numberInput';
import { importJsonData } from './services/jsonEmitterServices';


export {
    languageText,
    tusindtalsSep,
    normalInput,
    bootstrapStyleRadioButton,
    wizardBar,
    selector,
    Validator,
    regMapElement,
    specialOps,
    getJSONdata,
    listValues,
    CheckboxGroup,
    CalenderServices,
    excludeDates,
    MathCalc,
    multiGears,
    readableDigitFormat,
    importJsonData,
    decimalDK

}