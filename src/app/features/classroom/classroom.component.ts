import { Component } from '@angular/core';
import { LayoutComponent } from "../../layout/layout.component";
import { ClassroomLayoutComponent } from "./components/classroom-layout/classroom-layout.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-classroom',
  imports: [
    LayoutComponent, 
    ClassroomLayoutComponent,
    RouterOutlet
  ],
  templateUrl: './classroom.component.html',
  styleUrl: './classroom.component.scss'
})
export class ClassroomComponent {

}
