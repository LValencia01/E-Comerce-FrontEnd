import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { RouterModule, Routes } from '@angular/router';




import { AppComponent } from './app.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { ProductosComponent } from './components/producto/producto.component';
import { provideHttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/common/navbar/navbar.component';


const routes: Routes = [
  { path: 'clientes', component: ClienteComponent },
  { path: 'productos', component: ProductosComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent,
    ProductosComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
