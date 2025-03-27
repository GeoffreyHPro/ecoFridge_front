import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PopupMessageComponent } from '../../../utils/popup-message/popup-message.component';
import { FoodBatchesService } from '../../../services/food-batches.service';

@Component({
  selector: 'app-form-add-foodbatch',
  templateUrl: './form-add-foodbatch.component.html',
  styleUrl: './form-add-foodbatch.component.css'
})
export class FormAddFoodbatchComponent {
  formAddFoodBatch!: FormGroup;
  addFoodBatchErrorMessage: string = "";
  constructor(
    private foodBatchService: FoodBatchesService,
    private fb: FormBuilder,
    private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.formAddFoodBatch = this.fb.group({
      foodBarcode: this.fb.control(""),
      expirationDate: this.fb.control(""),
      foodQuantity: this.fb.control(0)
    })
  }

  handleAddFoodBatch() {
    if (this.formAddFoodBatch.value.foodBarcode == "" || this.formAddFoodBatch.value.foodQuantity == "" || this.formAddFoodBatch.value.expirationDate == "") {
      this.addFoodBatchErrorMessage = "Please type all informations";
    } else if (Number(this.formAddFoodBatch.value.foodQuantity) <= 0) {
      this.addFoodBatchErrorMessage = "The quantity of food is null or negative";
    } else {
      this.foodBatchService.addFoodBatch(this.formAddFoodBatch.value.foodBarcode,
        this.formAddFoodBatch.value.foodQuantity, this.formAddFoodBatch.value.expirationDate + "T00:00:00").subscribe(
          response => {
            this.showMessage("Add foodbatch", "The foodbatch is correctly added");
            this.addFoodBatchErrorMessage = "";
          }, (error) => {
            if (error.status == 409) {
              this.addFoodBatchErrorMessage = "The food is not there, create it";
            }
          }
        )
    }
  }

  showMessage(title: string, message: string) {
    const dialogRef = this.dialog.open(PopupMessageComponent, {
      data: {
        title: title,
        message: message
      }
    });

    setTimeout(() => {
      dialogRef.close();
    }, 3000);
  }
}
