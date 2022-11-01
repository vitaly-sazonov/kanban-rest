import { FormControl } from '@angular/forms';
import { PasswordValidatorSymbols } from 'src/app/enums';

export function passwordValidator(
  control: FormControl
): { [s: string]: boolean } | null {
  const upperCase = new RegExp('[A-Z]');
  const lowerCase = new RegExp('[a-z]');
  const numbers = new RegExp('[0-9]');
  const special = new RegExp('[*@!#%&()^~{}]');
  let obj: { [s: string]: boolean } = {};
  if (!control.value.match(upperCase))
    obj[PasswordValidatorSymbols.upperCase] = true;
  if (!control.value.match(lowerCase))
    obj[PasswordValidatorSymbols.lowerCase] = true;
  if (!control.value.match(numbers))
    obj[PasswordValidatorSymbols.numbers] = true;
  if (!control.value.match(special))
    obj[PasswordValidatorSymbols.special] = true;
  if (Object.keys(obj).length === 0) return null;
  return obj;
}
