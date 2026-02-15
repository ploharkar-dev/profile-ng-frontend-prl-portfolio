import { Component } from '@angular/core';
import { Introduction } from "../introduction/introduction";
import { Experience } from "../experience/experience";
import { Education } from "../education/education";
import { Awards } from "../awards/awards";
import { Info } from "../info/info";
import { Contact } from "../contact/contact";
import { ProjectsComponent } from "../projects/projects";

@Component({
  selector: 'app-home',
  imports: [Introduction, Experience, ProjectsComponent, Education, Awards, Info, Contact],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
