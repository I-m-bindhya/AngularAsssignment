import { Component, Inject, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import * as imageListAction from "../state/image-list.actions";
import { ImageList } from "../image.model";
import { AppState } from 'src/app/state/app-state';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImageServiceService } from '../image-service.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.scss']
})
export class ImageDetailComponent implements OnInit {

  imageDetail: ImageList;
  Method: string = '';
  loading: boolean = false;
  file : any;

  constructor(
    private store: Store<AppState>,
    public dialogRef: MatDialogRef<ImageDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ImageDetailComponent,
    public dialog: MatDialog,
    public imageListService: ImageServiceService,
    public sanitizer: DomSanitizer,
    public snackBar: MatSnackBar
  ) { 
    // Get Image Details From Image List Component
    this.imageDetail = JSON.parse(JSON.stringify(this.data.data));
    this.sanitizer.bypassSecurityTrustUrl(this.imageDetail.imageName);
  }

  ngOnInit() {}

  // Select ADD/EDIT Function
  createOrEdit(){
    if(this.data.Method == 'add'){
      return this.addImageList();
    }

    return this.editImageList();
  }

  // Add New Image List
  addImageList() {
    this.store.dispatch(new imageListAction.CreateImage(this.imageDetail));
    this.store.subscribe(state => {sessionStorage.setItem('state', JSON.stringify(state))});
    this.dialogRef.close(this.imageDetail);
  }

  // Edit Image List
  editImageList() {
    this.store.dispatch(new imageListAction.UpdateImage(this.imageDetail));
    this.store.subscribe(state => {sessionStorage.setItem('state', JSON.stringify(state))});
    this.dialogRef.close(this.imageDetail);
  }

  // On Selection of File
  onFileSelected(event: any) {
    this.loading = true;
    this.file = event.target.files[0];
    this.imageDetail.imageName = this.file? this.file.name: '';

    // Api Function to get Image Url
    this.imageListService.getImageUrl(this.file).subscribe(
      (res)  =>{
        this.imageDetail.imageUrl = res.image_url;
        this.loading = false;
        if(res.status == "success")
         return this.openSnackBar(res.status, '');

         return this.errSnackBar(res.message, '');
      },
      (err)=>{
        this.errSnackBar(err.error.message, '');
        this.loading = false;
      }
    )
  }

  // Close of Popup
  close(){
    this.dialogRef.close(null);
  }

  // Success Snack Bar
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action,{
      panelClass: ['success-snackbar'],
      duration: 2000
    });
  }

  // Error Snack Bar
  errSnackBar(message: string, action: string) {
    this.snackBar.open(message, action,{
      panelClass: ['error-snackbar'],
      duration: 2000
    });
  }

}
