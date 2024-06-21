import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
   
export class CepValidators {
    static isCEP(
        control: AbstractControl
    ): ValidationErrors | null {
        // Remover caracteres não numéricos
        const cep = control.value.replace(/\D/g, '');

        // Verificar se o CEP tem 8 dígitos
        if (cep.length !== 8) {
            return { isCEP: true };
        }

        // Verificar se todos os dígitos são
        // iguais (evitar CEPs como 11111-111)
        if (/^(\d)\1+$/.test(cep)) {
            return { isCEP: true };
        }

        return null;
    }
}