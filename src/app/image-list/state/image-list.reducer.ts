import * as imageListAction from "./image-list.actions";
import { ImageList } from "../image.model";
import * as fromRoot from "../../state/app-state";

export const initialState = {
  id: 1,
  imageText: 'Angular Logo',
  imageName: 'angular_log',
  imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/1200px-Angular_full_color_logo.svg.png'
}

export function imageListReducer(state: ImageList[] = [initialState], action: imageListAction.Actions ) {
  
    switch (action.type){
        case imageListAction.ImageListActionTypes.LOAD_IMAGE_LIST: {
            return {
                ...state
            };
        }
        case imageListAction.ImageListActionTypes.CREATE_IMAGE_LIST: {
            return [...state, action.payload];
        }
        case imageListAction.ImageListActionTypes.UPDATE_IMAGE_LIST: {
          console.log(state, action.payload);
          state = state.map((item)=> {return item = (item.id == action.payload.id) ? action.payload : item })
          return state;
        }
        case imageListAction.ImageListActionTypes.DELETE_IMAGE_LIST: {
          console.log(state, action.payload);
          state = state.filter((item)=> {return item.id != action.payload })
          return state;
        }  
        default: {
            return state
        }
    }
}

  
  // export const getCustomers = createSelector(
  //   getCustomerFeatureState,
  //   customerAdapter.getSelectors().selectAll
  // );
  
  // export const getCustomersLoading = createSelector(
  //   getCustomerFeatureState,
  //   (state: ImageListState) => state.loading
  // );
  
  // export const getCustomersLoaded = createSelector(
  //   getCustomerFeatureState,
  //   (state: ImageListState) => state.loaded
  // );
  
  // export const getError = createSelector(
  //   getCustomerFeatureState,
  //   (state: ImageListState) => state.error
  // );
  
  // export const getCurrentCustomerId = createSelector(
  //   getCustomerFeatureState,
  //   (state: ImageListState) => state.selectedCustomerId
  // );
  // export const getCurrentCustomer = createSelector(
  //   getCustomerFeatureState,
  //   getCurrentCustomerId,
  //   state => state.entities[state.selectedCustomerId]
  // );