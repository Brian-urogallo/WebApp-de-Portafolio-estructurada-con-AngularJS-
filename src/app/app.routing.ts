import { Component, ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AboutComponent } from './components/about/about.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { CreateComponent } from './components/create/create.component';
import { ContactComponent } from './components/contact/contact.component';
import { ErrorComponent } from './components/error/error.component';
import { DetailComponent } from "./components/detail/detail.component";
import { EditComponent } from "./components/edit/edit.component";



const appRoutes: Routes = [
   { path: '', component: AboutComponent},
   { path: 'Sobre-mi', component: AboutComponent},
   { path: 'Proyectos', component: ProjectsComponent},
   { path: 'Crear-proyecto', component: CreateComponent},
   { path: 'Contacto', component: ContactComponent},
   { path: 'proyecto/:id', component: DetailComponent},
   { path: 'editar-proyecto/:id', component: EditComponent},
   { path: '**', component: ErrorComponent}

];

export const appRoutingProviders: any[] =[];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes)