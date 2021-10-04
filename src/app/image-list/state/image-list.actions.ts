import { Update } from "@ngrx/entity";
import { Action } from "@ngrx/store";
import { ImageList } from '../image.model';
 

export enum ImageListActionTypes{
    LOAD_IMAGE_LIST= "[ImageList] Load Image List",
    CREATE_IMAGE_LIST= "[ImageList] Create Image List",
    UPDATE_IMAGE_LIST= "[ImageList] Update Image List",
    DELETE_IMAGE_LIST= "[ImageList] Delete Image List"
}

export class LoadImageList implements Action{
    readonly type = ImageListActionTypes.LOAD_IMAGE_LIST;
}
  
  export class CreateImage implements Action {
    readonly type = ImageListActionTypes.CREATE_IMAGE_LIST;
  
    constructor(public payload: ImageList) {}
  }
  
  export class UpdateImage implements Action {
    readonly type = ImageListActionTypes.UPDATE_IMAGE_LIST;
  
    constructor(public payload: ImageList) {}
  }
  
  export class DeleteImage implements Action {
    readonly type = ImageListActionTypes.DELETE_IMAGE_LIST;
  
    constructor(public payload: number) {}
  }
    

export type Actions = LoadImageList |  CreateImage | UpdateImage | DeleteImage ;

