import { Routes } from '@angular/router';
import { ContactComponent } from '../contact/contact.component';
import { DishDetailComponent } from '../dish-detail/dish-detail.component';
import { HomeComponent } from '../home/home.component';
import { MenuComponent } from '../menu/menu.component';


export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'contactus', component: ContactComponent },
  { path: 'dishdetail/:id', component: DishDetailComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];