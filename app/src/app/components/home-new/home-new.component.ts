import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-home-new',
  templateUrl: './home-new.component.html',
  styleUrls: ['./home-new.component.scss']
})
export class HomeNEWComponent implements OnInit {

  joinGameForm;
  joinData;

  constructor(private formBuilder: FormBuilder) {
    this.joinGameForm = this.formBuilder.group({
      name: '',
      id: ''
    });
  }

  ngOnInit(): void {
  }

  onSubmit(joinData) {
    // Process checkout data here
    // this.items = this.cartService.clearCart();
    // this.checkoutForm.reset();

    // console.warn('Your order has been submitted', customerData);
  }

}
