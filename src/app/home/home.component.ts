import { Component } from '@angular/core';
import data from '../../../public/data.json';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart, registerables } from 'chart.js';
import { FilterPipe } from '../filter.pipe';
Chart.register(...registerables)
// import {Ng2SearchPipeModule} form 'ng2-search-filter';
interface Transaction
{
  id: number;
  customer_id: number;
  amount: number;
}

interface Customer
{

  id: number;
  name: string;
  transaction?: Transaction;
}

@Component({
  
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  
})
export class HomeComponent
{
  nameFilter = '';
  amountFilter = '';
  public config: any = {
    type: 'bar',
    data: {
      lables: ['Jan', 'Feb', 'Mar', 'April'],
      datasets: [{
        label: 'name',

        data: ['Ahmed Ali', '	Aya Elsayed', 'Mina Adel', 'Sarah Reda', 'Mohamed Sayed'],
        backgroundColor: 'blue'
      },
      {
        label: 'amount',

        data: ['1000', '550', '500', '750', '2500'],
        backgroundColor: 'red'
      }
      ],
    },
    options: {
      arpectRatio:1,
    },
  };
  chart:any;

  mergedData: any[] = [];
  constructor()
  {
    this.chart=new Chart('mychart',this.config)


    // const customers = data.customers;

    // const transactions = data.transactions;

    // console.log(customers)
    // console.log(transactions)

    // this.mergedData = customers.map((customer: Customer) => ({
    //   ...customer,
    //   transaction: transactions.find((transaction: Transaction) => transaction.customer_id === customer.id)
    // }));
    // console.log(this.mergedData)



    const customers = data.customers;
    const transactions = data.transactions;

    this.mergedData = customers.map((customer: Customer) =>
    {
      const matchingTransaction = transactions.find(
        (transaction: Transaction) => transaction.customer_id === customer.id
      );

      const transactionAmount = matchingTransaction ? matchingTransaction.amount : null;

      return {
        ...customer,
        transactionAmount 
      };
    });
  
  }
  filterData() {
    this.mergedData = this.mergedData.filter(customer => {
      // Filter by name
      if (this.nameFilter && !customer.name.toLowerCase().includes(this.nameFilter.toLowerCase())) {
        return false;
      }
      // Filter by transaction amount
      if (this.amountFilter && customer.transactionAmount && parseInt(customer.transactionAmount) !== parseInt(this.amountFilter)) {
        return false;
      }
      return true;
    });
  }

ngOnInt():void{
  this.chart=new Chart('mychart',this.config)
}




















}