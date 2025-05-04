import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StocksFormComponent } from '../stocks-form/stocks-form.component';
import { BondsFormComponent } from '../bonds-form/bonds-form.component';
import { MutualFundsFormComponent } from '../mutual-funds-form/mutual-funds-form.component';
import { GoldBondsFormComponent } from '../gold-bonds-form/gold-bonds-form.component';

@Component({
  selector: 'app-add-investment-modal',
  templateUrl: './add-investment-modal.component.html',
  styleUrls: ['./add-investment-modal.component.css'],
})
export class AddInvestmentModalComponent {
  constructor(private dialog: MatDialog) {}

  openInvestmentForm(type: string) {
    let component: any;
    let title: string = '';

    switch (type) {
      case 'stocks':
        component = StocksFormComponent;
        title = 'Add Stocks Manually';
        break;
      case 'bonds':
        component = BondsFormComponent;
        title = 'Bond & Other Fixed Income';
        break;
      case 'mutualfunds':
        component = MutualFundsFormComponent;
        title = 'Add Funds Manually';
        break;
      case 'goldbonds':
        component = GoldBondsFormComponent;
        title = 'Sovereign Gold Bonds';
        break;
    }

    if (component) {
      this.dialog.open(component, {
        width: '600px',
        data: { title }
      });
    }
  }
}
