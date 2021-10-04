// import { Injectable } from "@angular/core";

// import { Actions, Effect, ofType } from "@ngrx/effects";
// import { Action } from "@ngrx/store";

// import { Observable, of } from "rxjs";
// import { map, mergeMap, catchError } from "rxjs/operators";

// import { CustomerService } from "../customer.service";
// import * as customerActions from "../state/customer.actions";
// import { Customer } from "../customer.model";
// import { ImageServiceService } from "../image-service.service";

// @Injectable()
// export class ImageListEffect {
//   constructor(
//     private actions$: Actions,
//     private imageListService: ImageServiceService
//   ) {}

//   @Effect()
//   loadCustomers$: Observable<Action> = this.actions$.pipe(
//     ofType<customerActions.LoadCustomers>(
//       customerActions.CustomerActionTypes.LOAD_CUSTOMERS
//     ),
//     mergeMap((action: customerActions.LoadCustomers) =>
//       this.imageListService.getCustomers().pipe(
//         map(
//           (customers: Customer[]) =>
//             new customerActions.LoadCustomersSuccess(customers)
//         ),
//         catchError(err => of(new customerActions.LoadCustomersFail(err)))
//       )
//     )
//   );

//   @Effect()
//   createCustomer$: Observable<Action> = this.actions$.pipe(
//     ofType<customerActions.CreateCustomer>(
//       customerActions.CustomerActionTypes.CREATE_CUSTOMER
//     ),
//     map((action: customerActions.CreateCustomer) => action.payload),
//     mergeMap((customer: Customer) =>
//       this.customerService.createCustomer(customer).pipe(
//         map(
//           (newCustomer: Customer) =>
//             new customerActions.CreateCustomerSuccess(newCustomer)
//         ),
//         catchError(err => of(new customerActions.CreateCustomerFail(err)))
//       )
//     )
//   );

//   @Effect()
//   updateCustomer$: Observable<Action> = this.actions$.pipe(
//     ofType<customerActions.UpdateCustomer>(
//       customerActions.CustomerActionTypes.UPDATE_CUSTOMER
//     ),
//     map((action: customerActions.UpdateCustomer) => action.payload),
//     mergeMap((customer: Customer) =>
//       this.customerService.updateCustomer(customer).pipe(
//         map(
//           (updateCustomer: Customer) =>
//             new customerActions.UpdateCustomerSuccess({
//               id: updateCustomer.id,
//               changes: updateCustomer
//             })
//         ),
//         catchError(err => of(new customerActions.UpdateCustomerFail(err)))
//       )
//     )
//   );

//   @Effect()
//   deleteCustomer$: Observable<Action> = this.actions$.pipe(
//     ofType<customerActions.DeleteCustomer>(
//       customerActions.CustomerActionTypes.DELETE_CUSTOMER
//     ),
//     map((action: customerActions.DeleteCustomer) => action.payload),
//     mergeMap((id: number) =>
//       this.customerService.deleteCustomer(id).pipe(
//         map(() => new customerActions.DeleteCustomerSuccess(id)),
//         catchError(err => of(new customerActions.DeleteCustomerFail(err)))
//       )
//     )
//   );
// }
