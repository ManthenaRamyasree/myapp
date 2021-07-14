import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule , ReactiveFormsModule, Validators} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { DryfruitsComponent } from './dryfruits/dryfruits.component';
import { PapadComponent } from './papad/papad.component';
import { SpicesComponent } from './spices/spices.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ContactusComponent } from './contactus/contactus.component';

import { OrderpageComponent } from './orderpage/orderpage.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
 {path: 'home', component: HomeComponent},
 {path: 'login', component: LoginComponent},
 {path: 'register', component: RegisterComponent},
 {path: 'product', component: ProductComponent},
 {path: 'dryfruits', component: DryfruitsComponent},
 {path: 'spices', component: SpicesComponent},
 {path: 'papad', component: PapadComponent},
 {path: 'cart', component: CartComponent},
 {path: 'contactus', component: ContactusComponent},
 {path: 'orderpage', component: OrderpageComponent},
  {path: '**', redirectTo: 'pagenotfound'},
];


@NgModule({

  declarations:[
    ProductComponent,
      DryfruitsComponent,
      SpicesComponent,
      PapadComponent,
      CartComponent,
      HomeComponent,
      LoginComponent,
      RegisterComponent,
     ContactusComponent,
     OrderpageComponent,
     PagenotfoundComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
