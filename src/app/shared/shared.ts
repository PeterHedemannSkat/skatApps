import { languageText } from './interfaces/interfaceslanguage';
import { tusindtalsSep } from './pipes/tusindtalsSeperator';

import { normalInput } from './udgComponents/input.skts';
import { bootstrapStyleRadioButton } from './udgComponents/radiobutton.skts';
import { selector } from './udgComponents/selectBootStrap.skts'
import { CheckboxGroup } from './udgComponents/checkboxes.normal'
import { wizardBar } from './udgComponents/wizardsteps.skts'

import { listValues, excludeDates } from './interfaces/input'

import { Validator,regMapElement,specialOps } from './services/validator.service';
import { getJSONdata } from './services/getJsonData.service';
import { CalenderServices } from './services/dateServices';


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
    excludeDates

}