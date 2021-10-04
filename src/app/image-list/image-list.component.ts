import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImageDetailComponent } from './image-detail/image-detail.component';
import { ImageList } from './image.model';
import { Store } from '@ngrx/store';
import { AppState } from './../state/app-state';
import { DeletePopupComponent } from './delete-popup/delete-popup.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.scss']
})
export class ImageListComponent implements OnInit{

  imageList: ImageList[]=[];

  constructor(
    public dialog: MatDialog,
    public store: Store<AppState>,
    public snackBar: MatSnackBar
  ) {    
}

  ngOnInit(): void {  
    if(JSON.parse(JSON.stringify(sessionStorage.getItem('state')))){
      // Get Image List from Session Storage
      this.imageList = JSON.parse(JSON.parse(JSON.stringify(sessionStorage.getItem('state')))).ImageList;
      console.log(this.imageList);
    }else{
      // Set Image List to Session Storage
      this.store.subscribe(state => {sessionStorage.setItem('state', JSON.stringify(state)); this.imageList = state.ImageList});
    }
  }

  // Popup for Add/Edit
  openPopup(method: string, data?:ImageList){    
    const dialogRef = this.dialog.open(ImageDetailComponent,{
      panelClass: 'Popup',
      disableClose: true,
      width:'750px',
      data: {data: data? data : new ImageList(this.imageList.length+1,"","","") , Method: method }
    });
    dialogRef.afterClosed().subscribe(
      (result) =>{
        if(result != null){          
          this.ngOnInit();
          if(method == 'add'){
            this.openSnackBar('Added Successfully...','');
          }else{
            this.openSnackBar('Edited Successfully...','');
          }
        }
      }
    );
  }

  // Delete Popup
  OpenDeletePopup(data: ImageList ){
    const dialogRef = this.dialog.open(DeletePopupComponent,{
      panelClass: 'Popup',
      disableClose: true,
      width:'350px',
      data: data
    });
    dialogRef.afterClosed().subscribe(
      (result) =>{
        if(result != null){          
          this.ngOnInit();
          this.openSnackBar('Deleted Successfully...','');
        }
      }
    );
  }

  // Snack Bar
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action,{
      panelClass: ['success-snackbar'],
      duration: 2000
    });
  }

}
