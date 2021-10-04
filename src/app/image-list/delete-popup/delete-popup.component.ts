import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app-state';
import { ImageDetailComponent } from '../image-detail/image-detail.component';
import * as ImageListAction from '../state/image-list.actions';

@Component({
  selector: 'app-delete-popup',
  templateUrl: './delete-popup.component.html',
  styleUrls: ['./delete-popup.component.scss']
})
export class DeletePopupComponent implements OnInit {

  imageDetail: any;

  constructor(
    private store: Store<AppState>,
    public dialogRef: MatDialogRef<ImageDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ImageDetailComponent,
    public dialog: MatDialog,
  ) {
    this.imageDetail = data;
   }

  ngOnInit(): void {
  }

  // Delete Image Items in List
  deleteImage(id: number) {
    this.store.dispatch(new ImageListAction.DeleteImage(id));
    this.store.subscribe(state => {sessionStorage.setItem('state', JSON.stringify(state));});
    this.dialogRef.close('Deleted');
  }

  // Close of popup
  close(){
    this.dialogRef.close(null);
  }

}
