import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-address',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss'
})
export class AddressComponent {

  addressForm: FormGroup;
  maxAddresses = 5;

  _formBuilder = inject(FormBuilder);

  constructor() {
    this.addressForm = this._formBuilder.group({
      addresses: this._formBuilder.array([
        this.createAddressFormGroup()
      ])
    });
  }

  get addressesFormArray(): FormArray {
    return this.addressForm.get('addresses') as FormArray;
  }

  createAddressFormGroup(): FormGroup {
    return this._formBuilder.group({
      address: ['', [Validators.required]],
      streetNumber: ['', [Validators.required]],
      markAsLocation: ['', [Validators.required]]
    });
  }

  addNewAddress() {
    if (this.addressesFormArray.length < this.maxAddresses) {
      this.addressesFormArray.push(this.createAddressFormGroup());
    }
  }

  canAddMore(): boolean {
    return this.addressesFormArray.length < this.maxAddresses;
  }

  removeAddress(index: number) {
    if (this.addressesFormArray.length > 1) {
      this.addressesFormArray.removeAt(index);
    }
  }

  onSubmit() {
    if (this.addressForm.valid) {
      const addresses = this.addressForm.value.addresses;

      const existingAddresses = JSON.parse(localStorage.getItem('addresses') || '[]');
      const allAddresses = [...existingAddresses, ...addresses];
      localStorage.setItem('addresses', JSON.stringify(allAddresses));

      console.log('Added Addresses:', addresses);
      console.log('All Addresses in Storage:', allAddresses);

      this.addressForm.reset();
      while (this.addressesFormArray.length > 1) {
        this.addressesFormArray.removeAt(this.addressesFormArray.length - 1);
      }

      alert('Addresses added successfully!');
    } else {
      this.addressForm.markAllAsTouched();
    }
  }

  getAddressControl(index: number, controlName: string) {
    return this.addressesFormArray.at(index).get(controlName);
  }
}
