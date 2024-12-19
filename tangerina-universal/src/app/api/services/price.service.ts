import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PriceService {

  installments: { selected: boolean, description: string, interestFree: string, amount: string }[] = [];
  maxInstallments = 12; // Máximo de parcelas
  maxInstallmentsWithoutInterest = 3; // Máximo de parcelas sem Juros
  interestRate = 5.0; // Taxa de juros (5% neste exemplo)

  constructor() {}

  generateInstallments(price: any): any { 

    console.log('Prices: ', price); 

    this.maxInstallmentsWithoutInterest = price.price_num;
    this.maxInstallments                = price.max_installments; 
    this.installments                   = [];

    // Converte o valor de principal_price para string, substitui a vírgula e converte para número
    const principalPrice = parseFloat(String(price.price_promotional).replace(',', '.'));

    for (let i = 1; i <= this.maxInstallments; i++) {

        // Calcula o valor de cada parcela
        const installmentAmount = this.calculateInstallmentAmount(principalPrice, i);
        
        // Verifica se o valor calculado é válido
        if (isNaN(installmentAmount)) {
            break; // Sai do loop se o cálculo retornar NaN
        }

        // Calcula o valor total
        const totalAmount = (installmentAmount * i).toFixed(2);

        // Ajusta o valor da descrição e a informação de juros
        let description = `${i}x de R$ ${installmentAmount.toFixed(2)}`;
        let interestFree = '';

        if (i <= this.maxInstallmentsWithoutInterest) {
            interestFree = ' sem Juros';
        } 
        
        // Adiciona a parcela à lista de parcelas
        this.installments.push({ 
            selected: false,
            description: description,
            interestFree: interestFree,
            amount: `R$ ${totalAmount}`
        });
    }

    return this.installments;
}

calculateInstallmentAmount(principal: number, installments: number): number {
  if (installments <= this.maxInstallmentsWithoutInterest) {
      return parseFloat((principal / installments).toFixed(2)); // Parcelas sem juros, arredondadas para 2 casas decimais
  } else {
      const rate = this.interestRate / 100;
      const totalWithInterest = principal * (rate + 1);
      return parseFloat((totalWithInterest / installments).toFixed(2)); // Parcelas com juros, arredondadas para 2 casas decimais
  }
}
}
