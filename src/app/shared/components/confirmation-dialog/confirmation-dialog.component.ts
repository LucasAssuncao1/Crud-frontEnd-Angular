import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-confirmation-dialog',
    templateUrl: './confirmation-dialog.component.html',
    styleUrl: './confirmation-dialog.component.scss',
    standalone: true,
    imports: [CdkScrollable, MatDialogContent, MatDialogActions, MatButton]
})
export class ConfirmationDialogComponent {

  readonly dialogRef = inject (MatDialogRef<ConfirmationDialogComponent>);
  readonly data = inject(MAT_DIALOG_DATA);

   onConfirm(result: boolean): void {
    this.dialogRef.close(result);
  }

}
