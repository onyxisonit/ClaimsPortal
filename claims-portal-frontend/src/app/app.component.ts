import { Component } from '@angular/core';
// import { ClaimsFormComponent } from './claims-form/claims-form.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'claims_portal_frontend';
}
