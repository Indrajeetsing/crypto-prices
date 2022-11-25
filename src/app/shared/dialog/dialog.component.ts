import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  srcResult: any;
  @ViewChild('fileName') fileName: ElementRef;
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onFileSelected() {
    const inputNode: any = document.querySelector('#file');
    const file = inputNode.files[0];

    if (file && file.size < 1048576) {
      this.fileName.nativeElement.innerText = file.name;

      if (typeof FileReader !== 'undefined') {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          console.log(inputNode.files);
          console.log(this.fileName);
          this.srcResult = e.target.result;
        };

        reader.readAsArrayBuffer(file);
      }
    }
  }

  getFileSize(number: number) {
    if (number < 1024) {
      return `${number} bytes`;
    } else if (number >= 1024 && number < 1048576) {
      return `${(number / 1024).toFixed(1)} KB`;
    } else {
      return `${(number / 1048576).toFixed(1)} MB`;
    }
  }
}

export interface DialogData {
  animal: string;
  name: string;
  title: string;
}
